"use client";

export default function Footer() {
  return (
    <footer className="border-t py-4 px-4" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
          &copy; {new Date().getFullYear()} Earl John Gomez
        </p>
      </div>
    </footer>
  );
}
