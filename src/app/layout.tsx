import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Background from "@/components/Background";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Earl John Gomez | Portfolio",
  description:
    "BS Information Systems student passionate about web development, graphic design, and social media management.",
  keywords: [
    "Earl John Gomez",
    "Portfolio",
    "Web Developer",
    "Graphic Design",
    "Information Systems",
  ],
  openGraph: {
    title: "Earl John Gomez | Portfolio",
    description:
      "BS Information Systems student passionate about web development, graphic design, and social media management.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Background />
        <div className="relative z-10 flex flex-col min-h-full">
          <ThemeProvider>
            <ContentProvider>{children}</ContentProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
