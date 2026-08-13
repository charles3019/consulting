'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function loginAdmin(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const username = readString(formData, "username");
  const password = readString(formData, "password");

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
  if (!pageKey) {
    throw new Error("Missing page key.");
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

  const id = Number(readString(formData, "id"));
  const status = readString(formData, "status");
  await updateConsultationStatus(id, status);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?updated=consultation");
}

export async function deleteConsultationAction(formData: FormData) {
  await requireAdminSession();

  const id = Number(readString(formData, "id"));
  await deleteConsultation(id);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?deleted=consultation");
}

export async function updateContactStatusAction(formData: FormData) {
  await requireAdminSession();

  const id = Number(readString(formData, "id"));
  const status = readString(formData, "status");
  await updateContactStatus(id, status);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?updated=contact");
}

export async function deleteContactAction(formData: FormData) {
  await requireAdminSession();

  const id = Number(readString(formData, "id"));
  await deleteContact(id);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads?deleted=contact");
}
