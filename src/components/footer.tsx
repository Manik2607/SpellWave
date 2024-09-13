
import { Button } from "@/components/ui/button";
import {
  Mail,
  Github,
  Twitter,
  // FileText,
  // Shield,
  Terminal,
  Zap,
} from "lucide-react";

export default function Footer() {
  const footerItems = [
    { icon: Mail, label: "contact", link: "https://manik-dev.vercel.app" },
    { icon: Github, label: "github", link: "https://github.com/manik2607" },
    // { icon: Twitter, label: "twitter", link: "https://x" }
    // { icon: FileText, label: "terms" },
    // { icon: Shield, label: "security" },
  ];

  return (
    <footer className="bg-accent text-gray-400 py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {footerItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-100"
              //redirect to github, twitter, etc
              onClick={() => window.open(item.link, "_blank")}
            >
              <item.icon className="h-4 w-4 mr-1" />
              {item.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-100"
          >
            <Terminal className="h-4 w-4 mr-1" />
            Command
          </Button>
          <div className="flex items-center text-gray-400">
            <Zap className="h-4 w-4 mr-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
