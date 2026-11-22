import Link from "next/link";
import { GraduationCap, Search, Send, UserPlus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your account",
    text: "Sign up as a student looking for guidance, or as a tutor ready to share what you know.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse or post",
    text: "Filter batches by subject, class level, mode and budget — or publish your own tuition post.",
  },
  {
    number: "03",
    icon: Send,
    title: "Apply or approve",
    text: "Students send a short application. Tutors review the note and accept the right fit.",
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "Start learning",
    text: "Attend classes, track progress in your dashboard and leave a review when the batch ends.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-line bg-surface">
      <div className="container-ml py-16 sm:py-20">
        <SectionHeading
          eyebrow="02 — How it works"
          title="Four calm steps from search to first class"
          description="No endless phone calls or unclear fees. MentorLagbe keeps the whole tuition workflow in one place."
          action={
            <Link
              href="/about"
              className={buttonClasses({ variant: "ghost", size: "sm" })}
            >
              Read the full story
            </Link>
          }
        />

        <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-9 hidden border-t border-dashed border-line lg:block"
            aria-hidden="true"
          />
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex items-center gap-3">
                <span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-2xl border border-line bg-bg text-brand shadow-sm">
                  <step.icon className="h-7 w-7" />
                </span>
                <span className="font-display text-4xl text-line">{step.number}</span>
              </div>
              <h3 className="mt-5 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
