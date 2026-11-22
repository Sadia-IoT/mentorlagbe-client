"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  ReceiptText,
  TriangleAlert,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import Spinner from "@/components/ui/Spinner";
import { buttonClasses } from "@/components/ui/Button";
import { formatUSD } from "@/lib/utils";

function VerifyPayment() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState("verifying");
  const [payment, setPayment] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      setMessage("No Stripe session id was found in the URL.");
      return undefined;
    }

    let active = true;

    apiFetch(`/payments/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((result) => {
        if (!active) return;
        setPayment(result.payment || null);
        setState("success");
      })
      .catch((error) => {
        if (!active) return;
        setMessage(error.message || "We could not verify this payment.");
        setState(error.status === 402 ? "pending" : "error");
      });

    return () => {
      active = false;
    };
  }, [sessionId]);

  if (state === "verifying") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center">
        <Spinner className="h-8 w-8" />
        <h1 className="mt-5 font-display text-2xl">Confirming your payment…</h1>
        <p className="mt-2 text-sm text-muted">
          Stripe is confirming the transaction and activating your Pro plan.
        </p>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_30px_70px_-50px_rgba(18,33,29,0.6)]">
        <div className="relative bg-brand px-6 py-8 text-center text-white">
          <div className="paper-dots absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/15">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
              Payment successful
            </p>
            <h1 className="mt-2 font-display text-3xl">Welcome to Pro</h1>
          </div>
        </div>

        <div className="border-b border-dashed border-line px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Plan
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-display text-xl">
                <Crown className="h-4 w-4 text-accent" />
                {payment?.planName || "Pro plan"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Amount
              </p>
              <p className="mt-1 font-display text-xl">
                {formatUSD(payment?.amount || 0)}
              </p>
            </div>
          </div>

          {payment?.transactionId ? (
            <p className="mt-4 flex items-center gap-1.5 truncate text-xs text-muted">
              <ReceiptText className="h-3.5 w-3.5" />
              {payment.transactionId}
            </p>
          ) : null}
        </div>

        <div className="px-6 py-6">
          <p className="text-sm leading-relaxed text-muted">
            Your account is now on the Pro plan. The upgrade is already visible in
            your dashboard — no refresh needed.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/dashboard"
              className={buttonClasses({ className: "flex-1" })}
            >
              Go to dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tuitions"
              className={buttonClasses({ variant: "outline", className: "flex-1" })}
            >
              Browse tuitions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-danger-soft text-danger">
        <TriangleAlert className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-display text-2xl">
        {state === "pending" ? "Payment not confirmed yet" : "We could not verify this payment"}
      </h1>
      <p className="mt-2 text-sm text-muted">{message}</p>
      <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
        <Link href="/pricing" className={buttonClasses({ className: "sm:w-auto" })}>
          Back to pricing
        </Link>
        <Link
          href="/dashboard"
          className={buttonClasses({ variant: "outline", className: "sm:w-auto" })}
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <section className="container-ml max-w-2xl py-14">
      <Suspense
        fallback={
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center">
            <Spinner className="h-8 w-8" />
            <p className="mt-4 text-sm text-muted">Loading payment status…</p>
          </div>
        }
      >
        <VerifyPayment />
      </Suspense>
    </section>
  );
}
