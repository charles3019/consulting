import { BUSINESS } from "@/lib/business";

export type Faq = { question: string; answer: string };

/**
 * Questions local businesses commonly ask. Every price here matches
 * src/lib/services.ts; keep them in sync if prices change.
 */
export const faqs: Faq[] = [
  {
    question: "How much does CCTV installation cost?",
    answer:
      "CCTV installation starts from £199 plus equipment. The final price depends on the number of cameras, cable runs, recording needs and the complexity of the site. Contact us for a free, no-obligation quote.",
  },
  {
    question: "Can I view my cameras on my phone?",
    answer:
      "Yes. Remote viewing is part of our CCTV service, so once the system is set up you can check your premises from a phone or computer.",
  },
  {
    question: "Do you offer monthly IT support?",
    answer:
      "Yes. IT support starts from £49 a month, or £35 an hour for one-off help. We support Windows, Microsoft 365 and hardware and software problems, remotely and on-site.",
  },
  {
    question: "Which areas do you cover?",
    answer: `We work on-site in ${BUSINESS.areas}. We will confirm on-site coverage for your postcode when you get in touch. ${BUSINESS.remoteNote}`,
  },
  {
    question: "How quickly will you reply?",
    answer: `We normally respond within one business day, ${BUSINESS.hours}. You can also call ${BUSINESS.phoneDisplay} or message us on WhatsApp.`,
  },
  {
    question: "Do I get a quote before work starts?",
    answer:
      "Yes. Tell us what you need and we will provide a free, no-obligation quote. Prices on this site are starting prices; the final price depends on requirements, equipment, materials, travel and installation complexity.",
  },
  {
    question: "Can you improve a slow or unreliable office network?",
    answer:
      "Often, yes. We review your Wi-Fi, routers, switches and cabling to find what is causing the problem, then recommend repairs or upgrades. Network engineering starts from £149 and structured cabling from £199.",
  },
  {
    question: "Do you build websites and applications as well?",
    answer:
      "Yes. Website solutions start from £199 and application development from £399, quoted to your requirements.",
  },
];
