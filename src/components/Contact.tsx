"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, GraduationCap } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const iconMap: Record<string, typeof MapPin> = {
  MapPin,
  Mail,
  Phone,
  GraduationCap,
};

export default function Contact() {
  const { content } = useContent();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Contact</h3>
      <div className="space-y-2.5">
        {content.contact.map((item, index) => {
          const IconComponent = iconMap[item.icon] || MapPin;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-2.5"
            >
              <IconComponent className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-[11px] transition-colors" style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{item.value}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
