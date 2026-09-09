import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Filter,
  Flag,
  ListTodo,
  Plus,
  Save,
  Trash2,
  UserRound,
} from "lucide-react";
import ActivityGantt from "@/components/admin/ActivityGantt";
import {
  createActivityAction,
  deleteActivityAction,
  updateActivityAction,
} from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth";
import { getActivities } from "@/lib/db";
import { todayInLondon } from "@/lib/booking";
import {
  ACTIVITY_PRIORITIES,
  ACTIVITY_STATUSES,
  formatActivityDate,
  getActivityAlerts,
  type ActivityPriority,
  type ActivityStatus,
} from "@/lib/activities";

type SearchParams = Promise<{
  q?: string | string[];
  status?: string | string[];
  project?: string | string[];
  attention?: string | string[];
  created?: string;
  updated?: string;
  deleted?: string;
  error?: string;
}>;

function valueOf(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

function addDays(value: string, days: number) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

const inputClass = "w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500/60";

const statusTone: Record<ActivityStatus, string> = {
  Planned: "border-slate-500/30 bg-slate-500/10 text-slate-300",
  "In Progress": "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
  Blocked: "border-red-500/30 bg-red-500/10 text-red-200",
  Completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

const priorityTone: Record<ActivityPriority, string> = {
  Low: "text-slate-400",
  Medium: "text-blue-300",
  High: "text-amber-300",
  Critical: "text-red-300",
};

export default async function ActivitiesPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdminSession();
  const [params, activities] = await Promise.all([searchParams, getActivities()]);
  const today = todayInLondon();
  const alerts = getActivityAlerts(activities, today);
  const query = valueOf(params.q).toLowerCase();
  const status = valueOf(params.status);
  const project = valueOf(params.project);
  const attentionOnly = valueOf(params.attention) === "1";
  const alertedIds = new Set(alerts.map((alert) => alert.activityId));
  const projects = [...new Set(activities.map((activity) => activity.project))].sort();
  const filtered = activities.filter((activity) => {
    const matchesQuery = !query || [activity.title, activity.project, activity.owner, activity.description]
      .some((value) => value.toLowerCase().includes(query));
    return matchesQuery && (!status || activity.status === status) &&
      (!project || activity.project === project) && (!attentionOnly || alertedIds.has(activity.id));
  });
  const completed = activities.filter((activity) => activity.status === "Completed").length;
  const active = activities.filter((activity) => activity.status === "In Progress").length;
  const blocked = activities.filter((activity) => activity.status === "Blocked").length;
  const success = params.created ? "Activity registered." : params.updated ? "Activity updated." : params.deleted ? "Activity deleted." : "";

  return (
    <div className="space-y-7">
      <section className="glass-panel rounded-[2rem] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400">Activity control</p>
            <h2 className="mt-2 text-3xl font-black text-white">Plan, track and deliver work</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
              Register project activities, monitor progress on the timeline, and act on delivery alerts from one workspace.
            </p>
          </div>
          <a href="#register-activity" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400">
            <Plus className="h-4 w-4" /> Register activity
          </a>
        </div>
        {success ? <p className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">{success}</p> : null}
        {params.error ? <p role="alert" className="mt-5 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-200">{valueOf(params.error)}</p> : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total activities", value: activities.length, icon: ListTodo, tone: "text-cyan-300" },
          { label: "In progress", value: active, icon: CalendarDays, tone: "text-blue-300" },
          { label: "Completed", value: completed, icon: CheckCircle2, tone: "text-emerald-300" },
          { label: "Blocked", value: blocked, icon: CircleAlert, tone: "text-red-300" },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between"><p className="text-xs text-slate-400">{label}</p><Icon className={`h-5 w-5 ${tone}`} /></div>
            <p className={`mt-3 text-3xl font-black ${tone}`}>{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><BellRing className={`h-5 w-5 ${alerts.length ? "animate-pulse text-amber-300" : "text-emerald-300"}`} /><h3 className="text-xl font-bold text-white">Alert centre</h3></div>
            <p className="mt-1 text-sm text-slate-400">Overdue, due within three days, blocked, and unassigned work.</p>
          </div>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white">{alerts.length}</span>
        </div>
        {alerts.length ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {alerts.map((alert, index) => (
              <a key={`${alert.activityId}-${alert.kind}-${index}`} href={`#activity-${alert.activityId}`} className={`rounded-xl border p-4 transition hover:-translate-y-0.5 ${alert.severity === "critical" ? "border-red-500/30 bg-red-950/20" : alert.severity === "warning" ? "border-amber-500/30 bg-amber-950/20" : "border-blue-500/30 bg-blue-950/20"}`}>
                <div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-white">{alert.title}</p><p className="mt-1 text-xs text-slate-400">{alert.project}</p></div><Flag className={`h-4 w-4 ${alert.severity === "critical" ? "text-red-300" : alert.severity === "warning" ? "text-amber-300" : "text-blue-300"}`} /></div>
                <p className="mt-3 text-sm text-slate-200">{alert.message}</p>
              </a>
            ))}
          </div>
        ) : <p className="rounded-xl bg-emerald-950/20 p-4 text-sm text-emerald-200">No delivery alerts. Your active work is on track.</p>}
      </section>

      {activities.length ? <ActivityGantt activities={filtered} today={today} /> : null}

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
        <div className="mb-5 flex items-center gap-2"><Filter className="h-5 w-5 text-cyan-400" /><h3 className="text-xl font-bold text-white">Find activities</h3></div>
        <form className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto_auto]">
          <input name="q" defaultValue={valueOf(params.q)} placeholder="Search activity, project or owner" className={inputClass} />
          <select name="status" defaultValue={status} className={inputClass}><option value="">All statuses</option>{ACTIVITY_STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
          <select name="project" defaultValue={project} className={inputClass}><option value="">All projects</option>{projects.map((item) => <option key={item}>{item}</option>)}</select>
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-slate-300"><input type="checkbox" name="attention" value="1" defaultChecked={attentionOnly} /> Alerts only</label>
          <button className="rounded-xl border border-cyan-500/30 px-4 py-2 text-sm font-semibold text-cyan-200">Apply</button>
        </form>
        <p className="mt-3 text-xs text-slate-500">Showing {filtered.length} of {activities.length} activities.</p>
      </section>

      <details id="register-activity" open={!activities.length || Boolean(params.error)} className="group rounded-[2rem] border border-cyan-500/20 bg-cyan-950/10 p-6">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xl font-bold text-white"><span className="inline-flex items-center gap-2"><Plus className="h-5 w-5 text-cyan-400" />Register a new activity</span><span className="text-sm text-cyan-300 group-open:hidden">Open form</span></summary>
        <form action={createActivityAction} className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 xl:col-span-2"><span className="text-xs text-slate-400">Activity title *</span><input name="title" required maxLength={200} className={inputClass} /></label>
          <label className="space-y-2"><span className="text-xs text-slate-400">Project *</span><input name="project" required maxLength={150} list="project-options" className={inputClass} /></label>
          <label className="space-y-2"><span className="text-xs text-slate-400">Owner</span><input name="owner" maxLength={150} className={inputClass} /></label>
          <label className="space-y-2"><span className="text-xs text-slate-400">Start date *</span><input type="date" name="start_date" required defaultValue={today} className={inputClass} /></label>
          <label className="space-y-2"><span className="text-xs text-slate-400">Due date *</span><input type="date" name="due_date" required defaultValue={addDays(today, 7)} className={inputClass} /></label>
          <label className="space-y-2"><span className="text-xs text-slate-400">Status</span><select name="status" defaultValue="Planned" className={inputClass}>{ACTIVITY_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="space-y-2"><span className="text-xs text-slate-400">Priority</span><select name="priority" defaultValue="Medium" className={inputClass}>{ACTIVITY_PRIORITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="space-y-2"><span className="text-xs text-slate-400">Progress %</span><input type="number" name="progress" min={0} max={100} step={1} defaultValue={0} className={inputClass} /></label>
          <label className="space-y-2 md:col-span-2 xl:col-span-3"><span className="text-xs text-slate-400">Notes</span><textarea name="description" rows={3} maxLength={10000} className={inputClass} /></label>
          <div className="flex items-end"><button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400"><Plus className="h-4 w-4" />Add activity</button></div>
        </form>
        <datalist id="project-options">{projects.map((item) => <option key={item} value={item} />)}</datalist>
      </details>

      <section className="space-y-4">
        <div className="flex items-center gap-2"><ListTodo className="h-5 w-5 text-cyan-400" /><h3 className="text-xl font-bold text-white">Activity register</h3></div>
        {filtered.length ? filtered.map((activity) => (
          <article id={`activity-${activity.id}`} key={activity.id} className={`scroll-mt-28 rounded-[1.5rem] border bg-slate-950/70 p-5 ${alertedIds.has(activity.id) ? "border-amber-500/30" : "border-white/10"}`}>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div><p className="text-xs font-mono uppercase tracking-[0.22em] text-cyan-400">{activity.project}</p><h4 className="mt-2 text-xl font-bold text-white">{activity.title}</h4><p className="mt-2 text-sm text-slate-400">{formatActivityDate(activity.start_date)} – {formatActivityDate(activity.due_date)}</p></div>
              <div className="flex flex-wrap gap-2"><span className={`rounded-full border px-3 py-1 text-xs ${statusTone[activity.status]}`}>{activity.status}</span><span className={`rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold ${priorityTone[activity.priority]}`}>{activity.priority}</span></div>
            </div>
            <form action={updateActivityAction} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <input type="hidden" name="id" value={activity.id} />
              <label className="space-y-2 xl:col-span-2"><span className="text-xs text-slate-500">Title</span><input name="title" required maxLength={200} defaultValue={activity.title} className={inputClass} /></label>
              <label className="space-y-2"><span className="text-xs text-slate-500">Project</span><input name="project" required maxLength={150} defaultValue={activity.project} list="project-options" className={inputClass} /></label>
              <label className="space-y-2"><span className="text-xs text-slate-500">Owner</span><input name="owner" maxLength={150} defaultValue={activity.owner} className={inputClass} /></label>
              <label className="space-y-2"><span className="text-xs text-slate-500">Start</span><input type="date" name="start_date" required defaultValue={activity.start_date} className={inputClass} /></label>
              <label className="space-y-2"><span className="text-xs text-slate-500">Due</span><input type="date" name="due_date" required defaultValue={activity.due_date} className={inputClass} /></label>
              <label className="space-y-2"><span className="text-xs text-slate-500">Status</span><select name="status" defaultValue={activity.status} className={inputClass}>{ACTIVITY_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="space-y-2"><span className="text-xs text-slate-500">Priority</span><select name="priority" defaultValue={activity.priority} className={inputClass}>{ACTIVITY_PRIORITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="space-y-2"><span className="text-xs text-slate-500">Progress %</span><input type="number" name="progress" min={0} max={100} step={1} defaultValue={activity.progress} className={inputClass} /></label>
              <label className="space-y-2 md:col-span-2 xl:col-span-3"><span className="text-xs text-slate-500">Notes</span><textarea name="description" rows={2} maxLength={10000} defaultValue={activity.description} className={inputClass} /></label>
              <div className="flex items-end"><button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/30 px-5 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-950/40"><Save className="h-4 w-4" />Save changes</button></div>
            </form>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-500"><span className="inline-flex items-center gap-2"><UserRound className="h-3.5 w-3.5" />{activity.owner || "Unassigned"}</span><form action={deleteActivityAction}><input type="hidden" name="id" value={activity.id} /><button className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-red-300 hover:bg-red-950/30"><Trash2 className="h-4 w-4" />Delete</button></form></div>
          </article>
        )) : <div className="rounded-[1.5rem] border border-dashed border-white/15 p-12 text-center text-sm text-slate-400">No activities match these filters. Register a new activity or clear the filters.</div>}
      </section>
    </div>
  );
}
