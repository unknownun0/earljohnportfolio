"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/20 py-8 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#888]">
          &copy; {new Date().getFullYear()} Earl John Gomez. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/admin"
            className="text-sm text-[#888] hover:text-[#6C63FF] transition-colors duration-300"
          >
            Admin
          </a>
          <p className="text-sm text-[#888]">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
