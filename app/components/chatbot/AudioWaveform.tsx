"use client";

import "./markdown.css";

interface AudioWaveformProps {
  variant?: "sm" | "md" | "lg";
  bars?: 3 | 4;
  className?: string;
  ariaLabel?: string;
}

const BAR_CONFIGS: Record<
  "sm" | "md" | "lg",
  {
    containerHeight: string;
    gap: string;
    barWidth: string;
    heights: string[];
  }
> = {
  sm: {
    containerHeight: "h-3",
    gap: "gap-[1.5px]",
    barWidth: "w-[1.5px]",
    heights: ["h-2", "h-3", "h-2.5", "h-2"],
  },
  md: {
    containerHeight: "h-3.5",
    gap: "gap-[2px]",
    barWidth: "w-[2px]",
    heights: ["h-2.5", "h-3.5", "h-2", "h-3"],
  },
  lg: {
    containerHeight: "h-5",
    gap: "gap-[3px]",
    barWidth: "w-[2.5px]",
    heights: ["h-3", "h-4", "h-2.5", "h-3.5"],
  },
};

const DELAYS = ["0s", "0.18s", "0.35s", "0.12s"];

export default function AudioWaveform({
  variant = "md",
  bars = 4,
  className = "",
  ariaLabel,
}: AudioWaveformProps) {
  const config = BAR_CONFIGS[variant];
  const barHeights = config.heights.slice(0, bars);

  return (
    <span
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={`inline-flex items-center shrink-0 ${config.containerHeight} ${config.gap} ${className}`}
    >
      {barHeights.map((heightClass, index) => (
        <span
          key={index}
          className={`${config.barWidth} ${heightClass} rounded-full bg-[#28a2fe] audio-wave-bar`}
          style={{ animationDelay: DELAYS[index] || "0s" }}
        />
      ))}
    </span>
  );
}
