"use client";

import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import type { Project } from "@/data/defaultContent";

export default function Projects() {
  const { content } = useContent();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div>
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="w-1 h-4 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {content.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelected(project)}
              className="border rounded-xl overflow-hidden transition-all duration-200 group cursor-pointer"
              style={{ backgroundColor: 'var(--card-alt)', borderColor: 'var(--border)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className="text-sm font-bold transition-colors" style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  >
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded shrink-0"
                      style={{ color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed line-clamp-2 mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 text-[10px] hover:underline" style={{ color: 'var(--accent)' }}
                  >
                    Visit Site →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
