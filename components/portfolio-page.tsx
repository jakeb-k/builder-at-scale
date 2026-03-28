"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { BootSequence } from "@/components/boot-sequence";
import {
  capabilities,
  contactLinks,
  heroMetrics,
  journeyEntries,
  navSections,
  principles,
  projects,
  signalStrip,
  workProofs,
} from "@/content/site";
import { SignalCanvas } from "@/components/signal-canvas";

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function blend(progress: number, from: [number, number, number], to: [number, number, number]) {
  return [
    Math.round(mix(from[0], to[0], progress)),
    Math.round(mix(from[1], to[1], progress)),
    Math.round(mix(from[2], to[2], progress)),
  ].join(", ");
}

function getLinkBehavior(href: string) {
  if (href.startsWith("mailto:")) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noreferrer",
  };
}

export function PortfolioPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [introStage, setIntroStage] = useState<"boot" | "pulse" | "release" | "complete">("boot");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotionFrame = 0;

    if (mediaQuery.matches) {
      reduceMotionFrame = window.requestAnimationFrame(() => {
        setIntroStage("complete");
      });

      return () => {
        window.cancelAnimationFrame(reduceMotionFrame);
      };
    }

    document.body.classList.add("body--intro-lock");

    const pulseTimer = window.setTimeout(() => {
      setIntroStage("pulse");
    }, 720);

    const releaseTimer = window.setTimeout(() => {
      setIntroStage("release");
    }, 1200);

    const completeTimer = window.setTimeout(() => {
      setIntroStage("complete");
      document.body.classList.remove("body--intro-lock");
    }, 1750);

    return () => {
      window.cancelAnimationFrame(reduceMotionFrame);
      document.body.classList.remove("body--intro-lock");
      window.clearTimeout(pulseTimer);
      window.clearTimeout(releaseTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      setScrollProgress(progress);
      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateJourneyProgress = () => {
      const journey = document.getElementById("journey");

      if (!journey) {
        frameId = 0;
        return;
      }

      const rect = journey.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const rawProgress = (viewportHeight * 0.72 - rect.top) / (rect.height + viewportHeight * 0.15);
      const nextProgress = Math.min(Math.max(rawProgress, 0), 1);

      setJourneyProgress(nextProgress);
      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateJourneyProgress);
      }
    };

    updateJourneyProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    reveals.forEach((item) => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.22, 0.4, 0.6],
        rootMargin: "-25% 0px -40% 0px",
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const style = {
    "--accent-rgb": blend(scrollProgress, [36, 244, 208], [255, 84, 84]),
    "--accent-soft-rgb": blend(scrollProgress, [8, 40, 37], [66, 18, 23]),
    "--accent-glow-rgb": blend(scrollProgress, [18, 141, 122], [164, 39, 47]),
  } as CSSProperties;

  const shellStateClass = introStage === "complete" ? "portfolio-shell--ready" : `portfolio-shell--${introStage}`;

  return (
    <div className={`portfolio-shell ${shellStateClass}`} style={style}>
      <BootSequence stage={introStage} />
      <SignalCanvas progress={scrollProgress} />

      <header className="topbar">
        <div className="topbar__inner">
          <a className="brand-mark" href="#hero">
            JK
          </a>

          <nav className="site-nav" aria-label="Section navigation">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={activeSection === section.id ? "is-active" : undefined}
                aria-current={activeSection === section.id ? "true" : undefined}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" data-section className="section section--hero">
          <div className="section__inner hero-grid">
            <div className="hero-copy">
              <span className="eyebrow hero-role reveal" data-reveal>
                Code Wrangler @ Simpro
              </span>
              <h1 className="display hero-name">Jakeb Knowles</h1>
              <p className="hero-tagline">Builder of products, systems, and strange ideas.</p>
              <p className="lead reveal" data-reveal>
                I like the whole problem: product calls, frontend, backend, AI-assisted workflows, and the weird bits in
                between that decide whether something actually survives contact with reality.
              </p>
              <div className="hero-actions reveal" data-reveal>
                <a className="button" href="#journey">
                  Read the journey
                </a>
                <a className="button button--ghost" href="#work">
                  See selected work
                </a>
              </div>
            </div>

            <aside className="hero-rail reveal" data-reveal>
              <div className="metric-stack">
                {heroMetrics.map((metric) => (
                  <div key={metric} className="metric-card">
                    <span className="metric-card__signal" />
                    <p>{metric}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="manifesto" className="section section--manifesto">
          <div className="section__inner">
            <div className="manifesto panel reveal" data-reveal>
              <span className="eyebrow">MANIFESTO</span>
              <p className="manifesto__body">
                I like building end to end. Figuring out the real problem, choosing the right shape, wiring it up
                properly, and staying with it until it survives real use. That is the fun part.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--signal-band" aria-label="Core patterns and tools">
          <div className="section__inner">
            <div className="signal-band panel reveal" data-reveal>
              <div className="signal-band__track">
                {[...signalStrip, ...signalStrip].map((item, index) => (
                  <span key={`${item}-${index}`} className="signal-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="journey" data-section className="section">
          <div className="section__inner">
            <div className="section-heading reveal" data-reveal>
              <span className="eyebrow">JOURNEY</span>
              <h2 className="section-title">This started with Lego robots and got out of hand.</h2>
            </div>

            <div
              className="journey-timeline"
              style={{ "--journey-progress": journeyProgress } as CSSProperties}
            >
              {journeyEntries.map((entry) => (
                <article key={`${entry.period}-${entry.title}`} className="journey-step reveal" data-reveal>
                  <div className="journey-step__rail">
                    <span className="journey-step__period">{entry.period}</span>
                    <span className="journey-step__dot" />
                    <span className="journey-step__signal">{entry.signal}</span>
                  </div>
                  <div className="journey-step__content panel">
                    <p className="journey-step__company">{entry.company}</p>
                    <h3>{entry.title}</h3>
                    <p>{entry.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="now" data-section className="section">
          <div className="section__inner">
            <div className="section-heading reveal" data-reveal>
              <span className="eyebrow">NOW</span>
              <h2 className="section-title">What all of that turned into.</h2>
              <p className="section-copy">
                These days I work across product, frontend, backend, docs, AI-assisted workflows, and the awkward
                research-heavy stuff that needs good judgment before anyone starts pretending the code is the hard part.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability) => (
                <article key={capability.title} className="capability-card panel reveal" data-reveal>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                </article>
              ))}
            </div>

            <div className="proof-grid">
              {workProofs.map((proof) => (
                <article key={proof.title} className="proof-card panel reveal" data-reveal>
                  <span className="rail-label">{proof.note}</span>
                  <h3>{proof.title}</h3>
                  <p>{proof.body}</p>
                </article>
              ))}
            </div>

            <div id="work" className="selected-work">
              <div className="section-heading reveal" data-reveal>
                <span className="eyebrow">SELECTED WORK</span>
                <h2 className="section-title">A couple of things that show the range.</h2>
              </div>

              <div className="selected-work__stack">
                {projects.map((project) => (
                  <article key={project.id} className={`project-showcase panel project-showcase--${project.id} reveal`} data-reveal>
                    <div className="project-grid project-showcase__grid">
                      <div className="project-copy">
                        <span className="eyebrow">{project.status}</span>
                        <h3 className="section-title">{project.name}</h3>
                        <p className="section-copy">{project.summary}</p>
                        <p className="project-body">{project.body}</p>
                        <div className="project-links">
                          {project.links.map((link) => (
                            <a key={link.href} className="button button--ghost" href={link.href} {...getLinkBehavior(link.href)}>
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>

                      <aside className="project-rail">
                        <div>
                          <span className="rail-label">Highlights</span>
                          <ul className="detail-list">
                            {project.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="rail-label">Stack</span>
                          <div className="pill-list">
                            {project.stack.map((item) => (
                              <span key={item} className="pill">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </aside>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="principles" data-section className="section">
          <div className="section__inner">
            <div className="section-heading reveal" data-reveal>
              <span className="eyebrow">HOW I WORK</span>
              <h2 className="section-title">Product judgment first. Technical range to back it up.</h2>
            </div>

            <div className="principle-grid">
              {principles.map((principle) => (
                <article key={principle.title} className="principle-card panel reveal" data-reveal>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" data-section className="section section--contact">
          <div className="section__inner">
            <div className="contact-shell panel reveal" data-reveal>
              <span className="eyebrow">SELECTIVE CONVERSATIONS</span>
              <h2 className="section-title">If you want to talk software, products, or strange ideas, say hello.</h2>
              <p className="section-copy">
                I like meeting people who care about what they build. Founder, recruiter, engineer, curious human, all
                good. If the conversation is interesting, I am in.
              </p>

              <div className="contact-grid">
                {contactLinks.map((link) => (
                  <a key={link.href} className="contact-card" href={link.href} {...getLinkBehavior(link.href)}>
                    <span className="contact-card__label">{link.label}</span>
                    <span className="contact-card__value">{link.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
