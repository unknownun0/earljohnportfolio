"use client";

import SectionWrapper from "./SectionWrapper";
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
    <SectionWrapper className="px-4 py-12" id="contact">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Contact
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {content.contact.map((item, index) => {
            const IconComponent = iconMap[item.icon] || MapPin;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-[#151515] border border-white/20 rounded-2xl p-4 hover:border-[#EF4444]/30 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EF4444]/20 to-[#DC2626]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-4 h-4 text-[#EF4444]" />
                </div>
                <p className="text-[11px] text-[#888] mb-0.5">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-white font-medium hover:text-[#EF4444] transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-white font-medium">{item.value}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
