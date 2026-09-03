import React from "react";

type LogoMarkProps = {
  compact?: boolean;
};

export default function LogoMark({ compact = false }: LogoMarkProps) {
  return (
    <img
      src="/connectforge-logo.svg"
      alt="ConnectForge IT Services"
      className={`object-contain ${compact ? "h-10 w-10 rounded-lg" : "h-32 w-32 rounded-[1.75rem] sm:h-40 sm:w-40"}`}
    />
  );
}
