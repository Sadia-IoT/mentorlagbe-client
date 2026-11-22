import { MessageSquareQuote } from "lucide-react";
import Stars from "@/components/ui/Stars";
import Avatar from "@/components/layout/Avatar";
import { formatDate } from "@/lib/utils";

export default function ReviewsSection({ reviews = [], ratingAverage = 0 }) {
  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
            Student reviews
          </p>
          <h2 className="mt-2 text-2xl">What students say</h2>
        </div>
        {reviews.length ? (
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
            <Stars rating={ratingAverage} />
            <span className="text-sm font-semibold">{ratingAverage}</span>
            <span className="text-xs text-muted">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        ) : null}
      </div>

      {reviews.length ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <figure
              key={`${review.studentName}-${index}`}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-3 text-sm leading-relaxed text-fg/85">
                “{review.feedback || "Great batch — highly recommended."}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5 border-t border-dashed border-line pt-3">
                <Avatar user={{ name: review.studentName }} size={32} />
                <div>
                  <p className="text-xs font-semibold">{review.studentName}</p>
                  <p className="text-[11px] text-muted">
                    {formatDate(review.reviewedAt)}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-dashed border-line bg-surface p-5 text-sm text-muted">
          <MessageSquareQuote className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          No reviews yet. Only students whose application was accepted can leave
          a review after the batch.
        </div>
      )}
    </section>
  );
}
