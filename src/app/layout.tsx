import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0B0B0B] text-white">
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
