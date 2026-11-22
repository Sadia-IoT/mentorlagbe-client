"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Receipt,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { formatBDT, formatDate, formatUSD } from "@/lib/utils";

export default function AdminOverviewPage() {
  const stats = useApi("/stats/admin");
  const pending = useApi("/admin/tuitions?status=pending&limit=5");

  const data = stats.data || {};
  const pendingList = pending.data?.tuitions || [];

  return (
    <div>
      <PageHeader
        eyebrow="Admin console"
        title="Platform at a glance"
        description="Moderate listings, manage roles and watch the revenue ledger from one desk."
        action={
          <Link
            href="/dashboard/admin/tuitions"
            className={buttonClasses({ className: "gap-2" })}
          >
            <ShieldCheck className="h-4 w-4" />
            Review queue
          </Link>
        }
      />

      <ErrorNote error={stats.error} onRetry={stats.reload} />

      {stats.loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Total users"
            value={data.totalUsers || 0}
            hint={`${data.students || 0} students · ${data.tutors || 0} tutors`}
            icon={Users}
            href="/dashboard/admin/users"
          />
          <StatsCard
            label="Pending approvals"
            value={data.pendingTuitions || 0}
            hint={`${data.approvedTuitions || 0} live · ${data.rejectedTuitions || 0} rejected`}
            icon={Clock}
            tone="accent"
            href="/dashboard/admin/tuitions"
          />
          <StatsCard
            label="Applications"
            value={data.totalApplications || 0}
            hint="Sent across every batch"
            icon={BookOpen}
          />
          <StatsCard
            label="Pro revenue"
            value={formatUSD(data.totalRevenue || 0)}
            hint={`${data.totalTransactions || 0} paid transactions`}
            icon={Wallet}
            href="/dashboard/admin/transactions"
          />
        </div>
      )}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg">Waiting for review</h3>
              <p className="text-xs text-muted">
                Newest listings that are not public yet
              </p>
            </div>
            <Link
              href="/dashboard/admin/tuitions?status=pending"
              className="text-xs font-semibold text-brand hover:underline"
            >
              Open queue
            </Link>
          </div>

          <div className="mt-4">
            {pending.loading ? (
              <TableSkeleton rows={3} />
            ) : pendingList.length ? (
              <ul className="divide-y divide-line">
                {pendingList.map((tuition) => (
                  <li
                    key={tuition._id}
                    className="flex items-start justify-between gap-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {tuition.title}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {tuition.tutorName} · {tuition.subject} ·{" "}
                        {formatBDT(tuition.monthlyFee)}/mo
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted">
                        Submitted {formatDate(tuition.createdAt)}
                      </p>
                    </div>
                    <StatusBadge status={tuition.approvalStatus} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="Queue is clear"
                description="Every submitted listing has been reviewed."
                className="py-8"
              />
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-display text-lg">Role split</h3>
            <p className="text-xs text-muted">Who is on the platform</p>

            <div className="mt-4 space-y-3">
              {[
                {
                  label: "Students",
                  value: data.students || 0,
                  icon: GraduationCap,
                  tone: "bg-brand-soft text-brand",
                },
                {
                  label: "Tutors",
                  value: data.tutors || 0,
                  icon: BookOpen,
                  tone: "bg-accent-soft text-[#8a5a09] dark:text-accent",
                },
                {
                  label: "Admins",
                  value: data.admins || 0,
                  icon: ShieldCheck,
                  tone: "bg-surface-2 text-muted",
                },
              ].map((row) => {
                const total = data.totalUsers || 1;
                const percent = Math.round((row.value / total) * 100);
                return (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold">
                        <row.icon className="h-3.5 w-3.5" />
                        {row.label}
                      </span>
                      <span className="text-muted">
                        {row.value} · {percent}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/dashboard/admin/transactions"
            className="flex items-center justify-between gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-5 transition hover:border-brand/50"
          >
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-brand">
                <Receipt className="h-4 w-4" />
                Transaction ledger
              </p>
              <p className="mt-1 text-xs text-brand/80">
                {formatUSD(data.totalRevenue || 0)} collected from{" "}
                {data.totalTransactions || 0} Pro upgrades
              </p>
            </div>
            <span className="text-xs font-bold text-brand">Open →</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
