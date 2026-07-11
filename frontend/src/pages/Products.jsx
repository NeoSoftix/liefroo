import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import RestaurantEcosystem from "../components/RestaurantEcosystem";
import OrderingExperience from "../components/OrderingExperience";
import PoSSection from "../components/POSSection";
import ReservationSection from "../components/ReservationSection";
import Footer from "../components/Footer";
import QRSection from "../components/QRSection";
import FAQ from "../components/FAQ";
import WebsiteMarketingSection from "../components/WebsiteMarketingSection";
import ContactSection from "../components/ContactSection";

export default function Products() {
  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Header />
      <HeroSlider />
      <RestaurantEcosystem />
      <OrderingExperience />
      <WebsiteMarketingSection />

      <PoSSection />
      <ReservationSection />
      <QRSection />

      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}

