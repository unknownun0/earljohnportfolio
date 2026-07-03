"use client";

import { useState } from "react";
import { useContent } from "@/context/ContentContext";

export default function ResumePage() {
  const { content } = useContent();
  const { hero, education, experience, techStack, certifications, contact, socials } = content;
  const allSkills = techStack.flatMap((g) => g.items);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const intro = `Name: ${name}%0AEmail: ${email}%0A%0A`;
    const fullMsg = `${intro}${message}`;
    window.open(`https://m.me/itsm3earljohn?text=${fullMsg}`, "_blank");
    setVerified(true);
  };

  return (
    <>
      {!verified && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px", backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "32px",
            maxWidth: "420px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <h2 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "#1a1a1a" }}>Download Resume</h2>
            <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#888" }}>Fill this out to get my resume. I&apos;ll reply on Messenger!</p>
            <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "4px" }}>Name</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1px solid #ddd", fontSize: "14px", outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0095f6"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#ddd"}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "4px" }}>Email</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1px solid #ddd", fontSize: "14px", outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0095f6"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#ddd"}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "4px" }}>Message</label>
                <textarea
                  required value={message} onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1px solid #ddd", fontSize: "14px", outline: "none", resize: "vertical",
                    boxSizing: "border-box", fontFamily: "inherit",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0095f6"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#ddd"}
                  placeholder="Say hi or tell me why you need my resume..."
                />
              </div>
              <button type="submit" style={{
                width: "100%", padding: "12px", borderRadius: "8px",
                background: "#0095f6", color: "#fff", border: "none",
                fontSize: "15px", fontWeight: 600, cursor: "pointer",
                marginTop: "4px",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#0081d6"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#0095f6"}
              >
                Send via Messenger & Download
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{
      maxWidth: "210mm", margin: "0 auto", padding: "20px 24px",
      fontFamily: "Inter, system-ui, sans-serif", color: "#1a1a1a",
      fontSize: "10px", lineHeight: 1.4,
      background: "#fff",
      minHeight: "297mm",
      boxSizing: "border-box",
    }}>
      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        .resume-print-btn { position: fixed; bottom: 24px; right: 24px; z-index: 999; }
        @media print { .resume-print-btn { display: none; } }
      `}</style>

      <button onClick={() => window.print()} className="resume-print-btn" style={{
        background: "#0095f6", color: "#fff", border: "none",
        padding: "10px 20px", borderRadius: "8px", fontSize: "14px",
        fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,149,246,0.3)",
      }}>Download PDF</button>

      {/* Header */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "16px", paddingBottom: "12px", borderBottom: "2px solid #0095f6" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #0095f6" }}>
          {hero.image ? <img src={hero.image} alt={hero.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#000" }}>{hero.name}</h1>
          <p style={{ fontSize: "11px", color: "#555", margin: "2px 0 4px", fontStyle: "italic" }}>{hero.quote}</p>
          <p style={{ fontSize: "10px", color: "#333", margin: 0 }}>{hero.about.join(" ")}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginTop: "6px", fontSize: "10px", color: "#0095f6" }}>
            {contact.map((c) => c.value).filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
            {socials.filter((s) => s.label !== "Gmail").map((s) => (
              <a key={s.id} href={s.href} target="_blank" style={{ color: "#0095f6", textDecoration: "none" }}>{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "20px" }}>
        {/* Left Column */}
        <div>
          {/* Skills */}
          <Section title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
              {allSkills.map((s) => (
                <span key={s} style={{ background: "#e8f0fe", color: "#1a73e8", padding: "2px 6px", borderRadius: "3px", fontSize: "8.5px", fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            {education.map((e) => (
              <div key={e.id} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: 600, fontSize: "10px" }}>{e.school}</div>
                <div style={{ color: "#555", fontSize: "9px" }}>{e.degree}</div>
                <div style={{ color: "#888", fontSize: "8px" }}>{e.period}</div>
                {e.details.length > 0 && (
                  <ul style={{ margin: "2px 0 0", paddingLeft: "14px", fontSize: "8.5px", color: "#555" }}>
                    {e.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </Section>

          {/* Tech Categories */}
          <Section title="Specializations">
            {techStack.map((g) => (
              <div key={g.id} style={{ marginBottom: "6px" }}>
                <div style={{ fontWeight: 500, fontSize: "9px", color: "#333" }}>{g.category}</div>
                <div style={{ color: "#666", fontSize: "8.5px" }}>{g.items.join(", ")}</div>
              </div>
            ))}
          </Section>

          {/* Certifications */}
          <Section title="Certifications">
            {certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: "4px", fontSize: "9px" }}>
                <span style={{ fontWeight: 500 }}>{c.title}</span>
                <span style={{ color: "#888" }}> — {c.issuer}</span>
              </div>
            ))}
          </Section>
        </div>

        {/* Right Column */}
        <div>
          {/* Experience */}
          <Section title="Experience">
            {experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: "8px", paddingBottom: "6px", borderBottom: i < experience.length - 1 ? "1px solid #eee" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 600, fontSize: "10px" }}>{exp.title}</span>
                  <span style={{ fontSize: "8px", color: "#0095f6", background: "#e8f0fe", padding: "1px 6px", borderRadius: "3px", fontWeight: 500 }}>{exp.type}</span>
                </div>
                <div style={{ color: "#555", fontSize: "9px" }}>{exp.organization}</div>
              </div>
            ))}
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {content.projects.map((p, i) => (
              <div key={p.id} style={{ marginBottom: "8px", paddingBottom: "6px", borderBottom: i < content.projects.length - 1 ? "1px solid #eee" : "none" }}>
                <div style={{ fontWeight: 600, fontSize: "10px", color: "#0095f6" }}>{p.title}</div>
                <div style={{ color: "#444", fontSize: "8.5px", marginTop: "1px" }}>{p.description}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", marginTop: "3px" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ background: "#f0f0f0", color: "#666", padding: "1px 5px", borderRadius: "2px", fontSize: "7.5px" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#0095f6", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</h2>
      {children}
    </div>
  );
}
