import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import RestaurantEcosystem from "../components/RestaurantEcosystem";
import OrderingExperience from "../components/OrderingExperience";
import PoSSection from "../components/POSSection";
import ReservationSection from "../components/ReservationSection";
import Footer from "../components/Footer";
import QRSection from "../components/QRSection";

export default function Products() {
  return (
    <>
      <Header />
      <HeroSlider />
      <RestaurantEcosystem />
      <OrderingExperience />
      <PoSSection />
      <ReservationSection />
      <QRSection />
      <Footer />
    </>
  );
}

