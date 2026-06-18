"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Interests() {
  const { content } = useContent();

  return (
    <div className="bg-[#151515] border border-white/20 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-3">Interests</h3>
      <div className="flex flex-wrap gap-1.5">
        {content.interests.map((item, index) => (
          <span
            key={item}
            className="text-[11px] text-[#888] bg-[#1E1E1E] px-2.5 py-1 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
