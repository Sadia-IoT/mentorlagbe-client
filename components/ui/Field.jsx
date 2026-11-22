import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const controlClasses =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/70 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10 disabled:opacity-60";

export function Field({ label, hint, error, required, htmlFor, children, className }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="flex items-center gap-1 text-[13px] font-semibold text-fg"
        >
          {label}
          {required ? <span className="text-danger">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="text-xs font-medium text-danger">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }) {
  return <input className={cn(controlClasses, className)} {...props} />;
}

export function Textarea({ className, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(controlClasses, "resize-y", className)}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(controlClasses, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}
