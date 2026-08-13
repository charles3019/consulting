import { ShieldCheck } from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { DEFAULT_ADMIN_PASSWORD, getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="glow-glow -left-16 top-20 h-80 w-80 bg-cyan-500/10" />
      <div className="glow-glow bottom-0 right-0 h-96 w-96 bg-emerald-500/10" />

      <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-4 py-1 text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            CMS Access
          </div>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Professional control panel for your site content and inbound leads.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              This admin workspace lets you update managed page copy, review
              consultation requests, and process contact enquiries from one
              clean operating console.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Editable hero and SEO content",
              "Consultation pipeline tracking",
              "Contact inbox review and cleanup",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-8">
          <div className="mb-6 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-400">
              Secure Sign In
            </p>
            <h2 className="text-2xl font-bold text-white">Administrator Login</h2>
            <p className="text-sm text-slate-400">
              Use the seeded admin account or your configured credentials.
            </p>
          </div>

          <AdminLoginForm />

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-sm text-emerald-100">
            <p className="font-semibold">Default local login</p>
            <p className="mt-1 text-emerald-200/80">
              Username: <span className="font-mono">admin</span> and password:
              {" "}
              <span className="font-mono">{DEFAULT_ADMIN_PASSWORD}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
