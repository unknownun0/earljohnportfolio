"use client";

import { Grid3X3, Code2, Briefcase } from "lucide-react";

const tabs = [
  { icon: Grid3X3, label: "Grid", key: "grid" },
  { icon: Code2, label: "Skills", key: "skills" },
  { icon: Briefcase, label: "Experience", key: "experience" },
];

interface InstagramTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function InstagramTabs({ activeTab, onTabChange }: InstagramTabsProps) {
  return (
    <div className="ig-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`ig-tab ${activeTab === tab.key ? "active" : ""}`}
        >
          <tab.icon className="w-3 h-3" />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
