import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";

export default function AdminLogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500/40 hover:text-white"
      >
        <LogOut className="h-4 w-4 text-cyan-400" />
        <span>Log Out</span>
      </button>
    </form>
  );
}
