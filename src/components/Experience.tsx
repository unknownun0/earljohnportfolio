"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Experience() {
  const { content } = useContent();

  return (
    <div>
      <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span className="w-1 h-4 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        Experience & Seminars
      </h2>
      <div className="space-y-3">
        {content.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-l-2 pl-3 py-1 transition-colors"
            style={{ borderColor: 'var(--border)' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{exp.title}</h3>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
                style={{ color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }}
              >
                {exp.type}
              </span>
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{exp.organization}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
