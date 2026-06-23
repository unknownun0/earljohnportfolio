"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/defaultContent";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="border rounded-2xl overflow-hidden max-w-lg w-full max-h-[85vh] overflow-y-auto"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div className="relative">
            {project.video ? (
              <video
                src={project.video}
                className="w-full aspect-video object-cover"
                controls
                autoPlay
                playsInline
                onLoadedData={() => setMediaLoaded(true)}
              />
            ) : project.image ? (
              <>
                {!mediaLoaded && (
                  <div className="w-full aspect-video flex items-center justify-center" style={{ backgroundColor: 'var(--card-alt)' }}>
                    <span className="text-xs animate-pulse" style={{ color: 'var(--text-secondary)' }}>Loading...</span>
                  </div>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full aspect-video object-cover ${mediaLoaded ? "" : "hidden"}`}
                  onLoad={() => setMediaLoaded(true)}
                />
              </>
            ) : (
              <div className="w-full aspect-video flex items-center justify-center" style={{ backgroundColor: 'var(--card-alt)' }}>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>No media</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'var(--text-primary)' }}
            >
              <X className="w-4 h-4" />
            </button>
            {project.featured && (
              <div className="absolute top-3 left-3">
                <span
                  className="text-[10px] font-medium backdrop-blur-sm px-2 py-0.5 rounded-full"
                  style={{ color: 'var(--accent)', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="p-5 space-y-4">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
            <div className="w-8 h-[3px] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]" />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1 rounded-full"
                    style={{ color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm hover:underline font-medium"
                style={{ color: 'var(--accent)' }}
              >
                Visit Live Site →
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
