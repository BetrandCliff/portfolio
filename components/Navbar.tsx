"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }
  const links = [
    ["01", "About", "about"],
    ["02", "Work", "work"],
    ["03", "Journey", "journey"],
    ["04", "Education", "education"],
    ["05", "Contact", "contact"],
  ];

  return (
    <div className="nav-wrap">
      <div className="shell">
        <nav className="nav">
          <a className="brand" href="#top" onClick={() => setOpen(false)}>
            <span className="brand-mark">B</span>
            {profile.name}
          </a>
          <div className="nav-links">
            {links.map(([num, label, href]) => <a key={href} href={`#${href}`}>{num} / {label}</a>)}
          </div>
          <a className="nav-cta" href="/contact">
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
          <button className="theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="menu-button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mobile-menu"
            >
              {links.map(([num, label, href]) => (
                <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>
                  <span>{num}</span>{label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
