"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Interests() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 py-20" id="interests">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Interests
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {content.interests.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-[#151515] border border-[#222] rounded-full px-6 py-3 flex items-center gap-3 hover:border-[#6C63FF]/40 hover:bg-[#1E1E1E] transition-all duration-300 cursor-default"
            >
              <span className="text-xl">{item.split(" ")[0]}</span>
              <span className="text-white font-medium">
                {item.replace(/^[^\s]+\s/, "")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
