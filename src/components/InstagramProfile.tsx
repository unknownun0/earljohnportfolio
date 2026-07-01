"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useContent } from "@/context/ContentContext";
import { X } from "lucide-react";
import type { Certification } from "@/data/defaultContent";

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", cursor: "zoom-out",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "20px", right: "20px",
          width: "40px", height: "40px", borderRadius: "50%",
          background: "rgba(255,255,255,0.1)", border: "none",
          color: "#fff", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "20px", backdropFilter: "blur(4px)",
        }}
      >
        <X className="w-5 h-5" />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "90vh", cursor: "default" }}
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            style={{
              maxWidth: "100%", maxHeight: "85vh",
              borderRadius: "12px", display: "block",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          />
        ) : (
          <div style={{ color: "var(--ig-text-secondary)", fontSize: "18px", textAlign: "center" }}>
            {cert.title}
          </div>
        )}
        <p style={{ color: "var(--ig-text)", fontSize: "14px", textAlign: "center", marginTop: "16px", fontWeight: 500 }}>
          {cert.title} — {cert.issuer}
        </p>
      </div>
    </div>,
    document.body
  );
}

export default function InstagramProfile() {
  const { content } = useContent();
  const { hero, projects, experience, techStack } = content;
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const stats = {
    projects: projects.length,
    contributions: experience.length,
    skills: techStack.reduce((sum, g) => sum + g.items.length, 0),
  };

  const linkedIn = content.socials.find((s) => s.label === "LinkedIn")?.href || "#";

  return (
    <>
      <div className="ig-profile-header">
        <div className="ig-profile-avatar">
          {hero.image ? (
            <img src={hero.image} alt={hero.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-gray-800 text-gray-400">
              {hero.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}
        </div>

        <div className="ig-profile-info">
          <div className="ig-profile-actions">
            <span className="ig-profile-username">{hero.name}</span>
            <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="ig-follow-btn">
              Portfolio
            </a>
          </div>

          <div className="ig-profile-stats">
            <div className="ig-stat">
              <strong>{stats.projects}</strong>
              <span>projects</span>
            </div>
            <div className="ig-stat">
              <strong>{stats.contributions}</strong>
              <span>contributions</span>
            </div>
            <div className="ig-stat">
              <strong>{stats.skills}</strong>
              <span>skills</span>
            </div>
          </div>

          <div className="ig-profile-bio">
            <span className="ig-bio-desc">Turning ideas into digital solutions</span>
            <span className="ig-bio-desc" style={{ color: "var(--ig-text-secondary)" }}>Web Dev | Graphic Design | SMM</span>
          </div>
        </div>
      </div>

      <div className="ig-highlights-section">
        <div className="ig-highlights-title">Certificates</div>
        <div className="ig-highlights">
          {content.certifications.map((cert) => (
          <div key={cert.id} className="ig-highlight-item" onClick={() => setSelectedCert(cert)} style={{ cursor: "pointer" }}>
            <div className="ig-highlight-circle">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} />
              ) : (
                <span style={{ fontSize: "20px" }}>{cert.icon || "📜"}</span>
              )}
            </div>
            <span className="ig-highlight-label">{cert.title}</span>
          </div>
        ))}
      </div>
      </div>

      {selectedCert && (
        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </>
  );
}
