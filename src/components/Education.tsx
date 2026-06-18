"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Education() {
  const { content } = useContent();

  return (
    <div className="bg-[#151515] border border-white/20 rounded-2xl p-5">
      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#EF4444] rounded-full" />
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
            className="border-l-2 border-white/20 pl-3 py-1 hover:border-[#EF4444] transition-colors"
          >
            <h3 className="text-sm font-bold text-white">{item.school}</h3>
            <div className="flex items-center gap-1.5 text-[#EF4444] mt-0.5">
              <Calendar className="w-3 h-3" />
              <span className="text-[10px] font-medium">{item.period}</span>
            </div>
            <p className="text-[11px] text-[#888] mt-0.5">{item.degree}</p>
            {item.details.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-[10px] text-[#666] flex items-center gap-1.5"
                  >
                    <span className="w-0.5 h-0.5 rounded-full bg-[#EF4444]" />
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
