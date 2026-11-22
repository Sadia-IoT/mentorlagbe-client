import { BookOpenCheck, GraduationCap, Star, Users } from "lucide-react";

export default function StatsBand({ stats }) {
  const items = [
    {
      icon: Users,
      value: `${stats?.students || 0}+`,
      label: "Students learning",
    },
    {
      icon: GraduationCap,
      value: `${stats?.tutors || 0}+`,
      label: "Verified tutors",
    },
    {
      icon: BookOpenCheck,
      value: `${stats?.tuitions || 0}+`,
      label: "Live tuition batches",
    },
    {
      icon: Star,
      value: (stats?.averageRating || 4.8).toFixed
        ? (stats?.averageRating || 4.8).toFixed(1)
        : "4.8",
      label: "Average batch rating",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="paper-dots absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <div
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-cream/10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-10 h-56 w-56 rounded-full border border-cream/10"
        aria-hidden="true"
      />

      <div className="container-ml relative grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream/10 text-accent">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-4xl leading-none">{item.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-cream/60">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
