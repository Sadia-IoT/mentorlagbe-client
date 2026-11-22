import Hero from "@/components/home/Hero";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import TopSubjects from "@/components/home/TopSubjects";
import StatsBand from "@/components/home/StatsBand";
import Testimonials from "@/components/home/Testimonials";
import PricingPreview from "@/components/home/PricingPreview";
import CtaBand from "@/components/home/CtaBand";
import { getJson } from "@/lib/server-api";

export const metadata = {
  title: "MentorLagbe — Find your ideal tutor or mentorship batch",
};

export default async function HomePage() {
  const [featured, stats, filters] = await Promise.all([
    getJson("/tuitions/featured", []),
    getJson("/stats/public", {}),
    getJson("/tuitions/filters", { subjects: [], classLevels: [] }),
  ]);

  const subjects =
    filters?.subjects?.length > 0
      ? filters.subjects
      : stats?.subjects?.length > 0
        ? stats.subjects
        : [];

  return (
    <>
      <Hero stats={stats || {}} subjects={subjects} />
      <FeaturedTuitions tuitions={featured || []} />
      <HowItWorks />
      <TopSubjects subjects={subjects} />
      <StatsBand stats={stats || {}} />
      <Testimonials />
      <PricingPreview />
      <CtaBand />
    </>
  );
}
