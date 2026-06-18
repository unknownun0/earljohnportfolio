"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/20 py-4 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-[10px] text-[#888]">
          &copy; {new Date().getFullYear()} Earl John Gomez
        </p>
        <a
          href="/admin"
          className="text-[10px] text-[#888] hover:text-[#EF4444] transition-colors"
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
