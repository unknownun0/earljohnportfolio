"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { defaultContent, Content } from "@/data/defaultContent";

interface ContentContextType {
  content: Content;
  updateContent: (newContent: Content) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(defaultContent);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-content");
      if (saved) {
        setContent(JSON.parse(saved));
      }
    } catch {}
    setLoaded(true);
  }, []);

  const updateContent = (newContent: Content) => {
    setContent(newContent);
    try {
      localStorage.setItem("portfolio-content", JSON.stringify(newContent));
    } catch {}
  };

  const resetContent = () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem("portfolio-content");
    } catch {}
  };

  if (!loaded) return null;

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
