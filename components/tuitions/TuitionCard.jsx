import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CalendarDays, MapPin, Users } from "lucide-react";
import Photo from "@/components/ui/Photo";
import { buttonClasses } from "@/components/ui/Button";
import { cn, formatBDT } from "@/lib/utils";

const spine = {
  Mathematics: "bg-[#0E7C66]",
  Physics: "bg-[#3A6EA5]",
  Chemistry: "bg-[#C4623F]",
  Biology: "bg-[#5B8C3E]",
  English: "bg-[#8A5FA8]",
  IELTS: "bg-[#B8860B]",
  Programming: "bg-[#2F5D62]",
  ICT: "bg-[#4A6FA5]",
  Accounting: "bg-[#7A6A4F]",
  default: "bg-brand",
};

export default function TuitionCard({ tuition, className }) {
  const modeTone =
    tuition.mode === "Online"
      ? "bg-brand-soft text-brand border-brand/20"
      : "bg-accent-soft text-[#8a5a09] dark:text-accent border-accent/30";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_50px_-32px_rgba(18,33,29,0.5)]",
        className
      )}
    >
      {/* coloured spine — the "tuition pass" signature */}
      <span
        className={cn(
          "absolute inset-y-0 left-0 z-10 w-1.5",
          spine[tuition.subject] || spine.default
        )}
        aria-hidden="true"
      />

      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Photo
          src={tuition.bannerImage}
          alt={tuition.title}
          className="transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/5 to-transparent" />

        <div className="absolute left-4 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-surface/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-fg backdrop-blur">
            {tuition.subject}
          </span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur",
              modeTone
            )}
          >
            {tuition.mode}
          </span>
        </div>

        <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3 text-white">
          <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
            {tuition.classLevel}
          </span>
          <span className="font-display text-[22px] leading-none">
            {formatBDT(tuition.monthlyFee)}
            <span className="ml-0.5 font-sans text-[10px] font-medium uppercase tracking-wider opacity-80">
              /mo
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 pl-6">
        <h3 className="line-clamp-2 font-display text-[19px] leading-snug text-fg">
          <Link href={`/tuitions/${tuition._id}`} className="after:absolute after:inset-0">
            {tuition.title}
          </Link>
        </h3>

        <div className="mt-2.5 flex items-center gap-1.5 text-[13px] text-muted">
          <Users className="h-3.5 w-3.5" />
          <span className="truncate">{tuition.tutorName}</span>
          <BadgeCheck className="h-3.5 w-3.5 text-brand" aria-label="Verified tutor" />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {tuition.daysPerWeek} days / week
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {tuition.location || "Online"}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-dashed border-line pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Batch open
          </span>
          <span
            className={cn(
              buttonClasses({ variant: "subtle", size: "sm" }),
              "relative z-10 gap-1"
            )}
          >
            View details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
