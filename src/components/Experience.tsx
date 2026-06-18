"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Experience() {
  const { content } = useContent();

  return (
    <div className="bg-[#151515] border border-white/20 rounded-2xl p-5">
      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#EF4444] rounded-full" />
        Experience & Seminars
      </h2>
      <div className="space-y-3">
        {content.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-l-2 border-white/20 pl-3 py-1 hover:border-[#EF4444] transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-white">{exp.title}</h3>
              <span className="text-[10px] font-medium text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded-full shrink-0">
                {exp.type}
              </span>
            </div>
            <p className="text-[11px] text-[#888] mt-0.5">{exp.organization}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
