"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-[#6C63FF] to-[#FF6B6B] p-1 animate-float">
              <div className="w-full h-full rounded-3xl bg-[#151515] flex items-center justify-center overflow-hidden">
                {hero.image ? (
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-[#6C63FF] to-[#FF6B6B] flex items-center justify-center text-5xl md:text-6xl font-bold text-white">
                      {hero.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-[#6C63FF]/20 -z-10" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="bg-[#151515] rounded-3xl p-8 md:p-10 border border-[#222] hover:border-[#6C63FF]/30 transition-colors duration-300">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {hero.name}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-[#6C63FF] to-[#FF6B6B] rounded-full mb-6" />
            <p className="text-lg md:text-xl text-[#6C63FF] italic mb-6 leading-relaxed">
              &ldquo;{hero.quote}&rdquo;
            </p>
            <div className="space-y-4 text-[#888] leading-relaxed">
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
