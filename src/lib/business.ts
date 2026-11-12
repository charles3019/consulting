/**
 * Shared business contact details. Keep these in one place so the header,
 * footer, contact page, structured data and FAQs always agree.
 *
 * The phone number matches the WhatsApp number in src/lib/social.ts.
 * No street address is published (the business is run from home); only the
 * areas served are shown.
 */
export const BUSINESS = {
  phoneDisplay: "07950 410482",
  phoneHref: "tel:+447950410482",
  phoneE164: "+447950410482",
  hours: "Mon–Fri, 09:00–18:00 UK time",
  areas:
    "Chesterfield, Sheffield, Derbyshire, Yorkshire, Nottingham and the East Midlands",
  areaList: [
    "Chesterfield",
    "Sheffield",
    "Derbyshire",
    "Yorkshire",
    "Nottingham",
    "East Midlands",
  ],
  remoteNote: "Remote IT support is available across the UK.",
} as const;
