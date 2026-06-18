"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function TechStack() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-20" id="techstack">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Tech Stack
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.techStack.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-[#151515] border border-[#222] rounded-3xl p-6 md:p-8 hover:border-[#6C63FF]/30 transition-all duration-300 group"
            >
              <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#6C63FF] transition-colors duration-300">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-[#888] bg-[#1E1E1E] px-3 py-1.5 rounded-full hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] hover:border-[#6C63FF]/30 border border-transparent transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
