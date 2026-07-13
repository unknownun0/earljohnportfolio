"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";
import { useContent } from "@/context/ContentContext";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function PortfolioChatbot() {
  const { content } = useContent();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm EJ's assistant. Ask me anything about his portfolio, skills, projects, or experience." },
  ]);
  const [input, setInput] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!open) return;
    setTimeout(scrollToBottom, 50);
  }, [messages, open]);

  const handleScroll = () => {
    if (!listRef.current) return;
    const el = listRef.current;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  const respond = (q: string): string => {
    const lq = q.toLowerCase();

    // Greetings
    if (/^(hi|hello|hey|sup|howdy)\b/.test(lq)) {
      return "Hello! Feel free to ask me about Earl John's skills, projects, experience, certifications, or how to get in touch.";
    }

    // About / who is
    if (/\b(who|about|tell me about)\b.*\b(you|earl|john|gomez|ej|developer)\b/.test(lq) || /^(who|what) is/.test(lq)) {
      return `${content.hero.name} is a BS Information Systems student at Dr. Filemon C. Aguilar Memorial College (2022–Present). He is a Web Developer, Graphic Designer, and Social Media Manager with hands-on experience building digital solutions, managing online content, and designing promotional materials. He is proficient in HTML, CSS, JavaScript, PHP, and AI integration.`;
    }

    // Skills
    if (/\b(skill|tech|technology|tools|know|expertise|proficient|stack)\b/.test(lq)) {
      const groups = content.techStack.map((g) => `${g.category}: ${g.items.join(", ")}`).join("\n");
      return `Here are Earl John's technical skills:\n${groups}`;
    }

    // Specific skill
    const skillMatch = content.techStack.flatMap((g) => g.items).find((s) => lq.includes(s.toLowerCase()));
    if (skillMatch) {
      const level = content.skillLevels[skillMatch];
      return `Earl John's proficiency in **${skillMatch}** is ${level ?? "N/A"}%.`;
    }

    // Projects
    if (/\b(project|work|portfolio|built|build|develop|create|made)\b/.test(lq)) {
      const list = content.projects.map((p) => `- **${p.title}**: ${p.tags.join(", ")}${p.link ? ` [${p.link}]` : ""}`).join("\n");
      return `Earl John has worked on the following projects:\n${list}`;
    }

    // Specific project
    const projMatch = content.projects.find((p) => lq.includes(p.title.toLowerCase()));
    if (projMatch) {
      const extras: string[] = [];
      if (projMatch.status) extras.push(`Status: ${projMatch.status}`);
      if (projMatch.link) extras.push(`Link: ${projMatch.link}`);
      const extra = extras.length ? `\n${extras.join(" | ")}` : "";
      return `**${projMatch.title}** — ${projMatch.description}\nTags: ${projMatch.tags.join(", ")}${extra}`;
    }

    // HeritagePark specifically
    if (/\b(heritage|heritagepark|park)\b/.test(lq)) {
      return "**HeritagePark.com** is a heritage park management and booking website currently under development. Stack: Next.js, Supabase, Tailwind CSS, TypeScript, Vercel. Status: On Progress. Live preview: https://heritagepark.vercel.app";
    }

    // Experience
    if (/\b(experience|internship|intern|work|job|seminar|contribution)\b/.test(lq)) {
      const list = content.experience.map((e) => `- **${e.title}** at ${e.organization} (${e.type})`).join("\n");
      return `Here is Earl John's experience:\n${list}`;
    }

    // Education
    if (/\b(education|school|college|university|study|learn|academic|degree|course)\b/.test(lq)) {
      const list = content.education.map((e) => `- **${e.school}** — ${e.degree} (${e.period})${e.details.length ? `\n  ${e.details.join(", ")}` : ""}`).join("\n");
      return `Earl John's educational background:\n${list}`;
    }

    // Certifications
    if (/\b(cert|certification|certificate|credential|verify)\b/.test(lq)) {
      const list = content.certifications.map((c) => `- **${c.title}** — ${c.issuer}`).join("\n");
      return `Earl John holds the following certifications:\n${list}`;
    }

    // Contact
    if (/\b(contact|email|phone|reach|message|call|social)\b/.test(lq)) {
      const c = content.contact.map((c) => `- **${c.label}**: ${c.value}`).join("\n");
      const s = content.socials.map((s) => `- **${s.label}**: ${s.href}`).join("\n");
      return `You can reach Earl John through:\n${c}\n\nSocial links:\n${s}`;
    }

    // Location
    if (/\b(location|where|address|live|from|based)\b/.test(lq)) {
      return `Earl John is based in **Las Piñas City, Philippines**.`;
    }

    // Interests
    if (/\b(interest|passion|hobby|love|enjoy)\b/.test(lq)) {
      return `Earl John's interests include: ${content.interests.join(", ")}.`;
    }

    // Download resume
    if (/\b(resume|cv|download)\b/.test(lq)) {
      return "You can view Earl John's resume at https://earljohnportfolio.vercel.app/resume (you can print it as PDF from there).";
    }

    // What can you do / help
    if (/\b(what can you|help|what do you|commands|options|how.*use)\b/.test(lq)) {
      return "You can ask me about:\n- Who Earl John is\n- His skills and technologies\n- Projects he's built\n- Experience & internships\n- Education background\n- Certifications\n- Contact & social links\n- Location\n- Interests\n- Resume";
    }

    // Fallback
    return `I'm not sure about that. Try asking about skills, projects, experience, education, certifications, or contact info. You can also say "help" to see what I can answer.`;
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        className="p-chat-fab"
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="p-chat-window">
          <div className="p-chat-header">
            <span className="p-chat-header-title">Ask about EJ</span>
            <button onClick={() => setOpen(false)} className="p-chat-close"><X className="w-4 h-4" /></button>
          </div>

          <div className="p-chat-messages" ref={listRef} onScroll={handleScroll}>
            {messages.map((m, i) => (
              <div key={i} className={`p-chat-msg ${m.role}`}>
                {m.text.split("\n").map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            ))}
            {showScrollBtn && (
              <button className="p-chat-scroll-btn" onClick={scrollToBottom}>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="p-chat-input-row">
            <input
              className="p-chat-input"
              placeholder="Ask about EJ's portfolio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="p-chat-send" onClick={send} disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
