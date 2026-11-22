import { cn } from "@/lib/utils";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-line bg-surface px-6 py-14 text-center",
        className
      )}
    >
      {Icon ? (
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
          <Icon className="h-6 w-6" />
        </span>
      ) : null}
      <h3 className="font-display text-xl">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
