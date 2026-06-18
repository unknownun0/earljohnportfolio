"use client";

import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";

interface ImageUploadProps {
  currentValue: string;
  onUpload: (dataUrl: string) => void;
  accept?: string;
}

export default function ImageUpload({
  currentValue,
  onUpload,
  accept = "image/*",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("File too large. Max 25MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      onUpload(data.url);
    } catch (err) {
      console.error("Upload error, falling back to local base64:", err);
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1">
        <input
          type="text"
          value={currentValue}
          onChange={(e) => onUpload(e.target.value)}
          placeholder="Paste image URL or upload a file"
          className="w-full bg-[#1E1E1E] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#6C63FF]"
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="bg-[#1E1E1E] border border-[#222] rounded-xl px-4 py-3 text-[#888] hover:text-white hover:border-[#6C63FF] transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
        title="Upload file"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">
          {uploading ? "Uploading..." : "Upload"}
        </span>
      </button>
    </div>
  );
}
