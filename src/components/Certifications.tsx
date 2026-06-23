"use client";

import { useState } from "react";
import { useContent } from "@/context/ContentContext";

function CertImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="w-full h-28 rounded-lg mb-2 flex items-center justify-center" style={{ backgroundColor: 'var(--card-alt)' }}>
          <span className="text-[10px] animate-pulse" style={{ color: 'var(--text-secondary)' }}>Loading...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-28 object-cover rounded-lg mb-2 ${loaded ? "" : "hidden"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export default function Certifications() {
  const { content } = useContent();

  return (
    <div>
      <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span className="w-1 h-4 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        Certifications
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {content.certifications.map((cert) => (
          <div
            key={cert.id}
            className="rounded-xl border p-3 transition-all duration-200"
            style={{ backgroundColor: 'var(--card-alt)', borderColor: 'var(--border)' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {cert.image && <CertImage src={cert.image} alt={cert.title} />}
            <span className="text-[10px] font-semibold block text-center" style={{ color: 'var(--text-primary)' }}>
              {cert.title}
            </span>
            <p className="text-[9px] text-center" style={{ color: 'var(--text-secondary)' }}>{cert.issuer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
