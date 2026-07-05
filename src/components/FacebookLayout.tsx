"use client";

import { useState, useEffect } from "react";
import { Home, Laptop, Briefcase, MessageCircle, Heart, Share2, ThumbsUp, Play } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";
import FacebookTopbar from "./FacebookTopbar";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/defaultContent";

function SkillsViewFB() {
  const { content } = useContent();
  return (
    <div className="fb-card">
      <div className="fb-card-header">
        <div className="fb-card-avatar">
          {content.hero.image ? <img src={content.hero.image} alt="" /> : null}
        </div>
        <div>
          <div className="fb-card-name">{content.hero.name}</div>
          <div className="fb-card-time">Skills & Expertise</div>
        </div>
      </div>
      {content.techStack.map((group) => (
        <div key={group.id}>
          <div className="fb-category-title">{group.category}</div>
          <div className="fb-skills-grid">
            {group.items.map((item) => {
              const level = content.skillLevels?.[item] ?? 0;
              return (
                <div key={item} className="fb-skill-card">
                  <div className="fb-skill-header">
                    <span className="fb-skill-name">{item}</span>
                    <span className="fb-skill-pct">{level}%</span>
                  </div>
                  <div className="fb-skill-bar">
                    <div className="fb-skill-fill" style={{ width: `${level}%` }} />
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

function ExperienceViewFB() {
  const { content } = useContent();
  return (
    <div className="fb-card">
      <div className="fb-card-header">
        <div className="fb-card-avatar">
          {content.hero.image ? <img src={content.hero.image} alt="" /> : null}
        </div>
        <div>
          <div className="fb-card-name">{content.hero.name}</div>
          <div className="fb-card-time">Experience</div>
        </div>
      </div>
      <div className="fb-exp-card">
        {content.experience.map((exp) => (
          <div key={exp.id} className="fb-exp-item">
            <div className="fb-exp-icon">{exp.icon || "💼"}</div>
            <div className="fb-exp-info">
              <h4>{exp.title}</h4>
              <p>{exp.organization}</p>
              <span className="fb-exp-badge">{exp.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { content } = useContent();
  return (
    <div className="fb-card">
      <div className="fb-card-header">
        <div className="fb-card-avatar">
          {content.hero.image ? <img src={content.hero.image} alt="" /> : null}
        </div>
        <div>
          <div className="fb-card-name">{content.hero.name}</div>
          <div className="fb-card-time">Project &bull; {project.tags.slice(0, 2).join(", ")}</div>
        </div>
      </div>
      {project.video && (
        <div style={{ position: "relative" }} onClick={onClick}>
          <video src={project.video} muted loop playsInline preload="metadata" poster={project.image || undefined} className="fb-card-media" style={{ maxHeight: "400px", objectFit: "cover", cursor: "pointer" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <Play className="w-5 h-5" fill="#fff" color="#fff" />
          </div>
        </div>
      )}
      {!project.video && project.image && (
        <img src={project.image} alt={project.title} className="fb-card-media" onClick={onClick} style={{ cursor: "pointer" }} />
      )}
      {!project.video && !project.image && (
        <div onClick={onClick} style={{ padding: "24px", textAlign: "center", color: "var(--fb-text-secondary)", cursor: "pointer", background: "var(--fb-elevated)", fontSize: "13px" }}>
          {project.status || project.title}
        </div>
      )}
      <div className="fb-card-body" style={{ paddingTop: "12px" }}>
        <strong style={{ color: "var(--fb-text)" }}>{project.title}</strong>
        <p style={{ margin: "4px 0 0", color: "var(--fb-text-secondary)" }}>{project.description}</p>
      </div>
      {project.tags.length > 0 && (
        <div className="fb-card-tags">
          {project.tags.map((t) => (
            <span key={t} className="fb-tag">{t}</span>
          ))}
        </div>
      )}
      <div className="fb-card-actions">
        <button className="fb-action-btn" onClick={onClick}><ThumbsUp className="w-4 h-4" /> Like</button>
        <button className="fb-action-btn" onClick={onClick}><MessageCircle className="w-4 h-4" /> Comment</button>
        <button className="fb-action-btn" onClick={onClick}><Share2 className="w-4 h-4" /> Share</button>
      </div>
    </div>
  );
}

export default function FacebookLayout() {
  const { content } = useContent();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const linkedIn = content.socials.find((s) => s.label === "LinkedIn")?.href || "#";
  const stats = {
    projects: content.projects.length,
    contributions: content.experience.length,
    skills: content.techStack.reduce((sum, g) => sum + g.items.length, 0),
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "skills" || hash === "experience") setActiveTab(hash);
    const onHashChange = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "skills" || h === "experience") setActiveTab(h);
      else setActiveTab("grid");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const sidebarItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "#" },
    { icon: <Laptop className="w-5 h-5" />, label: "Skills", href: "#skills" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Experience", href: "#experience" },
  ];

  return (
    <div className={`fb-theme${theme === "light" ? " light-mode" : ""}`} style={{ minHeight: "100vh" }}>
      <FacebookTopbar />

      <div className="fb-body">
        {/* Left Sidebar */}
        <aside className="fb-sidebar">
          <a href="#" className="fb-sidebar-item">
            <div className="fb-sidebar-avatar">
              {content.hero.image ? <img src={content.hero.image} alt="" /> : null}
            </div>
            <span>{content.hero.name}</span>
          </a>
          <div className="fb-sidebar-divider" />
          {sidebarItems.map((item) => (
            <a key={item.label} href={item.href} className="fb-sidebar-item">
              <div className="fb-sidebar-icon">{item.icon}</div>
              <span>{item.label}</span>
            </a>
          ))}
          <div className="fb-sidebar-divider" />
          <div className="fb-sidebar-label">Shortcuts</div>
          {content.socials.slice(0, 3).map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="fb-sidebar-item">
              <div className="fb-sidebar-icon" style={{ fontSize: "14px" }}>{s.label.charAt(0)}</div>
              <span>{s.label}</span>
            </a>
          ))}
        </aside>

        {/* Main */}
        <main className="fb-main">
          {/* Profile Card */}
          <div className="fb-cover">
            <div className="fb-cover-image">
              <div className="fb-cover-gradient" />
            </div>
            <div className="fb-profile-row">
              <div className="fb-avatar-large">
                {content.hero.image ? <img src={content.hero.image} alt={content.hero.name} /> : null}
              </div>
              <div className="fb-profile-info">
                <h1 className="fb-name">{content.hero.name}</h1>
                <div className="fb-bio">Turning ideas into digital solutions<br />Web Dev | Graphic Design | SMM</div>
                <div className="fb-profile-actions">
                  <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="fb-btn-primary">Portfolio</a>
                  <button className="fb-btn-secondary">Message</button>
                </div>
              </div>
            </div>
            <div className="fb-stats">
              <div className="fb-stat"><strong>{stats.projects}</strong> Projects</div>
              <div className="fb-stat"><strong>{stats.contributions}</strong> Contributions</div>
              <div className="fb-stat"><strong>{stats.skills}</strong> Skills</div>
            </div>
            {/* Certificates */}
            <div style={{ padding: "0 24px 16px" }}>
              <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
                {content.certifications.map((cert) => (
                  <div key={cert.id} className="fb-cert-item">
                    <div className="fb-cert-circle">
                      {cert.image ? <img src={cert.image} alt={cert.title} /> : <span style={{ fontSize: "20px" }}>{cert.icon || "📜"}</span>}
                    </div>
                    <span className="fb-cert-label">{cert.title}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Tabs */}
            <div className="fb-tabs">
              <button className={`fb-tab${activeTab === "grid" ? " active" : ""}`} onClick={() => setActiveTab("grid")}>Posts</button>
              <button className={`fb-tab${activeTab === "skills" ? " active" : ""}`} onClick={() => setActiveTab("skills")}>Skills</button>
              <button className={`fb-tab${activeTab === "experience" ? " active" : ""}`} onClick={() => setActiveTab("experience")}>Experience</button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "grid" && (
            <>
              {content.projects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </>
          )}
          {activeTab === "skills" && <SkillsViewFB />}
          {activeTab === "experience" && <ExperienceViewFB />}
        </main>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Floating socials - reuse existing component */}
      <FloatingSocialsComp />
    </div>
  );
}

function FloatingSocialsComp() {
  const { content } = useContent();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
      {open && content.socials.map((s) => (
        <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="fb-sidebar-item" style={{ width: "44px", height: "44px", borderRadius: "50%", padding: 0, justifyContent: "center", background: "var(--fb-blue)", color: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", animation: "igFloatIn 0.25s ease" }}>
          <span style={{ fontSize: "12px", fontWeight: 700 }}>{s.label.charAt(0)}</span>
        </a>
      ))}
      <button onClick={() => setOpen(!open)} className="fb-topbar-btn" style={{ width: "48px", height: "48px", background: "var(--fb-blue)", color: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
