"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/defaultContent";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#151515] border border-white/20 rounded-2xl overflow-hidden max-w-lg w-full max-h-[85vh] overflow-y-auto"
        >
          <div className="relative">
            {project.video ? (
              <video
                src={project.video}
                className="w-full aspect-video object-cover"
                controls
                autoPlay
                playsInline
              />
            ) : project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-[#1E1E1E] flex items-center justify-center">
                <span className="text-xs text-[#888]">No media</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {project.featured && (
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-medium text-[#EF4444] bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="p-5 space-y-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                {project.title}
              </h2>
              <div className="w-8 h-[3px] bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-full" />
            </div>

            <p className="text-sm text-[#888] leading-relaxed">
              {project.description}
            </p>

            {project.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-white mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-[#EF4444] bg-[#EF4444]/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
