"use client";

import { Home, Laptop, Briefcase, Camera, Moon, Sun } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useTheme } from "@/context/ThemeContext";

const topNav = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Laptop, label: "Skills", href: "#skills" },
  { icon: Briefcase, label: "Experience", href: "#experience" },
];

export default function InstagramSidebar() {
  const { content } = useContent();
  const { theme, toggleTheme } = useTheme();
  const { hero } = content;

  return (
    <aside className="ig-sidebar">
      <div className="ig-sidebar-logo">
        <Camera className="w-6 h-6" />
      </div>

      <nav className="ig-sidebar-nav">
        {topNav.map((item) => (
          <a key={item.label} href={item.href} className="ig-sidebar-item" title={item.label}>
            <item.icon className="w-6 h-6" />
            <span className="ig-sidebar-item-tooltip">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="ig-sidebar-bottom">
        <button onClick={toggleTheme} className="ig-sidebar-item" title={theme === "dark" ? "Light mode" : "Dark mode"} style={{ background: "none", border: "none", cursor: "pointer" }}>
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="ig-sidebar-item-tooltip">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
        <a href="#" className="ig-sidebar-item" title="Profile">
          {hero.image ? (
            <img
              src={hero.image}
              alt={hero.name}
              className="ig-avatar-thumb"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">
              {hero.name.charAt(0)}
            </div>
          )}
          <span className="ig-sidebar-item-tooltip">Profile</span>
        </a>
      </div>
    </aside>
  );
}
