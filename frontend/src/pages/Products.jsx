import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import RestaurantEcosystem from "../components/RestaurantEcosystem";
import OrderingExperience from "../components/OrderingExperience";
import PoSSection from "../components/POSSection";
import ReservationSection from "../components/ReservationSection";
import Footer from "../components/Footer";
import QRSection from "../components/QRSection";
import FAQ from "../components/FAQ";

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
      <FAQ />
      <Footer />
    </>
  );
}

