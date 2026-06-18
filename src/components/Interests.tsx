"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const interests = [
  { emoji: "💻", label: "Web Development" },
  { emoji: "🎨", label: "Graphic Design" },
  { emoji: "🤖", label: "Artificial Intelligence" },
  { emoji: "📱", label: "Social Media Management" },
  { emoji: "🚀", label: "Technology" },
];

export default function Interests() {
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
          {interests.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-[#151515] border border-[#222] rounded-full px-6 py-3 flex items-center gap-3 hover:border-[#6C63FF]/40 hover:bg-[#1E1E1E] transition-all duration-300 cursor-default"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-white font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
