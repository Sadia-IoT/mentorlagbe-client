"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  PenLine,
  Sparkles,
  Users,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import { StatusBadge } from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { buttonClasses } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function TutorOverviewPage() {
  const stats = useApi("/stats/tutor");
  const applications = useApi("/applications/tutor");

  const data = stats.data || {};
  const isPro = data.plan === "pro";
  const postsUsed = data.totalTuitions || 0;
  const limit = data.freeLimit || 2;

  return (
    <div>
      <PageHeader
        eyebrow="Tutor dashboard"
        title="Your teaching desk"
        description="Track your batches, review applicants and keep your listings current."
        action={
          <Link
            href="/dashboard/tutor/post-tuition"
            className={buttonClasses({ className: "gap-2" })}
          >
            <PenLine className="h-4 w-4" />
            Post a tuition
          </Link>
        }
      />

      <ErrorNote error={stats.error} onRetry={stats.reload} />

      {stats.loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Total tuitions posted"
            value={postsUsed}
            hint={isPro ? "Unlimited on Pro" : `${Math.max(limit - postsUsed, 0)} free posts left`}
            icon={BookOpen}
          />
          <StatsCard
            label="Approved & live"
            value={data.approved || 0}
            hint={`${data.active || 0} currently active`}
            icon={CheckCircle2}
          />
          <StatsCard
            label="Applicants received"
            value={data.applicants || 0}
            hint={`${data.pendingApplicants || 0} waiting for your decision`}
            icon={Users}
            tone="accent"
          />
          <StatsCard
            label="Current plan"
            value={isPro ? "Pro" : "Free"}
            hint={isPro ? "Unlimited posts unlocked" : "Upgrade for unlimited posts"}
            icon={Sparkles}
            tone={isPro ? "accent" : "neutral"}
            href={isPro ? undefined : "/pricing"}
          />
        </div>
      )}

      {!isPro && !stats.loading ? (
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-accent/35 bg-accent-soft p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#8a5a09] dark:text-accent">
              Free plan: {postsUsed} of {limit} tuition posts used
            </p>
            <p className="mt-0.5 text-xs text-[#8a5a09]/80 dark:text-accent/80">
              Pro Tutor unlocks unlimited posts, a verified badge and priority review.
            </p>
          </div>
          <Link href="/pricing" className={buttonClasses({ variant: "dark", size: "sm" })}>
            Upgrade to Pro
          </Link>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg">Recent applicants</h3>
              <p className="text-xs text-muted">Students waiting on your response</p>
            </div>
            <Link
              href="/dashboard/tutor/applicants"
              className="text-xs font-semibold text-brand hover:underline"
            >
              Manage all
            </Link>
          </div>

          <div className="mt-4">
            {applications.loading ? (
              <TableSkeleton rows={3} />
            ) : applications.data?.length ? (
              <ul className="divide-y divide-line">
                {applications.data.slice(0, 4).map((application) => (
                  <li key={application._id} className="flex items-start justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {application.studentName}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {application.tuitionTitle}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted">
                        {formatDate(application.appliedAt)}
                      </p>
                    </div>
                    <StatusBadge status={application.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={Users}
                title="No applicants yet"
                description="Once your batch is approved and live, applications will show up here."
                className="py-8"
              />
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-5">
          <h3 className="font-display text-lg">Quick actions</h3>
          <p className="text-xs text-muted">Keep your desk tidy</p>

          <div className="mt-4 space-y-2">
            {[
              {
                href: "/dashboard/tutor/my-tuitions",
                label: "Review my tuitions",
                hint: "Edit, pause or delete a batch",
                icon: BookOpen,
              },
              {
                href: "/dashboard/tutor/applicants",
                label: "Decide on applicants",
                hint: "Accept or reject pending requests",
                icon: Clock,
              },
              {
                href: "/dashboard/profile",
                label: "Polish your profile",
                hint: "A complete bio builds trust",
                icon: Users,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl border border-line px-3 py-3 transition hover:border-brand/40 hover:bg-surface-2"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-brand">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="block text-[11px] text-muted">{item.hint}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
