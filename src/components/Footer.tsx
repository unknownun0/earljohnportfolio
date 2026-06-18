"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/20 py-6 px-4"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#888]">
          &copy; {new Date().getFullYear()} Earl John Gomez. All rights
          reserved.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="text-xs text-[#888] hover:text-[#EF4444] transition-colors duration-300"
          >
            Admin
          </a>
          <p className="text-xs text-[#888]">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
