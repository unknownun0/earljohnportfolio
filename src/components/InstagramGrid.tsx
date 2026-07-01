"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Play } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/defaultContent";

function GridMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !project.video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.play().catch(() => {});
          else el.pause();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.video]);

  if (project.video) {
    return (
      <video
        ref={videoRef}
        src={project.video}
        muted
        loop
        playsInline
        preload="metadata"
        poster={project.image || undefined}
        className="ig-grid-video"
      />
    );
  }

  if (project.image) {
    return <img src={project.image} alt={project.title} />;
  }

  return <div className="ig-grid-placeholder">{project.title}</div>;
}

export default function InstagramGrid() {
  const { content } = useContent();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="ig-grid">
        {content.projects.map((project) => (
          <div
            key={project.id}
            className="ig-grid-item"
            onClick={() => setSelected(project)}
          >
            <GridMedia project={project} />

            {project.video && (
              <div className="ig-grid-carousel-badge">
                <Play className="w-4 h-4" />
              </div>
            )}

            <div className="ig-grid-overlay">
              {project.status && (
                <span style={{
                  position: "absolute", top: "8px", left: "8px",
                  background: "#0095f6", color: "#fff",
                  fontSize: "10px", fontWeight: 600, padding: "3px 8px",
                  borderRadius: "4px", letterSpacing: "0.3px",
                }}>{project.status}</span>
              )}
              <span className="ig-grid-overlay-stat">
                <Heart className="w-5 h-5" />
                {project.featured ? "1" : "0"}
              </span>
              <span className="ig-grid-overlay-stat">
                <MessageCircle className="w-5 h-5" />
                {project.tags.length}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
