"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import { Content, defaultContent } from "@/data/defaultContent";
import ImageUpload from "@/components/ImageUpload";
import {
  Save,
  LogOut,
  RotateCcw,
  Eye,
  User,
  BookOpen,
  Briefcase,
  Code,
  Award,
  Mail,
  Sparkles,
  Layers,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

type SectionTab =
  | "hero"
  | "interests"
  | "education"
  | "projects"
  | "experience"
  | "techstack"
  | "certifications"
  | "contact"
  | "socials";

const adminPassword = "admin123";

export default function AdminPage() {
  const { content, updateContent, resetContent } = useContent();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState<SectionTab>("hero");
  const [saved, setSaved] = useState(false);
  const [editContent, setEditContent] = useState<Content>(content);

  useEffect(() => {
    setEditContent(content);
  }, [content]);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (password === adminPassword) {
      setAuthenticated(true);
      localStorage.setItem("admin-auth", "true");
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("admin-auth");
  };

  const handleSave = () => {
    updateContent(editContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all content to defaults?")) {
      resetContent();
      setEditContent(structuredClone(defaultContent));
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Admin Login</h1>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            Enter password to manage content
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full bg-[var(--card-alt)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-[var(--text-primary)] font-semibold rounded-xl py-3 hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      <aside className="w-64 bg-[var(--card)] border-r border-[var(--border)] hidden lg:flex flex-col">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Admin Panel</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Manage your portfolio</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {(
            [
              { key: "hero", label: "Hero", icon: User },
              { key: "interests", label: "Interests", icon: Sparkles },
              { key: "education", label: "Education", icon: BookOpen },
              { key: "projects", label: "Projects", icon: Code },
              { key: "experience", label: "Experience", icon: Briefcase },
              { key: "techstack", label: "Tech Stack", icon: Layers },
              { key: "certifications", label: "Certifications", icon: Award },
              { key: "contact", label: "Contact", icon: Mail },
              { key: "socials", label: "Social Links", icon: Eye },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key as SectionTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                activeSection === key
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-alt)]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--border)] space-y-2">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-[var(--text-primary)] font-semibold rounded-xl py-3 hover:opacity-90 transition-opacity text-sm"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 bg-[var(--card-alt)] text-[var(--text-secondary)] rounded-xl py-3 hover:text-[var(--text-primary)] transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Defaults
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-[var(--text-muted)] hover:text-red-400 transition-colors text-sm py-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Admin Panel</h2>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-[var(--text-primary)] text-sm font-semibold rounded-xl px-4 py-2"
            >
              <Save className="w-4 h-4" />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={handleLogout}
              className="text-[var(--text-muted)] hover:text-red-400 text-sm px-3 py-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <SectionEditor
          section={activeSection}
          editContent={editContent}
          setEditContent={setEditContent}
        />
      </main>
    </div>
  );
}

function SectionEditor({
  section,
  editContent,
  setEditContent,
}: {
  section: SectionTab;
  editContent: Content;
  setEditContent: (c: Content) => void;
}) {
  const update = (updater: (draft: Content) => void) => {
    const copy = structuredClone(editContent);
    updater(copy);
    setEditContent(copy);
  };

  switch (section) {
    case "hero":
      return <HeroEditor content={editContent} update={update} />;
    case "interests":
      return <InterestsEditor content={editContent} update={update} />;
    case "education":
      return <EducationEditor content={editContent} update={update} />;
    case "projects":
      return <ProjectsEditor content={editContent} update={update} />;
    case "experience":
      return <ExperienceEditor content={editContent} update={update} />;
    case "techstack":
      return <TechStackEditor content={editContent} update={update} />;
    case "certifications":
      return <CertificationsEditor content={editContent} update={update} />;
    case "contact":
      return <ContactEditor content={editContent} update={update} />;
    case "socials":
      return <SocialsEditor content={editContent} update={update} />;
    default:
      return null;
  }
}

function InputField({
  label,
  value,
  onChange,
  multiline,
  rows,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-[var(--text-secondary)] mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          className="w-full bg-[var(--card-alt)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] resize-y"
        />
      ) : (
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[var(--card-alt)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
        />
      )}
    </div>
  );
}

function HeroEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const [newAbout, setNewAbout] = useState("");
  return (
    <div className="max-w-3xl space-y-6">
      <h3 className="text-2xl font-bold text-[var(--text-primary)]">Hero Section</h3>
      <InputField
        label="Name"
        value={content.hero.name}
        onChange={(v) => update((d) => (d.hero.name = v))}
      />
      <InputField
        label="Quote"
        value={content.hero.quote}
        onChange={(v) => update((d) => (d.hero.quote = v))}
        multiline
        rows={2}
      />
      <div>
        <label className="block text-sm text-[var(--text-secondary)] mb-1.5">
          Profile Image
        </label>
        <ImageUpload
          currentValue={content.hero.image}
          onUpload={(v) => update((d) => (d.hero.image = v))}
        />
      </div>
      {content.hero.image && (
        <img
          src={content.hero.image}
          alt="Preview"
          className="w-32 h-32 rounded-2xl object-cover border border-[var(--border)]"
        />
      )}
      <div>
        <label className="block text-sm text-[var(--text-secondary)] mb-1.5">
          About Paragraphs
        </label>
        <div className="space-y-3">
          {content.hero.about.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) =>
                  update((d) => {
                    d.hero.about[i] = e.target.value;
                  })
                }
                rows={2}
                className="flex-1 bg-[var(--card-alt)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] resize-y"
              />
              <button
                onClick={() =>
                  update((d) => {
                    d.hero.about.splice(i, 1);
                  })
                }
                className="text-red-400 hover:text-red-300 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input
            value={newAbout}
            onChange={(e) => setNewAbout(e.target.value)}
            placeholder="New paragraph..."
            className="flex-1 bg-[var(--card-alt)] border border-[var(--border)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            onClick={() => {
              if (newAbout.trim()) {
                update((d) => d.hero.about.push(newAbout.trim()));
                setNewAbout("");
              }
            }}
            className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function InterestsEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const [newItem, setNewItem] = useState("");
  return (
    <div className="max-w-3xl space-y-6">
      <h3 className="text-2xl font-bold text-[var(--text-primary)]">Interests</h3>
      <div className="space-y-2">
        {content.interests.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <GripVertical className="w-4 h-4 text-[var(--text-muted)] cursor-move" />
            <input
              value={item}
              onChange={(e) =>
                update((d) => {
                  d.interests[i] = e.target.value;
                })
              }
              className="flex-1 bg-[var(--card-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)]"
            />
            <button
              onClick={() =>
                update((d) => {
                  d.interests.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add interest (e.g. 💻 Web Development)"
          className="flex-1 bg-[var(--card-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <button
          onClick={() => {
            if (newItem.trim()) {
              update((d) => d.interests.push(newItem.trim()));
              setNewItem("");
            }
          }}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
    </div>
  );
}

function EducationEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const addItem = () =>
    update((d) =>
      d.education.push({
        id: String(Date.now()),
        school: "",
        period: "",
        degree: "",
        details: [],
      })
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Education</h3>
        <button
          onClick={addItem}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {content.education.map((item, i) => (
        <div
          key={item.id}
          className="bg-[var(--card-alt)] rounded-2xl p-6 border border-[var(--border)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--accent)] font-medium">
              #{i + 1}
            </span>
            <button
              onClick={() =>
                update((d) => {
                  d.education.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <InputField
            label="School"
            value={item.school}
            onChange={(v) => update((d) => (d.education[i].school = v))}
          />
          <InputField
            label="Period"
            value={item.period}
            onChange={(v) => update((d) => (d.education[i].period = v))}
          />
          <InputField
            label="Degree"
            value={item.degree}
            onChange={(v) => update((d) => (d.education[i].degree = v))}
          />
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Details</label>
            {item.details.map((d, j) => (
              <div key={j} className="flex gap-2 mb-2">
                <input
                  value={d}
                  onChange={(e) =>
                    update((draft) => {
                      draft.education[i].details[j] = e.target.value;
                    })
                  }
                  className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  onClick={() =>
                    update((draft) => {
                      draft.education[i].details.splice(j, 1);
                    })
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update((draft) => {
                  draft.education[i].details.push("");
                })
              }
              className="text-[var(--accent)] text-sm hover:underline"
            >
              + Add detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const addItem = () =>
    update((d) =>
      d.projects.push({
        id: String(Date.now()),
        title: "",
        description: "",
        tags: [],
        featured: false,
        image: "",
        video: "",
      })
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Projects</h3>
        <button
          onClick={addItem}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {content.projects.map((item, i) => (
        <div
          key={item.id}
          className="bg-[var(--card-alt)] rounded-2xl p-6 border border-[var(--border)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--accent)] font-medium">
              #{i + 1}
            </span>
            <button
              onClick={() =>
                update((d) => {
                  d.projects.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <InputField
            label="Title"
            value={item.title}
            onChange={(v) => update((d) => (d.projects[i].title = v))}
          />
          <InputField
            label="Description"
            value={item.description}
            onChange={(v) => update((d) => (d.projects[i].description = v))}
            multiline
            rows={3}
          />
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1.5">
              Project Image
            </label>
            <ImageUpload
              currentValue={item.image}
              onUpload={(v) => update((d) => (d.projects[i].image = v))}
            />
          </div>
          {item.image && (
            <img
              src={item.image}
              alt="Preview"
              className="h-32 rounded-xl object-cover border border-[var(--border)]"
            />
          )}
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1.5">
              Video (optional)
            </label>
            <ImageUpload
              currentValue={item.video}
              onUpload={(v) => update((d) => (d.projects[i].video = v))}
              accept="video/*"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t, j) => (
                <span
                  key={j}
                  className="bg-[var(--bg)] border border-[var(--border)] rounded-full px-3 py-1 text-sm flex items-center gap-2"
                >
                  {t}
                  <button
                    onClick={() =>
                      update((d) => {
                        d.projects[i].tags.splice(j, 1);
                      })
                    }
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                placeholder="Add tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    update((d) =>
                      d.projects[i].tags.push(e.currentTarget.value.trim())
                    );
                    e.currentTarget.value = "";
                  }
                }}
                className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-1.5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={item.featured}
              onChange={(e) =>
                update((d) => (d.projects[i].featured = e.target.checked))
              }
              className="accent-[var(--accent)]"
            />
            Featured project
          </label>
        </div>
      ))}
    </div>
  );
}

function ExperienceEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const addItem = () =>
    update((d) =>
      d.experience.push({
        id: String(Date.now()),
        title: "",
        organization: "",
        type: "Seminar",
        icon: "📌",
        image: "",
      })
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Experience & Seminars</h3>
        <button
          onClick={addItem}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {content.experience.map((item, i) => (
        <div
          key={item.id}
          className="bg-[var(--card-alt)] rounded-2xl p-6 border border-[var(--border)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--accent)] font-medium">
              #{i + 1}
            </span>
            <button
              onClick={() =>
                update((d) => {
                  d.experience.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <InputField
            label="Title"
            value={item.title}
            onChange={(v) => update((d) => (d.experience[i].title = v))}
          />
          <InputField
            label="Organization"
            value={item.organization}
            onChange={(v) => update((d) => (d.experience[i].organization = v))}
          />
          <InputField
            label="Type (Internship / Seminar)"
            value={item.type}
            onChange={(v) => update((d) => (d.experience[i].type = v))}
          />
          <InputField
            label="Icon (emoji)"
            value={item.icon}
            onChange={(v) => update((d) => (d.experience[i].icon = v))}
          />
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1.5">
              Image
            </label>
            <ImageUpload
              currentValue={item.image}
              onUpload={(v) => update((d) => (d.experience[i].image = v))}
            />
          </div>
          {item.image && (
            <img
              src={item.image}
              alt="Preview"
              className="h-32 rounded-xl object-cover border border-[var(--border)]"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function TechStackEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const addGroup = () =>
    update((d) =>
      d.techStack.push({ id: String(Date.now()), category: "", items: [] })
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Tech Stack</h3>
        <button
          onClick={addGroup}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Group
        </button>
      </div>
      {content.techStack.map((group, i) => (
        <div
          key={group.id}
          className="bg-[var(--card-alt)] rounded-2xl p-6 border border-[var(--border)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <InputField
              label="Category"
              value={group.category}
              onChange={(v) => update((d) => (d.techStack[i].category = v))}
            />
            <button
              onClick={() =>
                update((d) => {
                  d.techStack.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 text-sm ml-4"
            >
              Remove
            </button>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Items</label>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, j) => (
                <span
                  key={j}
                  className="bg-[var(--bg)] border border-[var(--border)] rounded-full px-3 py-1 text-sm flex items-center gap-2"
                >
                  {item}
                  <button
                    onClick={() =>
                      update((d) => {
                        d.techStack[i].items.splice(j, 1);
                      })
                    }
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                placeholder="Add technology"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    update((d) =>
                      d.techStack[i].items.push(e.currentTarget.value.trim())
                    );
                    e.currentTarget.value = "";
                  }
                }}
                className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-1.5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificationsEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const addItem = () =>
    update((d) =>
      d.certifications.push({
        id: String(Date.now()),
        title: "",
        issuer: "",
        icon: "📜",
        image: "",
      })
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Certifications</h3>
        <button
          onClick={addItem}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {content.certifications.map((item, i) => (
        <div
          key={item.id}
          className="bg-[var(--card-alt)] rounded-2xl p-6 border border-[var(--border)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--accent)] font-medium">
              #{i + 1}
            </span>
            <button
              onClick={() =>
                update((d) => {
                  d.certifications.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <InputField
            label="Title"
            value={item.title}
            onChange={(v) => update((d) => (d.certifications[i].title = v))}
          />
          <InputField
            label="Issuer"
            value={item.issuer}
            onChange={(v) => update((d) => (d.certifications[i].issuer = v))}
          />
          <InputField
            label="Icon (emoji)"
            value={item.icon}
            onChange={(v) => update((d) => (d.certifications[i].icon = v))}
          />
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1.5">
              Certificate Image
            </label>
            <ImageUpload
              currentValue={item.image}
              onUpload={(v) => update((d) => (d.certifications[i].image = v))}
            />
          </div>
          {item.image && (
            <img
              src={item.image}
              alt="Preview"
              className="h-32 rounded-xl object-cover border border-[var(--border)]"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ContactEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const addItem = () =>
    update((d) =>
      d.contact.push({
        id: String(Date.now()),
        icon: "Mail",
        label: "",
        value: "",
        href: "",
      })
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Contact Info</h3>
        <button
          onClick={addItem}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {content.contact.map((item, i) => (
        <div
          key={item.id}
          className="bg-[var(--card-alt)] rounded-2xl p-6 border border-[var(--border)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--accent)] font-medium">
              #{i + 1}
            </span>
            <button
              onClick={() =>
                update((d) => {
                  d.contact.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <InputField
            label="Icon name (MapPin, Mail, Phone, GraduationCap)"
            value={item.icon}
            onChange={(v) => update((d) => (d.contact[i].icon = v))}
          />
          <InputField
            label="Label"
            value={item.label}
            onChange={(v) => update((d) => (d.contact[i].label = v))}
          />
          <InputField
            label="Value"
            value={item.value}
            onChange={(v) => update((d) => (d.contact[i].value = v))}
          />
          <InputField
            label="Link (optional)"
            value={item.href}
            onChange={(v) => update((d) => (d.contact[i].href = v))}
          />
        </div>
      ))}
    </div>
  );
}

function SocialsEditor({
  content,
  update,
}: {
  content: Content;
  update: (fn: (d: Content) => void) => void;
}) {
  const addItem = () =>
    update((d) =>
      d.socials.push({
        id: String(Date.now()),
        icon: "Globe",
        label: "",
        href: "#",
      })
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Social Links</h3>
        <button
          onClick={addItem}
          className="bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm hover:bg-[var(--accent-hover)] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {content.socials.map((item, i) => (
        <div
          key={item.id}
          className="bg-[var(--card-alt)] rounded-2xl p-6 border border-[var(--border)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--accent)] font-medium">
              #{i + 1}
            </span>
            <button
              onClick={() =>
                update((d) => {
                  d.socials.splice(i, 1);
                })
              }
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <InputField
            label="Icon name (Code2, Link2, Camera, Globe, Mail, MessageCircle)"
            value={item.icon}
            onChange={(v) => update((d) => (d.socials[i].icon = v))}
          />
          <InputField
            label="Label"
            value={item.label}
            onChange={(v) => update((d) => (d.socials[i].label = v))}
          />
          <InputField
            label="URL"
            value={item.href}
            onChange={(v) => update((d) => (d.socials[i].href = v))}
          />
        </div>
      ))}
    </div>
  );
}
