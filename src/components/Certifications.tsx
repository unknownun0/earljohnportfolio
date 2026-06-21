"use client";

import { useState } from "react";
import { useContent } from "@/context/ContentContext";

function CertImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="w-full h-28 rounded-lg mb-2 bg-[#1E1E1E] flex items-center justify-center">
          <span className="text-[10px] text-[#888] animate-pulse">Loading...</span>
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
      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#EF4444] rounded-full" />
        Certifications
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {content.certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#1E1E1E] rounded-xl border border-white/20 p-3 hover:border-[#EF4444]/30 transition-all duration-200"
          >
            {cert.image && <CertImage src={cert.image} alt={cert.title} />}
            <span className="text-[10px] font-semibold text-white block text-center">
              {cert.title}
            </span>
            <p className="text-[9px] text-[#888] text-center">{cert.issuer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
