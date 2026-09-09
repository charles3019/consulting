"use client";

import { useMemo, useState } from "react";
import { CalendarRange, ZoomIn } from "lucide-react";
import {
  daysBetween,
  formatActivityDate,
  type ActivityRecord,
} from "@/lib/activities";

type View = "fit" | "30" | "90";

function addDays(value: string, days: number) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

const statusTone = {
  Planned: "bg-slate-500",
  "In Progress": "bg-cyan-500",
  Blocked: "bg-red-500",
  Completed: "bg-emerald-500",
};

export default function ActivityGantt({
  activities,
  today,
}: {
  activities: ActivityRecord[];
  today: string;
}) {
  const [view, setView] = useState<View>("fit");
  const timeline = useMemo(() => {
    if (view !== "fit") {
      return { start: today, end: addDays(today, Number(view) - 1) };
    }
    const starts = activities.map((activity) => activity.start_date);
    const ends = activities.map((activity) => activity.due_date);
    const start = starts.length ? [today, ...starts].sort()[0] : today;
    const endCandidate = ends.length ? [addDays(today, 30), ...ends].sort().at(-1)! : addDays(today, 30);
    return { start: addDays(start, -2), end: addDays(endCandidate, 2) };
  }, [activities, today, view]);

  const totalDays = Math.max(daysBetween(timeline.start, timeline.end) + 1, 1);
  const markerStep = Math.max(1, Math.ceil(totalDays / 8));
  const markers = Array.from(
    { length: Math.ceil(totalDays / markerStep) },
    (_, index) => Math.min(index * markerStep, totalDays - 1),
  );
  if (markers.at(-1) !== totalDays - 1) markers.push(totalDays - 1);
  const visibleActivities = activities.filter(
    (activity) => activity.due_date >= timeline.start && activity.start_date <= timeline.end,
  );
  const todayOffset = daysBetween(timeline.start, today);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-300">
            <CalendarRange className="h-5 w-5" />
            <h3 className="font-semibold text-white">Delivery timeline</h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {formatActivityDate(timeline.start)} – {formatActivityDate(timeline.end)}
          </p>
        </div>
        <div className="flex items-center gap-2" aria-label="Timeline range">
          <ZoomIn className="h-4 w-4 text-slate-500" />
          {(["fit", "30", "90"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              aria-pressed={view === option}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                view === option ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-300 hover:text-white"
              }`}
            >
              {option === "fit" ? "Fit all" : `${option} days`}
            </button>
          ))}
        </div>
      </div>

      {visibleActivities.length ? (
        <div className="overflow-x-auto">
          <div className="min-w-[840px]">
            <div className="grid grid-cols-[240px_1fr] border-b border-white/10 bg-slate-900/70 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
              <div className="border-r border-white/10 px-5 py-3">Activity</div>
              <div className="relative h-11">
                {markers.map((offset) => (
                  <span
                    key={offset}
                    className="absolute top-3 -translate-x-1/2 whitespace-nowrap"
                    style={{ left: `${(offset / Math.max(totalDays - 1, 1)) * 100}%` }}
                  >
                    {formatActivityDate(addDays(timeline.start, offset)).replace(/ \d{4}$/, "")}
                  </span>
                ))}
              </div>
            </div>

            {visibleActivities.map((activity) => {
              const rawStart = daysBetween(timeline.start, activity.start_date);
              const rawEnd = daysBetween(timeline.start, activity.due_date) + 1;
              const start = Math.max(0, rawStart);
              const end = Math.min(totalDays, rawEnd);
              const left = (start / totalDays) * 100;
              const width = Math.max(((end - start) / totalDays) * 100, 1.2);
              return (
                <div key={activity.id} className="grid grid-cols-[240px_1fr] border-b border-white/5 last:border-b-0">
                  <div className="border-r border-white/10 px-5 py-3">
                    <a href={`#activity-${activity.id}`} className="block truncate text-sm font-semibold text-white hover:text-cyan-300">
                      {activity.title}
                    </a>
                    <p className="mt-1 truncate text-xs text-slate-500">{activity.project} · {activity.owner || "Unassigned"}</p>
                  </div>
                  <div className="relative h-16 bg-[linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:12.5%_100%]">
                    {todayOffset >= 0 && todayOffset < totalDays ? (
                      <div
                        className="absolute inset-y-0 z-10 w-px bg-amber-300/70"
                        style={{ left: `${(todayOffset / totalDays) * 100}%` }}
                        title="Today"
                      />
                    ) : null}
                    <div
                      className={`absolute top-4 h-8 overflow-hidden rounded-lg shadow-lg ${statusTone[activity.status]}`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      title={`${activity.title}: ${formatActivityDate(activity.start_date)} – ${formatActivityDate(activity.due_date)} (${activity.progress}%)`}
                    >
                      <div className="h-full bg-white/25" style={{ width: `${activity.progress}%` }} />
                      <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-white drop-shadow">
                        {activity.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-10 text-center text-sm text-slate-400">No activities fall within this timeline range.</div>
      )}

      <div className="flex flex-wrap gap-4 border-t border-white/10 px-5 py-3 text-xs text-slate-400">
        {Object.entries(statusTone).map(([status, tone]) => (
          <span key={status} className="inline-flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${tone}`} />{status}</span>
        ))}
        <span className="inline-flex items-center gap-2"><span className="h-4 w-px bg-amber-300" />Today</span>
      </div>
    </section>
  );
}
