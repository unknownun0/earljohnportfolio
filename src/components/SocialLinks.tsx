"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import {
  Code2,
  Link2,
  User,
  Camera,
  Globe,
  Mail,
} from "lucide-react";

const socials = [
  { icon: Code2, label: "GitHub", href: "#" },
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: User, label: "Facebook", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Globe, label: "Portfolio", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:earljohngomez66@gmail.com" },
];

export default function SocialLinks() {
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
          {socials.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="bg-[#151515] border border-[#222] rounded-2xl p-5 hover:border-[#6C63FF]/40 hover:bg-[#1E1E1E] transition-all duration-300 group flex flex-col items-center gap-2 min-w-[100px]"
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
