import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "/projects", isRoute: true },
  { name: "Home Lab", href: "/friday", isRoute: true },
  { name: "Beyond IDE", href: "#beyond-ide" },
  { name: "Resume", href: "/resume", isRoute: true },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [activeSection, setActiveSection] = useState(() => {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return "hero";
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    const sections = ["hero", "about", "skills", "beyond-ide", "contact"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0.05,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname, isHomePage]);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5 bg-gradient-to-b from-background/60 to-transparent backdrop-blur-sm"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="flex items-center"
          href={isHomePage ? "#hero" : "/#hero"}
        >
          <img
            src="/high-resolution-color-logo.png"
            alt="Amritesh Sahu"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => {
            const href = item.isRoute ? item.href : (isHomePage ? item.href : `/${item.href}`);
            const isActive = item.isRoute 
              ? location.pathname.startsWith(item.href) 
              : (isHomePage && activeSection === item.href.slice(1));

            return item.isRoute ? (
              <Link
                key={key}
                to={href}
                className={cn(
                  "text-sm transition-colors duration-300 relative py-1",
                  isActive 
                    ? "text-primary font-semibold" 
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full animate-pulse-subtle shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                )}
              </Link>
            ) : (
              <a
                key={key}
                href={href}
                className={cn(
                  "text-sm transition-colors duration-300 relative py-1",
                  isActive 
                    ? "text-primary font-semibold" 
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full animate-pulse-subtle shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                )}
              </a>
            );
          })}
        </div>

        {/* mobile: hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* mobile menu overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => {
              const href = item.isRoute ? item.href : (isHomePage ? item.href : `/${item.href}`);
              const isActive = item.isRoute 
                ? location.pathname.startsWith(item.href) 
                : (isHomePage && activeSection === item.href.slice(1));

              return item.isRoute ? (
                <Link
                  key={key}
                  to={href}
                  className={cn(
                    "transition-colors duration-300 relative py-1 text-center",
                    isActive 
                      ? "text-primary font-semibold" 
                      : "text-foreground/80 hover:text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={key}
                  href={href}
                  className={cn(
                    "transition-colors duration-300 relative py-1 text-center",
                    isActive 
                      ? "text-primary font-semibold" 
                      : "text-foreground/80 hover:text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
