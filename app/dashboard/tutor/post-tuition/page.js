"use client";

import { Sparkles } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import TuitionForm from "@/components/tuitions/TuitionForm";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PostTuitionPage() {
  const stats = useApi("/stats/tutor");
  const isPro = stats.data?.plan === "pro";
  const used = stats.data?.totalTuitions || 0;
  const limit = stats.data?.freeLimit || 2;

  return (
    <div className="max-w-4xl">
      <PageHeader
        eyebrow="New listing"
        title="Post a tuition"
        description="Fill in the batch details. Our admin team reviews every listing before it goes live."
      />

      <ErrorNote error={stats.error} onRetry={stats.reload} />

      {stats.loading ? (
        <Skeleton className="mb-5 h-16 w-full rounded-2xl" />
      ) : !isPro ? (
        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-accent/35 bg-accent-soft p-4 text-xs leading-relaxed text-[#8a5a09] dark:text-accent">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            You are on the free plan and have used {used} of {limit} tuition posts.
            {used >= limit
              ? " Delete an old post or upgrade to Pro to publish another batch."
              : ` You can publish ${limit - used} more post${limit - used === 1 ? "" : "s"} on Free.`}
          </span>
        </div>
      ) : (
        <div className="mb-5 rounded-2xl border border-brand/25 bg-brand-soft p-4 text-xs font-medium text-brand">
          Pro plan active — unlimited tuition posts.
        </div>
      )}

      <TuitionForm mode="create" />
    </div>
  );
}
