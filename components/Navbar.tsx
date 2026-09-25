"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";

export function Navbar() {
  const [open, setOpen] = useState(false);
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
