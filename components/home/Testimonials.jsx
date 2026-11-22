import SectionHeading from "@/components/ui/SectionHeading";
import Stars from "@/components/ui/Stars";
import Avatar from "@/components/layout/Avatar";

const testimonials = [
  {
    name: "Ayesha Siddiqua",
    role: "HSC student · Chattogram",
    rating: 5,
    quote:
      "I found my Higher Math tutor in one evening. The batch details were honest, the fee was clear, and my grade went from B to A in two months.",
  },
  {
    name: "Nafisa Rahman",
    role: "Tutor · Mathematics",
    rating: 5,
    quote:
      "Posting a batch takes two minutes and applications arrive with the student's schedule and note — no more endless Messenger back-and-forth.",
  },
  {
    name: "Rifat Chowdhury",
    role: "Admission candidate · Chattogram",
    rating: 5,
    quote:
      "The Pro plan lets me save every batch I like and apply early. The review section helped me choose a tutor I actually trust.",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-ml py-16 sm:py-20">
        <SectionHeading
          eyebrow="04 — Student stories"
          title="Quiet progress, real results"
          description="Feedback from students and tutors who use MentorLagbe every week."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg p-6"
            >
              <Stars rating={item.rating} />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg/85">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-line pt-4">
                <Avatar user={{ name: item.name }} size={40} />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
