"use client";

import { useState, useRef, useEffect } from "react";
import { useContent } from "@/context/ContentContext";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function SpyChat() {
  const { content } = useContent();
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "SECURE CHANNEL OPEN.\nAsk me about Earl John — skills, projects, experience, or contact. End each query with SEND." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const respond = (q: string): string => {
    const lq = q.toLowerCase();

    if (/^(hi|hello|hey|sup|howdy)\b/.test(lq)) {
      return "Hello! Ask me about Earl John's skills, projects, experience, certifications, or how to get in touch.";
    }

    if (/\b(who|about|tell me about)\b.*\b(you|earl|john|gomez|ej|developer)\b/.test(lq) || /^(who|what) is/.test(lq)) {
      return `${content.hero.name} is a BS Information Systems student at Dr. Filemon C. Aguilar Memorial College (2022–Present). He is a Web Developer, Graphic Designer, and Social Media Manager with hands-on experience building digital solutions, managing online content, and designing promotional materials. He is proficient in HTML, CSS, JavaScript, PHP, and AI integration.`;
    }

    if (/\b(skill|tech|technology|tools|know|expertise|proficient|stack)\b/.test(lq)) {
      const groups = content.techStack.map((g) => `${g.category}: ${g.items.join(", ")}`).join("\n");
      return `Technical skills:\n${groups}`;
    }

    const skillMatch = content.techStack.flatMap((g) => g.items).find((s) => lq.includes(s.toLowerCase()));
    if (skillMatch) {
      const level = content.skillLevels[skillMatch];
      return `Proficiency in ${skillMatch}: ${level ?? "N/A"}%.`;
    }

    if (/\b(project|work|portfolio|built|build|develop|create|made)\b/.test(lq)) {
      const list = content.projects.map((p) => `- ${p.title}: ${p.tags.join(", ")}`).join("\n");
      return `Projects:\n${list}`;
    }

    const projMatch = content.projects.find((p) => lq.includes(p.title.toLowerCase()));
    if (projMatch) {
      const extras: string[] = [];
      if (projMatch.status) extras.push(`Status: ${projMatch.status}`);
      if (projMatch.link) extras.push(`Link: ${projMatch.link}`);
      const extra = extras.length ? `\n${extras.join(" | ")}` : "";
      return `${projMatch.title} — ${projMatch.description}\nTags: ${projMatch.tags.join(", ")}${extra}`;
    }

    if (/\b(experience|internship|intern|work|job|seminar)\b/.test(lq)) {
      const list = content.experience.map((e) => `- ${e.title} at ${e.organization} (${e.type})`).join("\n");
      return `Experience:\n${list}`;
    }

    if (/\b(education|school|college|university|study|degree)\b/.test(lq)) {
      const list = content.education.map((e) => `- ${e.school} — ${e.degree} (${e.period})`).join("\n");
      return `Education:\n${list}`;
    }

    if (/\b(cert|certification|certificate|credential)\b/.test(lq)) {
      const list = content.certifications.map((c) => `- ${c.title} — ${c.issuer}`).join("\n");
      return `Certifications:\n${list}`;
    }

    if (/\b(contact|email|phone|reach|message|call|social)\b/.test(lq)) {
      const c = content.contact.map((c) => `- ${c.label}: ${c.value}`).join("\n");
      const s = content.socials.map((s) => `- ${s.label}: ${s.href}`).join("\n");
      return `Contact:\n${c}\n\nSocial:\n${s}`;
    }

    if (/\b(location|where|address|based)\b/.test(lq)) {
      return "Based in Las Piñas City, Philippines.";
    }

    if (/\b(interest|passion|hobby|love|enjoy)\b/.test(lq)) {
      return `Interests: ${content.interests.join(", ")}.`;
    }

    if (/\b(resume|cv|download)\b/.test(lq)) {
      return "View the resume at https://earljohnportfolio.vercel.app/resume";
    }

    if (/\b(what can you|help|commands|options)\b/.test(lq)) {
      return "Ask about: who he is, skills, projects, experience, education, certifications, contact, location, interests, resume.";
    }

    return "Unable to decrypt query. Try asking about skills, projects, experience, education, certifications, or contact info. Say HELP to see options.";
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: respond(text) }]);
    }, 300);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white font-mono flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/20 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-bold tracking-widest uppercase">Secure Channel</span>
        </div>
        <span className="text-xs text-white/50 tracking-widest">ENCRYPTION: AES-256</span>
      </header>

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-white text-black"
                  : "border border-white/20 text-white/80"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <footer className="border-t border-white/20 px-5 py-3 flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your query..."
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/30 border border-white/20 px-3 py-2"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="text-xs font-bold tracking-widest uppercase border border-white px-4 py-2 text-black bg-white hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
