"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Experience() {
  const { content } = useContent();

  return (
    <div className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mb-8"
      >
        Experience & Seminars
      </motion.h2>
      <div className="grid grid-cols-1 gap-4">
        {content.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-[#151515] border border-white/20 rounded-2xl overflow-hidden hover:border-[#EF4444]/30 transition-all duration-300 group"
          >
            {exp.image && (
              <div className="h-32 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start gap-3">
                {!exp.image && <div className="text-lg">{exp.icon}</div>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#EF4444] transition-colors duration-300 truncate">
                      {exp.title}
                    </h3>
                    <span className="text-[10px] font-medium text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded-full shrink-0">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#888] truncate">{exp.organization}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
