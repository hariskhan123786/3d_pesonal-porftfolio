"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import NavBar from "@/components/NavBar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress over the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="relative bg-[#121212] min-h-screen text-white">
      {/* Floating Capsule NavBar */}
      <NavBar />

      {/* 500vh Scroll-linked Canvas Section */}
      <div ref={containerRef} className="relative h-[500vh] w-full">
        {/* Sticky viewport for Canvas and Overlay */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
          <ScrollyCanvas scrollYProgress={scrollYProgress} />
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* Projects Showcase Section */}
      <Projects />

      {/* About & Skills Section */}
      <About />

      {/* Footer / Contact Section */}
      <footer id="contact" className="relative z-20 bg-[#0c0c0c] py-24 px-6 sm:px-12 md:px-24 border-t border-white/5 text-center space-y-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white max-w-xl mx-auto leading-none">
          Let's create <br />
          <span className="text-stroke-white text-transparent">something iconic</span>
        </h2>
        
        <p className="text-neutral-400 font-light max-w-md mx-auto text-sm sm:text-base">
          Currently accepting selective client works, freelance, and contract positions. Let's build the future of the web together.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="mailto:hariskhan123786@gmail.com"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black font-mono tracking-widest text-xs font-semibold hover:bg-neutral-200 transition-colors duration-300 uppercase shadow-lg shadow-white/5"
          >
            Email Me
          </a>
          <a
            href="https://wa.me/923188353770"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-mono tracking-widest text-xs font-semibold transition-colors duration-300 uppercase shadow-lg shadow-emerald-500/10"
          >
            WhatsApp
          </a>
        </div>
        
        <div className="pt-16 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 max-w-6xl mx-auto text-[10px] sm:text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} Haris Khan. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://github.com/hariskhan123786" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.instagram.com/itx_haris_077" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.facebook.com/share/1XbTNiT293/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
