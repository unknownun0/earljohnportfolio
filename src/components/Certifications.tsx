"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Certifications() {
  const { content } = useContent();

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
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#151515] border border-[#222] rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-[#6C63FF]" />
              <h3 className="text-xl font-bold text-white">
                Certifications
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#222] hover:border-[#6C63FF]/30 transition-all duration-300 group"
                >
                  {cert.image && (
                    <div className="h-36 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="text-2xl mb-2">{cert.icon}</div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-[#888]">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
