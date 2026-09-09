'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { staticDefaults } from "@/lib/contentDefaults";
import {
  ACTIVITY_PRIORITIES,
  ACTIVITY_STATUSES,
  isIsoDate,
  type ActivityInput,
  type ActivityPriority,
  type ActivityStatus,
} from "@/lib/activities";
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
  addActivity,
  deleteActivity,
  updateActivity,
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

function readActivity(formData: FormData): ActivityInput | string {
  const title = readString(formData, "title");
  const project = readString(formData, "project");
  const owner = readString(formData, "owner");
  const start_date = readString(formData, "start_date");
  const due_date = readString(formData, "due_date");
  const status = readString(formData, "status") as ActivityStatus;
  const priority = readString(formData, "priority") as ActivityPriority;
  const progress = Number(readString(formData, "progress"));
  const description = readString(formData, "description");

  if (!title || !project || !start_date || !due_date) {
    return "Title, project, start date and due date are required.";
  }
  if (title.length > 200 || project.length > 150 || owner.length > 150 || description.length > 10_000) {
    return "One or more activity fields exceed their maximum length.";
  }
  if (!isIsoDate(start_date) || !isIsoDate(due_date) || due_date < start_date) {
    return "Enter valid dates and ensure the due date is on or after the start date.";
  }
  if (!ACTIVITY_STATUSES.includes(status) || !ACTIVITY_PRIORITIES.includes(priority)) {
    return "Choose a valid activity status and priority.";
  }
  if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
    return "Progress must be a whole number from 0 to 100.";
  }

  return {
    title,
    project,
    owner,
    start_date,
    due_date,
    status,
    priority,
    progress: status === "Completed" ? 100 : progress,
    description,
  };
}

function refreshActivities() {
  revalidatePath("/admin");
  revalidatePath("/admin/activities");
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

export async function createActivityAction(formData: FormData) {
  await requireAdminSession();
  const activity = readActivity(formData);
  if (typeof activity === "string") {
    redirect(`/admin/activities?error=${encodeURIComponent(activity)}`);
  }
  await addActivity(activity);
  refreshActivities();
  redirect("/admin/activities?created=1");
}

export async function updateActivityAction(formData: FormData) {
  await requireAdminSession();
  const id = readId(formData);
  const activity = readActivity(formData);
  if (typeof activity === "string") {
    redirect(`/admin/activities?error=${encodeURIComponent(activity)}`);
  }
  const updated = await updateActivity(id, activity);
  if (!updated) redirect("/admin/activities?error=Activity%20not%20found.");
  refreshActivities();
  redirect("/admin/activities?updated=1");
}

export async function deleteActivityAction(formData: FormData) {
  await requireAdminSession();
  const id = readId(formData);
  const deleted = await deleteActivity(id);
  if (!deleted) redirect("/admin/activities?error=Activity%20not%20found.");
  refreshActivities();
  redirect("/admin/activities?deleted=1");
}
