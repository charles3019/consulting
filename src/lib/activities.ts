import { todayInLondon } from "./booking";

export const ACTIVITY_STATUSES = ["Planned", "In Progress", "Blocked", "Completed"] as const;
export const ACTIVITY_PRIORITIES = ["Low", "Medium", "High", "Critical"] as const;

export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];
export type ActivityPriority = (typeof ACTIVITY_PRIORITIES)[number];

export interface ActivityInput {
  title: string;
  project: string;
  owner: string;
  start_date: string;
  due_date: string;
  status: ActivityStatus;
  priority: ActivityPriority;
  progress: number;
  description: string;
}

export interface ActivityRecord extends ActivityInput {
  id: number;
  created_at: string;
  updated_at: string;
}

export type ActivityAlert = {
  activityId: number;
  title: string;
  project: string;
  kind: "overdue" | "due-soon" | "blocked" | "unassigned";
  severity: "critical" | "warning" | "info";
  message: string;
};

export function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T12:00:00Z`) - Date.parse(`${from}T12:00:00Z`)) / 86_400_000);
}

export function formatActivityDate(value: string) {
  if (!isIsoDate(value)) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

export function getActivityAlerts(activities: ActivityRecord[], today = todayInLondon()) {
  const alerts: ActivityAlert[] = [];

  for (const activity of activities) {
    if (activity.status === "Completed") continue;
    const remaining = isIsoDate(activity.due_date) ? daysBetween(today, activity.due_date) : null;

    if (remaining !== null && remaining < 0) {
      alerts.push({
        activityId: activity.id,
        title: activity.title,
        project: activity.project,
        kind: "overdue",
        severity: "critical",
        message: `${Math.abs(remaining)} day${remaining === -1 ? "" : "s"} overdue`,
      });
    } else if (remaining !== null && remaining <= 3) {
      alerts.push({
        activityId: activity.id,
        title: activity.title,
        project: activity.project,
        kind: "due-soon",
        severity: "warning",
        message: remaining === 0 ? "Due today" : `Due in ${remaining} day${remaining === 1 ? "" : "s"}`,
      });
    }

    if (activity.status === "Blocked") {
      alerts.push({
        activityId: activity.id,
        title: activity.title,
        project: activity.project,
        kind: "blocked",
        severity: "critical",
        message: "Activity is blocked",
      });
    }

    if (!activity.owner.trim()) {
      alerts.push({
        activityId: activity.id,
        title: activity.title,
        project: activity.project,
        kind: "unassigned",
        severity: "info",
        message: "No owner assigned",
      });
    }
  }

  const weight = { critical: 0, warning: 1, info: 2 };
  return alerts.sort((a, b) => weight[a.severity] - weight[b.severity] || a.title.localeCompare(b.title));
}
