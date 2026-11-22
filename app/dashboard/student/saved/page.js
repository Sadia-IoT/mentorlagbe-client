"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Bookmark, BookmarkX, Sparkles } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { apiFetch } from "@/lib/api";
import { GridSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Button, { buttonClasses } from "@/components/ui/Button";
import TuitionCard from "@/components/tuitions/TuitionCard";

export default function SavedTuitionsPage() {
  const { data, loading, error, reload } = useApi("/users/me/bookmarks");
  const stats = useApi("/stats/student");

  const bookmarks = data || [];
  const isPro = stats.data?.plan === "pro";

  async function removeBookmark(tuition) {
    try {
      await apiFetch(`/users/me/bookmarks/${tuition._id}`, { method: "POST" });
      toast.success("Removed from saved tuitions");
      await reload();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Saved tuitions"
        title="Batches worth a second look"
        description={
          isPro
            ? "Pro Student — unlimited saved tuitions."
            : `Free plan saves up to 5 tuitions. You have ${bookmarks.length} saved.`
        }
        action={
          <Link href="/tuitions" className={buttonClasses({ className: "gap-2" })}>
            <Bookmark className="h-4 w-4" />
            Find more
          </Link>
        }
      />

      <ErrorNote error={error} onRetry={reload} />

      {!isPro && !stats.loading ? (
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-accent/35 bg-accent-soft p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-[#8a5a09] dark:text-accent">
            <span className="font-semibold">Free plan:</span> 5 saved tuitions.
            Upgrade to Pro Student for unlimited bookmarks.
          </p>
          <Link href="/pricing" className={buttonClasses({ variant: "dark", size: "sm", className: "gap-1.5" })}>
            <Sparkles className="h-3.5 w-3.5" />
            Upgrade
          </Link>
        </div>
      ) : null}

      {loading ? (
        <GridSkeleton count={3} />
      ) : bookmarks.length ? (
        <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((tuition) => (
            <div key={tuition._id} className="flex flex-col gap-2">
              <TuitionCard tuition={tuition} />
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 self-start text-danger hover:bg-danger-soft"
                onClick={() => removeBookmark(tuition)}
              >
                <BookmarkX className="h-3.5 w-3.5" />
                Remove from saved
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          description="Tap “Save for later” on any tuition details page to keep it here."
          action={
            <Link href="/tuitions" className={buttonClasses({ size: "sm" })}>
              Browse tuitions
            </Link>
          }
        />
      )}
    </div>
  );
}
