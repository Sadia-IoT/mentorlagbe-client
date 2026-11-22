import Link from "next/link";
import {
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Photo from "@/components/ui/Photo";
import SectionHeading from "@/components/ui/SectionHeading";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBand from "@/components/home/CtaBand";
import { buttonClasses } from "@/components/ui/Button";

export const metadata = {
  title: "About & How It Works",
  description:
    "Why MentorLagbe exists, how tuition moderation works and what students and tutors get from the platform.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Verified before visible",
    text: "Every tuition post passes an admin review. Pending and rejected listings never reach the public browse page.",
  },
  {
    icon: HeartHandshake,
    title: "One clear conversation",
    text: "Students apply with their schedule and learning goal. Tutors accept or decline with a single click — no lost messages.",
  },
  {
    icon: Sparkles,
    title: "Fair for both sides",
    text: "Free accounts are genuinely useful. Pro exists for people who need unlimited posts, bookmarks and priority review.",
  },
];

const faqs = [
  {
    q: "Who can post a tuition?",
    a: "Any account registered with the tutor role. Free tutors can publish up to two tuitions; Pro tutors can publish unlimited batches.",
  },
  {
    q: "How are listings approved?",
    a: "New and edited listings enter a pending queue. An admin reviews the title, fee, schedule and description, then approves or rejects it.",
  },
  {
    q: "Can I apply to the same tuition twice?",
    a: "No. The platform blocks duplicate applications from the same student to the same tuition, both in the API and with a unique database index.",
  },
  {
    q: "Can tutors and admins apply for tuitions?",
    a: "No. The apply form is restricted to student accounts. Tutors and admins see a clear notice instead of the button.",
  },
  {
    q: "When can a student leave a review?",
    a: "Only after the tutor accepts their application. Each accepted student can submit one 1–5 star rating with written feedback.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="paper-dots absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-ml relative grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-7 bg-brand/40" />
              About MentorLagbe
            </p>
            <h1 className="mt-4 max-w-2xl text-[38px] leading-[1.06] sm:text-[52px]">
              Built for the way students{" "}
              <span className="highlight italic text-brand">actually</span> learn.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              Finding a tutor in Bangladesh usually means a dozen phone calls,
              screenshots of fees and uncertain schedules. MentorLagbe turns that
              into a calm, searchable marketplace where every listing is checked
              before it goes live.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/tuitions" className={buttonClasses({ size: "lg" })}>
                Browse tuitions
              </Link>
              <Link
                href="/sign-up?role=tutor"
                className={buttonClasses({ variant: "outline", size: "lg" })}
              >
                Become a tutor
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="tape relative rotate-[1.5deg] overflow-hidden rounded-[26px] border-2 border-ink/10 shadow-2xl">
              <Photo
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80"
                alt="A classroom of students learning together"
                className="aspect-[5/4] w-full"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 w-[210px] rotate-[-3deg] rounded-2xl border border-line bg-surface p-4 shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Platform promise
              </p>
              <p className="mt-2 font-display text-lg leading-snug">
                No listing goes live without a human check.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-ml py-16 sm:py-20">
        <SectionHeading
          eyebrow="01 — Why we exist"
          title="Tuition should feel organised, not overwhelming"
          description="MentorLagbe is a full-stack tuition management platform. Students search and apply; tutors publish and decide; admins moderate and track revenue."
        />

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-[var(--radius-card)] border border-line bg-surface p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <value.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />

      <section className="container-ml py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="02 — Questions"
              title="The things people ask first"
              description="Still unsure? Join a support session from your dashboard and we will walk through it together."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">
                <BadgeCheck className="h-4 w-4 text-brand" />
                4 collections
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">
                <Users className="h-4 w-4 text-brand" />
                3 roles
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">
                <ShieldCheck className="h-4 w-4 text-brand" />
                JWT protected APIs
              </span>
            </div>
          </div>

          <div className="space-y-3">
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
        </div>
      </section>

      <CtaBand />
    </>
  );
}
