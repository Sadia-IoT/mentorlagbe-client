import { cn } from "@/lib/utils";
import { statusTone, titleCase } from "@/lib/utils";

const tones = {
  success: "border-brand/25 bg-brand-soft text-brand",
  warning:
    "border-accent/35 bg-accent-soft text-[#8a5a09] dark:text-accent",
  danger: "border-danger/25 bg-danger-soft text-danger",
  neutral: "border-line bg-surface-2 text-muted",
  ink: "border-ink bg-ink text-cream",
  brand: "border-brand bg-brand text-white",
};

export default function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        tones[tone] || tones.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  return <Badge tone={statusTone(status)}>{titleCase(status || "unknown")}</Badge>;
}

export function RoleBadge({ role = "student", className }) {
  const label =
    role === "admin" ? "Admin" : role === "tutor" ? "Tutor" : "Student";
  return (
    <Badge
      tone={role === "admin" ? "ink" : role === "tutor" ? "brand" : "neutral"}
      className={cn("px-2 py-0.5 text-[10px]", className)}
    >
      {label}
    </Badge>
  );
}
