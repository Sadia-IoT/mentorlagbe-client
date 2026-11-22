"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  BookOpen,
  ExternalLink,
  Pencil,
  Plus,
  Power,
  Trash2,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { apiFetch } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge, { StatusBadge } from "@/components/ui/Badge";
import Button, { buttonClasses } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Photo from "@/components/ui/Photo";
import { formatBDT, formatDate } from "@/lib/utils";

export default function MyTuitionsPage() {
  const { data, loading, error, reload } = useApi("/tuitions/my/list");
  const [busyId, setBusyId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const tuitions = data || [];

  async function toggleStatus(tuition) {
    setBusyId(tuition._id);
    try {
      const result = await apiFetch(`/tuitions/${tuition._id}/toggle`, {
        method: "PATCH",
      });
      toast.success(result.isActive ? "Listing reopened" : "Listing closed");
      await reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/tuitions/${deleteTarget._id}`, { method: "DELETE" });
      toast.success("Tuition deleted");
      setDeleteTarget(null);
      await reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Full CRUD"
        title="My tuitions"
        description="Edit details, pause a batch or remove a listing entirely."
        action={
          <Link href="/dashboard/tutor/post-tuition" className={buttonClasses({ className: "gap-2" })}>
            <Plus className="h-4 w-4" />
            New tuition
          </Link>
        }
      />

      <ErrorNote error={error} onRetry={reload} />

      {loading ? (
        <div className="space-y-4">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : tuitions.length ? (
        <div className="space-y-4">
          {tuitions.map((tuition) => (
            <article
              key={tuition._id}
              className="grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[180px_1fr] sm:p-5"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
                <Photo src={tuition.bannerImage} alt={tuition.title} />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={tuition.approvalStatus} />
                      <Badge tone={tuition.isActive ? "success" : "neutral"}>
                        {tuition.isActive ? "Active" : "Closed"}
                      </Badge>
                      <Badge tone="neutral">{tuition.mode}</Badge>
                    </div>
                    <h3 className="mt-2 font-display text-lg leading-snug">
                      {tuition.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {tuition.subject} · {tuition.classLevel} ·{" "}
                      {formatBDT(tuition.monthlyFee)}/month · created{" "}
                      {formatDate(tuition.createdAt)}
                    </p>
                  </div>
                </div>

                {tuition.approvalStatus === "rejected" ? (
                  <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
                    An admin rejected this listing. Edit the details and submit it
                    again for review.
                  </p>
                ) : null}

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                  <Link
                    href={`/tuitions/${tuition._id}`}
                    className={buttonClasses({ variant: "ghost", size: "sm", className: "gap-1.5" })}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Preview
                  </Link>
                  <Link
                    href={`/dashboard/tutor/my-tuitions/${tuition._id}/edit`}
                    className={buttonClasses({ variant: "outline", size: "sm", className: "gap-1.5" })}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(tuition)}
                    disabled={busyId === tuition._id}
                    className="gap-1.5"
                  >
                    <Power className="h-3.5 w-3.5" />
                    {tuition.isActive ? "Close listing" : "Reopen"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteTarget(tuition)}
                    className="gap-1.5 text-danger hover:bg-danger-soft"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No tuitions yet"
          description="Publish your first batch — free tutors can post up to two listings."
          action={
            <Link href="/dashboard/tutor/post-tuition" className={buttonClasses({ size: "sm" })}>
              Post a tuition
            </Link>
          }
        />
      )}

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete this tuition?"
        description={deleteTarget?.title}
      >
        <p className="text-sm text-muted">
          This removes the listing and its applications can no longer be reviewed.
          This action cannot be undone.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>
            Keep listing
          </Button>
          <Button variant="danger" className="flex-1" onClick={confirmDelete} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete permanently"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
