import { faqs } from "@/lib/faqs";

/** Server component: plain <details> elements, no client JavaScript needed. */
export default function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="border-y border-white/5 bg-slate-950/30 py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2
          id="faq-heading"
          className="text-3xl sm:text-4xl font-bold text-white"
        >
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group glass-panel rounded-xl border border-white/10 p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="text-xl text-cyan-300 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
