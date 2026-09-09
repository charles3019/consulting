import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { getDefaultPageContent, staticDefaults, resolvePageContent, type PageContent } from "./contentDefaults";
import type { ActivityInput, ActivityRecord } from "./activities";

// MySQL configuration from environment variables
const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  dateStrings: true,
};

let pool: mysql.Pool | null = null;
const isMySQLConfigured = !!(mysqlConfig.host && mysqlConfig.user && mysqlConfig.database);

// Paths for JSON fallback
const FALLBACK_DIR = process.env.DATA_DIR || path.join(process.cwd(), "src", "data");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "db_fallback.json");

export interface ConsultationRecord {
  id: number;
  type: string;
  date: number;
  time: string;
  name: string;
  email: string;
  company: string;
  details: string;
  status: string;
  created_at: string;
}

export interface ContactRecord {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  service?: string | null;
  location?: string | null;
  preferredContact?: string | null;
  details: string;
  status: string;
  created_at: string;
}

interface AdminUser { username: string; password_hash: string; salt: string }
interface FallbackDatabase {
  [key: string]: unknown;
  page_content: Record<string, Partial<PageContent>>;
  consultations: ConsultationRecord[];
  contacts: ContactRecord[];
  admin_users: AdminUser[];
  activities: ActivityRecord[];
}

function assertWritableFallback() {
  if (process.env.NODE_ENV === "production" && !process.env.DATA_DIR) {
    throw new Error("Configure MySQL or DATA_DIR on a persistent disk before saving production data.");
  }
}

// Helper to read fallback JSON
function readFallbackJSON(): FallbackDatabase {
  try {
    if (!fs.existsSync(FALLBACK_FILE)) {
      return { page_content: {}, consultations: [], contacts: [], admin_users: [], activities: [] };
    }
    const data = fs.readFileSync(FALLBACK_FILE, "utf8");
    const parsed = JSON.parse(data);
    const fallback = parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
    const isRecord = (value: unknown) =>
      value !== null && typeof value === "object" && !Array.isArray(value);

    // Older files split page maps across page_content_* sections alongside
    // other site data. Recover page records without treating those arrays as pages.
    const legacyPages = Object.fromEntries(
      Object.entries(fallback)
        .filter(([key, value]) => key.startsWith("page_content_") && isRecord(value))
        .flatMap(([, value]) => Object.entries(value as Record<string, unknown>))
        .filter(([key, value]) => isRecord(value) &&
          (value as Record<string, unknown>).page_key === key),
    );
    return {
      ...fallback,
      page_content: {
        ...legacyPages,
        ...(isRecord(fallback.page_content) ? fallback.page_content : {}),
      },
      consultations: Array.isArray(fallback.consultations) ? fallback.consultations : [],
      contacts: Array.isArray(fallback.contacts) ? fallback.contacts : [],
      admin_users: Array.isArray(fallback.admin_users) ? fallback.admin_users : [],
      activities: Array.isArray(fallback.activities) ? fallback.activities : [],
    };
  } catch (err) {
    console.error("Failed to read fallback JSON db:", err);
    throw new Error("Unable to read stored data. Restore the database before making changes.");
  }
}

// Helper to write fallback JSON
function writeFallbackJSON(data: FallbackDatabase) {
  assertWritableFallback();
  try {
    fs.mkdirSync(FALLBACK_DIR, { recursive: true });
    const temporaryFile = `${FALLBACK_FILE}.tmp`;
    fs.writeFileSync(temporaryFile, JSON.stringify(data, null, 2), { encoding: "utf8", mode: 0o600 });
    fs.renameSync(temporaryFile, FALLBACK_FILE);
  } catch (err) {
    console.error("Failed to write fallback JSON db:", err);
    throw new Error("Unable to save data. Please try again later.");
  }
}

function ensureFallbackPageContentShape() {
  const fallback = readFallbackJSON();

  for (const pageKey of Object.keys(staticDefaults)) {
    fallback.page_content[pageKey] = {
      ...getDefaultPageContent(pageKey),
      ...(fallback.page_content[pageKey] || {}),
      page_key: pageKey,
    };
  }

  return fallback;
}

// Initialize MySQL Database Tables
let initialization: Promise<void> | null = null;
async function initMySQL() {
  if (!initialization) initialization = initializeMySQL().finally(() => { initialization = null; });
  await initialization;
}

async function initializeMySQL() {
  if (!isMySQLConfigured || pool) return;

  const candidate = mysql.createPool({ ...mysqlConfig, connectionLimit: 10, connectTimeout: 10000 });
  let conn: mysql.PoolConnection | undefined;
  try {
    conn = await candidate.getConnection();

    // 1. Create tables
    await conn.query(`
      CREATE TABLE IF NOT EXISTS page_content (
        page_key VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        meta_description TEXT NOT NULL,
        keywords TEXT NOT NULL,
        hero_title TEXT NOT NULL,
        hero_subtitle TEXT NOT NULL,
        body_text TEXT NOT NULL
      ) ENGINE=InnoDB;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        date INT NOT NULL,
        time VARCHAR(20) NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        company VARCHAR(150) NOT NULL,
        details TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        company VARCHAR(150),
        phone VARCHAR(50),
        details TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // Additive migration: existing contact rows and values are preserved.
    const [contactColumns] = await conn.query<mysql.RowDataPacket[]>("SHOW COLUMNS FROM contacts");
    for (const column of ["service", "location", "preferredContact"] as const) {
      if (!contactColumns.some(existing => existing.Field === column)) {
        try {
          await conn.query(`ALTER TABLE contacts ADD COLUMN ${column} VARCHAR(150) NULL`);
        } catch (error) {
          // Another application worker may have added the same column concurrently.
          if (!(error instanceof Error) || !("code" in error) || error.code !== "ER_DUP_FIELDNAME") throw error;
        }
      }
    }

    await conn.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        salt VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        project VARCHAR(150) NOT NULL,
        owner VARCHAR(150) NOT NULL DEFAULT '',
        start_date DATE NOT NULL,
        due_date DATE NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'Planned',
        priority VARCHAR(20) NOT NULL DEFAULT 'Medium',
        progress TINYINT UNSIGNED NOT NULL DEFAULT 0,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_activities_dates (start_date, due_date),
        INDEX idx_activities_status (status)
      ) ENGINE=InnoDB;
    `);

    // 2. Check and populate default admin and content if empty
    const [users] = await conn.query<(mysql.RowDataPacket & AdminUser)[]>("SELECT * FROM admin_users");
    if (users.length === 0 && process.env.NODE_ENV !== "production") {
      const fallback = readFallbackJSON();
      const defaultAdmin = fallback.admin_users[0] || {
        username: "admin",
        password_hash: "8cc3feae0b0e2ce6c4a1e7ef17bb4f57b926d913663c0368658ce82867ca3742",
        salt: "a8f3b2c1d0e9f8a7"
      };
      await conn.query(
        "INSERT INTO admin_users (username, password_hash, salt) VALUES (?, ?, ?)",
        [defaultAdmin.username, defaultAdmin.password_hash, defaultAdmin.salt]
      );
    }

    const [content] = await conn.query<(mysql.RowDataPacket & PageContent)[]>("SELECT * FROM page_content");
    if (content.length === 0) {
      const fallback = readFallbackJSON();
      for (const key of Object.keys(fallback.page_content)) {
        const pg = { ...getDefaultPageContent(key), ...fallback.page_content[key] };
        await conn.query(
          "INSERT INTO page_content (page_key, title, meta_description, keywords, hero_title, hero_subtitle, body_text) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [pg.page_key, pg.title, pg.meta_description, pg.keywords, pg.hero_title, pg.hero_subtitle, pg.body_text]
        );
      }
    }

    pool = candidate;
    console.log("MySQL Database structures initialized successfully.");
  } catch (err) {
    console.error("MySQL connection or initialization failed:", err);
    conn?.release();
    conn = undefined;
    await candidate.end();
    pool = null;
  } finally {
    conn?.release();
  }
}

// Exportable DB Methods
export async function getDbStatus(): Promise<"MYSQL LIVE" | "LOCAL FALLBACK"> {
  if (!isMySQLConfigured) return "LOCAL FALLBACK";
  if (!pool) {
    await initMySQL();
  }
  if (!pool && process.env.NODE_ENV === "production") throw new Error("The configured database is unavailable.");
  return pool ? "MYSQL LIVE" : "LOCAL FALLBACK";
}

// Page Content Operations
export async function getPageContent(pageKey: string) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      const [rows] = await pool.query<(mysql.RowDataPacket & PageContent)[]>("SELECT * FROM page_content WHERE page_key = ?", [pageKey]);
      if (rows.length > 0) return resolvePageContent(pageKey, rows[0]);
    } catch (err) {
      console.error(`MySQL getPageContent fail for ${pageKey}, returning fallback:`, err);
    }
  }
  const fallback = readFallbackJSON();
  return fallback.page_content[pageKey] ? resolvePageContent(pageKey, fallback.page_content[pageKey]) : null;
}

export async function listPageContent() {
  const status = await getDbStatus();

  if (status === "MYSQL LIVE" && pool) {
    try {
      const [rows] = await pool.query<(mysql.RowDataPacket & PageContent)[]>(
        "SELECT * FROM page_content ORDER BY page_key ASC",
      );

      return Object.keys(staticDefaults).map((pageKey) => {
        const stored = rows.find((row) => row.page_key === pageKey) || {};
        return resolvePageContent(pageKey, stored);
      });
    } catch (err) {
      console.error("MySQL listPageContent fail, returning fallback:", err);
    }
  }

  const fallback = ensureFallbackPageContentShape();
  return Object.keys(staticDefaults).map((pageKey) => resolvePageContent(pageKey, fallback.page_content[pageKey] || {}));
}

export async function savePageContent(pageKey: string, data: {
  title: string;
  meta_description: string;
  keywords: string;
  hero_title: string;
  hero_subtitle: string;
  body_text: string;
}) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query(
        `INSERT INTO page_content (page_key, title, meta_description, keywords, hero_title, hero_subtitle, body_text) 
         VALUES (?, ?, ?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE 
           title = VALUES(title), 
           meta_description = VALUES(meta_description), 
           keywords = VALUES(keywords), 
           hero_title = VALUES(hero_title), 
           hero_subtitle = VALUES(hero_subtitle), 
           body_text = VALUES(body_text)`,
        [pageKey, data.title, data.meta_description, data.keywords, data.hero_title, data.hero_subtitle, data.body_text]
      );
      return true;
    } catch (err) {
      console.error(`MySQL savePageContent fail for ${pageKey}:`, err);
      throw new Error("Unable to save data. Please try again later.");
    }
  }

  // Fallback write
  const fallback = readFallbackJSON();
  fallback.page_content[pageKey] = { page_key: pageKey, ...data };
  writeFallbackJSON(fallback);
  return true;
}

// Consultations Operations
export async function getConsultations() {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM consultations ORDER BY id DESC");
      return rows as ConsultationRecord[];
    } catch (err) {
      console.error("MySQL getConsultations fail:", err);
    }
  }
  return readFallbackJSON().consultations as ConsultationRecord[];
}

export async function addConsultation(data: {
  type: string;
  date: number;
  time: string;
  name: string;
  email: string;
  company: string;
  details: string;
}) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query(
        "INSERT INTO consultations (type, date, time, name, email, company, details, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')",
        [data.type, data.date, data.time, data.name, data.email, data.company, data.details]
      );
      return true;
    } catch (err) {
      console.error("MySQL addConsultation fail:", err);
      throw new Error("Unable to save data. Please try again later.");
    }
  }

  // Fallback write
  const fallback = readFallbackJSON();
  const newId = fallback.consultations.length > 0 ? Math.max(...fallback.consultations.map((c) => c.id)) + 1 : 1;
  fallback.consultations.unshift({
    id: newId,
    ...data,
    status: "Pending",
    created_at: new Date().toISOString()
  });
  writeFallbackJSON(fallback);
  return true;
}

export async function updateConsultationStatus(id: number, newStatus: string) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query("UPDATE consultations SET status = ? WHERE id = ?", [newStatus, id]);
      return true;
    } catch (err) {
      console.error("MySQL updateConsultationStatus fail:", err);
      throw new Error("Unable to save data. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  const idx = fallback.consultations.findIndex((c) => c.id === id);
  if (idx !== -1) {
    fallback.consultations[idx].status = newStatus;
    writeFallbackJSON(fallback);
    return true;
  }
  return false;
}

export async function deleteConsultation(id: number) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query("DELETE FROM consultations WHERE id = ?", [id]);
      return true;
    } catch (err) {
      console.error("MySQL deleteConsultation fail:", err);
      throw new Error("Unable to save data. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  fallback.consultations = fallback.consultations.filter((c) => c.id !== id);
  writeFallbackJSON(fallback);
  return true;
}

// Contacts Operations
export async function getContacts() {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM contacts ORDER BY id DESC");
      return rows as ContactRecord[];
    } catch (err) {
      console.error("MySQL getContacts fail:", err);
    }
  }
  return readFallbackJSON().contacts as ContactRecord[];
}

export async function updateContactStatus(id: number, newStatus: string) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query("UPDATE contacts SET status = ? WHERE id = ?", [newStatus, id]);
      return true;
    } catch (err) {
      console.error("MySQL updateContactStatus fail:", err);
      throw new Error("Unable to save data. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  const idx = fallback.contacts.findIndex((c) => c.id === id);
  if (idx !== -1) {
    fallback.contacts[idx].status = newStatus;
    writeFallbackJSON(fallback);
    return true;
  }
  return false;
}

export async function addContact(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service?: string | null;
  location?: string | null;
  preferredContact?: string | null;
  details: string;
}) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query(
        "INSERT INTO contacts (name, email, company, phone, details, service, location, preferredContact, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New')",
        [data.name, data.email, data.company, data.phone, data.details, data.service || null, data.location || null, data.preferredContact || null]
      );
      return true;
    } catch (err) {
      console.error("MySQL addContact fail:", err);
      throw new Error("Unable to save data. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  const newId = fallback.contacts.length > 0 ? Math.max(...fallback.contacts.map((c) => c.id)) + 1 : 1;
  fallback.contacts.unshift({
    id: newId,
    ...data,
    status: "New",
    created_at: new Date().toISOString()
  });
  writeFallbackJSON(fallback);
  return true;
}

export async function deleteContact(id: number) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
      return true;
    } catch (err) {
      console.error("MySQL deleteContact fail:", err);
      throw new Error("Unable to save data. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  fallback.contacts = fallback.contacts.filter((c) => c.id !== id);
  writeFallbackJSON(fallback);
  return true;
}

// Activity planning and tracking operations
export async function getActivities(): Promise<ActivityRecord[]> {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      const [rows] = await pool.query<(mysql.RowDataPacket & ActivityRecord)[]>(
        "SELECT * FROM activities ORDER BY due_date ASC, priority DESC, id DESC",
      );
      return rows;
    } catch (err) {
      console.error("MySQL getActivities fail:", err);
      if (process.env.NODE_ENV === "production") throw new Error("Unable to load activities.");
    }
  }
  return [...readFallbackJSON().activities].sort(
    (a, b) => a.due_date.localeCompare(b.due_date) || b.id - a.id,
  );
}

export async function addActivity(data: ActivityInput) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      await pool.query(
        `INSERT INTO activities
          (title, project, owner, start_date, due_date, status, priority, progress, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.title, data.project, data.owner, data.start_date, data.due_date,
          data.status, data.priority, data.progress, data.description],
      );
      return true;
    } catch (err) {
      console.error("MySQL addActivity fail:", err);
      throw new Error("Unable to save activity. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  const id = fallback.activities.length
    ? Math.max(...fallback.activities.map((activity) => activity.id)) + 1
    : 1;
  const timestamp = new Date().toISOString();
  fallback.activities.push({ id, ...data, created_at: timestamp, updated_at: timestamp });
  writeFallbackJSON(fallback);
  return true;
}

export async function updateActivity(id: number, data: ActivityInput) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      const [result] = await pool.query<mysql.ResultSetHeader>(
        `UPDATE activities SET title = ?, project = ?, owner = ?, start_date = ?, due_date = ?,
          status = ?, priority = ?, progress = ?, description = ? WHERE id = ?`,
        [data.title, data.project, data.owner, data.start_date, data.due_date,
          data.status, data.priority, data.progress, data.description, id],
      );
      return result.affectedRows > 0;
    } catch (err) {
      console.error("MySQL updateActivity fail:", err);
      throw new Error("Unable to update activity. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  const index = fallback.activities.findIndex((activity) => activity.id === id);
  if (index < 0) return false;
  fallback.activities[index] = {
    ...fallback.activities[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  writeFallbackJSON(fallback);
  return true;
}

export async function deleteActivity(id: number) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      const [result] = await pool.query<mysql.ResultSetHeader>(
        "DELETE FROM activities WHERE id = ?",
        [id],
      );
      return result.affectedRows > 0;
    } catch (err) {
      console.error("MySQL deleteActivity fail:", err);
      throw new Error("Unable to delete activity. Please try again later.");
    }
  }

  const fallback = readFallbackJSON();
  const initialLength = fallback.activities.length;
  fallback.activities = fallback.activities.filter((activity) => activity.id !== id);
  if (fallback.activities.length === initialLength) return false;
  writeFallbackJSON(fallback);
  return true;
}

// Admin Users Operations
export async function getAdminUser(username: string) {
  const status = await getDbStatus();
  if (status === "MYSQL LIVE" && pool) {
    try {
      const [rows] = await pool.query<(mysql.RowDataPacket & AdminUser)[]>("SELECT * FROM admin_users WHERE username = ?", [username]);
      if (rows.length > 0) return rows[0];
    } catch (err) {
      console.error("MySQL getAdminUser fail:", err);
    }
  }
  const fallback = readFallbackJSON();
  return fallback.admin_users.find((u) => u.username === username) || null;
}
