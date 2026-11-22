import Link from "next/link";
import { ArrowLeft, CircleSlash, RefreshCcw } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export const metadata = { title: "Payment cancelled" };

export default function PaymentCancelPage() {
  return (
    <section className="container-ml max-w-2xl py-16">
      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8 text-center sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-danger-soft text-danger">
          <CircleSlash className="h-8 w-8" />
        </span>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          Checkout cancelled
        </p>
        <h1 className="mt-2 font-display text-3xl">No payment was taken</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          You closed Stripe Checkout before finishing. Your account is still on the
          same plan and nothing was charged.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/pricing" className={buttonClasses({ className: "gap-2" })}>
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Link>
          <Link
            href="/dashboard"
            className={buttonClasses({ variant: "outline", className: "gap-2" })}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
