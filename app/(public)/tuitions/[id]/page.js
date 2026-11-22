import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import Photo from "@/components/ui/Photo";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/layout/Avatar";
import ApplyPanel from "@/components/tuitions/ApplyPanel";
import BookmarkButton from "@/components/tuitions/BookmarkButton";
import ReviewsSection from "@/components/tuitions/ReviewsSection";
import { getJson } from "@/lib/server-api";
import { formatBDT, formatDate } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tuition = await getJson(`/tuitions/${id}`, null);
  if (!tuition) return { title: "Tuition not found" };
  return {
    title: tuition.title,
    description: tuition.description?.slice(0, 150),
  };
}

export default async function TuitionDetailsPage({ params }) {
  const { id } = await params;
  const tuition = await getJson(`/tuitions/${id}`, null);
  if (!tuition) notFound();

  const tutor = tuition.tutor;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="paper-dots absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-ml relative py-8 sm:py-10">
          <Link
            href="/tuitions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all tuitions
          </Link>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.55fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{tuition.subject}</Badge>
                <Badge tone="neutral">{tuition.classLevel}</Badge>
                <Badge tone={tuition.mode === "Online" ? "success" : "warning"}>
                  {tuition.mode}
                </Badge>
              </div>

              <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] sm:text-[44px]">
                {tuition.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-brand" />
                  {tuition.tutorName}
                  <BadgeCheck className="h-4 w-4 text-brand" />
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-brand" />
                  {tuition.daysPerWeek} days / week
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand" />
                  {tuition.location || "Online"}
                </span>
              </div>

              <div className="mt-6 overflow-hidden rounded-[26px] border border-line bg-surface-2">
                <Photo
                  src={tuition.bannerImage}
                  alt={tuition.title}
                  className="aspect-[16/9] w-full"
                />
              </div>
            </div>

            <aside className="self-start lg:sticky lg:top-24">
              <div className="rounded-[var(--radius-card)] border border-line bg-bg p-6 shadow-[0_24px_60px_-40px_rgba(18,33,29,0.55)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                  Monthly fee
                </p>
                <p className="mt-1 font-display text-[40px] leading-none">
                  {formatBDT(tuition.monthlyFee)}
                  <span className="ml-1 font-sans text-xs font-medium uppercase tracking-wider text-muted">
                    /month
                  </span>
                </p>

                <dl className="mt-5 space-y-2.5 border-y border-dashed border-line py-4 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">Mode</dt>
                    <dd className="font-semibold">{tuition.mode}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">Class level</dt>
                    <dd className="font-semibold">{tuition.classLevel}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">Days per week</dt>
                    <dd className="font-semibold">{tuition.daysPerWeek}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Location</dt>
                    <dd className="text-right font-semibold">
                      {tuition.location || "Online"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 space-y-2.5">
                  <ApplyPanel
                    tuitionId={String(tuition._id)}
                    tuitionTitle={tuition.title}
                  />
                  <BookmarkButton tuitionId={String(tuition._id)} />
                </div>
              </div>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                Admin-approved listing · reviewed{" "}
                {formatDate(tuition.reviewedAt || tuition.createdAt)}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="container-ml grid gap-10 py-12 lg:grid-cols-[1.55fr_1fr]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
            About this batch
          </p>
          <h2 className="mt-2 text-2xl">What you will work on</h2>
          <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.8] text-fg/85">
            {tuition.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: CalendarDays, label: "Weekly rhythm", value: `${tuition.daysPerWeek} classes` },
              { icon: GraduationCap, label: "Level", value: tuition.classLevel },
              { icon: Wallet, label: "Monthly fee", value: formatBDT(tuition.monthlyFee) },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-line bg-surface p-4"
              >
                <item.icon className="h-5 w-5 text-brand" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-lg">{item.value}</p>
              </div>
            ))}
          </div>

          <ReviewsSection
            reviews={tuition.reviews || []}
            ratingAverage={tuition.ratingAverage || 0}
          />
        </div>

        <aside className="space-y-4">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
              Your tutor
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar user={{ name: tutor?.name || tuition.tutorName, image: tutor?.image }} size={56} />
              <div>
                <p className="flex items-center gap-1.5 font-display text-lg leading-tight">
                  {tutor?.name || tuition.tutorName}
                  {tutor?.isPro ? (
                    <Badge tone="warning" className="px-1.5 py-0 text-[9px]">
                      Pro
                    </Badge>
                  ) : null}
                </p>
                <p className="text-xs text-muted">{tuition.subject} mentor</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {tutor?.bio ||
                "This tutor has not added a bio yet. Send an application to ask about their teaching style."}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-dashed border-line pt-4 text-center">
              <div>
                <p className="font-display text-xl">{tuition.daysPerWeek}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  days / week
                </p>
              </div>
              <div>
                <p className="font-display text-xl">{formatBDT(tuition.monthlyFee)}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  per month
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-brand/20 bg-brand-soft p-6">
            <p className="flex items-center gap-2 font-display text-lg text-brand">
              <ShieldCheck className="h-5 w-5" />
              Safe by design
            </p>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-fg/75">
              <li>• Every listing is reviewed by an admin before it goes live.</li>
              <li>• You apply with your real phone number, never a payment.</li>
              <li>• Duplicate applications to the same batch are blocked.</li>
              <li>• Accepted students can review the batch afterwards.</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
