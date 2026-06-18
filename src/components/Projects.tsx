"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const projects = [
  {
    title: "Online Booking System",
    description:
      "A web-based reservation platform designed to streamline appointment scheduling and customer management.",
    featured: true,
    tags: ["PHP", "MySQL", "JavaScript"],
  },
  {
    title: "Calculator",
    description:
      "A responsive calculator application built using modern web technologies.",
    featured: false,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Online Grading Management System",
    description:
      "A digital grading platform for managing student records, grades, and academic performance.",
    featured: false,
    tags: ["PHP", "MySQL", "Bootstrap"],
  },
];

export default function Projects() {
  return (
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
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`bg-[#151515] border border-[#222] rounded-3xl p-6 md:p-8 hover:border-[#6C63FF]/30 transition-all duration-300 group cursor-pointer ${
                project.featured
                  ? "md:col-span-2 lg:col-span-1 lg:row-span-1 relative overflow-hidden"
                  : ""
              }`}
            >
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-medium text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
              )}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 to-[#FF6B6B]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6C63FF] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-[#888] leading-relaxed mb-4">
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
              <div className="mt-4 flex items-center gap-1 text-sm text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-4 h-4" />
                <span>View Project</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
