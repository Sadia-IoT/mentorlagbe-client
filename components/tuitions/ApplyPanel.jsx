"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { CheckCircle2, Clock, Lock, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Button, { buttonClasses } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export default function ApplyPanel({ tuitionId, tuitionTitle }) {
  const { data: session, isPending } = authClient.useSession();
  const [application, setApplication] = useState(null);
  const [checking, setChecking] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const user = session?.user;
  const isStudent = user?.role === "student";
  const userRole = user?.role;

  useEffect(() => {
    let active = true;

    async function checkExisting() {
      if (!userRole || userRole !== "student") {
        setApplication(null);
        return;
      }
      setChecking(true);
      try {
        const list = await apiFetch("/applications/my");
        if (!active) return;
        const found = (list || []).find(
          (item) => String(item.tuitionId) === String(tuitionId)
        );
        setApplication(found || null);
      } catch {
        if (active) setApplication(null);
      } finally {
        if (active) setChecking(false);
      }
    }

    checkExisting();
    return () => {
      active = false;
    };
  }, [userRole, tuitionId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setSubmitting(true);
    try {
      const created = await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({
          tuitionId,
          studentPhone: String(form.get("studentPhone") || "").trim(),
          preferredSchedule: String(form.get("preferredSchedule") || "").trim(),
          studentNote: String(form.get("studentNote") || "").trim(),
        }),
      });
      setApplication(created);
      setOpen(false);
      toast.success("Application sent — the tutor will review it soon.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (isPending) {
    return <div className="h-12 w-full animate-pulse rounded-full bg-surface-2" />;
  }

  if (!user) {
    return (
      <div className="space-y-3">
        <Link
          href={`/sign-in?redirect=/tuitions/${tuitionId}`}
          className={buttonClasses({ className: "w-full" })}
        >
          <Lock className="h-4 w-4" />
          Sign in to apply
        </Link>
        <p className="text-center text-xs text-muted">
          Applications are only accepted from student accounts.
        </p>
      </div>
    );
  }

  if (!isStudent) {
    return (
      <div className="space-y-3">
        <Button disabled className="w-full">
          Apply for this tuition
        </Button>
        <p className="flex items-start gap-2 rounded-xl border border-accent/30 bg-accent-soft px-3 py-2.5 text-xs leading-relaxed text-[#8a5a09] dark:text-accent">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Only student accounts can apply. You are signed in as a {user.role}.
        </p>
      </div>
    );
  }

  if (checking) {
    return <div className="h-12 w-full animate-pulse rounded-full bg-surface-2" />;
  }

  if (application) {
    return (
      <div className="space-y-3 rounded-2xl border border-line bg-surface-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
            <CheckCircle2 className="h-4 w-4 text-brand" />
            Application sent
          </span>
          <StatusBadge status={application.status} />
        </div>
        <p className="text-xs text-muted">
          Applied on {formatDate(application.appliedAt)} · preferred schedule:{" "}
          {application.preferredSchedule}
        </p>
        <Link
          href="/dashboard/student/my-applications"
          className={buttonClasses({ variant: "outline", size: "sm", className: "w-full" })}
        >
          View my applications
        </Link>
      </div>
    );
  }

  return (
    <>
      <Button className="w-full" onClick={() => setOpen(true)}>
        <Send className="h-4 w-4" />
        Apply for this tuition
      </Button>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
        <Clock className="h-3.5 w-3.5" />
        Free to apply · no payment required
      </p>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Apply for this tuition"
        description={tuitionTitle}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Phone number" required htmlFor="studentPhone">
            <Input
              id="studentPhone"
              name="studentPhone"
              placeholder="+8801XXXXXXXXX"
              defaultValue={user.phone || ""}
              required
            />
          </Field>

          <Field
            label="Preferred schedule"
            required
            htmlFor="preferredSchedule"
            hint="When can you attend classes?"
          >
            <Input
              id="preferredSchedule"
              name="preferredSchedule"
              placeholder="e.g. Sat–Mon, 6:00–8:00 PM"
              required
            />
          </Field>

          <Field
            label="Learning note"
            htmlFor="studentNote"
            hint="Optional — tell the tutor what you need help with."
          >
            <Textarea
              id="studentNote"
              name="studentNote"
              rows={4}
              maxLength={600}
              placeholder="I struggle with word problems and want weekly practice…"
            />
          </Field>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? "Sending…" : "Send application"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
