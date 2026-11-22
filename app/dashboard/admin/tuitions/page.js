"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Check,
  ExternalLink,
  RotateCcw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { apiFetch } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge, { StatusBadge } from "@/components/ui/Badge";
import Button, { buttonClasses } from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { Input } from "@/components/ui/Field";
import { cn, formatBDT, formatDate } from "@/lib/utils";

const STATUS_TABS = ["pending", "approved", "rejected", "all"];
const LIMIT = 8;

function ModerationBoard() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status");
  const [status, setStatus] = useState(
    STATUS_TABS.includes(initialStatus) ? initialStatus : "pending"
  );
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState(null);

  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (query) params.set("search", query);
  params.set("page", String(page));
  params.set("limit", String(LIMIT));

  const { data, loading, error, reload } = useApi(
    `/admin/tuitions?${params.toString()}`
  );

  const tuitions = data?.tuitions || [];
  const totalPages = data?.totalPages || 0;

  async function moderate(tuition, approvalStatus) {
    setBusyId(tuition._id);
    try {
      await apiFetch(`/admin/tuitions/${tuition._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ approvalStatus }),
      });
      toast.success(
        approvalStatus === "approved"
          ? `“${tuition.title}” is now live`
          : approvalStatus === "rejected"
            ? `“${tuition.title}” rejected`
            : `“${tuition.title}” moved back to pending`
      );
      await reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Tuition approval"
        title="The moderation desk"
        description="Approve listings that are complete and honest. Reject anything unclear, unsafe or missing details."
      />

      <ErrorNote error={error} onRetry={reload} />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setStatus(tab);
                setPage(1);
              }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold capitalize transition",
                status === tab
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-surface text-muted hover:border-brand/40 hover:text-fg"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setPage(1);
            setQuery(search.trim());
          }}
          className="flex gap-2"
        >
          <label className="relative flex-1 lg:w-64">
            <span className="sr-only">Search listings</span>
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Title, tutor or subject…"
              className="pl-10"
            />
          </label>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-36 w-full rounded-2xl" />
          ))}
        </div>
      ) : tuitions.length ? (
        <div className="space-y-3">
          {tuitions.map((tuition) => (
            <article
              key={tuition._id}
              className="grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[150px_1fr] sm:p-5"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
                <Photo src={tuition.bannerImage} alt={tuition.title} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <StatusBadge status={tuition.approvalStatus} />
                  <Badge tone="neutral">{tuition.subject}</Badge>
                  <Badge tone="neutral">{tuition.classLevel}</Badge>
                  <Badge tone={tuition.mode === "Online" ? "success" : "warning"}>
                    {tuition.mode}
                  </Badge>
                </div>

                <h3 className="mt-2 font-display text-lg leading-snug">
                  {tuition.title}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {tuition.tutorName} · {tuition.tutorEmail}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {formatBDT(tuition.monthlyFee)}/month · {tuition.daysPerWeek}{" "}
                  days/week · {tuition.location || "Online"} · submitted{" "}
                  {formatDate(tuition.createdAt)}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                  {tuition.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link
                    href={`/tuitions/${tuition._id}`}
                    className={buttonClasses({
                      variant: "ghost",
                      size: "sm",
                      className: "gap-1.5",
                    })}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Preview
                  </Link>

                  {tuition.approvalStatus !== "approved" ? (
                    <Button
                      size="sm"
                      onClick={() => moderate(tuition, "approved")}
                      disabled={busyId === tuition._id}
                      className="gap-1.5"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  ) : null}

                  {tuition.approvalStatus !== "rejected" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moderate(tuition, "rejected")}
                      disabled={busyId === tuition._id}
                      className="gap-1.5 text-danger hover:border-danger/40 hover:bg-danger-soft"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  ) : null}

                  {tuition.approvalStatus !== "pending" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moderate(tuition, "pending")}
                      disabled={busyId === tuition._id}
                      className="gap-1.5"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Back to pending
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShieldCheck}
          title={status === "pending" ? "The queue is empty" : "Nothing here"}
          description={
            status === "pending"
              ? "Every submitted listing has been reviewed. New submissions will appear here."
              : "No listings match this status and search combination."
          }
        />
      )}

      {totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-3 text-xs text-muted">
          <span>
            Page {page} of {totalPages} · {data?.total || 0} listings
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((value) => Math.max(value - 1, 1))}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((value) => Math.min(value + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AdminTuitionsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-36 w-full rounded-2xl" />
          <Skeleton className="h-36 w-full rounded-2xl" />
        </div>
      }
    >
      <ModerationBoard />
    </Suspense>
  );
}
