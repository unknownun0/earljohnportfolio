"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa6";
import { useContent } from "@/context/ContentContext";

const iconMap: Record<string, React.ElementType> = {
  Code2: FaGithub,
  Globe: FaFacebook,
  Camera: FaInstagram,
  Link2: FaLinkedinIn,
  Mail: FaEnvelope,
  MessageCircle: FaWhatsapp,
};

export default function FloatingSocials() {
  const [open, setOpen] = useState(false);
  const { content } = useContent();

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {content.socials.map((s) => {
            const Icon = iconMap[s.icon];
            if (!Icon) return null;
            return (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="ig-social-icon"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        title="Contact"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#0095f6",
          border: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,149,246,0.4)",
          transition: "transform 0.2s",
          fontSize: "24px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? <X /> : <MessageCircle />}
      </button>
    </>
  );
}
