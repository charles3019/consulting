import Link from "next/link";
import { LayoutDashboard, FilePenLine, Inbox } from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { requireAdminSession } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FilePenLine },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export default async function AdminProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await requireAdminSession();

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="glow-glow left-0 top-20 h-72 w-72 bg-cyan-500/10" />
      <div className="glow-glow bottom-10 right-10 h-96 w-96 bg-blue-500/10" />

      <header className="glass-panel rounded-[2rem] p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400">
              Admin Console
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-white">
                Ammayu CMS
              </h1>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs font-mono uppercase tracking-[0.25em] text-emerald-300">
                Signed in as {session.username}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="flex flex-wrap gap-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500/40 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
