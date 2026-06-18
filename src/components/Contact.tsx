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
    <SectionWrapper className="px-4 py-20" id="contact">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Contact
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.contact.map((item, index) => {
            const IconComponent = iconMap[item.icon] || MapPin;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#151515] border border-white/20 rounded-3xl p-6 hover:border-[#6C63FF]/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF]/20 to-[#FF6B6B]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-5 h-5 text-[#6C63FF]" />
                </div>
                <p className="text-sm text-[#888] mb-1">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-white font-medium hover:text-[#6C63FF] transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white font-medium">{item.value}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
