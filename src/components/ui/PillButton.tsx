import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { isStaticAssetHref } from "@/lib/isStaticAssetHref";

type PillButtonProps = {
  variant?: "primary" | "secondary" | "highlight";
  /** Parent section background — controls default colors + hover */
  tone?: "dark" | "light";
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const toneStyles = {
  dark: {
    primary:
      "bg-white text-ink border border-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.18)] hover:bg-light-blue hover:text-white hover:border-light-blue hover:shadow-[0_14px_40px_rgba(21,56,176,0.4)]",
    secondary:
      "bg-transparent text-white border border-white/35 hover:bg-white hover:text-ink hover:border-white hover:shadow-[0_10px_32px_rgba(255,255,255,0.12)]",
    highlight:
      "bg-accent text-ink border border-accent shadow-[0_8px_28px_rgba(255,207,0,0.22)] hover:bg-white hover:text-ink hover:border-white hover:shadow-[0_12px_36px_rgba(255,255,255,0.18)]",
  },
  light: {
    primary:
      "bg-electric-blue text-white border border-electric-blue shadow-[0_8px_28px_rgba(30,68,226,0.28)] hover:bg-light-blue hover:border-light-blue hover:shadow-[0_14px_40px_rgba(21,56,176,0.35)]",
    secondary:
      "bg-transparent text-ink border border-ink/18 hover:bg-ink-deep hover:text-white hover:border-ink-deep hover:shadow-[0_10px_32px_rgba(4,7,13,0.14)]",
    highlight:
      "bg-accent text-ink border border-accent shadow-[0_8px_28px_rgba(255,207,0,0.2)] hover:bg-ink-deep hover:text-white hover:border-ink-deep hover:shadow-[0_12px_36px_rgba(4,7,13,0.22)]",
  },
} as const;

export function PillButton({
  variant = "primary",
  tone = "dark",
  href,
  children,
  className = "",
  onClick,
  ...props
}: PillButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out";

  const classes = `${base} ${toneStyles[tone][variant]} ${className}`;

  if (href) {
    if (isStaticAssetHref(href)) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          target={href.endsWith(".pdf") ? "_blank" : undefined}
          rel={href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
