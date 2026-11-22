import Photo from "@/components/ui/Photo";
import Logo from "@/components/layout/Logo";

const points = [
  "Admin-reviewed listings, never random posts",
  "Real schedules, fees and class levels upfront",
  "Apply with one short form — no phone tag",
];

export default function AuthShell({ children }) {
  return (
    <section className="container-ml grid gap-10 py-10 lg:grid-cols-[1fr_1.02fr] lg:items-stretch lg:py-16">
      <div className="order-2 flex items-center lg:order-1">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <aside className="order-1 hidden lg:order-2 lg:block">
        <div className="relative h-full min-h-[560px] overflow-hidden rounded-[28px] border border-line bg-ink">
          <Photo
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Students learning together"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
          <div className="paper-dots absolute inset-0 opacity-20" aria-hidden="true" />

          <div className="relative flex h-full flex-col justify-between p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-cream/20 bg-cream/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/80 backdrop-blur">
                MentorLagbe
              </span>
              <span className="font-display text-2xl text-cream/90">✳</span>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                Tuition, minus the noise
              </p>
              <h2 className="mt-3 max-w-sm text-[34px] leading-[1.12] text-cream">
                The right mentor is one honest listing away.
              </h2>

              <ul className="mt-6 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-cream/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-cream/15 bg-cream/5 p-4 backdrop-blur">
                <p className="text-sm leading-relaxed text-cream/80">
                  “I applied to three batches in one evening and heard back the
                  next morning. The whole process felt calm.”
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Ayesha · HSC student
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Logo href="/" className="[&_span:last-child]:text-cream" />
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
