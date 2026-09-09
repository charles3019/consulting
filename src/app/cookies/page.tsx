import Link from "next/link";
import { getStaticPageMetadata } from "@/lib/seo";
export const metadata = getStaticPageMetadata("cookies");
const sections = [
  [
    "Current website use",
    "The current application uses an essential authentication cookie for administrator sign-in. We have not identified advertising cookies, analytics integrations or tracking pixels in the application. This starter notice should be reviewed against the deployed hosting setup before final legal launch and whenever integrations change.",
  ],
  [
    "Administrator authentication",
    "The administrator session cookie (technical name: ammayu_admin_session) is set when an administrator signs in and expires after 12 hours, or is removed on sign-out. It enables access to the protected admin portal. It is HttpOnly, uses SameSite=Lax and is marked Secure in production. Public quotation and contact forms do not require administrator sign-in.",
  ],
  [
    "External links",
    "LinkedIn and WhatsApp links open external services. Those services may use their own cookies when you visit them; consult their notices for details. This website does not embed their tracking widgets.",
  ],
  [
    "Your browser choices",
    "You can manage or delete cookies through your browser settings. Blocking the essential session cookie prevents administrator sign-in from working. Any future non-essential tracking must be assessed and appropriate choices provided before it is enabled.",
  ],
  [
    "Questions",
    "Contact our team using the contact form if you have questions about this website\u2019s use of cookies. See our Privacy Policy for information about enquiries and service records.",
  ],
];
export default function Page() {
  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-9">
      <h1 className="text-4xl font-bold text-white">Cookie Policy</h1>
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
