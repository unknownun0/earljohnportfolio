"use client";

import InstagramSidebar from "./InstagramSidebar";
import InstagramProfile from "./InstagramProfile";
import InstagramGrid from "./InstagramGrid";
import FloatingSocials from "./FloatingSocials";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";

function SkillsView() {
  const { content } = useContent();
  return (
    <section style={{ maxWidth: "935px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ color: "var(--ig-text)", fontSize: "18px", fontWeight: 700, marginBottom: "20px", letterSpacing: "0.3px" }}>Skills</h2>
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
    </section>
  );
}

function ExperienceView() {
  const { content } = useContent();
  return (
    <section style={{ maxWidth: "935px", margin: "0 auto", padding: "0 24px 24px" }}>
      <h2 style={{ color: "var(--ig-text)", fontSize: "18px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.3px" }}>Experience</h2>
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
    </section>
  );
}

export default function InstagramLayout() {
  const { theme } = useTheme();

  return (
    <div className={`ig-theme${theme === "light" ? " light-mode" : ""}`} style={{ minHeight: "100vh" }}>
      <InstagramSidebar />

      <main className="ig-main">
        <div className="ig-profile">
          <InstagramProfile />
        </div>

        <InstagramGrid />

        <hr style={{ border: "none", borderTop: "1px solid var(--ig-border)", margin: "0 24px" }} />

        <SkillsView />

        <hr style={{ border: "none", borderTop: "1px solid var(--ig-border)", margin: "0 24px" }} />

        <ExperienceView />
      </main>

      <FloatingSocials />

    </div>
  );
}
