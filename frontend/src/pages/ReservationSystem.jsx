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
  LayoutGrid,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";
import serviceImage from "../assets/reservation.png";

const features = [
  { key: "onlineReservations", Icon: CalendarCheck },
  { key: "guestManagement", Icon: Users },
  { key: "realTimeAvailability", Icon: Clock },
  { key: "reminders", Icon: Bell },
  { key: "reports", Icon: BarChart3 },
  { key: "integration", Icon: Puzzle },
];

const steps = [
  { key: "guestBooks", Icon: CalendarCheck },
  { key: "checkAvailability", Icon: Search },
  { key: "confirmBooking", Icon: CheckCircle2 },
  { key: "manageEfficiently", Icon: Users },
  { key: "serveBetter", Icon: Star },
];

const highlights = [
  { key: "occupancy", Icon: LayoutGrid },
  { key: "noShows", Icon: XCircle },
  { key: "satisfaction", Icon: Users },
  { key: "saveTime", Icon: Clock },
  { key: "revenue", Icon: TrendingUp },
];

export default function ReservationSystem() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="reservationSystem"
      path="/reservation-system"
      hero={{
        checklist: ["onlineReservations", "realTimeAvailability", "guestManagement", "reminders", "noShows", "reports"],
        features,
        featuresGridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
        ctaTarget: "how-it-works",
        image: serviceImage,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-3" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("reservationSystem.betterReservations.eyebrow")}
          heading={t("reservationSystem.betterReservations.heading")}
          items={translateItems(t, "reservationSystem.betterReservations.stats", highlights, { title: "" })}
          gridClassName="grid-cols-2 md:grid-cols-5"
        />
      }
      testimonial={{
        stats: ["occupancy", "noShows", "repeatBookings", "rating", "availability"],
        gridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      }}
    />
  );
}
