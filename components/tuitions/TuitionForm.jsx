"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImagePlus, Loader2, ShieldCheck, UploadCloud } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/upload";
import { CLASS_LEVELS, MODES, SUBJECTS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import Photo from "@/components/ui/Photo";
import { cn, formatBDT } from "@/lib/utils";

const blank = {
  title: "",
  subject: "",
  classLevel: "",
  mode: "Online",
  location: "",
  monthlyFee: "",
  daysPerWeek: "3",
  description: "",
  bannerImage: "",
};

function pickInitial(tuition) {
  if (!tuition) return blank;
  return {
    title: tuition.title || "",
    subject: tuition.subject || "",
    classLevel: tuition.classLevel || "",
    mode: tuition.mode || "Online",
    location: tuition.location || "",
    monthlyFee: String(tuition.monthlyFee ?? ""),
    daysPerWeek: String(tuition.daysPerWeek ?? "3"),
    description: tuition.description || "",
    bannerImage: tuition.bannerImage || "",
  };
}

export default function TuitionForm({ mode = "create", tuition = null }) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [values, setValues] = useState(() => pickInitial(tuition));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isEdit = mode === "edit";

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      update("bannerImage", url);
      toast.success("Banner uploaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function validate() {
    if (values.title.trim().length < 6) return "Title must be at least 6 characters";
    if (!values.subject) return "Choose a subject";
    if (!values.classLevel) return "Choose a class level";
    if (!MODES.includes(values.mode)) return "Choose Online or Offline";
    if (values.mode === "Offline" && !values.location.trim()) {
      return "Location is required for offline tuition";
    }
    if (!Number(values.monthlyFee) || Number(values.monthlyFee) <= 0) {
      return "Monthly fee must be a positive number";
    }
    const days = Number(values.daysPerWeek);
    if (!Number.isInteger(days) || days < 1 || days > 7) {
      return "Days per week must be between 1 and 7";
    }
    if (values.description.trim().length < 20) {
      return "Description should be at least 20 characters";
    }
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const problem = validate();
    if (problem) return toast.error(problem);

    const payload = {
      title: values.title.trim(),
      subject: values.subject,
      classLevel: values.classLevel,
      mode: values.mode,
      location: values.location.trim(),
      monthlyFee: Number(values.monthlyFee),
      daysPerWeek: Number(values.daysPerWeek),
      bannerImage: values.bannerImage.trim(),
      description: values.description.trim(),
    };

    setSaving(true);
    try {
      if (isEdit) {
        await apiFetch(`/tuitions/${tuition._id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        toast.success("Tuition updated — sent for admin approval again");
      } else {
        await apiFetch("/tuitions", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Tuition submitted — waiting for admin approval");
      }
      router.push("/dashboard/tutor/my-tuitions");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-lg">Batch basics</h3>
        <p className="mt-1 text-xs text-muted">
          Clear titles help students find the right batch. You can edit this later.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Tuition title" required htmlFor="title" className="sm:col-span-2">
            <Input
              id="title"
              value={values.title}
              onChange={(event) => update("title", event.target.value)}
              placeholder="e.g. Higher Math Mastery for Class 9–10"
              maxLength={120}
              required
            />
          </Field>

          <Field label="Subject" required htmlFor="subject">
            <Select
              id="subject"
              value={values.subject}
              onChange={(event) => update("subject", event.target.value)}
              required
            >
              <option value="">Choose a subject</option>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Class level" required htmlFor="classLevel">
            <Select
              id="classLevel"
              value={values.classLevel}
              onChange={(event) => update("classLevel", event.target.value)}
              required
            >
              <option value="">Choose a level</option>
              {CLASS_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Mode" required>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map((modeOption) => (
                <button
                  key={modeOption}
                  type="button"
                  onClick={() => update("mode", modeOption)}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-sm font-semibold transition",
                    values.mode === modeOption
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-line bg-surface text-muted hover:border-brand/40"
                  )}
                >
                  {modeOption}
                </button>
              ))}
            </div>
          </Field>

          <Field
            label={values.mode === "Offline" ? "Location" : "Location (optional)"}
            required={values.mode === "Offline"}
            htmlFor="location"
            hint={values.mode === "Online" ? "City or area shown on the listing" : undefined}
          >
            <Input
              id="location"
              value={values.location}
              onChange={(event) => update("location", event.target.value)}
              placeholder="e.g. Agrabad, Chattogram"
            />
          </Field>

          <Field label="Monthly fee (BDT)" required htmlFor="monthlyFee">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">
                ৳
              </span>
              <Input
                id="monthlyFee"
                type="number"
                min="1"
                value={values.monthlyFee}
                onChange={(event) => update("monthlyFee", event.target.value)}
                placeholder="3500"
                className="pl-8"
                required
              />
            </div>
          </Field>

          <Field label="Days per week" required htmlFor="daysPerWeek">
            <Select
              id="daysPerWeek"
              value={values.daysPerWeek}
              onChange={(event) => update("daysPerWeek", event.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <option key={day} value={day}>
                  {day} {day === 1 ? "day" : "days"}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-lg">Banner image</h3>
        <p className="mt-1 text-xs text-muted">
          Upload a photo (max 5 MB) or paste an image URL. Uploads go to the cloud.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-[220px_1fr] sm:items-start">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-dashed border-line bg-surface-2">
            {values.bannerImage ? (
              <Photo src={values.bannerImage} alt="Tuition banner preview" />
            ) : (
              <div className="grid h-full place-items-center text-center text-muted">
                <div>
                  <ImagePlus className="mx-auto h-6 w-6" />
                  <p className="mt-1 text-[11px]">No banner yet</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="banner-file"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UploadCloud className="h-4 w-4" />
              )}
              {uploading ? "Uploading…" : "Upload image"}
            </Button>

            <Field label="Or paste an image URL" htmlFor="bannerImage">
              <Input
                id="bannerImage"
                value={values.bannerImage}
                onChange={(event) => update("bannerImage", event.target.value)}
                placeholder="https://i.ibb.co/…"
              />
            </Field>

            {values.bannerImage ? (
              <button
                type="button"
                onClick={() => update("bannerImage", "")}
                className="text-xs font-semibold text-danger hover:underline"
              >
                Remove banner
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-lg">Description</h3>
        <p className="mt-1 text-xs text-muted">
          What will students learn, and how do you teach?
        </p>
        <Field label="Batch description" required htmlFor="description" className="mt-4">
          <Textarea
            id="description"
            rows={6}
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
            placeholder="A structured batch covering… weekly exams… doubt sessions…"
            maxLength={1500}
            required
          />
        </Field>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-[#8a5a09] dark:text-accent">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          {isEdit
            ? "Editing sends this listing back to the admin pending queue."
            : "New listings stay pending until an admin approves them."}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/tutor/my-tuitions")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving || uploading}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Submit for approval"}
          </Button>
        </div>
      </div>

      {values.monthlyFee ? (
        <p className="text-center text-xs text-muted">
          Students will see{" "}
          <span className="font-semibold text-fg">{formatBDT(values.monthlyFee)}</span>{" "}
          per month on your listing.
        </p>
      ) : null}
    </form>
  );
}
