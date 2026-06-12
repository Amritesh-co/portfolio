import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { HomeLabSection } from "../components/HomeLabSection";
import { BeyondIDESection } from "../components/BeyondIDESection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>Amritesh Sahu | AI/ML + Backend Developer</title>
        <meta name="description" content="Data Science undergraduate at RVCE building agentic AI systems, RAG pipelines, multi-agent workflows, and backend platforms." />
        <link rel="canonical" href="https://amriteshsahu.me/" />
        <meta property="og:title" content="Amritesh Sahu | AI/ML + Backend Developer" />
        <meta property="og:description" content="Data Science undergraduate at RVCE building agentic AI systems, RAG pipelines, multi-agent workflows, and backend platforms." />
        <meta property="og:url" content="https://amriteshsahu.me/" />
      </Helmet>
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <HomeLabSection />
        <BeyondIDESection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
