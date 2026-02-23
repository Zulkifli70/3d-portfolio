import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(
    () => {
      const counters = countersRef.current.filter(Boolean);
      const numberElements = counters
        .map((counter) => counter.querySelector(".counter-number"))
        .filter(Boolean);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        numberElements.forEach((element, index) => {
          const item = counterItems[index];
          element.textContent = `${item.value}${item.suffix}`;
        });
        return;
      }

      numberElements.forEach((element) => {
        element.textContent = "0";
      });

      const tl = gsap.timeline({ paused: true });

      numberElements.forEach((element, index) => {
        const item = counterItems[index];

        tl.to(
          element,
          {
            innerText: item.value,
            duration: 1.6,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: () => {
              const value = Math.round(Number(element.innerText) || 0);
              element.textContent = `${value}${item.suffix}`;
            },
          },
          index * 0.12
        );
      });

      ScrollTrigger.create({
        trigger: counterRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => tl.play(),
      });
    },
    { scope: counterRef }
  );

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) countersRef.current[index] = el;
            }}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
          >
            <div className="counter-number text-white-50 text-5xl font-bold mb-2">
              0{item.suffix}
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
