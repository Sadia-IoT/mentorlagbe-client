import Link from "next/link";
import {
  BadgeCheck,
  BookmarkCheck,
  Check,
  Crown,
  Infinity as InfinityIcon,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SubscribeButton from "@/components/payments/SubscribeButton";
import { buttonClasses } from "@/components/ui/Button";
import { PLAN_PRICES } from "@/lib/constants";

export const metadata = {
  title: "Pricing & Pro Plans",
  description:
    "Compare the free and Pro plans for students and tutors on MentorLagbe.",
};

const comparison = [
  { feature: "Browse approved tuitions", free: true, pro: true },
  { feature: "Apply for tuitions", free: true, pro: true },
  { feature: "Tuition posts (tutors)", free: "Up to 2", pro: "Unlimited" },
  { feature: "Saved tuitions (students)", free: "Up to 5", pro: "Unlimited" },
  { feature: "Pro badge on your profile", free: false, pro: true },
  { feature: "Priority listing review", free: false, pro: true },
  { feature: "Priority booking & support", free: false, pro: true },
];

const faqs = [
  {
    q: "Is Pro a monthly subscription?",
    a: "No. Pro is a one-time payment that unlocks the plan on your account. There is no automatic renewal.",
  },
  {
    q: "Can I upgrade as a student and a tutor?",
    a: "Each account has one role. Students pay $10 for Pro Student and tutors pay $15 for Pro Tutor.",
  },
  {
    q: "What payment method does Stripe accept?",
    a: "Stripe Checkout accepts all major cards. This demo runs in Stripe test mode, so use a test card such as 4242 4242 4242 4242.",
  },
  {
    q: "What happens to my posts if I stay on Free?",
    a: "Nothing is removed. You can keep your two tuition posts and edit them anytime — Pro only removes the limit.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="paper-dots absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-ml relative py-12 text-center sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            One-time upgrade · no renewals
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-[36px] leading-[1.08] sm:text-[50px]">
            Start free. Go Pro when the batches start filling.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Transparent pricing for both sides of the classroom. Every payment is
            handled securely by Stripe.
          </p>
        </div>
      </section>

      <section className="container-ml -mt-2 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Free */}
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
              Free
            </p>
            <p className="mt-4 font-display text-5xl leading-none">
              $0
              <span className="ml-1 font-sans text-xs font-medium text-muted">
                forever
              </span>
            </p>
            <p className="mt-2 text-sm text-muted">
              Try the full workflow with sensible limits.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Post up to 2 tuitions",
                "Save up to 5 tuitions",
                "Unlimited applications",
                "Standard admin review",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="text-fg/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className={buttonClasses({ variant: "outline", className: "mt-7 w-full" })}
            >
              Create free account
            </Link>
          </div>

          {/* Pro Tutor */}
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border-2 border-brand bg-ink p-7 text-cream shadow-[0_30px_70px_-40px_rgba(14,124,102,0.8)]">
            <div
              className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand/25 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  Pro tutor
                </p>
                <Crown className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-4 font-display text-5xl leading-none">
                ${PLAN_PRICES.tutor.amount}
                <span className="ml-1 font-sans text-xs font-medium text-cream/60">
                  one time
                </span>
              </p>
              <p className="mt-2 text-sm text-cream/70">
                For tutors who want every batch filled.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Unlimited tuition posts",
                  "Verified Pro badge",
                  "Priority listing review",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-cream/85">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <SubscribeButton role="tutor" price={PLAN_PRICES.tutor.amount} />
              </div>
            </div>
          </div>

          {/* Pro Student */}
          <div className="rounded-[var(--radius-card)] border border-accent/50 bg-accent-soft p-7">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a5a09] dark:text-accent">
                Pro student
              </p>
              <BookmarkCheck className="h-5 w-5 text-brand" />
            </div>
            <p className="mt-4 font-display text-5xl leading-none">
              ${PLAN_PRICES.student.amount}
              <span className="ml-1 font-sans text-xs font-medium text-muted">
                one time
              </span>
            </p>
            <p className="mt-2 text-sm text-muted">
              For students comparing several batches.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Unlimited saved tuitions",
                "Priority application review",
                "Pro student badge",
                "Early access to new batches",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="text-fg/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <SubscribeButton role="student" price={PLAN_PRICES.student.amount} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-ml pb-16">
        <SectionHeading
          eyebrow="Compare"
          title="Everything, side by side"
          description="No hidden limits after checkout. Pro is applied to your account instantly."
        />

        <div className="mt-7 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-2 text-[11px] uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-4 font-semibold">Feature</th>
                <th className="px-5 py-4 text-center font-semibold">Free</th>
                <th className="px-5 py-4 text-center font-semibold text-brand">Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-t border-line">
                  <td className="px-5 py-3.5 text-fg/85">{row.feature}</td>
                  <td className="px-5 py-3.5 text-center">
                    {row.free === true ? (
                      <Check className="mx-auto h-4 w-4 text-brand" />
                    ) : row.free === false ? (
                      <X className="mx-auto h-4 w-4 text-muted/50" />
                    ) : (
                      <span className="text-xs font-medium text-muted">{row.free}</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {row.pro === true ? (
                      <Check className="mx-auto h-4 w-4 text-brand" />
                    ) : (
                      <span className="text-xs font-semibold text-brand">{row.pro}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-line bg-surface p-5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold">
                {faq.q}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-muted transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand" />
            Secured by Stripe Checkout
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-4 w-4 text-brand" />
            Instant plan activation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <InfinityIcon className="h-4 w-4 text-brand" />
            No auto-renewal
          </span>
        </div>
      </section>
    </>
  );
}
