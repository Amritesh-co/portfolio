import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessKey = "06c5a4e4-1770-476c-afd1-eb88518ab45c";

    const formData = new FormData(e.target);
    formData.append("access_key", accessKey);
    formData.append("subject", "New Message from Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        e.target.reset();
      } else {
        toast({
          title: "Failed to send message",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "A network error occurred. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Contact info */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200">Email</h4>
                    <a
                      href="mailto:amriteshsahu96@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      amriteshsahu96@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200">Location</h4>
                    <span className="text-muted-foreground text-sm">
                      Bengaluru, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="pt-8 border-t border-border/10 text-center">
              <h4 className="font-medium mb-4 text-slate-200">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a 
                  href="https://github.com/Amritesh-co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-zinc-900 border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/amriteshsahu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-zinc-900 border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/amritesh.sahu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-zinc-900 border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="bg-card p-8 rounded-lg border border-border/20 shadow-xs">
            <h3 className="text-2xl font-semibold mb-6 text-slate-100">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-slate-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary text-sm text-slate-200"
                  placeholder="Amritesh Sahu..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-slate-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary text-sm text-slate-200"
                  placeholder="john@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-slate-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none text-sm text-slate-200"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 cursor-pointer"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
