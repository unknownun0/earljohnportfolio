"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-[#222] py-8 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#888]">
          &copy; {new Date().getFullYear()} Earl John Gomez. All rights
          reserved.
        </p>
        <p className="text-sm text-[#888]">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </motion.footer>
  );
}
