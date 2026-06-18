"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function TechStack() {
  const { content } = useContent();

  return (
    <div className="bg-[#151515] border border-white/20 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-bold text-white">Tech Stack</h3>
      <div className="space-y-3">
        {content.techStack.slice(0, 4).map((group) => (
          <div key={group.id}>
            <h4 className="text-[10px] font-semibold text-[#666] uppercase tracking-wider mb-1.5">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-1">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-[10px] text-[#888] bg-[#1E1E1E] px-2 py-0.5 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
