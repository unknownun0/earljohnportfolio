"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Interests() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-12" id="interests">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Interests
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-2">
          {content.interests.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-[#151515] border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 hover:border-[#EF4444]/40 hover:bg-[#1E1E1E] transition-all duration-300 cursor-default"
            >
              <span className="text-base">{item.split(" ")[0]}</span>
              <span className="text-sm text-white font-medium">
                {item.replace(/^[^\s]+\s/, "")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
