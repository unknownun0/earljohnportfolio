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
      <SectionWrapper className="px-4 py-20" id="projects">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelected(project)}
                className="bg-[#151515] border border-[#222] rounded-3xl overflow-hidden hover:border-[#6C63FF]/30 transition-all duration-300 group cursor-pointer"
              >
                {(project.image || project.video) && (
                  <div className="relative h-48 overflow-hidden">
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
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-medium text-[#6C63FF] bg-[#0B0B0B]/80 backdrop-blur-sm px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6 md:p-8">
                  {!project.image && !project.video && (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 to-[#FF6B6B]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-6 h-6 text-[#6C63FF]" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6C63FF] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#888] leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#666] bg-[#1E1E1E] px-3 py-1 rounded-full"
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
