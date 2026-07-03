"use client";

import { Grid3X3, Code2, Briefcase, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  { icon: Grid3X3, label: "Grid", key: "grid" },
  { icon: Code2, label: "Skills", key: "skills" },
  { icon: Briefcase, label: "Experience", key: "experience" },
  { icon: FileText, label: "Resume", key: "resume", href: "/resume" },
];

interface InstagramTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function InstagramTabs({ activeTab, onTabChange }: InstagramTabsProps) {
  const router = useRouter();

  return (
    <div className="ig-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => tab.href ? router.push(tab.href) : onTabChange(tab.key)}
          className={`ig-tab ${activeTab === tab.key ? "active" : ""}`}
        >
          <tab.icon className="w-3 h-3" />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
