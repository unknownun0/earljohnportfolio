"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function TechStack() {
  const { content } = useContent();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white">Tech Stack</h3>
      <div className="space-y-3">
        {content.techStack.slice(0, 4).map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
          >
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
