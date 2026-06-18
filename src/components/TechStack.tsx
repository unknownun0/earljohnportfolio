"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const techStack = [
  {
    category: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
      "SCSS",
      "Styled Components",
      "Vite",
      "Webpack",
      "ESLint",
      "Prettier",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Python",
      "Java",
      "PHP",
      "Express.js",
      "NestJS",
      "FastAPI",
      "Spring Boot",
      "Laravel",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: ["AWS", "GitHub Actions", "GitLab CI", "AWS CloudFormation"],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "Transformers",
      "OpenAI",
    ],
  },
  {
    category: "Security & Identity",
    items: ["AWS IAM", "Auth0"],
  },
  {
    category: "Developer Tools",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "VS Code",
      "JetBrains IntelliJ",
      "PyCharm",
      "Discord",
      "Teams",
    ],
  },
  {
    category: "CMS & No-Code",
    items: [
      "WordPress",
      "Strapi",
      "Bubble",
      "Webflow",
      "Microsoft Power Platform",
    ],
  },
];

export default function TechStack() {
  return (
    <SectionWrapper className="px-4 py-20" id="techstack">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Tech Stack
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-[#151515] border border-[#222] rounded-3xl p-6 md:p-8 hover:border-[#6C63FF]/30 transition-all duration-300 group"
            >
              <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#6C63FF] transition-colors duration-300">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-[#888] bg-[#1E1E1E] px-3 py-1.5 rounded-full hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] hover:border-[#6C63FF]/30 border border-transparent transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
