"use client";

import { useState } from "react";
import { Moon, Sun, ExternalLink, Mail, Play } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/defaultContent";

export default function ProfessionalLayout() {
  const { content } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState<Project | null>(null);

  const linkedIn = content.socials.find((s) => s.label === "LinkedIn")?.href || "#";
  const email = content.contact.find((c) => c.label === "Email")?.value || "";
  const stats = {
    exp: content.experience.length,
    projects: content.projects.length,
    skills: content.techStack.reduce((s, g) => s + g.items.length, 0),
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
  ];

  return (
    <div className={`p-theme${theme === "dark" ? " dark" : ""}`} style={{ minHeight: "100vh" }}>
      <nav className="p-nav">
        <a href="#" className="p-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          EJ<span>.</span>
        </a>
        <div className="p-nav-links">
          {navLinks.map((l) => (
            <button key={l.id} className="p-nav-link" onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
          <button onClick={toggleTheme} className="p-nav-btn" title="Toggle theme">
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </nav>

      <div className="p-body">
        {/* Hero */}
        <section className="p-hero">
          <div className="p-hero-avatar">
            {content.hero.image ? <img src={content.hero.image} alt={content.hero.name} /> : null}
          </div>
          <h1 className="p-hero-title">{content.hero.name}</h1>
          <p className="p-hero-sub">Web Developer &middot; Graphic Designer &middot; SMM</p>
          <p className="p-hero-desc">Turning ideas into digital solutions. Building clean, performant web experiences with modern technologies.</p>
          <div className="p-hero-actions">
            <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="p-btn p-btn-primary">
              <ExternalLink className="w-3.5 h-3.5" style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              View Portfolio
            </a>
            <a href={`mailto:${email}`} className="p-btn">
              <Mail className="w-3.5 h-3.5" style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              Contact Me
            </a>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 32, fontSize: 13, color: "var(--p-text-secondary)" }}>
            <span><strong style={{ color: "var(--p-text)" }}>{stats.projects}</strong> Projects</span>
            <span><strong style={{ color: "var(--p-text)" }}>{stats.exp}</strong> Contributions</span>
            <span><strong style={{ color: "var(--p-text)" }}>{stats.skills}</strong> Skills</span>
          </div>
          <hr style={{ margin: "40px auto 0", maxWidth: 600, border: "none", borderTop: "1px solid var(--p-border)" }} />
        </section>

        {/* Two-column layout */}
        <div className="p-layout">
          {/* Left: Projects */}
          <section id="projects" className="p-col-left">
            <h2 className="p-section-title">Projects</h2>
            <p className="p-section-sub">Selected work I&apos;ve built recently</p>
            <div className="p-projects">
              {content.projects.map((p) => (
                <div key={p.id} className="p-project-card" onClick={() => setSelected(p)}>
                  {p.video && (
                    <div style={{ position: "relative" }}>
                      <video src={p.video} muted loop playsInline preload="metadata" poster={p.image || undefined} className="p-project-media" />
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                        <Play className="w-4 h-4" fill="#fff" color="#fff" />
                      </div>
                    </div>
                  )}
                  {!p.video && p.image && <img src={p.image} alt={p.title} className="p-project-media" />}
                  <div className="p-project-body">
                    <div className="p-project-title">
                      {p.title}
                      {p.status && <span className="p-project-status">{p.status}</span>}
                    </div>
                    <p className="p-project-desc">{p.description}</p>
                    <div className="p-project-tags">
                      {p.tags.map((t) => <span key={t} className="p-project-tag">{t}</span>)}
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="p-project-tag" style={{ textDecoration: "none", background: "var(--p-text)", color: "var(--p-bg)", fontWeight: 700 }} onClick={(e) => e.stopPropagation()}>
                          Visit Site &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Skills + Experience */}
          <section className="p-col-right">
            {/* Skills */}
            <div id="skills" style={{ marginBottom: 40 }}>
              <h2 className="p-section-title">Skills</h2>
              <p className="p-section-sub">Technologies and tools</p>
              <div className="p-skills">
                {content.techStack.map((group) => (
                  <div key={group.id}>
                    <div className="p-skill-group-title">{group.category}</div>
                    <div className="p-skill-chips">
                      {group.items.map((item) => (
                        <span key={item} className="p-skill-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div id="experience">
              <h2 className="p-section-title">Experience</h2>
              <p className="p-section-sub">Professional journey</p>
              <div className="p-experiences">
                {content.experience.map((exp) => (
                  <div key={exp.id} className="p-exp-item">
                    <div className="p-exp-dot" />
                    <div className="p-exp-content">
                      <h4>{exp.title}</h4>
                      <p>{exp.organization}</p>
                      <span className="p-exp-badge">{exp.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div style={{ marginTop: 40 }}>
              <h2 className="p-section-title">Certifications</h2>
              <p className="p-section-sub">Verified credentials</p>
              <div className="p-certs">
                {content.certifications.map((cert) => (
                  <div key={cert.id} className="p-cert-card">
                    <div className="p-cert-thumb">
                      {cert.image ? <img src={cert.image} alt={cert.title} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{cert.icon || "📜"}</div>}
                    </div>
                    <div className="p-cert-name">{cert.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="p-footer">
          <div className="p-footer-links">
            {content.socials.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="p-footer-link" title={s.label}>
                {s.label.charAt(0)}
              </a>
            ))}
          </div>
          <div className="p-footer-text">&copy; {new Date().getFullYear()} {content.hero.name}. Built with Next.js.</div>
        </footer>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
