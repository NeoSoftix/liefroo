import { ArrowRight } from "lucide-react";
import { Reveal } from "../motion";
import { useGoToSection } from "./localizedRouting";

/**
 * Closing call-to-action card that scrolls to the contact form — used by the
 * tax-compliance pages.
 */
export default function CtaBanner({ heading, text, buttonLabel, note }) {
  const goToSection = useGoToSection();

  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="rounded-[32px] bg-gradient-to-br from-red-100/70 via-red-50 to-orange-50 border border-red-200 px-6 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{heading}</h2>
          <p className="mt-3 text-gray-600">{text}</p>
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="mt-7 inline-flex items-center gap-2 bg-red-600 text-white border border-red-600 px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-colors"
          >
            {buttonLabel}
            <ArrowRight size={18} />
          </button>
          {note && <p className="mt-6 text-xs text-gray-500">{note}</p>}
        </Reveal>
      </div>
    </section>
  );
}
