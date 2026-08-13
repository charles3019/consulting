import Link from "next/link";
import {
  DatabaseZap,
  FileText,
  Inbox,
  MessageSquareMore,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import {
  getConsultations,
  getContacts,
  getDbStatus,
  listPageContent,
} from "@/lib/db";

export default async function AdminDashboardPage() {
  const [dbStatus, consultations, contacts, pages] = await Promise.all([
    getDbStatus(),
    getConsultations(),
    getContacts(),
    listPageContent(),
  ]);

  const pendingConsultations = consultations.filter(
    (item) => item.status === "Pending",
  ).length;
  const newContacts = contacts.filter((item) => item.status === "New").length;

  const stats = [
    {
      label: "Managed Pages",
      value: pages.length,
      icon: FileText,
      tone: "text-cyan-300",
    },
    {
      label: "Consultation Requests",
      value: consultations.length,
      icon: CalendarDays,
      tone: "text-emerald-300",
    },
    {
      label: "Contact Messages",
      value: contacts.length,
      icon: MessageSquareMore,
      tone: "text-amber-300",
    },
    {
      label: "Data Backend",
      value: dbStatus,
      icon: DatabaseZap,
      tone: "text-blue-300",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-500">
                  {label}
                </p>
                <p className={`mt-4 text-2xl font-black ${tone}`}>{value}</p>
              </div>
              <Icon className={`h-5 w-5 ${tone}`} />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-400">
                Content Operations
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Managed Website Pages
              </h2>
            </div>
            <Link
              href="/admin/content"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Open editor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3">
            {pages.map((page) => (
              <div
                key={page.page_key}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400">
                      {page.page_key}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {page.hero_title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">{page.title}</p>
                  </div>
                  <Link
                    href="/admin/content"
                    className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-500/40 hover:text-white"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-400">
                  Lead Queue
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Incoming Activity
                </h2>
              </div>
              <Inbox className="h-5 w-5 text-cyan-400" />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                <p className="text-sm text-emerald-200">Pending consultations</p>
                <p className="mt-2 text-3xl font-black text-white">
                  {pendingConsultations}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4">
                <p className="text-sm text-amber-200">New contact messages</p>
                <p className="mt-2 text-3xl font-black text-white">
                  {newContacts}
                </p>
              </div>

              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Review lead pipeline
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-400">
              Workflow
            </p>
            <ol className="mt-5 space-y-4 text-sm text-slate-300">
              <li>1. Update page messaging in the content editor.</li>
              <li>2. Review newly captured bookings and enquiries.</li>
              <li>3. Mark lead statuses as you qualify or close them out.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
