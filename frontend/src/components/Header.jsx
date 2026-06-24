// components/Header.jsx

import { Menu, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-full px-8 py-4 shadow-[0_15px_50px_rgba(0,0,0,0.08)]">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              R
            </div>

            <h2 className="font-black text-xl">
              Restro<span className="text-red-600">OS</span>
            </h2>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            <a href="#">Home</a>
            <a href="#">Products</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden lg:flex bg-red-600 text-white px-6 py-3 rounded-full">
              Book Demo
            </button>

            <Menu size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}