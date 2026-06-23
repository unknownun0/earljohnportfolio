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
import AnimatedCard from "@/components/AnimatedCard";

export default function Home() {
  return (
    <main>
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-10 grid lg:grid-cols-3 gap-6">
        <aside className="space-y-5">
          <AnimatedCard delay={0} className="p-5"><div id="home"><Hero /></div></AnimatedCard>
          <AnimatedCard delay={0.1} className="p-5"><div id="contact"><Contact /></div></AnimatedCard>
          <AnimatedCard delay={0.2} className="p-5"><Interests /></AnimatedCard>
          <AnimatedCard delay={0.3} className="p-5"><TechStack /></AnimatedCard>
          <AnimatedCard delay={0.4} className="p-5"><SocialLinks /></AnimatedCard>
        </aside>
        <div id="about" className="lg:col-span-2 space-y-5">
          <AnimatedCard delay={0} className="p-5"><Projects /></AnimatedCard>
          <AnimatedCard delay={0.1} className="p-5"><Education /></AnimatedCard>
          <AnimatedCard delay={0.2} className="p-5"><Experience /></AnimatedCard>
          <AnimatedCard delay={0.3} className="p-5"><Certifications /></AnimatedCard>
        </div>
      </div>
      <Footer />
    </main>
  );
}
