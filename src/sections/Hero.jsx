import { lazy, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "../components/Button";
import { words } from "../constants";

const HeroExperience = lazy(
  () => import("../components/models/hero_models/HeroExperience"),
);

const Hero = () => {
  const heroRef = useRef(null);
  const rotatingWords = words.slice(0, 4);
  const loopWords = [...rotatingWords, rotatingWords[0]];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([".hero-text h1", ".hero-copy", ".cta-wrapper"], {
          opacity: 1,
          y: 0,
        });
      } else {
        gsap.set([".hero-text h1", ".hero-copy", ".cta-wrapper"], {
          willChange: "transform, opacity",
        });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.from(".hero-text h1", {
          y: 56,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
        })
          .from(
            ".hero-copy",
            {
              y: 20,
              opacity: 0,
              duration: 0.55,
            },
            "-=0.35",
          )
          .from(
            ".cta-wrapper",
            {
              y: 18,
              opacity: 0,
              duration: 0.5,
            },
            "-=0.3",
          )
          .set([".hero-text h1", ".hero-copy", ".cta-wrapper"], {
            clearProps: "willChange",
          });
      }

      gsap.set(".hero-word-track", { yPercent: 0 });
      const wordTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });

      const stopIndex = rotatingWords.length;
      wordTl.to({}, { duration: 1.1 });

      for (let index = 1; index <= stopIndex; index += 1) {
        wordTl
          .to(".hero-word-track", {
            yPercent: -100 * index,
            duration: 0.55,
          })
          .to({}, { duration: index === stopIndex ? 0.2 : 1.05 });
      }

      wordTl
        .set(".hero-word-track", {
          yPercent: 0,
        })
        .to({}, { duration: 0.8 });
    },
    { scope: heroRef },
  );

  return (
    <section id="hero" ref={heroRef} className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img
          src="/images/bg.png"
          alt=""
          fetchpriority="high"
          decoding="async"
        />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="hero-word-track">
                    {loopWords.map((word, index) => (
                      <span
                        key={index}
                        className="hero-word-item"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className="hero-copy text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I&apos;m Zulk, a frontend developer with a passion for code.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
              targetId="work"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
