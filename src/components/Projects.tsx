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
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#EF4444] rounded-full" />
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
              className="bg-[#1E1E1E] border border-white/20 rounded-xl overflow-hidden hover:border-[#EF4444]/30 transition-all duration-200 group cursor-pointer"
            >
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#EF4444] transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="text-[9px] font-medium text-[#EF4444] bg-[#EF4444]/10 px-1.5 py-0.5 rounded shrink-0">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#888] leading-relaxed line-clamp-2 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] text-[#666] bg-[#0B0B0B] px-1.5 py-0.5 rounded"
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
                    className="inline-block mt-2 text-[10px] text-[#EF4444] hover:underline"
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
