"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
  {
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    icon: "🌐",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "FreeCodeCamp",
    icon: "📊",
  },
  {
    title: "Python Programming",
    issuer: "FreeCodeCamp",
    icon: "🐍",
  },
];

export default function Certifications() {
  return (
    <SectionWrapper className="px-4 py-20" id="certifications">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Certifications
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#151515] border border-[#222] rounded-3xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-[#6C63FF]" />
              <h3 className="text-xl font-bold text-white">
                FreeCodeCamp Certifications
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#1E1E1E] rounded-2xl p-5 border border-[#222] hover:border-[#6C63FF]/30 transition-all duration-300 cursor-default"
                >
                  <div className="text-2xl mb-3">{cert.icon}</div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#888]">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
