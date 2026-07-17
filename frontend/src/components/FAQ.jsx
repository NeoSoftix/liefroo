import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import faqImage from "../assets/FAQimage.png";

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: "01",
      question: t("faq.items.q1.question"),
      answer: t("faq.items.q1.answer"),
    },
    {
      id: "02",
      question: t("faq.items.q2.question"),
      answer: t("faq.items.q2.answer"),
    },
    {
      id: "03",
      question: t("faq.items.q3.question"),
      answer: t("faq.items.q3.answer"),
    },
    {
      id: "04",
      question: t("faq.items.q4.question"),
      answer: t("faq.items.q4.answer"),
    },
    {
      id: "05",
      question: t("faq.items.q5.question"),
      answer: t("faq.items.q5.answer"),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="snap-start snap-always min-h-screen flex flex-col justify-center relative z-10 bg-cover bg-center bg-no-repeat py-8 lg:py-16"
      style={{
        backgroundImage: `url(${faqImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute " />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        {/* Heading */}
        <div className="max-w-[700px]">
          <p className="text-red-600 font-semibold tracking-[3px] uppercase text-xs sm:text-sm mb-1 sm:mb-2">
            {t("faq.eyebrow")}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600">
            {t("faq.title")}
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
            {t("faq.heading")}
          </h2>

          <p className="mt-2 text-xs sm:text-sm lg:text-base text-gray-600 max-w-[600px]">
            {t("faq.description")}
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-6 w-full lg:w-[70%] space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="w-full lg:w-[80%] group bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-[0_8px_20px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(220,38,38,0.1)]"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3 sm:gap-5 text-left"
              >
                {/* Number */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md">
                  {faq.id}
                </div>

                {/* Question Text */}
                <h3 className="flex-1 text-sm sm:text-base font-semibold text-gray-800 leading-snug">
                  {faq.question}
                </h3>

                {/* Toggle Icon */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-red-600 bg-red-50 text-base sm:text-lg font-light transition-all duration-300 shrink-0 ${
                    openIndex === index
                      ? "rotate-180 bg-red-600 text-white"
                      : ""
                  }`}
                >
                  {openIndex === index ? "−" : "+"}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-6 sm:pl-[76px] pr-4 sm:pr-8 pb-4 sm:pb-6 text-gray-600 leading-relaxed text-xs sm:text-sm">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;