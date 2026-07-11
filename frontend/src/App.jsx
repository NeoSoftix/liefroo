import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import MobileAppDevelopment from "./pages/MobileAppDevelopment";
import PrinterIntegration from "./pages/PrinterIntegration";
import POSSystemDevelopment from "./pages/POSSystemDevelopment";
import TechnicalSupport from "./pages/TechnicalSupport";
import MenuManagement from "./pages/MenuManagement";
import GoogleBusinessSEO from "./pages/GoogleBusinessSEO";
import MetaAds from "./pages/MetaAds";
import GoogleAds from "./pages/GoogleAds";
import OnlineOrdering from "./pages/OnlineOrdering";
import GoogleAnalytics from "./pages/GoogleAnalytics";
import ReservationSystem from "./pages/ReservationSystem";
import QROrdering from "./pages/QROrdering";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/website-development" element={<WebsiteDevelopment />} />
        <Route path="/mobile-app-development" element={<MobileAppDevelopment />} />
        <Route path="/printer-integration" element={<PrinterIntegration />} />
        <Route path="/pos-system-development" element={<POSSystemDevelopment />} />
        <Route path="/technical-support" element={<TechnicalSupport />} />
        <Route path="/menu-management" element={<MenuManagement />} />
        <Route path="/google-business-seo" element={<GoogleBusinessSEO />} />
        <Route path="/meta-ads" element={<MetaAds />} />
        <Route path="/google-ads" element={<GoogleAds />} />
        <Route path="/online-ordering" element={<OnlineOrdering />} />
        <Route path="/google-analytics" element={<GoogleAnalytics />} />
        <Route path="/reservation-system" element={<ReservationSystem />} />
        <Route path="/qr-ordering" element={<QROrdering />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
