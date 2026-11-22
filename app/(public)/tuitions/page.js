import { BookOpen, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import TuitionCard from "@/components/tuitions/TuitionCard";
import TuitionFilters from "@/components/tuitions/TuitionFilters";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import { buttonClasses } from "@/components/ui/Button";
import { getJson } from "@/lib/server-api";

export const metadata = {
  title: "Browse Tuitions",
  description:
    "Search verified online and offline tuition batches by subject, class level and mode.",
};

const LIMIT = 9;

export default async function TuitionsPage({ searchParams }) {
  const sp = (await searchParams) || {};

  const search = typeof sp.search === "string" ? sp.search : "";
  const subject = typeof sp.subject === "string" ? sp.subject : "";
  const classLevel = typeof sp.classLevel === "string" ? sp.classLevel : "";
  const mode = typeof sp.mode === "string" ? sp.mode : "";
  const page = Math.max(parseInt(sp.page, 10) || 1, 1);

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (subject) params.set("subject", subject);
  if (classLevel) params.set("classLevel", classLevel);
  if (mode) params.set("mode", mode);
  params.set("page", String(page));
  params.set("limit", String(LIMIT));

  const [data, facets] = await Promise.all([
    getJson(`/tuitions?${params.toString()}`, {
      tuitions: [],
      total: 0,
      page: 1,
      totalPages: 0,
    }),
    getJson("/tuitions/filters", { subjects: [], classLevels: [] }),
  ]);

  const tuitions = data?.tuitions || [];
  const totalPages = data?.totalPages || 0;

  function makeHref(targetPage) {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (subject) next.set("subject", subject);
    if (classLevel) next.set("classLevel", classLevel);
    if (mode) next.set("mode", mode);
    if (targetPage > 1) next.set("page", String(targetPage));
    return `/tuitions${next.size ? `?${next.toString()}` : ""}`;
  }

  const activeChips = [
    search && { label: `“${search}”` },
    subject && { label: subject },
    classLevel && { label: classLevel },
    mode && { label: mode },
  ].filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="paper-dots absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-ml relative py-10 sm:py-14">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
            <span className="h-px w-7 bg-brand/40" />
            Browse tuitions
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="max-w-2xl text-[34px] leading-[1.1] sm:text-[44px]">
                Find a batch that fits your week
              </h1>
              <p className="mt-3 max-w-xl text-[15px] text-muted">
                Every listing is admin-approved. Filter by subject, class level
                or mode to narrow things down.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-bg px-5 py-3 text-center">
              <p className="font-display text-3xl leading-none">{data?.total || 0}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                open batches
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-ml py-8 sm:py-10">
        <TuitionFilters
          subjects={facets?.subjects || []}
          classLevels={facets?.classLevels || []}
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {activeChips.length ? "Active filters" : "All results"}
            </span>
            {activeChips.map((chip) => (
              <span
                key={chip.label}
                className="rounded-full border border-brand/25 bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand"
              >
                {chip.label}
              </span>
            ))}
          </div>
          <Link href="/tuitions" className="text-xs font-semibold text-muted hover:text-brand">
            Reset everything
          </Link>
        </div>

        <div className="mt-6">
          {tuitions.length ? (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No batches match those filters"
              description="Try a different subject or class level — or clear the filters to see every open batch."
              action={
                <Link href="/tuitions" className={buttonClasses({ size: "sm" })}>
                  Clear filters
                </Link>
              }
            />
          )}
        </div>

        <Pagination page={page} totalPages={totalPages} makeHref={makeHref} />
      </section>
    </>
  );
}
