"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { projects } from "@/data/portfolio";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="project-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-top">
        <span className="project-number">PROJECT / {project.number}</span>
        <span className="project-type">{project.type}</span>
      </div>
      <div className="project-visual" aria-hidden="true">
        <span className="project-scan" />
      </div>
      <div className="project-bottom">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
          <Link href={`/work/${project.slug}`} className="tag" style={{ marginLeft: "auto" }}>{project.accent} <ArrowUpRight size={12} style={{ verticalAlign: "-2px" }} /></Link>
        </div>
      </div>
    </motion.article>
  );
}
