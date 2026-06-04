import Link from "next/link";
import { cn } from "../lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "primaryBlack"
  | "secondarywhite"
  | "secondarytrnsparentWhiteBorder";

type ButtonProps = {
  children: React.ReactNode;
  href?: string; 
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-[31px] px-5 py-3 cursor-pointer text-sm font-semibold leading-[140%] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  // 1️⃣ Primary (teal)
  primary:
    "bg-[#13A89E] text-white hover:bg-[#13A89E] focus-visible:ring-[#13A89E]",

  // 2️⃣ Secondary (transparent + white border)
  secondary:
    "border border-white/20 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white",

  // 3️⃣ Primary Black
  primaryBlack:
    "bg-[#162A4A] text-white hover:bg-neutral-800 focus-visible:ring-black",

  // 4️⃣ Secondary White Border
  secondarytrnsparentWhiteBorder:
    "border border-[#020210]/10 text-[#020210] bg-transparent hover:bg-transparent hover:text-black focus-visible:ring-white",

  // 5️⃣ White Button
  secondarywhite:
    "bg-white text-[#162A4A] hover:bg-neutral-200 focus-visible:ring-white",
};

export function ButtonComponent({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  ariaLabel,
  disabled,
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], className);

  // 👉 Link button (SEO-friendly, crawlable)
  if (href && !disabled) {
    const external = /^https?:\/\//i.test(href);
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  // 👉 Native button (forms, actions)
  return (
    <Link
      className={classes}
      aria-label={ariaLabel}
      href={href || ""}
    >
      {children}
    </Link>
  );
}