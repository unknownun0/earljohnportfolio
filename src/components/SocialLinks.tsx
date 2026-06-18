"use client";

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
    <div className="bg-[#151515] border border-white/20 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-3">Connect</h3>
      <div className="flex flex-wrap gap-2">
        {content.socials.map((social) => {
          const IconComponent = socialIconMap[social.icon] || Globe;
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E1E1E] border border-white/20 rounded-lg p-2 hover:border-[#EF4444]/40 hover:bg-[#EF4444]/10 transition-all duration-200 group"
            >
              <IconComponent className="w-3.5 h-3.5 text-[#888] group-hover:text-[#EF4444] transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
