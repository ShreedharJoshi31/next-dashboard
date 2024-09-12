"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  url: string;
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    url: "/",
  },
  {
    name: "Skilltest",
    icon: <GraduationCap className="h-4 w-4" />,
    url: "/skilltest",
  },
  { name: "Internship", icon: <Briefcase className="h-4 w-4" />, url: "/" },
];

export function Sidebar() {
  const [selected, setSelected] = useState("Dashboard");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect to handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null; // Render nothing on the server side
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 py-4">
        <div className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link href={item.url} key={item.name}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-primary/70",
                  "hover:bg-transparent hover:text-primary",
                  selected === item.name &&
                    "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                )}
                onClick={() => setSelected(item.name)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-primary/70",
              "hover:bg-transparent hover:text-primary"
            )}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="ml-2">Toggle theme</span>
          </Button>
        </div>
      </ScrollArea>
      <div className="p-4 border-t"></div>
    </div>
  );
}
