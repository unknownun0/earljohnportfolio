"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { Code2, Link2, Camera, Globe, Mail, User } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const socialIconMap: Record<string, typeof Code2> = {
  Code2,
  Link2,
  Camera,
  Globe,
  Mail,
  User,
};

export default function SocialLinks() {
  const { content } = useContent();

  return (
    <SectionWrapper className="px-4 pb-16" id="socials">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Connect
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-2">
          {content.socials.map((social, index) => {
            const IconComponent = socialIconMap[social.icon] || Globe;
            return (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="bg-[#151515] border border-white/20 rounded-xl p-3 hover:border-[#EF4444]/40 hover:bg-[#1E1E1E] transition-all duration-300 group flex flex-col items-center gap-1 min-w-[72px]"
              >
                <IconComponent className="w-4 h-4 text-[#888] group-hover:text-[#EF4444] transition-colors duration-300" />
                <span className="text-[10px] text-[#888] group-hover:text-[#EF4444] transition-colors duration-300">
                  {social.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
