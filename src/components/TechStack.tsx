"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function TechStack() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-12" id="techstack">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Tech Stack
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.techStack.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-[#151515] border border-white/20 rounded-2xl p-4 hover:border-[#EF4444]/30 transition-all duration-300 group"
            >
              <h3 className="text-sm font-bold text-white mb-3 group-hover:text-[#EF4444] transition-colors duration-300">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] text-[#888] bg-[#1E1E1E] px-2.5 py-1 rounded-full hover:bg-[#EF4444]/10 hover:text-[#EF4444] hover:border-[#EF4444]/30 border border-transparent transition-all duration-200 cursor-default"
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
