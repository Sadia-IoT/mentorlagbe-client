"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, TriangleAlert } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-bg px-4 py-16">
      <div className="paper-dots absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative w-full max-w-xl rounded-[var(--radius-card)] border border-line bg-surface p-8 text-center shadow-[0_30px_70px_-50px_rgba(18,33,29,0.6)] sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-danger-soft text-danger">
          <TriangleAlert className="h-8 w-8" />
        </span>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          Something broke
        </p>
        <h1 className="mt-2 font-display text-3xl">We could not load this page</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          A network or server error interrupted the page. Try again — if it keeps
          happening, the API server may be offline.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className={buttonClasses({ className: "gap-2" })}
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </button>
          <Link href="/" className={buttonClasses({ variant: "outline" })}>
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
