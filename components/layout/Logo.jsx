import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className, href = "/", onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="MentorLagbe home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-brand text-white shadow-[0_8px_18px_-10px_var(--brand)] transition group-hover:-rotate-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M2.8 8.4 12 3.8l9.2 4.6L12 13 2.8 8.4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M6.6 10.6v5.2c0 1.5 2.4 2.7 5.4 2.7s5.4-1.2 5.4-2.7v-5.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M21.2 8.4v5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-display text-[22px] font-semibold leading-none tracking-tight text-fg">
        Mentor<span className="text-brand">Lagbe</span>
      </span>
    </Link>
  );
}
