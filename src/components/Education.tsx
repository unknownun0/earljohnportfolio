"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    school: "Dr. Filemon C. Aguilar Memorial College",
    period: "2022 – Present",
    degree: "Bachelor of Science in Information Systems",
    details: ["PSITE Head Programmer (2023–2026)", "Currently Enrolled"],
  },
  {
    school: "Zarate College",
    period: "2020 – 2022",
    degree: "ICT Strand",
    details: ["ICT Vice President"],
  },
  {
    school: "Captain Albert Aguilar National High School",
    period: "2016 – 2020",
    degree: "Completed Secondary Education",
    details: [],
  },
];

export default function Education() {
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
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#6C63FF] via-[#6C63FF]/50 to-transparent" />
          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ x: 4 }}
                className="relative pl-16"
              >
                <div className="absolute left-4 top-6 w-9 h-9 rounded-full bg-[#151515] border-2 border-[#6C63FF] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#6C63FF]" />
                </div>
                <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 md:p-8 hover:border-[#6C63FF]/30 transition-all duration-300 hover:bg-[#1E1E1E]">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {item.school}
                  </h3>
                  <div className="flex items-center gap-2 text-[#6C63FF] mb-3">
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
                          <span className="w-1 h-1 rounded-full bg-[#6C63FF]" />
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
