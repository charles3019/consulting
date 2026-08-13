import {
  CalendarClock,
  CircleCheckBig,
  Mail,
  Trash2,
  Workflow,
} from "lucide-react";
import {
  deleteConsultationAction,
  deleteContactAction,
  updateConsultationStatusAction,
  updateContactStatusAction,
} from "@/app/admin/actions";
import { getConsultations, getContacts } from "@/lib/db";

const consultationStatuses = ["Pending", "Approved", "Completed", "Archived"];
const contactStatuses = ["New", "In Review", "Responded", "Archived"];

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; deleted?: string }>;
}) {
  const [{ updated, deleted }, consultations, contacts] = await Promise.all([
    searchParams,
    getConsultations(),
    getContacts(),
  ]);

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400">
              Lead Pipeline
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Consultations and contact inbox
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
              Review every incoming request, move it through your process, or
              remove stale records after they are handled.
            </p>
          </div>

          {updated || deleted ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-200">
              <CircleCheckBig className="h-4 w-4" />
              <span>Lead record updated successfully</span>
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-400">
                Consultations
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                Scheduled request intake
              </h3>
            </div>
            <CalendarClock className="h-5 w-5 text-cyan-400" />
          </div>

          <div className="space-y-4">
            {consultations.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.company} • {item.email}
                    </p>
                    <p className="mt-3 text-sm text-slate-300">
                      {item.details}
                    </p>
                  </div>

                  <div className="rounded-full border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 text-xs font-mono uppercase tracking-[0.25em] text-cyan-300">
                    {item.type}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span>Date: June {item.date}, 2026</span>
                  <span>Time: {item.time}</span>
                  <span>Status: {item.status}</span>
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <form
                    action={updateConsultationStatusAction}
                    className="flex flex-wrap items-center gap-3"
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <select
                      name="status"
                      defaultValue={item.status}
                      className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
                    >
                      {consultationStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500/40 hover:text-white"
                    >
                      <Workflow className="h-4 w-4 text-cyan-400" />
                      Save status
                    </button>
                  </form>

                  <form action={deleteConsultationAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-2 text-sm text-red-200 transition hover:border-red-500/40"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-400">
                Contact Inbox
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                General enquiries
              </h3>
            </div>
            <Mail className="h-5 w-5 text-cyan-400" />
          </div>

          <div className="space-y-4">
            {contacts.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-sm text-slate-400">
                    {item.company || "Independent"} • {item.email}
                    {item.phone ? ` • ${item.phone}` : ""}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">{item.details}</p>
                </div>

                <div className="mt-4 text-xs text-slate-400">
                  Status: {item.status}
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <form
                    action={updateContactStatusAction}
                    className="flex flex-wrap items-center gap-3"
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <select
                      name="status"
                      defaultValue={item.status}
                      className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
                    >
                      {contactStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500/40 hover:text-white"
                    >
                      <Workflow className="h-4 w-4 text-cyan-400" />
                      Save status
                    </button>
                  </form>

                  <form action={deleteContactAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-2 text-sm text-red-200 transition hover:border-red-500/40"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
