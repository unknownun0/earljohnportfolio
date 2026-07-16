"use client";

import { useState } from "react";
import { Search, Plus, ChevronRight, Download, MessageCircle, ArrowRight, Settings, User, Code2, Briefcase, LayoutDashboard, Link2, Mail } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/defaultContent";

export default function GamingLayout() {
  const { content } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const featured = content.projects.filter((p) => p.featured);
  const currentFeatured = featured[featuredIndex] || content.projects[0];
  const otherProjects = content.projects.filter((p) => p.id !== currentFeatured.id);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills & Tech", icon: Code2 },
    { id: "about", label: "About Me", icon: User },
  ];

  const bottomNav = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const filtered = otherProjects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stats = {
    projects: content.projects.length,
    skills: content.techStack.reduce((s, g) => s + g.items.length, 0),
    exp: content.experience.length,
  };

  const miniCards = [
    {
      label: "Internship Hours",
      value: "500+",
      desc: "Completed",
    },
    {
      label: "Database",
      value: "HeidiSQL / MySQL",
      desc: "Primary Stack",
    },
  ];

  // Build showcase cards
  const showcaseProjects = filtered.slice(0, 4);
  const doubleWide = showcaseProjects[0];
  const portraitCards = showcaseProjects.slice(1, 4);

  return (
    <div className="g-theme">
      {/* ─── Sidebar ─── */}
      <aside className="g-sidebar">
        <div className="g-sidebar-logo">
          <div className="g-logo-icon">EJ</div>
          <div className="g-logo-text">
            <span className="g-logo-main">Earl John</span>
            <span className="g-logo-sub">Developer</span>
          </div>
        </div>

        <div className="g-sidebar-section-label">Main Menu</div>
        <nav className="g-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                className={`g-nav-item${isActive ? " active" : ""}`}
                onClick={() => { setActiveNav(item.id); scrollTo(item.id); }}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="g-sidebar-divider" />

        <div className="g-sidebar-section-label">General</div>
        <nav className="g-sidebar-nav">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="g-nav-item"
                onClick={() => scrollTo(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="g-sidebar-collab">
          <button className="g-collab-btn">
            <Plus className="w-4 h-4" />
            <span>Let&apos;s Collaborate</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="g-main">
        {/* Header */}
        <header className="g-header">
          <div className="g-header-left">
            <div className="g-header-title">Portfolio</div>
            <div className="g-search">
              <Search className="w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search projects, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="g-header-right">
            <div className="g-status-badge">
              <span className="g-status-dot" />
              Available for Work
            </div>
            <div className="g-avatar">{content.hero.name.charAt(0)}</div>
          </div>
        </header>

        {/* ─── Top Section: Featured + Profile ─── */}
        <div className="g-top-grid">
          {/* Featured Project Hero */}
          <div className="g-featured-card" style={{ backgroundImage: currentFeatured.image ? `url(${currentFeatured.image})` : undefined }}>
            <div className="g-featured-overlay">
              <div className="g-featured-tags">
                {currentFeatured.tags.slice(0, 4).map((t) => (
                  <span key={t} className="g-tag">{t}</span>
                ))}
              </div>
              <div className="g-featured-content">
                <h2 className="g-featured-title">{currentFeatured.title}</h2>
                <p className="g-featured-desc">{currentFeatured.description}</p>
                <div className="g-featured-bottom">
                  <div className="g-featured-avatars">
                    <div className="g-mini-avatar" style={{ background: "#ff6b35" }}>E</div>
                    <div className="g-mini-avatar" style={{ background: "#ff4500", marginLeft: -8 }}>J</div>
                    <div className="g-mini-avatar" style={{ background: "#ff8c00", marginLeft: -8 }}>G</div>
                    <span className="g-featured-team-count">+2</span>
                  </div>
                  <button className="g-view-btn" onClick={() => setSelected(currentFeatured)}>
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="g-featured-dots">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    className={`g-dot${i === featuredIndex ? " active" : ""}`}
                    onClick={() => setFeaturedIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Stack: About + Mini */}
          <div className="g-right-stack">
            {/* About Me Glassmorphic Card */}
            <div className="g-about-card">
              <div className="g-about-glow" />
              <div className="g-about-content">
                <div className="g-about-avatar">
                  {content.hero.image ? <img src={content.hero.image} alt="" /> : <div className="g-about-avatar-fallback">EJ</div>}
                </div>
                <h3 className="g-about-name">{content.hero.name}</h3>
                <p className="g-about-bio">{content.hero.about[0]?.slice(0, 120)}...</p>
                <button className="g-resume-btn">
                  <Download className="w-3.5 h-3.5" />
                  Download Resume
                </button>
                <div className="g-about-socials">
                  <a href="#" className="g-social-link"><Code2 className="w-4 h-4" /></a>
                  <a href="#" className="g-social-link"><Link2 className="w-4 h-4" /></a>
                  <a href="#" className="g-social-link"><MessageCircle className="w-4 h-4" /></a>
                  <a href="#" className="g-social-link"><Mail className="w-4 h-4" /></a>
                </div>
              </div>
            </div>

            {/* Mini Preview Row */}
            <div className="g-mini-row">
              {miniCards.map((card, i) => (
                <div key={i} className="g-mini-card">
                  <div className="g-mini-label">{card.label}</div>
                  <div className="g-mini-value">{card.value}</div>
                  <div className="g-mini-desc">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom Section: Project Showcase ─── */}
        <section className="g-showcase" id="projects">
          <div className="g-showcase-header">
            <h2 className="g-showcase-title">Featured Projects</h2>
            <button className="g-view-all">View All <ChevronRight className="w-3.5 h-3.5" /></button>
          </div>

          <div className="g-showcase-grid">
            {/* Double-wide card */}
            {doubleWide && (
              <div
                className="g-showcase-card g-showcase-card-wide"
                onClick={() => setSelected(doubleWide)}
                style={doubleWide.image ? { backgroundImage: `url(${doubleWide.image})` } : undefined}
              >
                <div className="g-showcase-overlay">
                  <div className="g-showcase-card-tags">
                    {doubleWide.tags.slice(0, 3).map((t) => (
                      <span key={t} className="g-tag g-tag-sm">{t}</span>
                    ))}
                  </div>
                  <h3 className="g-showcase-card-title">{doubleWide.title}</h3>
                  <p className="g-showcase-card-desc">{doubleWide.description.slice(0, 80)}...</p>
                  <span className="g-showcase-card-link">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            )}

            {/* Portrait cards */}
            {portraitCards.map((p) => (
              <div
                key={p.id}
                className="g-showcase-card g-showcase-card-portrait"
                onClick={() => setSelected(p)}
                style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
              >
                <div className="g-showcase-overlay">
                  <div className="g-showcase-card-tags">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="g-tag g-tag-sm">{t}</span>
                    ))}
                  </div>
                  <h3 className="g-showcase-card-title">{p.title}</h3>
                  <span className="g-showcase-card-link">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="g-footer">
          &copy; {new Date().getFullYear()} {content.hero.name}. Built with Next.js &middot; Dark Dashboard UI
        </footer>
      </main>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
