"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
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
          className="bg-[#151515] border border-white/20 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                <span className="text-[#888]">No media</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {project.featured && (
              <div className="absolute top-4 left-4">
                <span className="text-xs font-medium text-[#6C63FF] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 space-y-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-[#6C63FF] to-[#FF6B6B] rounded-full" />
            </div>

            <p className="text-[#888] leading-relaxed">
              {project.description}
            </p>

            {project.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-[#6C63FF] bg-[#6C63FF]/10 px-4 py-1.5 rounded-full"
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
