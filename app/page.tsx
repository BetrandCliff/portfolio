"use client";

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { capabilities, profile, projects, principles, socials, timeline } from "@/data/portfolio";

export default function Home() {
  const reduceMotion = useReducedMotion();
  return (
    <main id="top">
      <div className="noise" />
      <Navbar />

      <section className="hero">
        <div className="hero-grid" />
        <motion.div className="hero-orb" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} />
        <div className="shell hero-content">
          <div className="hero-topline">
            <Reveal><span className="eyebrow">{profile.eyebrow}</span></Reveal>
            <Reveal delay={0.1}><p>{profile.intro}</p></Reveal>
          </div>
          <Reveal delay={0.15}>
            <h1 className="hero-title">Build <span className="accent">different.</span><br />Think deeper.</h1>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="hero-meta">
              <div className="scroll-cue"><span className="scroll-line" /> Scroll to explore</div>
              <div className="status"><span className="status-dot" /> Available for selected collaborations</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="about">
        <div className="shell">
          <Reveal>
            <div className="intro">
              <div><span className="eyebrow">01 / About</span></div>
              <div>
                <p className="intro-big">I&apos;m <span>Sakwe BetrandCliff.</span> A software engineer who likes the space between a raw idea and a system people can actually use.</p>
                <div className="intro-aside" style={{ marginTop: 42 }}>
                  <p>I work across interfaces, APIs, databases, deployment and machine learning. The common thread is simple: understand the problem deeply, then build with intention.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <h2 className="section-title">What I do</h2>
              <span className="section-count">04 CAPABILITIES</span>
            </div>
          </Reveal>
          <div className="capability-list">
            {capabilities.map((item, i) => (
              <Reveal key={item.index} delay={i * 0.05}>
                <div className="capability">
                  <span className="capability-index">{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ArrowUpRight className="capability-arrow" size={18} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <h2 className="section-title">Selected work</h2>
              <span className="section-count">04 SYSTEMS</span>
            </div>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, i) => <Reveal key={project.title} delay={i * 0.06}><ProjectCard project={project} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section" id="journey">
        <div className="shell journey">
          <Reveal>
            <div className="journey-intro">
              <span className="eyebrow">03 / Journey</span>
              <h2 className="section-title" style={{ marginTop: 22 }}>Still<br />becoming.</h2>
              <p>My path is not a straight line. It is a collection of questions, systems, experiments and shipped products.</p>
            </div>
          </Reveal>
          <div className="timeline">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="timeline-item">
                  <span className="timeline-year">{item.year}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto">
        <Reveal>
          <div className="manifesto-inner shell">
            <span className="eyebrow">A working philosophy</span>
            <h2>Not just software<br /><span>with a point of view.</span></h2>
            <div className="principles">{principles.map((item) => <span className="principle" key={item}>{item}</span>)}</div>
          </div>
        </Reveal>
      </section>

      <section className="section" id="contact">
        <div className="shell contact">
          <Reveal>
            <div>
              <span className="eyebrow">04 / Contact</span>
              <h2>Have a hard problem?</h2>
              <p className="contact-copy">If you are building something ambitious, untangling a technical problem, or looking for someone who can move between product and engineering, start a conversation.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="contact-card">
              <span className="contact-label">Direct line</span>
              <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className="contact-send" href="/contact">
                <span><Mail size={16} /> Send me a message</span><ArrowUpRight size={18} />
              </a>
              <a className="contact-phone" href={`tel:${profile.phone}`}><Phone size={15} /> {profile.phoneDisplay}</a>
              <div className="contact-socials" aria-label="Social profiles">
                {socials.map((social) => {
                  const Icon = social.label === "GitHub" ? Github : Linkedin;
                  return <a href={social.href} target="_blank" rel="noreferrer" key={social.label}><Icon size={15} /> {social.label}<ArrowUpRight size={13} /></a>;
                })}
              </div>
              <div className="contact-row"><span>{profile.location}</span><span>GMT +1</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="shell">
          <div className="rule" style={{ marginBottom: 25 }} />
          <div className="footer-row">
            <small>© {new Date().getFullYear()} {profile.displayName}. Built with intention.</small>
            <div className="footer-links">
              {socials.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label}</a>
              ))}
              <a href={`mailto:${profile.email}`}><Mail size={12} style={{ verticalAlign: "-2px" }} /> Email</a>
            </div>
          </div>
        </div>
      </footer>

      <motion.a
        href="#top"
        aria-label="Back to top"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="back-top"
      >
        <ArrowDown size={15} style={{ transform: "rotate(180deg)" }} />
      </motion.a>
    </main>
  );
}
