"use client";

import { Search, Moon, Sun, Camera } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";

export default function FacebookTopbar() {
  const { content } = useContent();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fb-topbar">
      <div className="fb-topbar-logo">
        <Camera className="w-5 h-5" />
        <span>EJG</span>
      </div>

      <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
        <Search className="w-4 h-4" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--fb-text-secondary)", pointerEvents: "none" }} />
        <input className="fb-search" placeholder="Search portfolio..." />
      </div>

      <div className="fb-topbar-right">
        <button onClick={toggleTheme} className="fb-topbar-btn" title={theme === "dark" ? "Light mode" : "Dark mode"}>
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="fb-topbar-avatar">
          {content.hero.image ? (
            <img src={content.hero.image} alt={content.hero.name} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--fb-elevated)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600 }}>
              {content.hero.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
