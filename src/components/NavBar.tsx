"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 py-4 md:px-12 flex justify-center`}
    >
      <div
        className={`flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-black/60 border-white/10 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-white/[0.01] border-white/5 backdrop-blur-xs"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] font-semibold text-white">
            HARIS KHAN <span className="text-neutral-500">.</span>
          </span>
        </div>

        {/* Links */}
        <nav className="hidden sm:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("work")}
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors duration-300 uppercase cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors duration-300 uppercase cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors duration-300 uppercase cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* CTA */}
        <div>
          <a
            href="mailto:hariskhan123786@gmail.com"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-mono tracking-widest font-semibold rounded-full group bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-600 text-white focus:ring-2 focus:outline-hidden focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-neutral-950 rounded-full group-hover:bg-opacity-0">
              SAY HELLO
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
