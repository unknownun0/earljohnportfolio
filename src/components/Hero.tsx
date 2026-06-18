"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#DC2626] p-[3px] animate-float">
              <div className="w-full h-full rounded-2xl bg-[#151515] flex items-center justify-center overflow-hidden">
                {hero.image ? (
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center text-3xl md:text-4xl font-bold text-white">
                    {hero.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-[#EF4444]/20 -z-10" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="bg-[#151515] rounded-2xl p-6 md:p-8 border border-white/20 hover:border-[#EF4444]/30 transition-colors duration-300">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              {hero.name}
            </h1>
            <div className="w-12 h-[3px] bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-full mb-4" />
            <p className="text-sm md:text-base text-[#EF4444] italic mb-4 leading-relaxed">
              &ldquo;{hero.quote}&rdquo;
            </p>
            <div className="space-y-2 text-sm text-[#888] leading-relaxed">
              {hero.about.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
