"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Education() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-20" id="education">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Education
        </motion.h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#EF4444] via-[#EF4444]/50 to-transparent" />
          <div className="space-y-8">
            {content.education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ x: 4 }}
                className="relative pl-16"
              >
                <div className="absolute left-4 top-6 w-9 h-9 rounded-full bg-[#151515] border-2 border-[#EF4444] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#EF4444]" />
                </div>
                <div className="bg-[#151515] border border-white/20 rounded-3xl p-6 md:p-8 hover:border-[#EF4444]/30 transition-all duration-300 hover:bg-[#1E1E1E]">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {item.school}
                  </h3>
                  <div className="flex items-center gap-2 text-[#EF4444] mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.period}</span>
                  </div>
                  <p className="text-white/80 mb-2">{item.degree}</p>
                  {item.details.length > 0 && (
                    <ul className="space-y-1">
                      {item.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-[#888] text-sm flex items-center gap-2"
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
