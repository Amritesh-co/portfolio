import { SkillsBallGrid } from "./Ball";

const logos = [
  { name: "Python",       icon: "/logos/png/python.png" },
  { name: "OpenAI",       icon: "/logos/png/openai.png" },
  { name: "Anthropic",    icon: "/logos/png/anthropic.png" },
  { name: "LangChain",    icon: "/logos/png/langchain.png" },
  { name: "LangGraph",    icon: "/logos/png/langgraph.png" },
  { name: "Ollama",       icon: "/logos/png/ollama.png" },
  { name: "OpenRouter",   icon: "/logos/png/openrouter.png" },
  { name: "NVIDIA NIM",   icon: "/logos/png/nvidia-nim.png" },
  { name: "PyTorch",      icon: "/logos/png/pytorch.png" },
  { name: "TensorFlow",   icon: "/logos/png/tensorflow.png" },
  { name: "Scikit-Learn", icon: "/logos/png/scikit-learn.png" },
  { name: "Qdrant",       icon: "/logos/png/qdrant.png" },
  { name: "NumPy",        icon: "/logos/png/numpy.png" },
  { name: "Pandas",       icon: "/logos/png/pandas.png" },
  { name: "Java",         icon: "/logos/png/java.png" },
  { name: "JavaScript",   icon: "/logos/png/javascript.png" },
  { name: "TypeScript",   icon: "/logos/png/typescript.png" },
  { name: "HTML5",        icon: "/logos/png/html5.png" },
  { name: "CSS3",         icon: "/logos/png/css3.png" },
  { name: "React",        icon: "/logos/png/react.png" },
  { name: "Next.js",      icon: "/logos/png/nextjs.png" },
  { name: "Vite",         icon: "/logos/png/vite.png" },
  { name: "Tailwind CSS", icon: "/logos/png/tailwindcss.png" },
  { name: "Node.js",      icon: "/logos/png/nodejs.png" },
  { name: "Express",      icon: "/logos/png/express.png" },
  { name: "FastAPI",      icon: "/logos/png/fastapi.png" },
  { name: "Flask",        icon: "/logos/png/flask.png" },
  { name: "Ubuntu",       icon: "/logos/png/ubuntu.png" },
  { name: "Linux",        icon: "/logos/png/linux.png" },
  { name: "Docker",       icon: "/logos/png/docker.png" },
  { name: "Cloudflare",   icon: "/logos/png/cloudflare.png" },
  { name: "Tailscale",    icon: "/logos/png/tailscale.png" },
  { name: "Nextcloud",    icon: "/logos/png/nextcloud.png" },
  { name: "Git",          icon: "/logos/png/git.png" },
  { name: "GitHub",       icon: "/logos/png/github.png" },
  { name: "Firebase",     icon: "/logos/png/firebase.png" },
  { name: "MongoDB",      icon: "/logos/png/mongodb.png" },
  { name: "MySQL",        icon: "/logos/png/mysql.png" },
  { name: "Redis",        icon: "/logos/png/redis.png" },
  { name: "Supabase",     icon: "/logos/png/supabase.png" },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative bg-secondary/30">
      <div className="px-[20vw]">
        <h2 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-muted-foreground mb-12 text-center">
          Technologies and tools I work with.
        </p>
        <SkillsBallGrid logos={logos} />
      </div>
    </section>
  );
};
