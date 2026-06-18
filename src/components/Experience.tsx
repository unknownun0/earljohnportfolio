"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Experience() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-20" id="experience">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Experience & Seminars
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#151515] border border-[#222] rounded-3xl overflow-hidden hover:border-[#6C63FF]/30 transition-all duration-300 group"
            >
              {exp.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  {!exp.image && <div className="text-2xl">{exp.icon}</div>}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#6C63FF] transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <span className="text-xs font-medium text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-[#888]">{exp.organization}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
