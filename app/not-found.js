import Link from "next/link";
import { ArrowLeft, Compass, Search } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { buttonClasses } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-16">
      <div className="paper-dots absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl text-center">
        <div className="flex justify-center">
          <Logo />
        </div>

        <p className="mt-10 font-display text-[110px] leading-none text-line sm:text-[150px]">
          404
        </p>
        <p className="-mt-4 text-[11px] font-bold uppercase tracking-[0.28em] text-brand">
          Page not found
        </p>

        <h1 className="mx-auto mt-4 max-w-md text-[30px] leading-tight sm:text-[38px]">
          This page slipped out of the register.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          The link may be old, the batch may have closed, or the address has a
          typo. Everything else is still exactly where you left it.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/" className={buttonClasses({ className: "gap-2" })}>
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/tuitions"
            className={buttonClasses({ variant: "outline", className: "gap-2" })}
          >
            <Search className="h-4 w-4" />
            Browse tuitions
          </Link>
          <Link
            href="/about"
            className={buttonClasses({ variant: "ghost", className: "gap-2" })}
          >
            <Compass className="h-4 w-4" />
            How it works
          </Link>
        </div>
      </div>
    </main>
  );
}
