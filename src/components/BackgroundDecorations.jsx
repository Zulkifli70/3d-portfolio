import { useMemo } from "react";
import { useDevicePerformance } from "../hooks/useDevicePerformance";

const BackgroundDecorations = () => {
  const { isLowEnd, isMidRange } = useDevicePerformance();

  // Reduce star count based on device capability
  const starCount = isLowEnd ? 20 : isMidRange ? 40 : 80;
  // Reduce orb count on low-end devices
  const orbCount = isLowEnd ? 2 : isMidRange ? 3 : 5;

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        left: ((i * 17.3 + 5) % 100).toFixed(1) + "%",
        top: ((i * 23.7 + 10) % 100).toFixed(1) + "%",
        delay: ((i * 0.13) % 8).toFixed(2) + "s",
        duration: (3 + ((i * 0.11) % 6)).toFixed(2) + "s",
        size: (1.5 + ((i * 0.07) % 2)).toFixed(2) + "px",
        opacity: (0.15 + ((i * 0.01) % 0.55)).toFixed(2),
      })),
    [starCount],
  );

  return (
    <div className="bg-decorations" aria-hidden="true">
      <div className="bg-grid" />
      {/* Always render orb-1 and orb-2 */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      {/* Only render extra orbs on mid/high-end devices */}
      {orbCount >= 3 && <div className="orb orb-3" />}
      {orbCount >= 4 && <div className="orb orb-4" />}
      {orbCount >= 5 && <div className="orb orb-5" />}
      {/* Stars - reduced on low-end */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
      {/* Skip scanlines on low-end devices (repeating-linear-gradient is expensive) */}
      {!isLowEnd && <div className="scanlines" />}
    </div>
  );
};

export default BackgroundDecorations;
