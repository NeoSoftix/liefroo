import scanBg from "../assets/scan.png";
import {
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

export default function QRSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="relative min-h-[850px] rounded-[40px] overflow-hidden shadow-2xl">

          {/* Background Image */}
          <img
            src={scanBg}
            alt="QR Ordering"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* White Overlay Right Side */}
          <div className="absolute right-0 top-0 h-full w-full lg:w-[48%]  backdrop-blur-sm flex items-center">
            <div className="px-8 lg:px-16">

              {/* Tag */}
              <div className="inline-flex items-center border border-red-500 rounded-full px-6 py-3 text-red-600 font-semibold tracking-wide mb-8">
                QR ORDERING & PAY
              </div>

              {/* Heading */}
              <h2 className="text-[60px] lg:text-[90px] leading-[0.95] font-black uppercase text-black">
                Scan.
                <br />
                Order.
                <br />
                Pay.
                <br />
                <span className="text-red-600">Repeat.</span>
              </h2>

              {/* Description */}
              <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
                Guests order and pay directly from the table via QR —
                fully connected to your POS system for a seamless dining
                experience.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border border-red-200 flex items-center justify-center">
                    <FiClock className="text-red-600 text-2xl" />
                  </div>
                  <h4 className="mt-3 font-semibold">Faster</h4>
                  <p className="text-gray-500 text-sm">Service</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border border-red-200 flex items-center justify-center">
                    <FiTrendingUp className="text-red-600 text-2xl" />
                  </div>
                  <h4 className="mt-3 font-semibold">Higher</h4>
                  <p className="text-gray-500 text-sm">AOV</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border border-red-200 flex items-center justify-center">
                    <FiUsers className="text-red-600 text-2xl" />
                  </div>
                  <h4 className="mt-3 font-semibold">Less Staff</h4>
                  <p className="text-gray-500 text-sm">Workload</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border border-red-200 flex items-center justify-center">
                    <FiShield className="text-red-600 text-2xl" />
                  </div>
                  <h4 className="mt-3 font-semibold">Secure</h4>
                  <p className="text-gray-500 text-sm">Payments</p>
                </div>

              </div>

              {/* CTA */}
              <button className="group mt-14 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg flex items-center gap-4 transition-all duration-300">
                See QR Ordering In Action
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

            </div>
          </div>

          {/* Decorative Lines */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-20">
            <div className="absolute inset-0 border border-red-200 rounded-full scale-100"></div>
            <div className="absolute inset-0 border border-red-200 rounded-full scale-125"></div>
            <div className="absolute inset-0 border border-red-200 rounded-full scale-150"></div>
          </div>

        </div>
      </div>
    </section>
  );
}