import Link from "next/link";
import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand-soft text-brand",
  accent: "bg-accent-soft text-[#8a5a09] dark:text-accent",
  neutral: "bg-surface-2 text-muted",
  danger: "bg-danger-soft text-danger",
};

export default function StatsCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "brand",
  href,
  className,
}) {
  const content = (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-5 transition",
        href && "hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_40px_-32px_rgba(18,33,29,0.5)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
          {label}
        </p>
        {Icon ? (
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-xl",
              tones[tone] || tones.brand
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-[34px] leading-none">{value}</p>
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
