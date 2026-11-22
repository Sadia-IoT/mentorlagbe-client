"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, TriangleAlert } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="max-w-lg rounded-[var(--radius-card)] border border-line bg-surface p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-danger-soft text-danger">
          <TriangleAlert className="h-7 w-7" />
        </span>
        <h2 className="mt-4 font-display text-2xl">This desk could not load</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Something went wrong while fetching your dashboard data. Your account is
          safe — try again, or head back to the overview.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className={buttonClasses({ className: "gap-2" })}
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className={buttonClasses({ variant: "outline" })}
          >
            Back to overview
          </Link>
        </div>
      </div>
    </div>
  );
}
