"use client";

import { useEffect, useState } from "react";
import InstagramSidebar from "./InstagramSidebar";
import InstagramProfile from "./InstagramProfile";
import InstagramTabs from "./InstagramTabs";
import InstagramGrid from "./InstagramGrid";
import FloatingSocials from "./FloatingSocials";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";

function SkillsView() {
  const { content } = useContent();
  return (
    <div style={{ maxWidth: "935px", margin: "0 auto", padding: "24px" }}>
      {content.techStack.map((group) => (
        <div key={group.id} style={{ marginBottom: "32px" }}>
          <h3 style={{ color: "var(--ig-text)", fontSize: "16px", fontWeight: 600, marginBottom: "14px" }}>
            {group.category}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
            {group.items.map((item) => {
              const level = content.skillLevels?.[item] ?? 0;
              return (
                <div key={item} style={{
                  display: "flex", flexDirection: "column", gap: "8px",
                  padding: "14px",
                  background: "var(--ig-hover-bg)",
                  borderRadius: "8px",
                  border: "1px solid var(--ig-border)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "var(--ig-text)", fontSize: "12px", fontWeight: 500 }}>{item}</span>
                    <span style={{ color: "var(--ig-blue)", fontSize: "11px", fontWeight: 600 }}>{level}%</span>
                  </div>
                  <div style={{
                    width: "100%", height: "4px", borderRadius: "2px",
                    background: "var(--ig-elevated)", overflow: "hidden",
                  }}>
                    <div style={{
                      width: `${level}%`, height: "100%", borderRadius: "2px",
                      background: "var(--ig-blue)",
                      transition: "width 0.8s ease",
                    }} />
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

function ExperienceView() {
  const { content } = useContent();
  return (
    <div style={{ maxWidth: "935px", margin: "0 auto", padding: "24px" }}>
      {content.experience.map((exp, i) => (
        <div
          key={exp.id}
          style={{
            display: "flex",
            gap: "16px",
            padding: "16px 0",
            borderTop: i === 0 ? "none" : "1px solid var(--ig-border)",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "var(--ig-hover-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              flexShrink: 0,
              border: "2px solid var(--ig-border)",
            }}
          >
            {exp.icon || "💼"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ color: "var(--ig-text)", fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>
              {exp.title}
            </h4>
            <p style={{ color: "var(--ig-text-secondary)", fontSize: "13px", marginBottom: "4px" }}>
              {exp.organization}
            </p>
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                color: "var(--ig-blue)",
                background: "rgba(0,149,246,0.1)",
                padding: "2px 10px",
                borderRadius: "4px",
                fontWeight: 500,
              }}
            >
              {exp.type}
            </span>

          </div>
        </div>
      ))}
    </div>
  );
}

export default function InstagramLayout() {
  const { content } = useContent();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("grid");

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

  return (
    <div className={`ig-theme${theme === "light" ? " light-mode" : ""}`} style={{ minHeight: "100vh" }}>
      <InstagramSidebar />

      <main className="ig-main">
        <div className="ig-profile">
          <InstagramProfile />
        </div>

        <InstagramTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="ig-grid-wrapper" style={{ marginTop: "4px" }}>
          {activeTab === "grid" && <InstagramGrid />}
          {activeTab === "skills" && <SkillsView />}
          {activeTab === "experience" && <ExperienceView />}
        </div>
      </main>

      <FloatingSocials />


    </div>
  );
}
