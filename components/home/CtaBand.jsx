import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export default function CtaBand() {
  return (
    <section className="container-ml pb-4 pt-2">
      <div className="relative overflow-hidden rounded-[28px] border border-brand-dark bg-brand px-6 py-12 text-white sm:px-12">
        <div
          className="paper-dots absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div
          className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 right-24 h-52 w-52 rounded-full bg-accent/25 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              For tutors
            </p>
            <h2 className="mt-3 text-[30px] leading-tight text-white sm:text-[38px]">
              Ready to teach what you love?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Publish your batch, receive real applications and manage every
              student from one dashboard. Your first two posts are free.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up?role=tutor"
              className={buttonClasses({ variant: "accent", size: "lg", className: "gap-2" })}
            >
              <PenLine className="h-4 w-4" />
              Post a tuition
            </Link>
            <Link
              href="/tuitions"
              className={buttonClasses({
                size: "lg",
                className:
                  "border border-white/30 bg-white/10 text-white hover:bg-white/20",
              })}
            >
              Browse tuitions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
