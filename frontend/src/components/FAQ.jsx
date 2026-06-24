import React from "react";
import faqImage from "../assets/FAQimage.png";
const FAQ = () => {
  const faqs = [
    {
      id: "01",
      question: "What is the Food Ordering System?",
      answer:
        "Our platform allows users to browse menus, place orders, and track deliveries online.",
    },
    {
      id: "02",
      question: "How do I place an order?",
      answer: "Select your meal, add it to cart, and proceed to checkout.",
    },
    {
      id: "03",
      question: "What payment methods are accepted?",
      answer: "UPI, Debit Card, Credit Card, Net Banking and Cash on Delivery.",
    },
  ];
  return (
    <section
      className="min-h-screen bg-center bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${faqImage})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-[650px]">
          <p className="text-red-600 font-semibold text-xl">
            FOOD ORDERING SYSTEM
          </p>

          <h1 className="text-[100px] leading-none font-bold text-red-600">
            FAQ
          </h1>

          <h2 className="text-4xl font-medium text-gray-800">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our food ordering system.
          </p>
        </div>
        {/* question  */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="group bg-white/80 backdrop-blur-md rounded-full px-5 py-4 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                {/* Number */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-lg flex items-center justify-center shrink-0">
                  {faq.id}
                </div>

                {/* Question */}
                <h3 className="flex-1 text-lg md:text-xl font-semibold text-gray-800">
                  {faq.question}
                </h3>

                {/* Arrow */}
                <div className="text-red-500 text-2xl transition-transform duration-300 group-hover:rotate-180">
                  ⌄
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
