import Link from "next/link";

type SocialLink = {
  name: string;
  href: string;
  icon: "whatsapp" | "linkedin";
};

const socialLinks: SocialLink[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/charles-agyemang-311020109/", icon: "linkedin" },
  { name: "WhatsApp", href: "https://wa.me/447950410482", icon: "whatsapp" },
];

function SocialIcon({ type }: { type: SocialLink["icon"] }) {
  if (type === "whatsapp") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.2A9.5 9.5 0 1 0 12 2.5Zm0 17.3c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.8.7.7-2.7-.2-.3A7.1 7.1 0 1 1 12 19.8Zm3.9-5.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-1.8-.9-3-2.5-3.2-2.8-.2-.3 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5 0 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z" /></svg>;
  }

  if (type === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.4 9.4h3.6V21H3.4V9.4Zm5.8 0h3.4V11c.5-1 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-3.6v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9.2V9.4Z" /></svg>;
  }

  return null;
}

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ConnectForge on ${social.name}`}
          title={social.name}
          className={`flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:text-cyan-300 ${compact ? "h-9 w-9" : "h-12 w-12"}`}
        >
          <SocialIcon type={social.icon} />
        </Link>
      ))}
    </div>
  );
}
