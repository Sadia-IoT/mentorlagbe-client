import { cn } from "@/lib/utils";

export default function Spinner({ className, label = "Loading" }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-brand/25 border-t-brand",
        className
      )}
    />
  );
}
