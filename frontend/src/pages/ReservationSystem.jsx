import {
  CalendarCheck,
  Users,
  Clock,
  Bell,
  BarChart3,
  Puzzle,
  Search,
  CheckCircle2,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar } from "../components/shared";
import { BetterReservationsSection } from "../components/ReservationSystem";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function ReservationSystem() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: CalendarCheck, key: "onlineReservations" },
    { Icon: Users, key: "guestManagement" },
    { Icon: Clock, key: "realTimeAvailability" },
    { Icon: Bell, key: "reminders" },
    { Icon: BarChart3, key: "reports" },
    { Icon: Puzzle, key: "integration" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`reservationSystem.hero.features.${key}`) }));

  const featureItems = [
    { key: "onlineReservations", Icon: CalendarCheck },
    { key: "guestManagement", Icon: Users },
    { key: "realTimeAvailability", Icon: Clock },
    { key: "reminders", Icon: Bell },
    { key: "reports", Icon: BarChart3 },
    { key: "integration", Icon: Puzzle },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`reservationSystem.featureGrid.items.${key}.title`),
    desc: t(`reservationSystem.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "guestBooks", Icon: CalendarCheck, number: "01" },
    { key: "checkAvailability", Icon: Search, number: "02" },
    { key: "confirmBooking", Icon: CheckCircle2, number: "03" },
    { key: "manageEfficiently", Icon: Users, number: "04" },
    { key: "serveBetter", Icon: Star, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`reservationSystem.process.steps.${key}.title`),
    desc: t(`reservationSystem.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("reservationSystem.testimonial.stats.occupancy"), label: t("reservationSystem.testimonial.stats.occupancyLabel") },
    { value: t("reservationSystem.testimonial.stats.noShows"), label: t("reservationSystem.testimonial.stats.noShowsLabel") },
    { value: t("reservationSystem.testimonial.stats.repeatBookings"), label: t("reservationSystem.testimonial.stats.repeatBookingsLabel") },
    { value: t("reservationSystem.testimonial.stats.rating"), label: t("reservationSystem.testimonial.stats.ratingLabel") },
    { value: t("reservationSystem.testimonial.stats.availability"), label: t("reservationSystem.testimonial.stats.availabilityLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Header />
      <main>
        <ServiceHero
          badge={t("reservationSystem.hero.badge")}
          headingLine1={t("reservationSystem.hero.headingLine1")}
          headingLine2={t("reservationSystem.hero.headingLine2")}
          description={t("reservationSystem.hero.description")}
          checklist={[
            "onlineReservations",
            "realTimeAvailability",
            "guestManagement",
            "reminders",
            "noShows",
            "reports",
          ].map((key) => t(`reservationSystem.hero.checklist.${key}`))}
          ctaLabel={t("reservationSystem.hero.cta")}
          secondaryCtaLabel={t("reservationSystem.hero.secondaryCta")}
          secondaryCtaHref="#success-stories"
          features={heroFeatures}
          featuresGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
        />
        <FeatureGridSection
          items={featureItems}
          gridClassName="sm:grid-cols-2 lg:grid-cols-3"
          centered
        />
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("reservationSystem.process.eyebrow")}
          heading={t("reservationSystem.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <BetterReservationsSection />
        <TestimonialStatsBar
          quote={t("reservationSystem.testimonial.quote")}
          name={t("reservationSystem.testimonial.name")}
          role={t("reservationSystem.testimonial.role")}
          stats={testimonialStats}
          statsGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
