"use client";

import Link from "next/link";
import {
  Bookmark,
  CheckCircle2,
  Clock,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function StudentOverviewPage() {
  const stats = useApi("/stats/student");
  const applications = useApi("/applications/my");

  const data = stats.data || {};
  const isPro = data.plan === "pro";

  return (
    <div>
      <PageHeader
        eyebrow="Student dashboard"
        title="Your learning desk"
        description="Everything you have applied to, saved and still waiting on — in one place."
        action={
          <Link href="/tuitions" className={buttonClasses({ className: "gap-2" })}>
            <Search className="h-4 w-4" />
            Find a tuition
          </Link>
        }
      />

      <ErrorNote error={stats.error} onRetry={stats.reload} />

      {stats.loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Total applied"
            value={data.totalApplied || 0}
            hint="Applications sent so far"
            icon={Send}
          />
          <StatsCard
            label="Accepted"
            value={data.accepted || 0}
            hint="Tutors who said yes"
            icon={CheckCircle2}
          />
          <StatsCard
            label="Pending"
            value={data.pending || 0}
            hint="Waiting on the tutor"
            icon={Clock}
            tone="accent"
          />
          <StatsCard
            label="Current plan"
            value={isPro ? "Pro" : "Free"}
            hint={isPro ? "Unlimited bookmarks" : "Upgrade for unlimited saves"}
            icon={Sparkles}
            tone={isPro ? "accent" : "neutral"}
            href={isPro ? undefined : "/pricing"}
          />
        </div>
      )}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg">Recent applications</h3>
              <p className="text-xs text-muted">Your last four applications</p>
            </div>
            <Link
              href="/dashboard/student/my-applications"
              className="text-xs font-semibold text-brand hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-4">
            {applications.loading ? (
              <TableSkeleton rows={3} />
            ) : applications.data?.length ? (
              <ul className="divide-y divide-line">
                {applications.data.slice(0, 4).map((application) => (
                  <li
                    key={application._id}
                    className="flex items-start justify-between gap-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {application.tuitionTitle}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {application.tutorName} · {formatDate(application.appliedAt)}
                      </p>
                    </div>
                    <StatusBadge status={application.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={Send}
                title="No applications yet"
                description="Browse approved batches and send your first application."
                className="py-8"
                action={
                  <Link href="/tuitions" className={buttonClasses({ size: "sm" })}>
                    Browse tuitions
                  </Link>
                }
              />
            )}
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-display text-lg">Quick links</h3>
            <div className="mt-3 space-y-2">
              <Link
                href="/dashboard/student/saved"
                className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-3 transition hover:border-brand/40 hover:bg-surface-2"
              >
                <span className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Bookmark className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">Saved tuitions</span>
                    <span className="block text-[11px] text-muted">
                      {data.bookmarks || 0} saved
                    </span>
                  </span>
                </span>
                <span className="text-xs font-semibold text-brand">Open</span>
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-3 transition hover:border-brand/40 hover:bg-surface-2"
              >
                <span className="text-sm font-semibold">Complete your profile</span>
                <span className="text-xs font-semibold text-brand">Edit</span>
              </Link>
            </div>
          </section>

          {!isPro ? (
            <section className="rounded-2xl border border-accent/40 bg-accent-soft p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#8a5a09] dark:text-accent">
                <Sparkles className="h-4 w-4" />
                Free plan · 5 bookmark limit
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#8a5a09]/80 dark:text-accent/80">
                Pro Student unlocks unlimited saved tuitions, a Pro badge and
                priority application review.
              </p>
              <Link
                href="/pricing"
                className={buttonClasses({ variant: "dark", size: "sm", className: "mt-3" })}
              >
                Upgrade for $10
              </Link>
            </section>
          ) : (
            <section className="rounded-2xl border border-brand/25 bg-brand-soft p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand">
                <Sparkles className="h-4 w-4" />
                Pro Student active
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-brand/80">
                Unlimited bookmarks and priority review are unlocked on your account.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
