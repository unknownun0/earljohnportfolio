"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, GraduationCap } from "lucide-react";
import { FaGithub, FaEnvelope, FaWhatsapp, FaFacebook, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { useContent } from "@/context/ContentContext";
import type { IconType } from "react-icons";

const iconMap: Record<string, typeof MapPin> = {
  MapPin,
  Mail,
  Phone,
  GraduationCap,
};

const socialIconMap: Record<string, IconType> = {
  Code2: FaGithub,
  Mail: FaEnvelope,
  MessageCircle: FaWhatsapp,
  Globe: FaFacebook,
  Link2: FaLinkedinIn,
  Camera: FaInstagram,
};

export default function Contact() {
  const { content } = useContent();

  return (
    <div className="space-y-4">
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

      <hr className="border-t" style={{ borderColor: 'var(--border)' }} />

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
