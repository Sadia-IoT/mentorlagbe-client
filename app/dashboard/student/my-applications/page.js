"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MessageSquareQuote,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { apiFetch } from "@/lib/api";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/Badge";
import Button, { buttonClasses } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Field, Textarea } from "@/components/ui/Field";
import { cn, formatBDT, formatDate } from "@/lib/utils";

export default function MyApplicationsPage() {
  const { data, loading, error, reload } = useApi("/applications/my");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);

  const applications = data || [];

  async function cancelApplication() {
    if (!cancelTarget) return;
    setBusy(true);
    try {
      await apiFetch(`/applications/${cancelTarget._id}`, { method: "DELETE" });
      toast.success("Application cancelled");
      setCancelTarget(null);
      await reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function submitReview(event) {
    event.preventDefault();
    if (!reviewTarget) return;
    setBusy(true);
    try {
      await apiFetch(`/applications/${reviewTarget._id}/review`, {
        method: "POST",
        body: JSON.stringify({ rating, feedback: feedback.trim() }),
      });
      toast.success("Thanks for your review");
      setReviewTarget(null);
      setFeedback("");
      setRating(5);
      await reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="My applications"
        title="Every batch you applied to"
        description="Cancel while an application is pending. Once accepted, you can leave a review."
        action={
          <Link href="/tuitions" className={buttonClasses({ className: "gap-2" })}>
            <Send className="h-4 w-4" />
            New application
          </Link>
        }
      />

      <ErrorNote error={error} onRetry={reload} />

      {loading ? (
        <TableSkeleton rows={5} />
      ) : applications.length ? (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[10px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tuition</th>
                  <th className="px-4 py-3 font-semibold">Tutor</th>
                  <th className="px-4 py-3 font-semibold">Fee</th>
                  <th className="px-4 py-3 font-semibold">Applied</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id} className="border-t border-line">
                    <td className="max-w-[280px] px-4 py-4">
                      <Link
                        href={`/tuitions/${application.tuitionId}`}
                        className="line-clamp-2 font-semibold hover:text-brand"
                      >
                        {application.tuitionTitle}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted">
                        {application.subject}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{application.tutorName}</p>
                      <p className="text-xs text-muted">{application.tutorEmail}</p>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold">
                      {formatBDT(application.monthlyFee)}
                    </td>
                    <td className="px-4 py-4 text-xs text-muted">
                      {formatDate(application.appliedAt)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-1.5">
                        {application.status === "pending" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-danger hover:bg-danger-soft"
                            onClick={() => setCancelTarget(application)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        ) : null}

                        {application.status === "accepted" ? (
                          application.review ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                              Reviewed {application.review.rating}/5
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              variant="subtle"
                              className="gap-1"
                              onClick={() => setReviewTarget(application)}
                            >
                              <Star className="h-3.5 w-3.5" />
                              Review
                            </Button>
                          )
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {applications.map((application) => (
              <article
                key={application._id}
                className="rounded-2xl border border-line bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/tuitions/${application.tuitionId}`}
                    className="font-display text-base leading-snug hover:text-brand"
                  >
                    {application.tuitionTitle}
                  </Link>
                  <StatusBadge status={application.status} />
                </div>
                <p className="mt-1 text-xs text-muted">
                  {application.tutorName} · {application.tutorEmail}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                  <span className="font-semibold text-fg">
                    {formatBDT(application.monthlyFee)}/mo
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {formatDate(application.appliedAt)}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  {application.status === "pending" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1 text-danger"
                      onClick={() => setCancelTarget(application)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Cancel
                    </Button>
                  ) : null}
                  {application.status === "accepted" ? (
                    application.review ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        Reviewed {application.review.rating}/5
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="subtle"
                        className="flex-1 gap-1"
                        onClick={() => setReviewTarget(application)}
                      >
                        <Star className="h-3.5 w-3.5" />
                        Leave a review
                      </Button>
                    )
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={Send}
          title="You have not applied yet"
          description="Find an approved batch that matches your level and send your first application."
          action={
            <Link href="/tuitions" className={buttonClasses({ size: "sm" })}>
              Browse tuitions
            </Link>
          }
        />
      )}

      <Modal
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel this application?"
        description={cancelTarget?.tuitionTitle}
      >
        <p className="text-sm text-muted">
          You can apply again later, but you will lose your place in the
          tutor&apos;s queue.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setCancelTarget(null)}>
            Keep it
          </Button>
          <Button variant="danger" className="flex-1" onClick={cancelApplication} disabled={busy}>
            {busy ? "Cancelling…" : "Cancel application"}
          </Button>
        </div>
      </Modal>

      <Modal
        open={Boolean(reviewTarget)}
        onClose={() => setReviewTarget(null)}
        title="Rate this tuition"
        description={reviewTarget?.tuitionTitle}
      >
        <form onSubmit={submitReview} className="space-y-4">
          <div>
            <p className="mb-2 text-[13px] font-semibold">Your rating</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} star${value === 1 ? "" : "s"}`}
                  className="rounded-lg p-1 transition hover:bg-surface-2"
                >
                  <Star
                    className={cn(
                      "h-7 w-7",
                      value <= rating ? "fill-accent text-accent" : "text-line"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <Field label="Feedback" htmlFor="feedback" hint="Optional, max 500 characters">
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              maxLength={500}
              placeholder="What worked well in this batch?"
            />
          </Field>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setReviewTarget(null)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gap-2" disabled={busy}>
              <MessageSquareQuote className="h-4 w-4" />
              {busy ? "Sending…" : "Submit review"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
