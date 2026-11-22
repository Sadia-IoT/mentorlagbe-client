import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { subjectIcon } from "@/lib/subject-icons";

const fallback = [
  { name: "Mathematics", count: 3 },
  { name: "Physics", count: 2 },
  { name: "English", count: 2 },
  { name: "Programming", count: 1 },
  { name: "Chemistry", count: 1 },
  { name: "IELTS", count: 1 },
];

export default function TopSubjects({ subjects = [] }) {
  const items = subjects.length ? subjects.slice(0, 6) : fallback;

  return (
    <section className="container-ml py-16 sm:py-20">
      <SectionHeading
        eyebrow="03 — Top subjects"
        title="Learn the subjects students ask for most"
        description="From school fundamentals to admission prep and professional English — there is a batch for every goal."
      />

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((subject, index) => {
          const Icon = subjectIcon(subject.name);
          return (
            <Link
              key={subject.name}
              href={`/tuitions?subject=${encodeURIComponent(subject.name)}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_40px_-30px_rgba(18,33,29,0.5)]"
            >
              <div className="flex items-center gap-3.5">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg leading-tight">{subject.name}</p>
                  <p className="text-xs text-muted">
                    {subject.count} {subject.count === 1 ? "batch" : "batches"} available
                  </p>
                </div>
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition group-hover:border-brand/40 group-hover:text-brand">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
