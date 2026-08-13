import { CircleCheckBig, PenSquare } from "lucide-react";
import { listPageContent } from "@/lib/db";
import { updatePageContentAction } from "@/app/admin/actions";

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, pages] = await Promise.all([searchParams, listPageContent()]);

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400">
              Content Studio
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Edit managed page content
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
              These entries drive the editable hero and SEO copy used across the
              site. Save any panel to publish the latest version immediately.
            </p>
          </div>
          {saved ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-200">
              <CircleCheckBig className="h-4 w-4" />
              <span>{saved} content updated</span>
            </div>
          ) : null}
        </div>
      </section>

      <div className="space-y-6">
        {pages.map((page) => (
          <form
            key={page.page_key}
            action={updatePageContentAction}
            className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"
          >
            <input type="hidden" name="page_key" value={page.page_key} />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400">
                  {page.page_key}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {page.hero_title}
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-mono uppercase tracking-[0.25em] text-slate-300">
                <PenSquare className="h-4 w-4 text-cyan-400" />
                Live editable
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                  Browser title
                </span>
                <input
                  name="title"
                  defaultValue={page.title}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                />
              </label>

              <label className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                  Keywords
                </span>
                <input
                  name="keywords"
                  defaultValue={page.keywords}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                  Hero title
                </span>
                <input
                  name="hero_title"
                  defaultValue={page.hero_title}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                />
              </label>

              <label className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                  Hero subtitle
                </span>
                <input
                  name="hero_subtitle"
                  defaultValue={page.hero_subtitle}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                Meta description
              </span>
              <textarea
                name="meta_description"
                defaultValue={page.meta_description}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
              />
            </label>

            <label className="mt-4 block space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                Body copy
              </span>
              <textarea
                name="body_text"
                defaultValue={page.body_text}
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm leading-7 text-white outline-none"
              />
            </label>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-400"
              >
                Save {page.page_key}
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
