import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { PLAN_PRICES } from "@/lib/constants";

const freeFeatures = [
  "Post up to 2 tuitions (tutor)",
  "Save up to 5 tuitions (student)",
  "Unlimited applications",
  "Standard listing review",
];

const proFeatures = [
  "Unlimited tuition posts (tutor)",
  "Unlimited bookmarks (student)",
  "Verified Pro badge",
  "Priority listing review",
  "Priority booking & support",
];

export default function PricingPreview() {
  return (
    <section className="container-ml py-16 sm:py-20">
      <SectionHeading
        eyebrow="05 — Simple pricing"
        title="Free to start. Pro when you are ready."
        description="One honest price per role. Cancel nothing — Pro is a one-time upgrade, not a subscription trap."
        action={
          <Link
            href="/pricing"
            className={buttonClasses({ variant: "outline", size: "sm", className: "gap-1.5" })}
          >
            Compare all plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mt-9 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Free
          </p>
          <p className="mt-4 font-display text-4xl">
            $0
            <span className="ml-1 font-sans text-xs font-medium text-muted">
              forever
            </span>
          </p>
          <p className="mt-2 text-sm text-muted">
            Everything you need to try MentorLagbe.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {freeFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-fg/80">{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/sign-up"
            className={buttonClasses({ variant: "outline", className: "mt-7 w-full" })}
          >
            Get started free
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[var(--radius-card)] border-2 border-brand bg-ink p-7 text-cream">
          <div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/20 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Pro tutor
              </p>
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <p className="mt-4 font-display text-4xl">
              ${PLAN_PRICES.tutor.amount}
              <span className="ml-1 font-sans text-xs font-medium text-cream/60">
                one time
              </span>
            </p>
            <p className="mt-2 text-sm text-cream/70">
              For tutors who want to fill every batch.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-cream/85">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className={buttonClasses({ variant: "accent", className: "mt-7 w-full" })}
            >
              Upgrade as a tutor
            </Link>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-accent/40 bg-accent-soft p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a5a09] dark:text-accent">
            Pro student
          </p>
          <p className="mt-4 font-display text-4xl">
            ${PLAN_PRICES.student.amount}
            <span className="ml-1 font-sans text-xs font-medium text-muted">
              one time
            </span>
          </p>
          <p className="mt-2 text-sm text-muted">
            For students juggling several applications.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Unlimited saved tuitions",
              "Priority application review",
              "Pro student badge",
              "Early access to new batches",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-fg/80">{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/pricing"
            className={buttonClasses({ variant: "primary", className: "mt-7 w-full" })}
          >
            Upgrade as a student
          </Link>
        </div>
      </div>
    </section>
  );
}
