'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { staticDefaults } from "@/lib/contentDefaults";
import {
  clearAdminSession,
  createAdminSession,
  requireAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";
import {
  deleteConsultation,
  deleteContact,
  savePageContent,
  updateConsultationStatus,
  updateContactStatus,
} from "@/lib/db";

export interface LoginActionState {
  error: string | null;
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readId(formData: FormData) {
  const id = Number(readString(formData, "id"));
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Invalid record ID.");
  return id;
}

export async function loginAdmin(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const username = readString(formData, "username");
  const passwordValue = formData.get("password");
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!username || !password) {
    return { error: "Enter both username and password." };
  }

  const admin = await verifyAdminCredentials(username, password);
  if (!admin) {
    return { error: "The credentials were not recognized." };
  }

  await createAdminSession(admin.username);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updatePageContentAction(formData: FormData) {
  await requireAdminSession();

  const pageKey = readString(formData, "page_key");
  if (!Object.hasOwn(staticDefaults, pageKey)) {
    throw new Error("Unknown managed page.");
  }

  await savePageContent(pageKey, {
    title: readString(formData, "title"),
    meta_description: readString(formData, "meta_description"),
    keywords: readString(formData, "keywords"),
    hero_title: readString(formData, "hero_title"),
    hero_subtitle: readString(formData, "hero_subtitle"),
    body_text: readString(formData, "body_text"),
  });

  revalidatePath("/");
  revalidatePath(`/${pageKey === "home" ? "" : pageKey}`);
  revalidatePath("/admin");
  revalidatePath("/admin/content");
  redirect(`/admin/content?saved=${pageKey}`);
}

export async function updateConsultationStatusAction(formData: FormData) {
  await requireAdminSession();

  const id = readId(formData);
  const status = readString(formData, "status");
  if (!["Pending", "Approved", "Completed", "Archived"].includes(status)) throw new Error("Invalid consultation status.");
  await updateConsultationStatus(id, status);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?updated=consultation");
}

export async function deleteConsultationAction(formData: FormData) {
  await requireAdminSession();

  const id = readId(formData);
  await deleteConsultation(id);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?deleted=consultation");
}

export async function updateContactStatusAction(formData: FormData) {
  await requireAdminSession();

  const id = readId(formData);
  const status = readString(formData, "status");
  if (!["New", "In Review", "Responded", "Archived"].includes(status)) throw new Error("Invalid contact status.");
  await updateContactStatus(id, status);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?updated=contact");
}

export async function deleteContactAction(formData: FormData) {
  await requireAdminSession();

  const id = readId(formData);
  await deleteContact(id);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?deleted=contact");
}
