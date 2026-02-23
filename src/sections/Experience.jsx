import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Use matchMedia for better performance
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Batch animations for better performance
        ScrollTrigger.batch(".timeline-card", {
          onEnter: (elements) => {
            gsap.from(elements, {
              xPercent: -100,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.15,
              overwrite: "auto",
            });
          },
          start: "top 85%",
          once: true,
        });

        // Keep original timeline effect but avoid expensive onUpdate + gsap.set loop.
        gsap.fromTo(
          ".timeline",
          {
            scaleY: 1,
            transformOrigin: "bottom bottom",
          },
          {
            scaleY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline",
              start: "top center",
              end: "70% center",
              scrub: 0.5,
            },
          }
        );

        // Batch text animations
        ScrollTrigger.batch(".expText", {
          onEnter: (elements) => {
            gsap.from(elements, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
              overwrite: "auto",
            });
          },
          start: "top 70%",
          once: true,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="My Career Overview"
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6">
                  <GlowCard card={card}>
                    <div>
                      <img src={card.imgPath} alt="exp-img" />
                    </div>
                  </GlowCard>
                </div>
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" />
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        <p className="my-5 text-white-50">Date: {card.date}</p>
                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li key={index} className="text-lg">
                                {responsibility}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
