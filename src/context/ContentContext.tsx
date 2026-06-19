"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { defaultContent, Content } from "@/data/defaultContent";

interface ContentContextType {
  content: Content;
  updateContent: (newContent: Content) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);
const DB_NAME = "PortfolioDB";
const STORE_NAME = "content";
const DB_KEY = "portfolio-data";
const VERSION_KEY = "portfolio-version";
const CURRENT_VERSION = 7;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getFromDB(): Promise<Content | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(DB_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function saveToDB(content: Content): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(content, DB_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {}
}

async function clearDB(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(DB_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {}
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(defaultContent);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const version = parseInt(localStorage.getItem(VERSION_KEY) || "0", 10);
      if (version < CURRENT_VERSION) {
        await clearDB();
        localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
      } else {
        const saved = await getFromDB();
        if (saved) {
          setContent(saved);
        }
      }
      setLoaded(true);
    })();
  }, []);

  const updateContent = (newContent: Content) => {
    setContent(newContent);
    saveToDB(newContent);
  };

  const resetContent = () => {
    setContent(defaultContent);
    clearDB();
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
