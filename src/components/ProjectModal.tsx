"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useContent } from "@/context/ContentContext";
import type { Project } from "@/data/defaultContent";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { content } = useContent();
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const linkedIn = content.socials.find((s) => s.label === "LinkedIn")?.href || "#";
  const email = content.contact.find((c) => c.label === "Email")?.value || "";

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
          style={{ backgroundColor: '#121212', borderColor: '#262626' }}
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
                  <div className="w-full aspect-video flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
                    <span className="text-xs animate-pulse" style={{ color: '#a8a8a8' }}>Loading...</span>
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
              <div className="w-full aspect-video flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="text-xs" style={{ color: '#a8a8a8' }}>
                  {project.status || "No media"}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#f5f5f5' }}
            >
              <X className="w-4 h-4" />
            </button>
            {(project.featured || project.status) && (
              <div className="absolute top-3 left-3">
                <span
                  className="text-[10px] font-medium backdrop-blur-sm px-2 py-0.5 rounded-full"
                  style={{
                    color: '#0095f6',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {project.status || "Featured"}
                </span>
              </div>
            )}
          </div>

          <div className="p-5 space-y-4">
            <h2 className="text-lg font-bold" style={{ color: '#f5f5f5' }}>{project.title}</h2>
            <div className="w-8 h-[3px] rounded-full" style={{ background: '#0095f6' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#a8a8a8' }}>
              {project.description}
            </p>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1 rounded-full"
                    style={{ color: '#0095f6', backgroundColor: 'rgba(0,149,246,0.1)' }}
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
                style={{ color: '#0095f6' }}
              >
                <ExternalLink className="w-3.5 h-3.5" /> Visit Live Site
              </a>
            )}

            <div className="pt-2 border-t" style={{ borderColor: '#262626' }}>
              <p className="text-xs mb-2" style={{ color: '#a8a8a8' }}>
                Interested in this project? Let&apos;s work together!
              </p>
              <div className="flex gap-2">
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity"
                  style={{ backgroundColor: '#0095f6', color: '#fff' }}
                >
                  <Send className="w-3 h-3" /> Message on LinkedIn
                </a>
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
                    style={{ borderColor: '#262626', color: '#f5f5f5' }}
                  >
                    Send Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
