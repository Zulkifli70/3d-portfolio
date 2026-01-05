import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // Use matchMedia for better performance
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Batch animations for better performance
      ScrollTrigger.batch(".timeline-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            xPercent: -100,
            opacity: 0,
            duration: 0.8, // Reduced from 1
            ease: "power2.out", // Changed from inOut
            stagger: 0.15,
          });
        },
        start: "top 85%", // Start earlier for smoother feel
      });

      // Optimize timeline animation
      gsap.to(".timeline", {
        transformOrigin: "bottom bottom",
        ease: "none", // Use 'none' for scroll-linked animations
        scrollTrigger: {
          trigger: ".timeline",
          start: "top center",
          end: "70% center",
          scrub: 0.5, // Add scrub for smoother animation
          onUpdate: (self) => {
            gsap.set(".timeline", {
              scaleY: 1 - self.progress,
            });
          },
        },
      });

      // Batch text animations
      ScrollTrigger.batch(".expText", {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
          });
        },
        start: "top 70%",
      });
    });

    return () => mm.revert(); // Cleanup
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
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
                        <p className="my-5 text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>
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
