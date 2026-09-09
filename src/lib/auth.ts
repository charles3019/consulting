import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminUser } from "./db";

const SESSION_COOKIE = "ammayu_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const isProduction = process.env.NODE_ENV === "production";

function authSecret() {
  const secret = process.env.AUTH_SECRET;
  if (isProduction && (!secret || secret.length < 32 || secret === "ammayu-local-dev-secret-change-me")) {
    throw new Error("Set AUTH_SECRET to a random secret of at least 32 characters.");
  }
  return secret || "ammayu-local-dev-secret-change-me";
}

export interface AdminSession {
  username: string;
  expiresAt: number;
}

function sign(value: string) {
  return crypto.createHmac("sha256", authSecret()).update(value).digest("hex");
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

  const parts = token.split(":");
  if (parts.length !== 3) return null;
  const [username, expiresRaw, signature] = parts;
  if (!username || !/^\d+$/.test(expiresRaw) || !/^[a-f0-9]{64}$/.test(signature)) {
    return null;
  }

  const payload = `${username}:${expiresRaw}`;
  const expectedSignature = sign(payload);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  const expiresAt = Number(expiresRaw);
  if (!Number.isSafeInteger(expiresAt) || Date.now() >= expiresAt) {
    return null;
  }

  return { username, expiresAt };
}

export async function verifyAdminCredentials(username: string, password: string) {
  // A configured deployment credential is authoritative, so rotating it also
  // disables the old seeded password. Development seeds never unlock production.
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (isProduction || configuredPassword) {
    authSecret();
    if (!configuredPassword || configuredPassword.length < 16 || configuredPassword === "admin123") {
      throw new Error("Set ADMIN_PASSWORD to a unique password of at least 16 characters.");
    }
    const expected = crypto.createHash("sha256").update(configuredPassword).digest();
    const supplied = crypto.createHash("sha256").update(password).digest();
    return username === (process.env.ADMIN_USERNAME || "admin") && crypto.timingSafeEqual(expected, supplied)
      ? { username }
      : null;
  }
  const adminUser = await getAdminUser(username);
  if (!adminUser) return null;

  const storedHash = hashPassword(password, adminUser.salt);
  if (storedHash === adminUser.password_hash) {
    return { username: adminUser.username };
  }

  // Smooth over older local seed data by allowing a configurable default admin password.
  if (adminUser.username === "admin" && password === "admin123") {
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
