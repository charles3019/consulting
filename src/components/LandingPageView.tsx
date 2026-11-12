import Link from "next/link";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { SITE_URL } from "@/lib/seo";
import type { LandingPage } from "@/lib/landingPages";

export default function LandingPageView({ page }: { page: LandingPage }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    url: new URL(page.path, SITE_URL).href,
    provider: { "@type": "Organization", name: "ConnectForge IT Services", url: SITE_URL },
    areaServed: BUSINESS.areaList.map((name) => ({ "@type": "Place", name })),
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <header className="space-y-5">
          <h1 className="text-3xl sm:text-5xl font-bold text-white">{page.h1}</h1>
          <p className="text-lg text-slate-300 leading-relaxed">{page.intro}</p>
          <p className="text-cyan-300 font-semibold">{page.price}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black hover:bg-cyan-400"
            >
              Get a free quote
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 px-6 py-3 font-semibold text-cyan-300 hover:bg-cyan-950/30"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </header>

        <section aria-labelledby="included" className="space-y-4">
          <h2 id="included" className="text-2xl sm:text-3xl font-bold text-white">What is included</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.included.map((item) => (
              <li key={item} className="glass-panel rounded-xl border border-white/10 p-4 text-slate-200">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how" className="space-y-4">
          <h2 id="how" className="text-2xl sm:text-3xl font-bold text-white">How it works</h2>
          <ol className="space-y-3">
            {page.process.map((step, i) => (
              <li key={step.title} className="glass-panel rounded-xl border border-white/10 p-5">
                <p className="font-semibold text-white">{i + 1}. {step.title}</p>
                <p className="mt-1 text-sm text-slate-300">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-slate-400">
            Prices are starting prices. The final price depends on requirements, equipment, materials, travel and complexity.
          </p>
        </section>

        <section aria-labelledby="faq" className="space-y-4">
          <h2 id="faq" className="text-2xl sm:text-3xl font-bold text-white">Questions</h2>
          {page.faqs.map((f) => (
            <details key={f.question} className="group glass-panel rounded-xl border border-white/10 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                <span>{f.question}</span>
                <span aria-hidden="true" className="text-xl text-cyan-300 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.answer}</p>
            </details>
          ))}
        </section>

        <p className="text-slate-300">
          Also see:{" "}
          <Link href={page.relatedPath} className="text-cyan-300 font-semibold">{page.relatedLabel}</Link>
          {" "}or all{" "}
          <Link href="/services" className="text-cyan-300 font-semibold">services</Link>.
        </p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </div>
  );
}
