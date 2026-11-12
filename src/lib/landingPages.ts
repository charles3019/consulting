import { BUSINESS } from "@/lib/business";

export type LandingPage = {
  path: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  price: string;
  included: string[];
  process: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedPath: string;
  relatedLabel: string;
};

const areasLine = `We work on-site in ${BUSINESS.areas}.`;

/**
 * Local service landing pages. Prices match src/lib/services.ts.
 * Only claim what is true for the business: edit freely, but keep prices in sync.
 */
export const landingPages = {
  cctv: {
    path: "/cctv-installation-chesterfield",
    label: "CCTV in Chesterfield",
    title: "CCTV Installation in Chesterfield | ConnectForge",
    description:
      "CCTV installation for shops, offices and warehouses in Chesterfield, Sheffield and Derbyshire. Site survey, written quote, remote viewing. From £199 plus equipment.",
    h1: "CCTV installation in Chesterfield and the East Midlands",
    intro: `Protect your premises with a CCTV system designed around your site. We survey the building, recommend the right cameras and recorder, install and configure everything, and set up viewing on your phone or computer. ${areasLine}`,
    price: "From £199 plus equipment",
    included: [
      "Site survey and written quote",
      "IP and analogue camera installation",
      "NVR or DVR set-up and configuration",
      "Remote viewing on phone or computer",
      "Neat cable runs and clear handover",
      "Maintenance and fault finding for existing systems",
    ],
    process: [
      { title: "Tell us what you need", text: "Call or send an enquiry with your premises type and what you want covered." },
      { title: "Survey and written quote", text: "We look at the site and give you a clear written quote before any work starts." },
      { title: "Install and configure", text: "We fit cameras and recorder, tidy the cabling and set up remote viewing." },
      { title: "Handover", text: "We show you how to view, review and export footage." },
    ],
    faqs: [
      { question: "How much does CCTV installation cost?", answer: "Installation starts from £199 plus equipment. The final price depends on the number of cameras, cable runs, recording needs and the site. You get a written quote first." },
      { question: "Can I watch my cameras from my phone?", answer: "Yes. Remote viewing is part of our CCTV service." },
      { question: "Do you work on existing CCTV systems?", answer: "Yes. We can fault-find, repair, extend and reconfigure existing systems." },
    ],
    relatedPath: "/services#network-installations",
    relatedLabel: "Network cabling and installations",
  },
  cabling: {
    path: "/network-cabling-chesterfield",
    label: "Network cabling in Chesterfield",
    title: "Network Cabling & Installations in Chesterfield | ConnectForge",
    description:
      "Structured Cat6 network cabling, data points, cabinets and switches for offices and shops in Chesterfield, Sheffield and the East Midlands. From £199.",
    h1: "Network cabling and installations in Chesterfield",
    intro: `Reliable cabling is the foundation of a fast office network. We install and tidy structured cabling, data points, patch panels, cabinets and switches, and test everything before handover. ${areasLine}`,
    price: "From £199",
    included: [
      "Cat5e, Cat6 and Cat6a structured cabling",
      "Data points and patch panels",
      "Network cabinets and cable tidy-up",
      "Switches and access point installation",
      "Cable testing and labelling",
      "Wi-Fi and slow network review",
    ],
    process: [
      { title: "Tell us what you need", text: "Share your premises, number of desks or points and any problems you have." },
      { title: "Survey and written quote", text: "We assess cable routes and equipment and quote in writing." },
      { title: "Install and test", text: "We install, label and test every run." },
      { title: "Handover", text: "You receive a clear summary of what was installed." },
    ],
    faqs: [
      { question: "How much does network cabling cost?", answer: "Structured cabling starts from £199. Price depends on the number of points, cable routes, equipment and access." },
      { question: "Can you fix a slow or unreliable office network?", answer: "Often, yes. We review Wi-Fi, routers, switches and cabling to find the cause, then recommend repairs or upgrades. Network engineering starts from £149." },
      { question: "Do you tidy messy cabinets?", answer: "Yes. We re-patch, label and tidy cabinets and comms racks." },
    ],
    relatedPath: "/services#it-support",
    relatedLabel: "IT support",
  },
  itSupport: {
    path: "/it-support-chesterfield",
    label: "IT support in Chesterfield",
    title: "IT Support for Small Business in Chesterfield | ConnectForge",
    description:
      "Remote and on-site IT support for small businesses in Chesterfield, Sheffield and the East Midlands. Plans from £49 a month or £35 an hour.",
    h1: "IT support for small businesses in Chesterfield",
    intro: `Get help when computers, email or the network let you down. We provide remote and on-site support for Windows, Microsoft 365, hardware and software problems, on a monthly plan or hourly. ${areasLine} ${BUSINESS.remoteNote}`,
    price: "From £49 a month or £35 an hour",
    included: [
      "Remote and on-site support",
      "Windows and Microsoft 365 help",
      "Hardware and software troubleshooting",
      "New device set-up and configuration",
      "Wi-Fi, printer and network problems",
      "Monthly plans or one-off hourly help",
    ],
    process: [
      { title: "Tell us the problem", text: "Call or send an enquiry. We will confirm how we can help." },
      { title: "Clear quote or plan", text: "Hourly help or a monthly plan, agreed before work starts." },
      { title: "Fix it", text: "Remotely where possible, on-site when needed." },
      { title: "Keep it running", text: "Ongoing support so small problems do not become big ones." },
    ],
    faqs: [
      { question: "Do you offer monthly IT support?", answer: "Yes. Plans start from £49 a month. One-off help is from £35 an hour." },
      { question: "Do you support Microsoft 365?", answer: "Yes. We help with set-up, email, accounts and everyday problems." },
      { question: "How quickly will you reply?", answer: `We normally respond within one business day, ${BUSINESS.hours}.` },
    ],
    relatedPath: "/services#cctv",
    relatedLabel: "CCTV installation",
  },
} satisfies Record<string, LandingPage>;
