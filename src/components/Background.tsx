"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#EF4444" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>

      <svg className="absolute bottom-0 left-0 w-full h-[60vh]" viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,400 C320,300 480,500 720,400 C960,300 1120,500 1440,400 L1440,600 L0,600 Z"
          fill="rgba(239, 68, 68, 0.04)"
          animate={{
            d: [
              "M0,400 C320,300 480,500 720,400 C960,300 1120,500 1440,400 L1440,600 L0,600 Z",
              "M0,450 C320,550 480,350 720,450 C960,550 1120,350 1440,450 L1440,600 L0,600 Z",
              "M0,400 C320,300 480,500 720,400 C960,300 1120,500 1440,400 L1440,600 L0,600 Z",
            ],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,500 C320,600 480,400 720,500 C960,600 1120,400 1440,500 L1440,600 L0,600 Z"
          fill="rgba(239, 68, 68, 0.025)"
          animate={{
            d: [
              "M0,500 C320,600 480,400 720,500 C960,600 1120,400 1440,500 L1440,600 L0,600 Z",
              "M0,450 C320,350 480,550 720,450 C960,350 1120,550 1440,450 L1440,600 L0,600 Z",
              "M0,500 C320,600 480,400 720,500 C960,600 1120,400 1440,500 L1440,600 L0,600 Z",
            ],
          }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,550 C320,480 480,620 720,550 C960,480 1120,620 1440,550 L1440,600 L0,600 Z"
          fill="rgba(239, 68, 68, 0.015)"
          animate={{
            d: [
              "M0,550 C320,480 480,620 720,550 C960,480 1120,620 1440,550 L1440,600 L0,600 Z",
              "M0,520 C320,600 480,460 720,520 C960,600 1120,460 1440,520 L1440,600 L0,600 Z",
              "M0,550 C320,480 480,620 720,550 C960,480 1120,620 1440,550 L1440,600 L0,600 Z",
            ],
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        />
      </svg>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-[#EF4444]"
          style={{
            left: `${12 + i * 16}%`,
            top: `${60 + (i % 3) * 10}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + i * 0.6,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
