"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { CLASS_LEVELS, MODES } from "@/lib/constants";

export default function TuitionFilters({ subjects = [], classLevels = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = {
    search: searchParams.get("search") || "",
    subject: searchParams.get("subject") || "",
    classLevel: searchParams.get("classLevel") || "",
    mode: searchParams.get("mode") || "",
  };

  const levels = classLevels.length ? classLevels : CLASS_LEVELS;
  const hasFilters = Object.values(current).some(Boolean);

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const key of ["search", "subject", "classLevel", "mode"]) {
      const value = String(form.get(key) || "").trim();
      if (value) params.set(key, value);
    }

    router.push(`/tuitions${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-surface p-4 shadow-[0_18px_40px_-34px_rgba(18,33,29,0.5)]"
    >
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_0.9fr_auto]">
        <label className="relative">
          <span className="sr-only">Search tuitions</span>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            name="search"
            defaultValue={current.search}
            placeholder="Search by title or subject…"
            className="pl-10"
          />
        </label>

        <label>
          <span className="sr-only">Subject</span>
          <Select name="subject" defaultValue={current.subject}>
            <option value="">All subjects</option>
            {subjects.map((subject) => (
              <option key={subject.name} value={subject.name}>
                {subject.name} ({subject.count})
              </option>
            ))}
          </Select>
        </label>

        <label>
          <span className="sr-only">Class level</span>
          <Select name="classLevel" defaultValue={current.classLevel}>
            <option value="">All class levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </label>

        <label>
          <span className="sr-only">Mode</span>
          <Select name="mode" defaultValue={current.mode}>
            <option value="">Any mode</option>
            {MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </Select>
        </label>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1 lg:flex-none">
            <Search className="h-4 w-4" />
            Filter
          </Button>
          {hasFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => router.push("/tuitions")}
              aria-label="Clear filters"
              className="border border-line"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
