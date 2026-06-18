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
      <h3 className="text-sm font-bold text-white">Contact</h3>
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
              <IconComponent className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-[11px] text-[#888] hover:text-[#EF4444] transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-[11px] text-[#888]">{item.value}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
