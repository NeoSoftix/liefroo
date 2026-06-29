import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiTag,
  FiEdit3,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi";

export default function ContactSection() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-gray-100 p-8 lg:p-14">

          <div className="grid lg:grid-cols-[400px_1fr] gap-16">

            {/* LEFT SIDE */}
            <div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl border border-red-200 flex items-center justify-center text-red-600">
                  💬
                </div>

                <span className="uppercase tracking-[3px] text-red-600 font-semibold text-sm">
                  Contact Us
                </span>
              </div>

              <h2 className="text-5xl font-black leading-tight mb-6">
                Let's create
                <br />
                something
                <br />
                <span className="text-red-600">
                  amazing together.
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Have a question or ready to get started?
                We'd love to hear from you.
              </p>

              <div className="w-12 h-1 bg-red-600 rounded-full mb-10"></div>

              {/* Contact Info */}
              <div className="space-y-8">

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 text-xl">
                    <FiPhone />
                  </div>

                  <div>
                    <p className="text-red-600 font-bold uppercase text-sm">
                      Call Us
                    </p>
                    <p className="font-semibold text-gray-900">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 text-xl">
                    <FiMail />
                  </div>

                  <div>
                    <p className="text-red-600 font-bold uppercase text-sm">
                      Email Us
                    </p>
                    <p className="font-semibold text-gray-900">
                      hello@yourbusiness.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 text-xl">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="text-red-600 font-bold uppercase text-sm">
                      Visit Us
                    </p>

                    <p className="font-semibold text-gray-900">
                      123 Main Street,
                      <br />
                      New Delhi, India
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* FORM SIDE */}
            <div className="bg-white rounded-[30px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 lg:p-10">

              {/* Heading */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-xl">
                  <HiOutlinePaperAirplane />
                </div>

                <h3 className="text-3xl font-bold">
                  Send us a message
                </h3>

                <div className="flex-1 h-[2px] bg-gradient-to-r from-red-500 to-transparent"></div>
              </div>

              {/* Form */}
              <form className="space-y-6">

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="relative">
                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>

                </div>

                <div className="relative">
                  <FiEdit3 className="absolute left-4 top-6 text-gray-400" />

                  <textarea
                    rows="6"
                    placeholder="Your Message"
                    className="w-full pl-12 pt-5 rounded-xl border border-gray-200 outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-16 rounded-xl bg-red-600 text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-all"
                >
                  Send Message
                  <FiArrowRight />
                </button>

                <p className="text-center text-sm text-gray-500 pt-2">
                  🔒 We respect your privacy. Your information will never be shared.
                </p>

              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}