"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import Button from "@/components/ui/Button";
import { MODES } from "@/lib/constants";

export default function HeroSearch({ subjects = [] }) {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (mode) params.set("mode", mode);
    router.push(`/tuitions${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-2 rounded-2xl border border-line bg-surface p-2 shadow-[0_20px_50px_-34px_rgba(18,33,29,0.55)] sm:flex-row sm:items-center sm:rounded-full"
    >
      <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 sm:rounded-full">
        <Search className="h-4 w-4 shrink-0 text-brand" />
        <span className="sr-only">Subject</span>
        <select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full appearance-none bg-transparent text-sm font-medium text-fg outline-none"
        >
          <option value="">What do you want to learn?</option>
          {subjects.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <span className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />

      <label className="flex items-center gap-2 rounded-xl px-3 py-2 sm:rounded-full">
        <SlidersHorizontal className="h-4 w-4 shrink-0 text-brand" />
        <span className="sr-only">Mode</span>
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value)}
          className="bg-transparent text-sm font-medium text-fg outline-none"
        >
          <option value="">Any mode</option>
          {MODES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <Button type="submit" className="shrink-0 sm:h-10">
        <Search className="h-4 w-4" />
        Find tuition
      </Button>
    </form>
  );
}
