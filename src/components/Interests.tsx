"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Interests() {
  const { content } = useContent();

  return (
    <div>
      <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Interests</h3>
      <div className="flex flex-wrap gap-1.5">
        {content.interests.map((item, index) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="text-[11px] px-2.5 py-1 rounded-full"
            style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--card-alt)' }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
