import React from "react";
import Image from "next/image";

type LogoMarkProps = {
  compact?: boolean;
};

export default function LogoMark({ compact = false }: LogoMarkProps) {
  return (
    <Image
      src="/connectforge-logo.png"
      alt="ConnectForge Technologies Ltd"
      width={208}
      height={160}
      sizes={compact ? "128px" : "(min-width: 640px) 208px, 160px"}
      className={`rounded-xl bg-white object-contain p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${compact ? "h-10 w-32" : "h-32 w-40 sm:h-40 sm:w-52"}`}
    />
  );
}
