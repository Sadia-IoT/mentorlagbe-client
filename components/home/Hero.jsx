import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import Photo from "@/components/ui/Photo";
import { buttonClasses } from "@/components/ui/Button";
import HeroSearch from "./HeroSearch";
import { formatBDT } from "@/lib/utils";

export default function Hero({ stats, subjects }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="paper-dots absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-ml relative grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
            Tuition &amp; mentorship · Bangladesh
          </p>

          <h1 className="mt-5 text-[40px] leading-[1.04] sm:text-[54px] lg:text-[62px]">
            Find the mentor
            <br className="hidden sm:block" /> who makes it{" "}
            <span className="font-medium italic text-brand">click</span>.
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            Verified tutors for Math, Physics, English, IELTS and programming —
            online or at home. Compare real batches, read student reviews and
            apply in under a minute.
          </p>

          <HeroSearch subjects={subjects} />

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-medium text-muted">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand" />
              Admin-verified listings
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-brand" />
              {stats?.tutors || 6}+ verified tutors
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {(stats?.averageRating || 4.8).toFixed?.(1) || "4.8"} average rating
            </span>
          </div>
        </div>

        {/* Editorial collage */}
        <div className="relative mx-auto hidden w-full max-w-[520px] lg:block">
          <div className="tape relative ml-6 rotate-[-2deg] overflow-hidden rounded-[26px] border-2 border-ink/10 bg-surface shadow-[0_40px_80px_-40px_rgba(18,33,29,0.55)]">
            <Photo
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80"
              alt="Students studying together with a mentor"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-16 text-cream">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Batch spotlight
              </p>
              <p className="mt-1 font-display text-xl leading-tight">
                HSC Physics, Dhanmondi
              </p>
            </div>
          </div>

          <div className="absolute -right-2 top-10 w-[220px] rotate-[3deg] rounded-2xl border border-line bg-surface p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                Tuition pass
              </span>
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <p className="mt-2 font-display text-[15px] leading-snug">
              Organic Chemistry for Admission
            </p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-[11px] text-muted">2 days / week</span>
              <span className="font-display text-lg">{formatBDT(4000)}</span>
            </div>
            <div className="mt-2 border-t border-dashed border-line pt-2 text-[10px] font-semibold uppercase tracking-wider text-brand">
              Approved ✓
            </div>
          </div>

          <div className="absolute -bottom-4 left-0 w-[190px] rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-surface shadow-xl">
            <Photo
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&q=80"
              alt="Student taking notes"
              className="aspect-square"
            />
          </div>

          <div className="absolute -bottom-2 right-4 grid h-24 w-24 animate-floaty place-items-center rounded-full border-4 border-surface bg-accent text-center shadow-lg">
            <div>
              <p className="font-display text-2xl leading-none">{stats?.tuitions || 12}</p>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4a3208]">
                live batches
              </p>
            </div>
          </div>

          <span className="absolute right-8 top-2 inline-flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1 text-[10px] font-semibold text-muted shadow-sm">
            <BadgeCheck className="h-3.5 w-3.5 text-brand" />
            Verified
          </span>
        </div>
      </div>

      <div className="container-ml relative flex flex-wrap items-center justify-between gap-4 border-t border-line py-4 text-xs text-muted">
        <p className="font-semibold uppercase tracking-[0.18em]">
          Popular right now
        </p>
        <div className="flex flex-wrap gap-2">
          {["Mathematics", "Physics", "IELTS", "Programming", "Chemistry"].map(
            (subject) => (
              <Link
                key={subject}
                href={`/tuitions?subject=${encodeURIComponent(subject)}`}
                className="rounded-full border border-line bg-surface px-3 py-1 font-medium transition hover:border-brand/40 hover:text-brand"
              >
                {subject}
              </Link>
            )
          )}
        </div>
        <Link
          href="/tuitions"
          className={buttonClasses({ variant: "ghost", size: "sm", className: "gap-1" })}
        >
          Explore all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
