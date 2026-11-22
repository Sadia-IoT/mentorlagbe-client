import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", centered && "text-center")}>
        {eyebrow ? (
          <p
            className={cn(
              "flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand",
              centered && "justify-center"
            )}
          >
            <span className="h-px w-7 bg-brand/40" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-[28px] leading-[1.15] sm:text-[36px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
