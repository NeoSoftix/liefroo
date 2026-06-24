import { useState } from "react";
import { slides } from "../../data/slides";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import FeatureCard from "./FeatureCard";
import Button from "./Button";
export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">

      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]" />

      <AnimatePresence mode="wait">

        <motion.div
          key={slides[active].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-6 pt-44"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT CONTENT */}

            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex bg-red-100 text-red-600 px-5 py-2 rounded-full font-medium">
                {slides[active].subtitle}
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mt-6 leading-[0.95]">
                {slides[active].title}
              </h1>

              <p className="text-lg text-gray-600 mt-6 max-w-xl leading-relaxed">
                {slides[active].description}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Button
  onClick={() => console.log("Book Demo")}
  className="
    bg-red-600 text-white border border-red-600
    px-8 py-4 rounded-full font-semibold shadow-lg
    transition-all duration-300
    hover:bg-white hover:text-red-600
  "
>
  Book Demo
</Button>
<Button
  onClick={() => console.log("Learn More")}
  className="
    bg-white text-black border border-red-600
    px-8 py-4 rounded-full font-semibold
    transition-all duration-300
    hover:bg-red-600 hover:text-white
  "
>
  Learn More
</Button>


              </div>

              <div className="flex flex-wrap gap-8 mt-10 text-sm font-medium text-gray-700">

                <div className="flex items-center gap-2">
                  <span className="text-red-600">✓</span>
                  Live in 30 minutes
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-red-600">✓</span>
                  0% commission
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-red-600">✓</span>
                  Smart Restaurant OS
                </div>

              </div>
            </motion.div>

            {/* RIGHT SIDE */}

            <div className="relative flex justify-center items-center">

              {/* Main Glow */}

              <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-100 via-red-50 to-transparent blur-3xl" />

              {/* Image */}

              <motion.img
                key={slides[active].image}
                src={slides[active].image}
                alt={slides[active].title}
                initial={{
                  x: 250,
                  opacity: 0,
                  scale: 0.9,
                  rotate: 5,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: [0, -15, 0],
                }}
                exit={{
                  x: 250,
                  opacity: 0,
                }}
                transition={{
                  x: {
                    duration: 0.8,
                    ease: "easeOut",
                  },
                  opacity: {
                    duration: 0.6,
                  },
                  scale: {
                    duration: 0.8,
                  },
                  rotate: {
                    duration: 0.8,
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative z-20 w-full max-w-[620px] drop-shadow-[0_50px_60px_rgba(0,0,0,0.18)]"
              />

              {/* Floating Stats Card */}
{/* Floating Stats Card */}

<FeatureCard
  title={slides[active].stat}
  subtitle={slides[active].card}
  className="absolute bottom-10 right-[-80px] z-30"
  size="sm"
/>

{/* Floating Orders Card */}

<FeatureCard
  title="+128"
  subtitle="Orders Today"
  className="absolute left-0 top-20 z-30"
  size="sm"
/>

            </div>

          </div>
        </motion.div>

      </AnimatePresence>

      {/* RIGHT SIDE NAVIGATION */}

      <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-50">

        {/* UP BUTTON */}

        <button
          onClick={prevSlide}
          className="
            w-14 h-14
            rounded-full
            bg-white/90
            backdrop-blur-xl
            border border-gray-200
            shadow-xl
            flex items-center justify-center
            hover:bg-red-600
            hover:text-white
            transition-all duration-300
            hover:scale-110
          "
        >
          <ChevronUp size={22} />
        </button>

        {/* INDICATORS */}

        <div className="flex flex-col gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`rounded-full transition-all duration-500 ${
                active === index
                  ? "w-3 h-20 bg-gradient-to-b from-red-500 to-red-700"
                  : "w-3 h-3 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* DOWN BUTTON */}

        <button
          onClick={nextSlide}
          className="
            w-14 h-14
            rounded-full
            bg-red-600
            text-white
            shadow-xl
            flex items-center justify-center
            hover:bg-red-700
            transition-all duration-300
            hover:scale-110
          "
        >
          <ChevronDown size={22} />
        </button>

      </div>
    </section>
  );
}