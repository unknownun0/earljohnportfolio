"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Certifications() {
  const { content } = useContent();

  return (
    <div className="bg-[#151515] border border-white/20 rounded-2xl p-5">
      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#EF4444] rounded-full" />
        Certifications
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {content.certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -1 }}
            className="bg-[#1E1E1E] rounded-xl border border-white/20 p-3 hover:border-[#EF4444]/30 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{cert.icon}</span>
              <span className="text-[10px] font-semibold text-white">
                {cert.title}
              </span>
            </div>
            <p className="text-[9px] text-[#888]">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
