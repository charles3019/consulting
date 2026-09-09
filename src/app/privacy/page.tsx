import Link from "next/link";
import { getStaticPageMetadata } from "@/lib/seo";
export const metadata = getStaticPageMetadata("privacy");
const sections = [
  [
    "About this notice",
    "ConnectForge IT Services uses the information you provide through contact, quotation and consultation forms to handle your request. This is a starter policy and should be reviewed before final legal launch, including confirmation of the legal data controller, contact details and operational arrangements.",
  ],
  [
    "Information we collect",
    "Forms may collect your name, email address, phone number, company, project details, postcode or location and preferred contact method. Consultation requests also include the proposed service, date and time. Please do not send passwords, payment card details or unnecessary sensitive information.",
  ],
  [
    "How we use your information",
    "We use your information to respond to enquiries, prepare quotations, deliver requested services and maintain business records. We use details necessary to take steps towards a contract at your request or perform an agreed contract. Our legitimate interests include managing business enquiries and service records; legal obligations may require certain records to be retained.",
  ],
  [
    "Storage and access",
    "Enquiries are stored in the application database or its configured file storage and are available through the protected administrator portal. Access should be limited to authorised people who need the information to handle your request. Hosting and storage arrangements, any service providers and any international transfers must be confirmed and reflected here before final launch.",
  ],
  [
    "Retention",
    "Records should be kept only as long as necessary to resolve an enquiry, deliver an agreed service and meet applicable record-keeping or dispute requirements. Retention depends on whether an enquiry becomes a project and whether records are still needed. A documented retention schedule and deletion process must be confirmed before final launch.",
  ],
  [
    "Your rights and contact",
    "Depending on the circumstances, you may ask to access or correct your information, request erasure or restriction, object to processing or request data portability. Contact our team through the contact form and identify your request as a privacy matter. You can also raise concerns with the Information Commissioner\u2019s Office at ico.org.uk. These rights may be subject to legal exceptions.",
  ],
  [
    "Other websites",
    "Links to LinkedIn and WhatsApp take you to separate services with their own privacy notices. Choosing to contact us through those services also shares information with that service. We do not automatically subscribe enquiry senders to marketing.",
  ],
];
export default function Page() {
  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-9">
      <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
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
