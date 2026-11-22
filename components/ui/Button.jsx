import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand text-white shadow-[0_14px_28px_-18px_var(--brand)] hover:bg-brand-dark active:translate-y-px",
  accent:
    "bg-accent text-[#2b1d05] shadow-[0_14px_28px_-18px_var(--accent)] hover:brightness-95 active:translate-y-px",
  dark: "bg-ink text-cream hover:bg-[#1b302a] active:translate-y-px",
  outline:
    "border border-line bg-surface text-fg hover:border-brand/45 hover:bg-surface-2",
  ghost: "text-fg hover:bg-surface-2",
  subtle: "bg-brand-soft text-brand hover:brightness-95",
  danger: "bg-danger text-white hover:brightness-95 active:translate-y-px",
  link: "text-brand underline-offset-4 hover:underline",
};

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
  icon: "h-10 w-10",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
} = {}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-55",
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );
}

export default function Button({
  variant,
  size,
  className,
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
