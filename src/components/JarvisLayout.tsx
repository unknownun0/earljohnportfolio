"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, MessageCircle, Play, Heart, Code2, Briefcase, Grid3X3 } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/defaultContent";

function SkillsViewJ() {
  const { content } = useContent();
  return (
    <div className="j-card">
      <div className="j-card-header">
        <div className="j-card-icon"><Code2 className="w-3.5 h-3.5" /></div>
        <div>
          <div className="j-card-title">Technical Analysis</div>
          <div className="j-card-sub">Skill proficiency matrix</div>
        </div>
      </div>
      {content.techStack.map((group) => (
        <div key={group.id}>
          <div className="j-cat-label">{group.category}</div>
          <div className="j-skills-grid">
            {group.items.map((item) => {
              const level = content.skillLevels?.[item] ?? 0;
              return (
                <div key={item} className="j-skill-item">
                  <div className="j-skill-top">
                    <span className="j-skill-name">{item}</span>
                    <span className="j-skill-pct">{level}%</span>
                  </div>
                  <div className="j-skill-track">
                    <div className="j-skill-fill" style={{ width: `${level}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceViewJ() {
  const { content } = useContent();
  return (
    <div className="j-card">
      <div className="j-card-header">
        <div className="j-card-icon"><Briefcase className="w-3.5 h-3.5" /></div>
        <div>
          <div className="j-card-title">Mission Log</div>
          <div className="j-card-sub">Professional experience</div>
        </div>
      </div>
      <div className="j-exp-list">
        {content.experience.map((exp) => (
          <div key={exp.id} className="j-exp-item">
            <div className="j-exp-icon">{exp.icon || "💼"}</div>
            <div className="j-exp-info">
              <h4>{exp.title}</h4>
              <p>{exp.organization}</p>
              <span className="j-exp-badge">{exp.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { content } = useContent();
  return (
    <div className="j-feed-card">
      <div className="j-feed-header">
        <div className="j-feed-avatar">
          {content.hero.image ? <img src={content.hero.image} alt="" /> : null}
        </div>
        <div className="j-feed-meta">
          <div className="j-feed-author">{content.hero.name}</div>
          <div className="j-feed-time">Project &middot; {project.tags.slice(0, 2).join(", ")}</div>
        </div>
      </div>
      {project.video && (
        <div style={{ position: "relative" }} onClick={onClick}>
          <video src={project.video} muted loop playsInline preload="metadata" poster={project.image || undefined} className="j-feed-media" style={{ cursor: "pointer" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "44px", height: "44px", borderRadius: "50%", border: "2px solid rgba(0,212,255,0.6)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <Play className="w-4 h-4" fill="#00d4ff" color="#00d4ff" />
          </div>
          {project.status && <div className="j-status">{project.status}</div>}
        </div>
      )}
      {!project.video && project.image && (
        <div style={{ position: "relative" }} onClick={onClick}>
          <img src={project.image} alt={project.title} className="j-feed-media" style={{ cursor: "pointer" }} />
          {project.status && <div className="j-status">{project.status}</div>}
        </div>
      )}
      {!project.video && !project.image && (
        <div onClick={onClick} style={{ padding: "20px", textAlign: "center", color: "var(--j-text-dim)", cursor: "pointer", fontSize: "12px" }}>
          {project.status || project.title}
        </div>
      )}
      <div className="j-feed-body">
        <div className="j-feed-title">{project.title}</div>
        <div className="j-feed-desc">{project.description}</div>
      </div>
      {project.tags.length > 0 && (
        <div className="j-feed-tags">
          {project.tags.map((t) => <span key={t} className="j-feed-tag">{t}</span>)}
        </div>
      )}
    </div>
  );
}

export default function JarvisLayout() {
  const { content } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("grid");
  const [selected, setSelected] = useState<Project | null>(null);
  const [fabOpen, setFabOpen] = useState(false);

  const linkedIn = content.socials.find((s) => s.label === "LinkedIn")?.href || "#";
  const stats = {
    projects: content.projects.length,
    contributions: content.experience.length,
    skills: content.techStack.reduce((s, g) => s + g.items.length, 0),
  };

  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (h === "skills" || h === "experience") setActiveTab(h);
    const onChange = () => {
      const hh = window.location.hash.replace("#", "");
      if (hh === "skills" || hh === "experience") setActiveTab(hh);
      else setActiveTab("grid");
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const tabs = [
    { key: "grid", label: "PROJECTS", icon: <Grid3X3 className="w-3.5 h-3.5" /> },
    { key: "skills", label: "SKILLS", icon: <Code2 className="w-3.5 h-3.5" /> },
    { key: "experience", label: "EXPERIENCE", icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={`j-theme`} style={{ minHeight: "100vh", background: "var(--j-bg)", overflow: "hidden" }}>
      {/* Background grid */}
      <div className="j-bg-grid" />
      <div className="j-scan" />
      <div className="j-scan-beam" />

      {/* Topbar */}
      <header className="j-topbar">
        <div className="j-logo">
          <div className="j-logo-dot" />
          <span>J.A.R.V.I.S</span>
        </div>
        <div className="j-topbar-center">
          {tabs.map((t) => (
            <button key={t.key} className={`j-topbar-link${activeTab === t.key ? " active" : ""}`} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="j-topbar-right">
          <button onClick={toggleTheme} className="j-topbar-btn" title="Toggle mode">
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      <div className="j-body">
        <div className="j-container">
          {/* Profile */}
          <div className="j-profile">
            <div className="j-avatar-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" />
                <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" strokeDasharray="4 6" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="0.5" />
              </svg>
              <div className="j-avatar-inner">
                {content.hero.image ? <img src={content.hero.image} alt={content.hero.name} /> : null}
              </div>
            </div>
            <div className="j-profile-info">
              <h1 className="j-name">
                {content.hero.name}
                <small>STATUS: ACTIVE</small>
              </h1>
              <div className="j-bio-line">Turning ideas into digital solutions</div>
              <div className="j-bio-line" style={{ color: "var(--j-blue)", fontSize: "11px" }}>Web Dev | Graphic Design | SMM</div>
              <div className="j-profile-stats">
                <div className="j-stat">
                  <div className="j-stat-value">{String(stats.projects).padStart(2, "0")}</div>
                  <div className="j-stat-label">PROJECTS</div>
                </div>
                <div className="j-stat">
                  <div className="j-stat-value">{String(stats.contributions).padStart(2, "0")}</div>
                  <div className="j-stat-label">CONTRIBUTIONS</div>
                </div>
                <div className="j-stat">
                  <div className="j-stat-value">{String(stats.skills).padStart(2, "0")}</div>
                  <div className="j-stat-label">SKILLS</div>
                </div>
              </div>
              <div className="j-profile-actions">
                <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="j-btn j-btn-primary">VIEW PORTFOLIO</a>
                <a href={`mailto:${content.contact.find(c => c.label === "Email")?.value || ""}`} className="j-btn">MESSAGE</a>
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className="j-card">
            <div className="j-card-header">
              <div className="j-card-icon">&#x1F4DC;</div>
              <div>
                <div className="j-card-title">Certifications</div>
                <div className="j-card-sub">Verified credentials</div>
              </div>
            </div>
            <div className="j-certs">
              {content.certifications.map((cert) => (
                <div key={cert.id} className="j-cert-item">
                  <div className="j-cert-circle">
                    {cert.image ? <img src={cert.image} alt={cert.title} /> : <span style={{ fontSize: "18px" }}>{cert.icon || "📜"}</span>}
                  </div>
                  <span className="j-cert-label">{cert.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "grid" && (
            <>
              {content.projects.map((p) => <FeedCard key={p.id} project={p} onClick={() => setSelected(p)} />)}
            </>
          )}
          {activeTab === "skills" && <SkillsViewJ />}
          {activeTab === "experience" && <ExperienceViewJ />}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* FAB */}
      <div className="j-fab">
        {fabOpen && content.socials.map((s) => (
          <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="j-fab-link" style={{ animation: "igFloatIn 0.25s ease" }}>
            {s.label.charAt(0)}
          </a>
        ))}
        <button className="j-fab-btn" onClick={() => setFabOpen(!fabOpen)}>
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
