"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Certifications() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-12" id="certifications">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Certifications
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#151515] border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-4 h-4 text-[#EF4444]" />
              <h3 className="text-base font-bold text-white">
                Certifications
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {content.certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/20 hover:border-[#EF4444]/30 transition-all duration-300 group"
                >
                  {cert.image && (
                    <div className="h-28 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="text-lg mb-1">{cert.icon}</div>
                    <h4 className="text-xs font-semibold text-white mb-0.5">
                      {cert.title}
                    </h4>
                    <p className="text-[10px] text-[#888]">{cert.issuer}</p>
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
