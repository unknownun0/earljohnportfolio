"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Education() {
  const { content } = useContent();

  return (
    <div>
      <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span className="w-1 h-4 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        Education
      </h2>
      <div className="space-y-4">
        {content.education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-l-2 pl-3 py-1 transition-colors"
            style={{ borderColor: 'var(--border)' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.school}</h3>
            <div className="flex items-center gap-1.5 mt-0.5" style={{ color: 'var(--accent)' }}>
              <Calendar className="w-3 h-3" />
              <span className="text-[10px] font-medium">{item.period}</span>
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.degree}</p>
            {item.details.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-[10px] flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
