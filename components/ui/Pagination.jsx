import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function pageWindow(page, totalPages) {
  const pages = new Set([1, totalPages]);
  for (let i = page - 1; i <= page + 1; i += 1) {
    if (i > 0 && i <= totalPages) pages.add(i);
  }
  return [...pages].sort((a, b) => a - b);
}

export default function Pagination({ page, totalPages, makeHref }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = pageWindow(page, totalPages);
  const base =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition";

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {page > 1 ? (
        <Link
          href={makeHref(page - 1)}
          className={cn(base, "border-line bg-surface text-fg hover:border-brand/40")}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-1 hidden sm:inline">Previous</span>
        </Link>
      ) : null}

      {pages.map((item, index) => {
        const previous = pages[index - 1];
        const gap = previous && item - previous > 1;

        return (
          <span key={item} className="flex items-center gap-2">
            {gap ? <span className="px-1 text-muted">…</span> : null}
            <Link
              href={makeHref(item)}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                base,
                item === page
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-surface text-fg hover:border-brand/40"
              )}
            >
              {item}
            </Link>
          </span>
        );
      })}

      {page < totalPages ? (
        <Link
          href={makeHref(page + 1)}
          className={cn(base, "border-line bg-surface text-fg hover:border-brand/40")}
          aria-label="Next page"
        >
          <span className="mr-1 hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}
