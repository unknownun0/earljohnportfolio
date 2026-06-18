"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-10 grid lg:grid-cols-3 gap-6">
        <aside className="space-y-5">
          <Hero />
          <Contact />
          <Interests />
          <TechStack />
          <SocialLinks />
        </aside>
        <div className="lg:col-span-2 space-y-5">
          <Experience />
          <Education />
          <Projects />
          <Certifications />
        </div>
      </div>
      <Footer />
    </main>
  );
}
