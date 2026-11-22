"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Check,
  Mail,
  Phone,
  Users,
  X,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { apiFetch } from "@/lib/api";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn, formatDate } from "@/lib/utils";

const tabs = ["all", "pending", "accepted", "rejected"];

export default function ApplicantsPage() {
  const { data, loading, error, reload } = useApi("/applications/tutor");
  const [tab, setTab] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const applications = data || [];

  const counts = useMemo(() => {
    return {
      all: applications.length,
      pending: applications.filter((item) => item.status === "pending").length,
      accepted: applications.filter((item) => item.status === "accepted").length,
      rejected: applications.filter((item) => item.status === "rejected").length,
    };
  }, [applications]);

  const visible =
    tab === "all"
      ? applications
      : applications.filter((item) => item.status === tab);

  async function decide(application, status) {
    setBusyId(application._id);
    try {
      await apiFetch(`/applications/${application._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success(
        status === "accepted"
          ? `${application.studentName} accepted`
          : `${application.studentName} rejected`
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
        eyebrow="Applicant management"
        title="Students who applied"
        description="Read each note, then accept the students who fit your batch."
      />

      <ErrorNote error={error} onRetry={reload} />

      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold capitalize transition",
              tab === item
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface text-muted hover:border-brand/40 hover:text-fg"
            )}
          >
            {item} ({counts[item]})
          </button>
        ))}
      </div>

      {loading ? (
        <TableSkeleton rows={4} />
      ) : visible.length ? (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[10px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Tuition</th>
                  <th className="px-4 py-3 font-semibold">Schedule & note</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Decision</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((application) => (
                  <tr key={application._id} className="border-t border-line align-top">
                    <td className="px-4 py-4">
                      <p className="font-semibold">{application.studentName}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                        <Mail className="h-3 w-3" />
                        {application.studentEmail}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                        <Phone className="h-3 w-3" />
                        {application.studentPhone}
                      </p>
                    </td>
                    <td className="max-w-[220px] px-4 py-4">
                      <p className="line-clamp-2 text-sm">{application.tuitionTitle}</p>
                      <p className="mt-1 text-xs text-muted">
                        {application.subject} · {formatDate(application.appliedAt)}
                      </p>
                    </td>
                    <td className="max-w-[260px] px-4 py-4">
                      <p className="text-xs font-medium">{application.preferredSchedule}</p>
                      <p className="mt-1 line-clamp-3 text-xs text-muted">
                        {application.studentNote || "No note provided."}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant={application.status === "accepted" ? "subtle" : "primary"}
                          onClick={() => decide(application, "accepted")}
                          disabled={busyId === application._id || application.status === "accepted"}
                          className="gap-1 px-3"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => decide(application, "rejected")}
                          disabled={busyId === application._id || application.status === "rejected"}
                          className="gap-1 px-3 text-danger hover:border-danger/40 hover:bg-danger-soft"
                        >
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 lg:hidden">
            {visible.map((application) => (
              <article
                key={application._id}
                className="rounded-2xl border border-line bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{application.studentName}</p>
                    <p className="text-xs text-muted">{application.studentEmail}</p>
                  </div>
                  <StatusBadge status={application.status} />
                </div>

                <p className="mt-3 text-sm">{application.tuitionTitle}</p>
                <p className="mt-1 text-xs text-muted">{application.preferredSchedule}</p>
                {application.studentNote ? (
                  <p className="mt-2 rounded-lg bg-surface-2 p-2 text-xs text-muted">
                    {application.studentNote}
                  </p>
                ) : null}
                <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                  <Phone className="h-3 w-3" />
                  {application.studentPhone}
                </p>

                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => decide(application, "accepted")}
                    disabled={busyId === application._id || application.status === "accepted"}
                  >
                    <Check className="h-3.5 w-3.5" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 text-danger"
                    onClick={() => decide(application, "rejected")}
                    disabled={busyId === application._id || application.status === "rejected"}
                  >
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={Users}
          title={tab === "all" ? "No applications yet" : `No ${tab} applications`}
          description="When students apply to your approved batches, their details appear here."
        />
      )}
    </div>
  );
}
