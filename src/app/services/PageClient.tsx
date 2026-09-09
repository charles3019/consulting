import type { PageContent } from "@/lib/contentDefaults";
import ServiceCards from "@/components/ServiceCards";
import Link from "next/link";
export default function Services({
  pageContent,
}: {
  page_content_json: Pick<
    typeof import("@/data/db_fallback.json"),
    "page_content_service"
  >;
  pageContent: PageContent;
}) {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      <div className="max-w-3xl space-y-5">
        <p className="text-cyan-400 text-sm font-semibold">Our Services</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white">
          {pageContent.hero_title}
        </h1>
        <p className="text-slate-300 leading-relaxed">
          {pageContent.body_text}
        </p>
      </div>
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white">
          Services &amp; Starting Prices
        </h2>
        <ServiceCards pricing />
      </section>
      <section className="glass-panel p-8 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Local delivery. UK-wide support.
        </h2>
        <p className="text-slate-300 leading-relaxed">
          Tell us your location and requirements. We will confirm on-site
          coverage, travel, equipment, materials and the full scope in your
          quotation. Remote services are available across the UK.
        </p>
        <Link
          href="/contact"
          className="inline-flex bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg px-6 py-3 font-bold"
        >
          Get a Free Quote
        </Link>
        <p className="text-sm text-slate-400">
          For larger projects, you can also{" "}
          <Link href="/book-consultation" className="text-cyan-300 underline">
            request a consultation
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
