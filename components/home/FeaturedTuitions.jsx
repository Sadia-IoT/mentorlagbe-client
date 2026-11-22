import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import { buttonClasses } from "@/components/ui/Button";
import TuitionCard from "@/components/tuitions/TuitionCard";

export default function FeaturedTuitions({ tuitions = [] }) {
  return (
    <section className="container-ml py-16 sm:py-20">
      <SectionHeading
        eyebrow="01 — Featured batches"
        title="Hand-checked batches, ready to join"
        description="Every listing below was reviewed by our admin team. Compare fees, schedules and tutors before you apply."
        action={
          <Link
            href="/tuitions"
            className={buttonClasses({ variant: "outline", size: "sm", className: "gap-1.5" })}
          >
            Browse all tuitions
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mt-9">
        {tuitions.length ? (
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No featured batches yet"
            description="New tuition batches appear here as soon as our admin team approves them."
            action={
              <Link href="/tuitions" className={buttonClasses({ size: "sm" })}>
                Browse tuitions
              </Link>
            }
          />
        )}
      </div>
    </section>
  );
}
