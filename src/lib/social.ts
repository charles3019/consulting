export type SocialLink = {
  name: string;
  href: string;
  icon: "whatsapp" | "linkedin";
};

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/charles-agyemang-311020109/",
    icon: "linkedin",
  },
  { name: "WhatsApp", href: "https://wa.me/447950410482", icon: "whatsapp" },
];
