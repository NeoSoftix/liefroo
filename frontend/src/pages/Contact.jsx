import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout";
import { ContactSection } from "../components/shared";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t("contact.seo.title")} description={t("contact.seo.description")} path="/contact">
      {/* Spacer for the fixed header */}
      <div className="pt-20 lg:pt-24 bg-[#fafafa]">
        <ContactSection />
      </div>
    </PageLayout>
  );
}
