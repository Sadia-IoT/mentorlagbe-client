import { cn } from "@/lib/utils";

export default function Card({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-card)] border border-line bg-surface",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
