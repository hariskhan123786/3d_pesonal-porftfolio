"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Code, ExternalLink, Layers, Sparkles } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string; // hex or tailwind class color for spotlight
  glowColor: string; // rgba color for the spotlight glow
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Skill Share Platform",
    category: "Full Stack Web Application",
    description: "A comprehensive Laravel-based platform allowing users to share, learn, and upload digital skills. Built with clean database relational design and user role management.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
    link: "https://github.com/hariskhan123786/HK-CODER-Personal-portfolio",
  },
  {
    id: 2,
    title: "Contact Notebook",
    category: "Database & CRUD Application",
    description: "A secure and intuitive contact cataloging system. Features user authorization, search filter parameters, and full CRUD mechanics using core PHP scripts.",
    tags: ["PHP", "MySQL", "JavaScript", "CSS"],
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
    link: "https://github.com/hariskhan123786/HK-CODER-Personal-portfolio",
  },
  {
    id: 3,
    title: "Skills Hub Design",
    category: "Figma UI/UX & Brand Identity",
    description: "Complete design layout system, branding styles, typography rules, and interactive web layout components prototype for Skills Hub platform in Figma.",
    tags: ["Figma", "UI/UX Design", "Vector Graphics", "Mockups"],
    color: "from-emerald-400 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    link: "https://github.com/hariskhan123786/HK-CODER-Personal-portfolio",
  },
  {
    id: 4,
    title: "E-Commerce Layout",
    category: "Frontend E-Shop Prototype",
    description: "Fully responsive online storefront layout with grid configurations, filter sidebars, floating detail models, and shopping cart logic integration.",
    tags: ["HTML5", "Bootstrap 5", "JavaScript", "CSS3"],
    color: "from-amber-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.15)",
    link: "https://github.com/hariskhan123786/HK-CODER-Personal-portfolio",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Spotlight mouse tracking variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse coordinates
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    // Reset position to card center to fade out smoothly
    if (cardRef.current) {
      mouseX.set(cardRef.current.offsetWidth / 2);
      mouseY.set(cardRef.current.offsetHeight / 2);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]"
    >
      {/* Interactive Spotlight Radial Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(450px circle at ${smoothX.get()}px ${smoothY.get()}px, ${project.glowColor}, transparent 80%)`,
        }}
      />

      {/* Decorative top gradient edge */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors duration-300">
              {project.category}
            </span>
            <div className={`p-2 rounded-xl bg-white/[0.03] group-hover:bg-white/10 text-neutral-400 group-hover:text-white transition-all duration-300 border border-white/5`}>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
            {project.title}
          </h3>

          <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>

        {/* Tech Tags and Footer */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/5 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-neutral-400 group-hover:text-white transition-colors duration-300 uppercase"
          >
            <span>View Case Study</span>
            <span className="h-[1px] w-8 bg-neutral-600 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative z-20 bg-[#121212] py-24 sm:py-32 px-6 sm:px-12 md:px-24">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-[128px]" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-blue-500 font-mono text-xs uppercase tracking-[0.3em]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Selected Works</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white"
          >
            Selected <br />
            <span className="text-stroke-white text-transparent">Creations</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-400 font-light text-base sm:text-lg"
          >
            A curated showcase of applications built with Laravel, core PHP backend structures, custom databases, and modern design prototypes.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
