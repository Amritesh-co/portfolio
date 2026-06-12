import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PROJECTS } from "../data/projects";
import { PROJECT_CONTENT } from "../data/projectContent";
import { CodeFragmentsCanvas } from "../components/CodeFragmentsCanvas";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Project not found.</p>
        <Link to="/projects" className="text-primary hover:underline text-sm">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Helmet>
        <title>{project.name} | Amritesh Sahu</title>
        <meta name="description" content={project.description.slice(0, 155)} />
        <link rel="canonical" href={`https://amriteshsahu.me/projects/${project.slug}`} />
        <meta property="og:title" content={`${project.name} | Amritesh Sahu`} />
        <meta property="og:description" content={project.description.slice(0, 155)} />
        <meta property="og:url" content={`https://amriteshsahu.me/projects/${project.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          "name": project.name,
          "description": project.description,
          "codeRepository": project.github,
          "programmingLanguage": project.tags,
          "author": { "@type": "Person", "name": "Amritesh Sahu", "url": "https://amriteshsahu.me" }
        })}</script>
      </Helmet>
      <CodeFragmentsCanvas />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>

          {/* Header */}
          <div className={`w-full rounded-2xl bg-gradient-to-br ${project.gradient} p-10 mb-10 flex flex-col items-center justify-center text-center min-h-[220px]`}>
            <p className="text-white/50 text-xs font-mono tracking-[0.2em] uppercase mb-3">
              {project.tagline}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {project.name}
            </h1>
          </div>

          {/* Tags + GitHub */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono"
              >
                {tag}
              </span>
            ))}
            <div className="flex-1" />
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-sm font-medium"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            )}
          </div>

          {/* Detailed project content */}
          {PROJECT_CONTENT[project.slug] ? (
            PROJECT_CONTENT[project.slug]()
          ) : (
            <div className="space-y-6 text-muted-foreground">
              <p className="text-base leading-relaxed">{project.description}</p>
              <div className="rounded-xl border border-border/40 bg-muted/20 p-8 text-center text-muted-foreground/50 text-sm font-mono">
                — detailed content coming soon —
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};
