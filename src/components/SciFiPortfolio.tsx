"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import Background from "@/components/Background";

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);

  return value;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 6,
  drift: (Math.random() - 0.5) * 20,
}));

function DataMotes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.size > 2 ? "rgba(255, 255, 255, 0.3)" : "rgba(160, 160, 160, 0.25)",
            boxShadow: p.size > 2
              ? "0 0 6px rgba(255, 255, 255, 0.15)"
              : "0 0 4px rgba(160, 160, 160, 0.15)",
          }}
          animate={{
            y: [0, p.drift, -p.drift * 0.7, 0],
            x: [0, p.drift * 0.5, -p.drift * 0.3, 0],
            opacity: [0.2, 0.8, 0.3, 0.2],
            scale: [1, 1.4, 0.8, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function BorderGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="borderGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#888888" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.rect
          x="0" y="0" width="100%" height="100%"
          fill="none"
          stroke="url(#borderGlow)"
          strokeWidth="1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {[0, 1, 2, 3].map((i) => {
          const positions = [
            { x: "0%", y: "0%", angle: 0 },
            { x: "100%", y: "0%", angle: 90 },
            { x: "100%", y: "100%", angle: 180 },
            { x: "0%", y: "100%", angle: 270 },
          ];
          const p = positions[i];
          return (
            <motion.circle
              key={i}
              cx={p.x} cy={p.y} r={3}
              fill="#ffffff"
              style={{ transformOrigin: `${p.x} ${p.y}` }}
              animate={{
                r: [2, 5, 2],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
        {/* Scanning data ripples */}
        <motion.line
          x1="0" y1="50%" x2="100%" y2="50%"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeDasharray="4 12"
          opacity={0.08}
          animate={{ x1: ["0%", "100%"], x2: ["100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-[10px] text-white/50 font-mono">{time}</span>;
}

interface GlowButtonProps {
  label: string;
  sublabel?: string;
  active: boolean;
  onClick: () => void;
}

function GlowButton({ label, sublabel, active, onClick }: GlowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`w-full rounded border transition-colors duration-300 flex flex-col items-center justify-center py-1 ${
          active
            ? "border-white/60 bg-white/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/40"
        }`}
      >
        <span className="text-[8px] font-bold text-white/80 leading-tight text-center">
          {label}
        </span>
        {sublabel && (
          <span className="text-[7px] text-white/40">{sublabel}</span>
        )}
      </div>
      {active && (
        <motion.div
          className="absolute inset-0 rounded border-2 border-white/30"
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}

function ScanOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), rgba(160, 160, 160, 0.2), transparent)",
        }}
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </div>
  );
}

function LoadingScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#000000" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-white/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-10 h-10 rounded-full border border-white/30"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="flex items-center gap-1 text-sm font-bold text-white/70 tracking-[0.3em] uppercase font-mono">
        {"LOADING".split("").map((ch, i) => (
          <motion.span
            key={i}
            animate={{ opacity: phase >= 2 ? [1, 0.3, 1] : [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <div className="mt-4 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/40"
            animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        className="mt-6 h-px w-32"
        style={{
          background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
        }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="mt-8 text-[8px] text-white/20 font-mono tracking-widest"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        INITIALIZING SYSTEM
      </motion.div>
    </motion.div>
  );
}

export default function SciFiPortfolio() {
  const { content } = useContent();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  const projectCount = content.projects.length;
  const countedProjects = useCountUp(projectCount, 2000, loaded);

  const totalSkills = content.techStack.reduce((s, g) => s + g.items.length, 0);
  const countedSkills = useCountUp(totalSkills, 1800, loaded);

  const totalExp = content.experience.length;
  const countedExp = useCountUp(totalExp, 1500, loaded);

  const locCount = useCountUp(42340, 2500, loaded);

  useEffect(() => {
    setLoaded(true);
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const email = content.contact.find((c) => c.label === "Email")?.value || "";
  const linkedIn = content.socials.find((s) => s.label === "LinkedIn")?.href || "#";
  const github = content.socials.find((s) => s.label === "GitHub")?.href || "#";
  const profileImg = content.hero.image;

  const socialDisplay: Record<string, string> = {
    "GitHub": "unknownun0",
    "Gmail": "earljohngomez66@gmail.com",
    "WhatsApp": "+63 962 423 8760",
    "Facebook": "Earl John Gomez",
    "LinkedIn": "Earl John Gomez",
    "Instagram": "itsm3_earl",
  };

  return (
    <div className="sf-theme" style={{ background: "var(--sf-bg)", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      {!loading && <Background />}
      <DataMotes />
      <BorderGlow />

      {/* ===== TOP HEADER ===== */}
      <header className="sf-topbar">
        <div className="sf-topbar-left">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)] animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-white/80 tracking-widest uppercase leading-tight">
                {content.hero.name}
              </div>
              <div className="text-[9px] text-white/40 tracking-[0.2em] uppercase">
                Website Portfolio
              </div>
            </div>
          </div>
        </div>
        <div className="sf-topbar-center">
          <div className="flex items-center gap-4 text-[9px] text-white/40 font-mono">
            <span>SYS::ONLINE</span>
            <span className="w-1 h-1 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.4)]" />
            <span>NODE: v20.12</span>
          </div>
        </div>
        <div className="sf-topbar-right">
          <div className="flex items-center gap-3 text-[9px] text-white/40 font-mono">
            <Clock />
            <span className="text-white/40">{currentTime} UTC+8</span>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="sf-body">
        <div className="sf-container">
          <div className="sf-grid">
            {/* ===== LEFT PANEL ===== */}
            <div className="sf-left-panel">
              {/* Portrait */}
              <div className="sf-portrait-wrap">
                <div className="sf-portrait">
                  {profileImg ? (
                    <img src={profileImg} alt={content.hero.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl font-bold">
                      ?
                    </div>
                  )}
                  <ScanOverlay />
                </div>
                <div className="mt-2 flex items-center gap-2 text-[8px] text-white/30 font-mono">
                  <span className="text-white/60">●</span> BIO-SIGNATURE ACTIVE
                  <span className="ml-auto">ID: {content.hero.name.substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 9999)}</span>
                </div>
              </div>

              {/* Info Fields */}
              <div className="sf-info-grid">
                <div className="sf-info-field">
                  <span className="sf-info-label">NAME</span>
                  <span className="sf-info-value text-white/80">{content.hero.name}</span>
                </div>
                <div className="sf-info-field">
                  <span className="sf-info-label">ROLE</span>
                  <span className="sf-info-value text-white/70">Junior Web Developer | Graphic Designer | Software Engineer</span>
                </div>
                <div className="sf-info-field">
                  <span className="sf-info-label">CONTACT</span>
                  <div className="sf-info-value text-[10px] space-y-1">
                    {content.socials.map((s) => (
                      <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors">
                        <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                        <span className="text-white/40 shrink-0">{s.label}:</span>
                        <span className="truncate">{socialDisplay[s.label] || s.href}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="sf-info-field">
                  <span className="sf-info-label">STATUS</span>
                  <span className="sf-info-value flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-pulse" />
                    Available for Work
                  </span>
                </div>
              </div>

              {/* Three Square Buttons */}
              <div className="sf-buttons-grid">
                <GlowButton
                  label="View Projects"
                  sublabel={`${countedProjects} active`}
                  active={activeBtn === "projects"}
                  onClick={() => setActiveBtn(activeBtn === "projects" ? null : "projects")}
                />
                <GlowButton
                  label="Skill Data"
                  sublabel={`${countedSkills} tracked`}
                  active={activeBtn === "skills"}
                  onClick={() => setActiveBtn(activeBtn === "skills" ? null : "skills")}
                />
                <GlowButton
                  label="Case Studies"
                  sublabel={`${countedExp} cases`}
                  active={activeBtn === "cases"}
                  onClick={() => setActiveBtn(activeBtn === "cases" ? null : "cases")}
                />
              </div>

              {/* Social Buttons */}
              <div className="sf-social-bar">
                {content.socials
                  .filter((s) => ["LinkedIn", "Facebook", "Instagram"].includes(s.label))
                  .map((s) => (
                    <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="sf-social-btn">
                      {s.label === "LinkedIn" ? "in" : s.label === "Facebook" ? "fb" : "ig"}
                    </a>
                  ))}
              </div>
            </div>

            {/* ===== RIGHT PANEL ===== */}
            <div className="sf-right-panel">
              {/* Metrics */}
              <div className="sf-metrics">
                <div className="text-[9px] text-white/35 font-mono tracking-widest mb-3 uppercase">System Metrics</div>
                <div className="space-y-2.5">
                  <div className="sf-metric-row">
                    <span className="sf-metric-label">PROJECTS COMPLETE</span>
                    <span className="sf-metric-value">
                      <span className="text-white/80 text-[10px] font-bold tabular-nums">{String(countedProjects).padStart(2, "0")}</span>
                    </span>
                  </div>
                  <div className="sf-metric-row">
                    <span className="sf-metric-label">LINES OF CODE</span>
                    <span className="sf-metric-value">
                      <span className="text-white/80 text-[10px] font-bold tabular-nums">{formatNumber(locCount)}</span>
                    </span>
                  </div>
                  <div className="sf-metric-row">
                    <span className="sf-metric-label">TECH STACK</span>
                    <span className="sf-metric-value">
                      <span className="text-white/80 text-[10px] font-bold tabular-nums">{countedSkills}</span>
                    </span>
                  </div>
                  <div className="sf-metric-row">
                    <span className="sf-metric-label">EXPERIENCE</span>
                    <span className="sf-metric-value">
                      <span className="text-white/80 text-[10px] font-bold tabular-nums">{countedExp}</span>
                    </span>
                  </div>

                </div>
              </div>

              {/* Highlight Panel - RECENT WORK */}
              <div className="sf-highlight-panel">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold text-white/60 tracking-widest uppercase">Latest Launch</span>
                  <span className="text-[7px] text-white/30 font-mono">v2.4.1</span>
                </div>
                <div className="text-base font-black text-white tracking-tight leading-tight mb-1">
                  RECENT WORK
                </div>
                <div className="text-[10px] text-white/50 mb-2 font-mono">
                  {content.projects[0]?.title || "No projects available"}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {content.projects[0]?.tags?.slice(0, 4).map((t) => (
                    <span key={t} className="text-[7px] px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-white/50 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                {content.projects[0]?.image && (
                  <div className="mt-2 rounded overflow-hidden border border-white/10">
                    <img src={content.projects[0].image} alt={content.projects[0].title} className="w-full h-16 object-cover" />
                  </div>
                )}
                <div className="mt-2 flex gap-2">
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="sf-panel-btn text-[9px]">
                      VIEW SOURCE
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className="sf-panel-btn text-[9px]">
                      CONTACT
                    </a>
                  )}
                </div>
                <motion.div
                  className="mt-2 h-[1px] w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Featured Projects */}
              <div className="sf-highlight-panel">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold text-white/60 tracking-widest uppercase">Featured</span>
                  <span className="text-[7px] text-white/30 font-mono">v1.0.0</span>
                </div>
                {content.projects.filter((p) => p.title === "Roma Tour" || p.title === "SHR — Doctor Side").map((project) => (
                  <div key={project.id} className="mb-3 last:mb-0">
                    <div className="text-[10px] text-white/50 mb-1 font-mono">
                      {project.title}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {project.tags?.slice(0, 4).map((t) => (
                        <span key={t} className="text-[7px] px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-white/50 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.image && (
                      <div className="mt-1.5 rounded overflow-hidden border border-white/10">
                        <img src={project.image} alt={project.title} className="w-full h-16 object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Active state panels */}
      <AnimatePresence>
        {activeBtn && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveBtn(null)}
            />
            <motion.div
              className="relative z-10 w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto p-8 rounded-xl border border-white/20 bg-[#000000]/95 backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setActiveBtn(null)}
                className="absolute top-3 right-3 text-white/40 hover:text-white/70 text-sm"
              >
                ✕
              </button>
              {activeBtn === "projects" && (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-bold text-white/70 tracking-widest uppercase">Project Database</h3>
                    <span className="text-[9px] text-white/35 font-mono">{content.projects.length} records</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.projects.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.06 }}
                        className="rounded-lg border border-white/5 hover:border-white/25 bg-white/[0.02] overflow-hidden transition-colors group"
                      >
                        {(p.video || p.image) && (
                          <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                            {p.video ? (
                              <video
                                src={p.video}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                poster={p.image || undefined}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                              />
                            ) : (
                              p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            )}
                            {p.status && (
                              <span className="absolute top-2 left-2 text-[8px] font-bold px-1.5 py-0.5 rounded border border-white/30 bg-white/10 text-white/70">
                                {p.status}
                              </span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent pointer-events-none" />
                          </div>
                        )}
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-xs font-semibold text-white/70 group-hover:text-white/90 transition-colors">
                                {p.title}
                              </div>
                              <div className="text-[9px] text-white/30 font-mono mt-0.5">
                                {String(i + 1).padStart(2, "0")} · {p.tags?.slice(0, 2).join(", ")}
                              </div>
                            </div>
                            {p.link && (
                              <a href={p.link} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[9px] px-2 py-1 rounded border border-white/15 text-white/40 hover:text-white/70 hover:border-white/40 transition-colors">
                                OPEN
                              </a>
                            )}
                          </div>
                          <div className="text-[9px] text-white/35 mt-1.5 line-clamp-2 leading-relaxed">
                            {p.description}
                          </div>
                          {p.tags && p.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {p.tags.map((t) => (
                                <span key={t} className="text-[7px] px-1.5 py-0.5 rounded border border-white/5 text-white/30">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              {activeBtn === "skills" && (
                <div>
                  <h3 className="text-sm font-bold text-white/70 tracking-widest uppercase mb-4">Skill Matrix</h3>
                  <div className="space-y-3">
                    {content.techStack.map((group) => (
                      <div key={group.id}>
                        <div className="text-[9px] text-white/40 tracking-widest mb-1.5 uppercase">{group.category}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => {
                            const level = content.skillLevels?.[item] ?? 0;
                            return (
                              <div key={item} className="px-2 py-1 rounded border border-white/5 bg-white/[0.02] text-[9px] text-white/60">
                                {item}
                                <span className="ml-1 text-[8px] text-white/30">{level}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeBtn === "cases" && (
                <div>
                  <h3 className="text-sm font-bold text-white/70 tracking-widest uppercase mb-4">Case Files</h3>
                  <div className="space-y-2">
                    {content.experience.map((exp, i) => (
                      <motion.div
                        key={exp.id}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="py-2 px-3 rounded border border-white/5 hover:border-white/20 bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-white/70">{exp.title}</span>
                          <span className="text-[8px] text-white/40 px-1.5 py-0.5 rounded border border-white/20">
                            {exp.type}
                          </span>
                        </div>
                        <div className="text-[9px] text-white/35 mt-0.5">{exp.organization}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
