import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import SocialLinks from "@/components/SocialLinks";
import { services } from "@/lib/services";
import { BRAND_NAME } from "@/lib/seo";
export default function Footer() {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <LogoMark compact />
            <p className="font-semibold text-white">{BRAND_NAME}</p>
            <p className="text-sm leading-relaxed text-slate-400">
              Digital technology and physical IT infrastructure for growing UK
              organisations.
            </p>
            <SocialLinks compact />
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold text-white">Services</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    className="hover:text-cyan-300"
                    href={`/services#${service.slug}`}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold text-white">Contact Our Team</h2>
            <p className="text-sm text-slate-400">
              Mon-Fri, 09:00-18:00 UK time
            </p>
            <p className="text-sm text-slate-400">
              Submit an enquiry at any time. Our team normally responds within
              one business day.
            </p>
            <Link href="/contact" className="text-sm text-cyan-300">
              Tell Us What You Need
            </Link>
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold text-white">Get a Quote</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Planning a technology project or need technical support? Tell us
              what you need and we&apos;ll provide a tailored quotation.
            </p>
            <Link
              href="/contact"
              className="inline-flex bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg px-5 py-3 font-bold text-sm"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-between gap-5 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
