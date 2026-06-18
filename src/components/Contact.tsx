"use client";

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
    <div className="bg-[#151515] border border-white/20 rounded-2xl p-5 space-y-3">
      <h3 className="text-sm font-bold text-white">Contact</h3>
      <div className="space-y-2.5">
        {content.contact.map((item) => {
          const IconComponent = iconMap[item.icon] || MapPin;
          return (
            <div key={item.id} className="flex items-center gap-2.5">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
