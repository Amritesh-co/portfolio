import { ParticleNetworkBackground } from "./ParticleNetworkBackground";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <ParticleNetworkBackground
        particleCount={80}
        maxDistance={120}
        moveSpeed={0.4}
        mouseInteraction={true}
        pulseEnabled={true}
      />

      {/* Desktop: 5-part layout */}
      <div className="hidden md:flex w-full items-center z-10 py-20">
        <div className="w-[20vw] shrink-0" />

        <div className="w-[38vw] shrink-0 space-y-6 flex flex-col items-start text-left">
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight">
            <span className="opacity-0 animate-fade-in block">Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1 block mt-2">
              Amritesh
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 animate-fade-in-delay-2 block mt-2">
              Sahu
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg opacity-0 animate-fade-in-delay-3">
            Data Science undergrad building AI/ML systems and backend platforms —
            from multi-agent pipelines to full-stack applications.
          </p>

          <div className="flex gap-4 pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="flex-1" />

        <div className="w-[20vw] shrink-0 flex justify-center opacity-0 animate-fade-in-delay-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-[60%_40%_50%_70%/60%_50%_60%_50%] blur-2xl group-hover:scale-110 transition-all duration-700 animate-pulse" />
            <div className="absolute -inset-4 rounded-[50%_60%_70%_50%/50%_60%_60%_70%] border border-primary/30 animate-[spin_20s_linear_infinite] group-hover:border-primary/50 transition-colors duration-500" />
            <div className="absolute -inset-4 rounded-[60%_50%_40%_60%/60%_40%_70%_50%] border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse] group-hover:border-purple-500/40 transition-colors duration-500" />
            <div className="relative w-[22vw] h-[30vw] min-w-[340px] min-h-[460px] max-w-[520px] max-h-[700px] rounded-[150px_150px_150px_150px/200px_200px_200px_200px] overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)] bg-muted/20 backdrop-blur-xs transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] group-hover:scale-[1.02]">
              <img
                src="/profile.png"
                alt="Amritesh Sahu"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom fade — blends photo edge into background */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="w-[20vw] shrink-0" />
      </div>

      {/* Mobile: stacked layout */}
      <div className="flex md:hidden w-full flex-col items-start z-10 px-6 py-20 space-y-8 text-left">
        <h1 className="text-5xl font-bold tracking-tight leading-tight">
          <span className="opacity-0 animate-fade-in block">Hi, I'm</span>
          <span className="text-primary opacity-0 animate-fade-in-delay-1 block mt-2">
            Amritesh
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 animate-fade-in-delay-2 block mt-2">
            Sahu
          </span>
        </h1>

        <div className="relative group opacity-0 animate-fade-in-delay-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-[60%_40%_50%_70%/60%_50%_60%_50%] blur-2xl animate-pulse" />
          <div className="absolute -inset-4 rounded-[50%_60%_70%_50%/50%_60%_60%_70%] border border-primary/30 animate-[spin_20s_linear_infinite]" />
          <div className="relative w-[240px] h-[320px] rounded-[150px_150px_150px_150px/200px_200px_200px_200px] overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)] bg-muted/20">
            <img src="/profile.png" alt="Amritesh Sahu" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
          </div>
        </div>

        <p className="text-lg text-left text-muted-foreground max-w-sm opacity-0 animate-fade-in-delay-3">
          Data Science undergrad building AI/ML systems and backend platforms —
          from multi-agent pipelines to full-stack applications.
        </p>

        <div className="flex flex-col gap-3 opacity-0 animate-fade-in-delay-4">
          <a href="#projects" className="cosmic-button">View My Work</a>
          <a
            href="#contact"
            className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
          >
            Get In Touch
          </a>
        </div>
      </div>

    </section>
  );
};
