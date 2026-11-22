"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import TuitionForm from "@/components/tuitions/TuitionForm";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonClasses } from "@/components/ui/Button";

export default function EditTuitionPage() {
  const params = useParams();
  const id = params?.id;
  const { data, loading, error, reload } = useApi("/tuitions/my/list");

  const tuition = (data || []).find((item) => String(item._id) === String(id));

  return (
    <div className="max-w-4xl">
      <Link
        href="/dashboard/tutor/my-tuitions"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to my tuitions
      </Link>

      <PageHeader
        eyebrow="Edit listing"
        title="Update tuition details"
        description="Saving changes sends this listing back to the admin pending queue."
      />

      <ErrorNote error={error} onRetry={reload} />

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      ) : tuition ? (
        <TuitionForm mode="edit" tuition={tuition} />
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Tuition not found"
          description="This listing does not exist or does not belong to your account."
          action={
            <Link href="/dashboard/tutor/my-tuitions" className={buttonClasses({ size: "sm" })}>
              Back to my tuitions
            </Link>
          }
        />
      )}
    </div>
  );
}
