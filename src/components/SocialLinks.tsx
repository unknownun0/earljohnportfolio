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
    <div>
      <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Connect</h3>
      <div className="flex flex-wrap gap-2">
        {content.socials.map((social, index) => {
          const IconComponent = socialIconMap[social.icon] || Globe;
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
