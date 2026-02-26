import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef({});

  const projects = useMemo(
    () => ({
      memoryGame: {
        id: "memoryGame",
        title: "Pokemon Memory Game",
        description:
          "Web Game built with React & TailwindCSS for a fast, user-friendly experience.",
        tags: ["React", "TailwindCSS", "Game UI"],
        image: "/images/project/zulkmemory.jpeg",
        alt: "Pokemon Memory Game",
        github: "https://github.com/Zulkifli70/memory-card-game",
        live: "https://zulkmemorycard.netlify.app/",
      },
      cvBuilder: {
        id: "cvBuilder",
        title: "CV Builder",
        tags: ["React", "TailwindCSS", "PDF"],
        image: "/images/project/zulkcv.jpeg",
        alt: "CV Builder",
        github: "https://github.com/Zulkifli70/cv-app",
        live: "https://zulkcv.vercel.app/",
      },
      toko: {
        id: "toko",
        title: "Grocery store website",
        tags: ["Astro", "Responsive UI", "Company Website"],
        image: "/images/project/toko.png",
        alt: "Grocery store website",
        github: "https://github.com/Zulkifli70/TokoBuRohani",
        live: "https://zulktoko.netlify.app/",
      },
      expense: {
        id: "expense",
        title: "Expense Tracker",
        description:
          "Track spending and budgets with a clean dashboard, fast interactions, and clear summaries.",
        tags: ["Nuxt.JS", "Charts", "State Management"],
        image: "/images/project/expense.png",
        alt: "Expense Tracker",
        github: "https://github.com/Zulkifli70/expense-tracker",
        live: "https://zulk-expense.vercel.app/",
      },
      printer: {
        id: "printer",
        title: "Print Forge 3D Website",
        tags: ["Next.js", "3D Models", "TailwindCSS"],
        image: "/images/project/printer.jpg",
        alt: "Print Forge 3D Website",
        github: "https://github.com/Zulkifli70/next-project",
        live: "https://next-project-eta-vert.vercel.app/3d-models",
      },
      wordle: {
        id: "wordle",
        title: "Wordle Game",
        tags: ["React", "TypeScript", "Game Logic"],
        image: "/images/project/zulkassembly.jpg",
        alt: "Wordle Game",
        github: "https://github.com/Zulkifli70/react-ts",
        live: "https://zulkassembly.vercel.app/",
      },
    }),
    [],
  );

  const rows = useMemo(
    () => [
      {
        featured: projects.memoryGame,
        side: [projects.cvBuilder, projects.toko],
      },
      {
        featured: projects.expense,
        side: [projects.printer, projects.wordle],
      },
    ],
    [projects],
  );

  useGSAP(
    () => {
      const cards = Object.values(cardRefs.current).filter(Boolean);

      cards.forEach((card, index) => {
        const isFeatured = card.dataset.featured === "true";

        gsap.set(card, { willChange: "transform, opacity" });
        gsap.fromTo(
          card,
          {
            y: isFeatured ? 30 : 42,
            opacity: 0,
            scale: isFeatured ? 0.985 : 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isFeatured ? 0.82 : 0.68,
            delay: 0.08 * index,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=90",
              once: true,
            },
            onComplete: () => gsap.set(card, { clearProps: "willChange" }),
          },
        );
      });
    },
    { scope: sectionRef },
  );

  const renderLinks = (project) => (
    <div className="project-links">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} GitHub Repository`}
      >
        <FaGithub size={20} />
      </a>
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} Live Website`}
      >
        <FaExternalLinkAlt size={18} />
      </a>
    </div>
  );

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="showcase-grid">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="showcase-row">
            <article
              ref={(el) => (cardRefs.current[row.featured.id] = el)}
              data-featured="true"
              className="project-card project-card-featured"
            >
              <div className="project-image-wrap featured-image">
                <img
                  src={row.featured.image}
                  alt={row.featured.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="project-meta">
                <div className="project-head">
                  <h2>{row.featured.title}</h2>
                  {renderLinks(row.featured)}
                </div>
                <div className="project-tags">
                  {row.featured.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p>{row.featured.description}</p>
              </div>
            </article>

            <div className="showcase-side-col">
              {row.side.map((project) => (
                <article
                  key={project.id}
                  ref={(el) => (cardRefs.current[project.id] = el)}
                  data-featured="false"
                  className="project-card project-card-compact"
                >
                  <div className="project-image-wrap compact-image">
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="project-meta compact-meta">
                    <div className="project-head">
                      <h3>{project.title}</h3>
                      {renderLinks(project)}
                    </div>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppShowcase;
