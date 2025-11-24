import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cvRef = useRef(null);
  const pokemonRef = useRef(null);
  const tenziesRef = useRef(null);
  const genshinRef = useRef(null);
  const memeRef = useRef(null);
  const wordleRef = useRef(null);

  const projects = {
    memoryGame: {
      github: "https://github.com/Zulkifli70/memory-card-game",
      live: "https://zulkmemorycard.netlify.app/",
    },
    cvBuilder: {
      github: "https://github.com/Zulkifli70/cv-app",
      live: "https://zulkcvbuilder.netlify.app/",
    },
    tenzies: {
      github: "https://github.com/Zulkifli70/Tenzies",
      live: "https://zulktenzies.netlify.app/",
    },
    genshin: {
      github: "https://github.com/Zulkifli70/Genshin-copy",
      live: "https://genshin-duplicate.vercel.app/",
    },
    meme: {
      github: "https://github.com/Zulkifli70/Meme-Generator",
      live: "https://zulkmeme.netlify.app/",
    },
    wordle: {
      github: "https://github.com/Zulkifli70/Wordle",
      live: "https://zulkwordle.netlify.app/",
    },
  };

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [
      pokemonRef.current,
      cvRef.current,
      tenziesRef.current,
      genshinRef.current,
      memeRef.current,
      wordleRef.current,
    ];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={pokemonRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img
                src="/images/project/zulkmemorycard.jpeg"
                alt="Memory App Game"
              />
            </div>
            <div className="text-content">
              <div className="flex items-center justify-between">
                <h2>Pokemon Memory Game</h2>
                <div className="flex gap-3">
                  <a
                    href={projects.memoryGame.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="View GitHub Repository"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={projects.memoryGame.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="View Live Website"
                  >
                    <FaExternalLinkAlt size={24} />
                  </a>
                </div>
              </div>
              <p className="text-white-50 md:text-xl">
                Web Game built with React & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden mb-10">
            <div className="project" ref={cvRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/project/zulkcvbuilder.jpeg"
                  alt="CV Builder"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <h2>CV Builder</h2>
                <div className="flex gap-3">
                  <a
                    href={projects.cvBuilder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View GitHub Repository"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={projects.cvBuilder.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View Live Website"
                  >
                    <FaExternalLinkAlt size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="project" ref={tenziesRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img
                  src="/images/project/zulktenzies.jpeg"
                  alt="Tenzies Game"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <h2>Tenzies</h2>
                <div className="flex gap-3">
                  <a
                    href={projects.tenzies.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View GitHub Repository"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={projects.tenzies.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View Live Website"
                  >
                    <FaExternalLinkAlt size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}

        <div className="showcaselayout">
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={genshinRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img src="/images/project/genshin.jpeg" alt="Genshin" />
              </div>
              <div className="flex items-center justify-between w-full">
                <h2>Genshin impact</h2>
                <div className="flex gap-3">
                  <a
                    href={projects.genshin.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View GitHub Repository"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={projects.genshin.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View Live Website"
                  >
                    <FaExternalLinkAlt size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="project" ref={memeRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/project/meme.jpg" alt="Tenzies Game" />
              </div>
              <div className="flex items-center justify-between w-full">
                <h2>Meme Generator</h2>
                <div className="flex gap-3">
                  <a
                    href={projects.meme.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View GitHub Repository"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={projects.meme.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:opacity-70 transition-opacity"
                    aria-label="View Live Website"
                  >
                    <FaExternalLinkAlt size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div ref={wordleRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/project/wordlee.jpeg" alt="Memory App Game" />
            </div>
            <div className="text-content">
              <div className="flex items-center justify-between">
                <h2>Wordle Game</h2>
                <div className="flex gap-3">
                  <a
                    href={projects.wordle.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="View GitHub Repository"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={projects.wordle.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="View Live Website"
                  >
                    <FaExternalLinkAlt size={24} />
                  </a>
                </div>
              </div>
              <p className="text-white-50 md:text-xl">
                Web Game built with React & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
