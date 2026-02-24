import { useMemo } from "react";

/**
 * Detects if the device is low-end based on hardware concurrency,
 * device memory, and connection type. Returns a performance tier.
 *
 * @returns {{ isLowEnd: boolean, isMidRange: boolean, isHighEnd: boolean }}
 */
export const useDevicePerformance = () => {
  return useMemo(() => {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;

    // Check device memory (in GB) - only available in Chrome
    const memory = navigator.deviceMemory || 4;

    // Check connection type
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const isSlow2G =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isLowEnd =
      prefersReducedMotion || cores <= 2 || memory <= 2 || isSlow2G;

    const isMidRange = !isLowEnd && (cores <= 4 || memory <= 4);

    const isHighEnd = !isLowEnd && !isMidRange;

    return { isLowEnd, isMidRange, isHighEnd };
  }, []);
};
