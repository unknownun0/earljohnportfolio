"use client";

import { motion } from "framer-motion";
import { FaGithub, FaGoogle, FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useContent } from "@/context/ContentContext";
import type { IconType } from "react-icons";

const socialIconMap: Record<string, IconType> = {
  Code2: FaGithub,
  Mail: FaGoogle,
  MessageCircle: FaWhatsapp,
  Globe: FaFacebook,
  Link2: FaLinkedin,
  Camera: FaInstagram,
};

export default function SocialLinks() {
  const { content } = useContent();

  return (
    <div>
      <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Contact me</h3>
      <div className="flex flex-wrap gap-2">
        {content.socials.map((social, index) => {
          const IconComponent = socialIconMap[social.icon];
          if (!IconComponent) return null;
          return (
            <motion.a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3, scale: 1.1 }}
              className="border rounded-lg p-2 transition-all duration-200"
              style={{
                backgroundColor: 'var(--card-alt)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
