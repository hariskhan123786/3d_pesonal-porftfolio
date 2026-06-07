"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Briefcase, Code, GraduationCap, MapPin, Sparkles, Terminal, User } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  color: string;
  glow: string;
}

const SKILLS: Skill[] = [
  { name: "HTML & Web Standards", percentage: 100, color: "bg-orange-500", glow: "shadow-orange-500/20" },
  { name: "CSS & Modern Layouts", percentage: 90, color: "bg-blue-500", glow: "shadow-blue-500/20" },
  { name: "C# & Application Dev", percentage: 90, color: "bg-purple-500", glow: "shadow-purple-500/20" },
  { name: "PHP & Backend Systems", percentage: 80, color: "bg-indigo-500", glow: "shadow-indigo-500/20" },
  { name: "JavaScript & DOM", percentage: 75, color: "bg-amber-500", glow: "shadow-amber-500/20" },
  { name: "Photoshop & Design", percentage: 55, color: "bg-cyan-500", glow: "shadow-cyan-500/20" },
];

/* ── Animated Card wrapper with subtle border glow ── */
function GlassCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={`group relative rounded-2xl overflow-hidden ${className}`}
    >
      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-[1px] rounded-2xl bg-[#0d1a2d]/90 backdrop-blur-xl" />

      {/* Static border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ── Constellation dots for background decoration ── */
function ConstellationDots() {
  const dots = [
    { top: "8%", left: "12%", size: 3, delay: 0 },
    { top: "15%", left: "85%", size: 2, delay: 1.2 },
    { top: "35%", left: "5%", size: 2.5, delay: 0.6 },
    { top: "55%", left: "92%", size: 2, delay: 2 },
    { top: "70%", left: "15%", size: 3, delay: 1.5 },
    { top: "80%", left: "78%", size: 2, delay: 0.8 },
    { top: "25%", left: "50%", size: 1.5, delay: 1.8 },
    { top: "90%", left: "40%", size: 2, delay: 2.4 },
  ];

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
          className="absolute rounded-full bg-blue-400/40"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}
      {/* Connecting lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
        <line x1="12%" y1="8%" x2="50%" y2="25%" stroke="white" strokeWidth="0.5" />
        <line x1="50%" y1="25%" x2="85%" y2="15%" stroke="white" strokeWidth="0.5" />
        <line x1="5%" y1="35%" x2="15%" y2="70%" stroke="white" strokeWidth="0.5" />
        <line x1="78%" y1="80%" x2="92%" y2="55%" stroke="white" strokeWidth="0.5" />
      </svg>
    </>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 py-28 sm:py-36 px-6 sm:px-12 md:px-24 border-t border-white/5 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0c0c0c 0%, #0a1628 40%, #0d1a2d 70%, #0c0c0c 100%)",
      }}
    >
      {/* Background effects matching the photo's aesthetic */}
      <div className="absolute top-1/4 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/[0.06] blur-[180px]" />
      <div className="absolute bottom-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/[0.04] blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-purple-500/[0.03] blur-[120px]" />

      {/* Constellation background decoration */}
      <ConstellationDots />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* ─── Section Header ─── */}
        <div className="max-w-2xl space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-blue-400 font-mono text-xs uppercase tracking-[0.3em]"
          >
            <Terminal className="h-4 w-4" />
            <span>~/about/haris-khan</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white"
          >
            About <span className="text-stroke-white text-transparent">Me</span>
          </motion.h2>
        </div>

        {/* ─── Hero Row: Image + Bio ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Profile Image (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative max-w-[440px] w-full">
              {/* Pulsing outer glow — matches the blue-to-orange from the photo */}
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  opacity: [0.3, 0.55, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 rounded-3xl blur-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(139,92,246,0.15) 50%, rgba(217,119,6,0.2) 100%)",
                }}
              />

              {/* Gradient border */}
              <div
                className="relative p-[2px] rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.6) 0%, rgba(139,92,246,0.4) 50%, rgba(217,119,6,0.5) 100%)",
                }}
              >
                {/* Floating animation */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative rounded-3xl overflow-hidden bg-[#0a1628]"
                >
                  <Image
                    src="/hk.jpg"
                    alt="Haris Khan — Full Stack Web Developer"
                    width={480}
                    height={520}
                    priority
                    className="rounded-3xl object-cover w-full h-auto"
                  />

                  {/* Bottom gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent rounded-3xl" />

                  {/* Status badge overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2"
                  >
                    <div className="backdrop-blur-xl bg-[#0a1628]/70 border border-white/10 rounded-xl px-3.5 py-2 flex items-center space-x-2.5">
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-white leading-tight">Haris Khan</p>
                        <p className="text-[9px] text-blue-300/70 font-mono">Available for work</p>
                      </div>
                    </div>
                    <div className="backdrop-blur-xl bg-[#0a1628]/70 border border-white/10 rounded-xl px-3 py-2 flex items-center space-x-1.5">
                      <MapPin className="h-3 w-3 text-amber-400" />
                      <span className="text-[9px] text-neutral-300 font-mono">Quetta, PK</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating accent orbs matching the photo's color story */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 h-3.5 w-3.5 rounded-full bg-blue-500/50 blur-[1px]"
              />
              <motion.div
                animate={{ y: [0, 7, 0], x: [0, -4, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-2 -left-2 h-2.5 w-2.5 rounded-full bg-amber-500/50 blur-[1px]"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute top-1/3 -right-5 h-2 w-2 rounded-full bg-purple-400/40"
              />
            </div>
          </motion.div>

          {/* Bio text (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Code className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Haris Khan
                  <span className="text-neutral-500 font-light"> — </span>
                  <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                    Creative Web Developer
                  </span>
                </h3>
              </div>

              <p className="text-neutral-400 font-light text-base leading-[1.8]">
                I am a passionate Full Stack Web Developer and UI/UX Designer based in Quetta, Pakistan. Currently pursuing a{" "}
                <strong className="text-neutral-200 font-medium">BS in Computer Science (2023–2027)</strong> at Balochistan
                University&apos;s Faculty of Information Technology, I focus on building highly interactive, responsive, and
                functional web applications that turn ideas into elegant digital realities.
              </p>
              <p className="text-neutral-400 font-light text-base leading-[1.8]">
                Combining backend programming (PHP/Laravel, C#) with fluid frontend interactions, I build reliable online
                platforms. I also work in graphic asset creation and photography, bringing an artistic perspective to
                technical development.
              </p>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { label: "Projects", value: "10+" },
                { label: "Experience", value: "2 yrs" },
                { label: "Technologies", value: "8+" },
                { label: "Freelance", value: "Open" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm flex flex-col items-center min-w-[80px]"
                >
                  <span className="text-lg font-bold text-white">{stat.value}</span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── Cards Grid: Education, Experience, Skills ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Education Card */}
          <GlassCard delay={0}>
            <div className="p-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <GraduationCap className="h-4 w-4 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm tracking-tight">Education</h4>
                </div>
                <span className="text-[9px] font-mono text-purple-400/60 uppercase tracking-widest">ACADEMIC</span>
              </div>

              <div className="relative border-l border-white/[0.08] pl-4 space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40" />
                  <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">2023 — 2027</span>
                  <h5 className="text-[13px] font-semibold text-white mt-0.5">BS in Computer Science</h5>
                  <p className="text-[11px] text-neutral-500 font-light">Balochistan University, Quetta</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="relative"
                >
                  <div className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-neutral-600" />
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">2021 — 2023</span>
                  <h5 className="text-[13px] font-semibold text-white mt-0.5">Intermediate (ICS)</h5>
                  <p className="text-[11px] text-neutral-500 font-light">Tameer-e-Nau Public College, Quetta</p>
                </motion.div>
              </div>
            </div>
          </GlassCard>

          {/* Experience Card */}
          <GlassCard delay={0.1}>
            <div className="p-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Briefcase className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm tracking-tight">Experience</h4>
                </div>
                <span className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-widest">CAREER</span>
              </div>

              <div className="relative border-l border-white/[0.08] pl-4 space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">2025 — Present</span>
                  <h5 className="text-[13px] font-semibold text-white mt-0.5">Computer Operator</h5>
                  <p className="text-[11px] text-neutral-500 font-light">ALI Traders Limited, Quetta</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="relative"
                >
                  <div className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-neutral-600" />
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">2024 — 2025</span>
                  <h5 className="text-[13px] font-semibold text-white mt-0.5">Sales Representative</h5>
                  <p className="text-[11px] text-neutral-500 font-light">BA Mall Quetta Limited</p>
                </motion.div>
              </div>
            </div>
          </GlassCard>

          {/* Quick Info Card */}
          <GlassCard delay={0.2}>
            <div className="p-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm tracking-tight">Quick Info</h4>
                </div>
                <span className="text-[9px] font-mono text-amber-400/60 uppercase tracking-widest">PROFILE</span>
              </div>

              <div className="space-y-3.5">
                {[
                  { label: "Name", value: "Haris Khan" },
                  { label: "Location", value: "Quetta, Pakistan" },
                  { label: "Email", value: "hariskhan123786@gmail.com" },
                  { label: "Phone", value: "+92 318 835 3770" },
                  { label: "Languages", value: "Urdu, English, Pashto" },
                  { label: "Status", value: "Open to Freelance", highlight: true },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                    className="flex items-center justify-between text-[12px]"
                  >
                    <span className="text-neutral-500 font-mono uppercase tracking-wider text-[10px]">{item.label}</span>
                    <span className={`font-medium ${item.highlight ? "text-emerald-400" : "text-neutral-200"} text-right max-w-[55%] truncate`}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* ─── Skills Matrix (Full Width) ─── */}
        <GlassCard delay={0}>
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Skills Header */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Terminal className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-blue-400">Technical Arsenal</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Skills Matrix</h3>
                <p className="text-neutral-500 font-light text-sm leading-relaxed">
                  Proficiency levels across my core development stack, from markup foundations to creative tooling.
                </p>
                <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-neutral-500">
                  <span className="flex items-center space-x-2">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    <span>Freelance: <span className="text-emerald-400">Available</span></span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    <span>Based in Quetta, Pakistan</span>
                  </span>
                </div>
              </div>

              {/* Skills Bars */}
              <div className="lg:col-span-8 space-y-5">
                {SKILLS.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-medium text-neutral-200">{skill.name}</span>
                      <span className="font-mono text-neutral-500">{skill.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + idx * 0.1 }}
                        className={`h-full ${skill.color} rounded-full shadow-lg ${skill.glow}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
