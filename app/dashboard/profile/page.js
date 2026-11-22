"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  CalendarDays,
  Loader2,
  Mail,
  Save,
  Sparkles,
  UploadCloud,
  UserRound,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/upload";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/Skeleton";
import Badge, { RoleBadge } from "@/components/ui/Badge";
import Button, { buttonClasses } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import Avatar from "@/components/layout/Avatar";
import Photo from "@/components/ui/Photo";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const fileRef = useRef(null);
  const { data, loading, error, reload } = useApi("/users/me");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!data) return;
    setName(data.name || "");
    setPhone(data.phone || "");
    setBio(data.bio || "");
    setImage(data.image || "");
  }, [data]);

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setImage(url);
      toast.success("Image uploaded — press Save to apply it");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (name.trim().length < 2) return toast.error("Name must be at least 2 characters");
    if (phone && !/^[0-9+\-\s()]{6,20}$/.test(phone.trim())) {
      return toast.error("Enter a valid phone number");
    }
    if (bio.length > 500) return toast.error("Bio must be under 500 characters");

    setSaving(true);
    try {
      await apiFetch("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          bio: bio.trim(),
          image: image.trim(),
        }),
      });

      try {
        await authClient.updateUser({ name: name.trim(), image: image.trim() });
      } catch {
        /* session display refreshes on next load */
      }

      toast.success("Profile updated");
      await reload();
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <PageHeader
        eyebrow="Account settings"
        title="Your public profile"
        description="Tutors see this when you apply. A complete profile with a real photo builds trust."
      />

      <ErrorNote error={error} onRetry={reload} />

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <h3 className="font-display text-lg">Profile photo</h3>
              <p className="mt-1 text-xs text-muted">
                Square images look best. Uploads are stored on ImgBB (max 5 MB).
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-5">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-line bg-surface-2">
                  {image ? (
                    <Photo src={image} alt={name || "Profile photo"} />
                  ) : (
                    <div className="grid h-full place-items-center text-muted">
                      <UserRound className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                    id="avatar-file"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="gap-1.5"
                    >
                      {uploading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <UploadCloud className="h-3.5 w-3.5" />
                      )}
                      {uploading ? "Uploading…" : "Upload photo"}
                    </Button>
                    {image ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setImage("")}
                        className="text-danger hover:bg-danger-soft"
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <p className="text-[11px] text-muted">
                    Or paste a URL below if you already host one.
                  </p>
                </div>
              </div>

              <Field label="Image URL" htmlFor="image" className="mt-4">
                <Input
                  id="image"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="https://i.ibb.co/…"
                />
              </Field>
            </section>

            <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <h3 className="font-display text-lg">Personal details</h3>
              <p className="mt-1 text-xs text-muted">
                Your email is managed by Better Auth and cannot be edited here.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required htmlFor="name">
                  <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={80}
                    required
                  />
                </Field>

                <Field label="Email" htmlFor="email" hint="Read only">
                  <Input id="email" value={data?.email || ""} disabled />
                </Field>

                <Field
                  label="Phone number"
                  htmlFor="phone"
                  hint="Shown to tutors when you apply"
                  className="sm:col-span-2"
                >
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+8801XXXXXXXXX"
                  />
                </Field>

                <Field
                  label="Short bio"
                  htmlFor="bio"
                  hint={`${bio.length}/500 characters`}
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="bio"
                    rows={4}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    maxLength={500}
                    placeholder={
                      data?.role === "tutor"
                        ? "I teach Higher Math with weekly problem-solving sessions…"
                        : "Class 10 student preparing for SSC, looking for Physics support…"
                    }
                  />
                </Field>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="submit" disabled={saving || uploading} className="gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </section>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-surface p-5 text-center">
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-2xl border border-line bg-surface-2">
                {image ? (
                  <Photo src={image} alt={name || "Profile photo"} />
                ) : (
                  <Avatar user={{ name: name || "MentorLagbe" }} size={80} />
                )}
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 font-display text-lg">
                {name || "Your name"}
                {data?.plan === "pro" ? (
                  <BadgeCheck className="h-4 w-4 text-brand" />
                ) : null}
              </p>
              <p className="text-xs text-muted">{data?.email}</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
                <RoleBadge role={data?.role || "student"} />
                <Badge tone={data?.plan === "pro" ? "warning" : "neutral"}>
                  {data?.plan === "pro" ? "Pro plan" : "Free plan"}
                </Badge>
              </div>

              <div className="mt-4 space-y-2 border-t border-dashed border-line pt-4 text-left text-xs text-muted">
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  {data?.email}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Joined {formatDate(data?.createdAt)}
                </p>
              </div>
            </div>

            {data?.plan !== "pro" && data?.role !== "admin" ? (
              <div className="rounded-2xl border border-accent/40 bg-accent-soft p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#8a5a09] dark:text-accent">
                  <Sparkles className="h-4 w-4" />
                  Go Pro
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#8a5a09]/80 dark:text-accent/80">
                  {data?.role === "tutor"
                    ? "Unlimited tuition posts, a verified badge and priority review."
                    : "Unlimited saved tuitions, priority review and a Pro badge."}
                </p>
                <Link
                  href="/pricing"
                  className={buttonClasses({
                    variant: "dark",
                    size: "sm",
                    className: "mt-3",
                  })}
                >
                  Compare plans
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      )}
    </div>
  );
}
