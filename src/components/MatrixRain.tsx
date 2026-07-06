"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain({ height = 200 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = height;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]|&^%$#@!";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = y < height * 0.3 ? "rgba(0, 255, 70, 0.3)" : y < height * 0.7 ? "rgba(0, 255, 70, 0.6)" : "#00FF46";
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const onResize = () => {
      canvas.width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: `${height}px`,
        display: "block",
        background: "#000",
        borderRadius: "12px 12px 0 0",
      }}
    />
  );
}
