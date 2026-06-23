"use client";

import { useContent } from "@/context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] p-[2px] mb-3">
        <div className="w-full h-full rounded-full bg-[var(--card)] flex items-center justify-center overflow-hidden">
          {hero.image ? (
            <img
              src={hero.image}
              alt={hero.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {hero.name.split(" ").map((n) => n[0]).join("")}
            </span>
          )}
        </div>
      </div>
      <h1 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{hero.name}</h1>
      <p className="text-[11px] leading-relaxed italic mb-3" style={{ color: 'var(--text-secondary)' }}>
        &ldquo;{hero.quote}&rdquo;
      </p>
      <div className="text-[11px] leading-relaxed space-y-1.5 text-left" style={{ color: 'var(--text-secondary)' }}>
        {hero.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
