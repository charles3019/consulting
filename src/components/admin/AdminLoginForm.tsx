'use client'

import { useActionState } from "react";
import { LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { loginAdmin, type LoginActionState } from "@/app/admin/actions";

const initialState: LoginActionState = { error: null };

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400"
        >
          Username
        </label>
        <div className="flex items-center rounded-xl border border-white/10 bg-slate-950/70 px-3">
          <UserRound className="h-4 w-4 text-cyan-400" />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none"
            placeholder="admin"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400"
        >
          Password
        </label>
        <div className="flex items-center rounded-xl border border-white/10 bg-slate-950/70 px-3">
          <LockKeyhole className="h-4 w-4 text-cyan-400" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      {state.error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        <span>{pending ? "Authenticating..." : "Enter CMS"}</span>
      </button>
    </form>
  );
}
