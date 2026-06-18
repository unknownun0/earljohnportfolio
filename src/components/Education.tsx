"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Education() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-12" id="education">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Education
        </motion.h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#EF4444] via-[#EF4444]/50 to-transparent" />
          <div className="space-y-5">
            {content.education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ x: 2 }}
                className="relative pl-12"
              >
                <div className="absolute left-3 top-5 w-7 h-7 rounded-full bg-[#151515] border-2 border-[#EF4444] flex items-center justify-center">
                  <GraduationCap className="w-3 h-3 text-[#EF4444]" />
                </div>
                <div className="bg-[#151515] border border-white/20 rounded-2xl p-5 hover:border-[#EF4444]/30 transition-all duration-300 hover:bg-[#1E1E1E]">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">
                    {item.school}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#EF4444] mb-2">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs font-medium">{item.period}</span>
                  </div>
                  <p className="text-sm text-white/80 mb-1">{item.degree}</p>
                  {item.details.length > 0 && (
                    <ul className="space-y-0.5">
                      {item.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-xs text-[#888] flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#EF4444]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
