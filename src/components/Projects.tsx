"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import ProjectModal from "./ProjectModal";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import type { Project } from "@/data/defaultContent";

export default function Projects() {
  const { content } = useContent();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper className="px-4 py-12" id="projects">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(project)}
                className="bg-[#151515] border border-white/20 rounded-2xl overflow-hidden hover:border-[#EF4444]/30 transition-all duration-300 group cursor-pointer"
              >
                {(project.image || project.video) && (
                  <div className="relative h-36 overflow-hidden">
                    {project.video ? (
                      <video
                        src={project.video}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    {project.featured && (
                      <div className="absolute top-2 right-2">
                        <span className="text-[10px] font-medium text-[#EF4444] bg-[#0B0B0B]/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  {!project.image && !project.video && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#EF4444]/20 to-[#DC2626]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-4 h-4 text-[#EF4444]" />
                    </div>
                  )}
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#EF4444] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#888] leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-[#666] bg-[#1E1E1E] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
