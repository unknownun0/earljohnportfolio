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
      <section id="home">
        <Hero />
      </section>
      <Interests />
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6">
        <Education />
        <Experience />
      </div>
      <Projects />
      <TechStack />
      <Certifications />
      <Contact />
      <SocialLinks />
      <Footer />
    </main>
  );
}
