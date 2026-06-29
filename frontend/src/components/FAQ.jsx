import React, { useState } from "react";
import faqImage from "../assets/FAQimage.png";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: "01",
      question: "What is an Online Ordering System?",
      answer:
        "An online ordering system allows customers to browse menus, place orders, and make secure payments directly through your website or mobile device.",
    },
    {
      id: "02",
      question: "Can customers order without downloading an app?",
      answer:
        "Yes. Customers can order directly from your website by simply scanning a QR code or visiting your ordering page.",
    },
    {
      id: "03",
      question: "Does the system support online payments?",
      answer:
        "Yes. The platform supports UPI, Credit Cards, Debit Cards, Net Banking, Wallets, and other secure payment gateways.",
    },
    {
      id: "04",
      question: "Can I manage orders in real time?",
      answer:
        "Absolutely. Restaurant staff can view, accept, reject, and track orders instantly from the admin dashboard.",
    },
    {
      id: "05",
      question: "Does the system support table reservations?",
      answer:
        "Yes. Customers can reserve tables online and receive instant booking confirmations.",
    },
  
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${faqImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 " />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="max-w-[700px]">
          <p className="text-red-600 font-semibold tracking-[3px] uppercase text-lg mb-2">
            FOOD ORDERING SYSTEM
          </p>

          <h1 className="text-[80px] md:text-[100px] leading-none font-black text-red-600">
            FAQ
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-[600px]">
            Find answers to common questions about our online food ordering
            platform, payments, reservations, and restaurant management tools.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-14 w-full lg:w-[70%] space-y-5 ">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="w-[80%] group bg-white/80 backdrop-blur-md rounded-[32px] border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)]"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center gap-5 text-left"
              >
                {/* Number */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-lg">
                  {faq.id}
                </div>

                {/* Question Text */}
                <h3 className="flex-1 text-lg md:text-xl font-semibold text-gray-800">
                  {faq.question}
                </h3>

                {/* Toggle Icon */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-red-600 bg-red-50 text-2xl font-light transition-all duration-300 ${
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
                <div className="pl-[95px] pr-8 pb-6 text-gray-600 leading-relaxed text-base md:text-lg">
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