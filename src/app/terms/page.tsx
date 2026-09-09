import Link from "next/link";
import { getStaticPageMetadata } from "@/lib/seo";
export const metadata = getStaticPageMetadata("terms");
const sections = [
  [
    "About these terms",
    "These are starter terms for ConnectForge IT Services and should be reviewed before final legal launch. Your written quotation and agreed scope will set out the terms for your particular project. Submitting an enquiry does not book work or create a payment obligation.",
  ],
  [
    "Quotations and scope",
    "Advertised prices are starting prices. We will confirm the scope, assumptions, exclusions, estimated schedule and quotation validity in writing. Work starts once the scope and commercial terms are agreed. Changes to requirements may need an updated quotation and schedule.",
  ],
  [
    "Payment",
    "Payment dates, deposits, any applicable taxes and accepted payment methods will be confirmed in your quotation before you agree to proceed. Please raise invoice queries promptly so we can resolve them together.",
  ],
  [
    "Equipment and materials",
    "Your quotation will identify equipment, materials, licences and travel charges included or excluded. Availability and suitability may affect the schedule. Ownership, warranties and any ongoing third-party subscriptions will be explained where applicable.",
  ],
  [
    "Cancellations and rescheduling",
    "Please contact us as soon as possible if plans change. Any cancellation terms or reasonable costs for work already completed or specifically ordered items will be agreed in writing, subject to applicable rights. We will discuss rescheduling where practical.",
  ],
  [
    "Customer responsibilities",
    "Please provide accurate requirements, authorised access and a suitable, safe working environment. Agree backup and recovery responsibilities before changes to existing systems. Customers commissioning CCTV must consider appropriate permissions and their responsibilities for lawful operation and signage.",
  ],
  [
    "Care and responsibility",
    "We aim to perform agreed services with reasonable care and skill. The scope, dependencies and practical risks will be discussed before work starts. Nothing in these starter terms excludes rights or liabilities that cannot lawfully be excluded. Any project-specific limitations require a separate, appropriate agreement.",
  ],
  [
    "Support and maintenance",
    "Ongoing support, response arrangements, maintenance, monitoring and updates are included only where specified in your quotation or support agreement. A project quotation does not imply unlimited support or guaranteed availability.",
  ],
  [
    "Intellectual property",
    "Ownership and permitted use of custom work will be set out in the project agreement. Existing tools and third-party or open-source software remain subject to their respective ownership and licence terms.",
  ],
  [
    "Contact",
    "Use our contact form for quotation questions, support requests or concerns about agreed work. Our team will review your message and discuss the next steps.",
  ],
];
export default function Page() {
  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-9">
      <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
      <p className="text-sm text-cyan-300">
        Starter policy - review before final legal launch
      </p>
      {sections.map(([title, body]) => (
        <section key={title} className="space-y-3">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-slate-300 leading-relaxed">{body}</p>
        </section>
      ))}
      <p className="text-sm text-slate-300">
        <Link className="text-cyan-300 underline" href="/contact">
          Contact Our Team
        </Link>{" "}
        &middot;{" "}
        <Link className="text-cyan-300 underline" href="/privacy">
          Privacy Policy
        </Link>
      </p>
    </article>
  );
}
