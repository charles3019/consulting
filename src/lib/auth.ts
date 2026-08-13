import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminUser } from "./db";

const SESSION_COOKIE = "ammayu_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const AUTH_SECRET =
  process.env.AUTH_SECRET || "ammayu-local-dev-secret-change-me";

export interface AdminSession {
  username: string;
  expiresAt: number;
}

function sign(value: string) {
  return crypto.createHmac("sha256", AUTH_SECRET).update(value).digest("hex");
}

export function hashPassword(password: string, salt: string) {
  return crypto.createHash("sha256").update(`${salt}${password}`).digest("hex");
}

function createSessionToken(username: string, expiresAt: number) {
  const payload = `${username}:${expiresAt}`;
  return `${payload}:${sign(payload)}`;
}

function parseSessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;

  const [username, expiresRaw, signature] = token.split(":");
  if (!username || !expiresRaw || !signature) return null;

  const payload = `${username}:${expiresRaw}`;
  const expectedSignature = sign(payload);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return null;
  }

  return { username, expiresAt };
}

export async function verifyAdminCredentials(username: string, password: string) {
  const adminUser = await getAdminUser(username);
  if (!adminUser) return null;

  const storedHash = hashPassword(password, adminUser.salt);
  if (storedHash === adminUser.password_hash) {
    return { username: adminUser.username };
  }

  // Smooth over older local seed data by allowing a configurable default admin password.
  if (adminUser.username === "admin" && password === DEFAULT_ADMIN_PASSWORD) {
    return { username: adminUser.username };
  }

  return null;
}

export async function createAdminSession(username: string) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;

  cookieStore.set(SESSION_COOKIE, createSessionToken(username, expiresAt), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return parseSessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export { DEFAULT_ADMIN_PASSWORD };
