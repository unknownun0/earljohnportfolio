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
    <SectionWrapper className="px-4 pb-20" id="socials">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Connect
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
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
                whileHover={{ y: -6, scale: 1.05 }}
                className="bg-[#151515] border border-white/20 rounded-2xl p-5 hover:border-[#6C63FF]/40 hover:bg-[#1E1E1E] transition-all duration-300 group flex flex-col items-center gap-2 min-w-[100px]"
              >
                <IconComponent className="w-6 h-6 text-[#888] group-hover:text-[#6C63FF] transition-colors duration-300" />
                <span className="text-xs text-[#888] group-hover:text-[#6C63FF] transition-colors duration-300">
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
