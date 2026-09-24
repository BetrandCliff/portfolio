import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { projects, profile } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main>
      <Navbar />
      <section className="case-hero">
        <div className="shell">
          <Reveal>
            <Link href="/#work" className="case-back"><ArrowLeft size={14} /> Back to selected work</Link>
            <div className="case-layout">
              <div>
                <p className="eyebrow" style={{ marginTop: 60 }}>{project.type}</p>
                <h1 className="case-title">{project.title}</h1>
              </div>
              <div style={{ paddingTop: 60 }}>
                <p className="case-intro">{project.description}</p>
                <div className="case-stack">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}><div className="case-visual" /></Reveal>
          <div className="case-content">
            <Reveal>
              <div className="case-block">
                <p className="eyebrow">01 / The idea</p>
                <h2>Design around the real problem.</h2>
                <p>{project.title} is treated as a system rather than a single screen. The goal is to connect the user journey, technical constraints and operational reality into one coherent product.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="case-block">
                <p className="eyebrow">02 / My approach</p>
                <h2>Structure first. Polish second.</h2>
                <p>I break the problem into flows, data, states and interfaces before adding visual detail. That makes the final experience feel intentional instead of decorated.</p>
              </div>
            </Reveal>
          </div>
          <div className="case-content">
            <Reveal>
              <div className="case-block">
                <p className="eyebrow">03 / Engineering</p>
                <h2>Built to keep evolving.</h2>
                <p>The implementation is organized so that authentication, data access, business logic and presentation can evolve without turning the product into a fragile collection of screens.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="case-block">
                <p className="eyebrow">04 / Next</p>
                <h2>Every shipped system creates a better question.</h2>
                <p>The next iteration is about measuring what matters, tightening the user experience and expanding the system where it creates real value.</p>
                <Link href={`mailto:${profile.email}`} className="case-back" style={{ marginTop: 25 }}>Discuss a similar project <ArrowUpRight size={14} /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
