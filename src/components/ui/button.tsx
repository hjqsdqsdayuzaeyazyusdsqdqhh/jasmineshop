import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "gold";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "btn group/button inline-flex items-center justify-center gap-2.5 rounded-full whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-wine-800 text-ivory-50 shadow-[0_14px_30px_-18px_rgba(82,16,37,0.65)] hover:bg-wine-900",
  outline:
    "border border-wine-800/25 bg-transparent text-wine-900 hover:border-wine-800 hover:bg-wine-50",
  gold: "bg-gold-400 text-wine-950 shadow-[0_14px_30px_-18px_rgba(198,161,91,0.55)] hover:bg-gold-300",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-[0.6875rem]",
  md: "h-12 px-6 text-[0.72rem]",
  lg: "h-[3.4rem] px-8 text-[0.76rem]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
  fullWidth,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  iconLeft,
  iconRight,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className, fullWidth })}
      {...props}
    >
      {iconLeft ? <span className="shrink-0">{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className="shrink-0">{iconRight}</span> : null}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant,
  size,
  fullWidth,
  className,
  iconLeft,
  iconRight,
  external,
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className, fullWidth });
  const content = (
    <>
      {iconLeft ? <span className="shrink-0">{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className="shrink-0">{iconRight}</span> : null}
    </>
  );

  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
