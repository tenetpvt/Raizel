import React from "react";

interface RaizelLogoProps {
  className?: string;
  size?: number;
}

export const RaizelLogo: React.FC<RaizelLogoProps> = ({ className = "w-6 h-6", size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={style}
      aria-label="Raizel Constellation Mark"
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="#4DD8FF"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        strokeDasharray="2 4"
      />
      <circle
        cx="50"
        cy="50"
        r="28"
        stroke="#9D7BFF"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Central North Star Diamond */}
      <path
        d="M50 18 L53 47 L82 50 L53 53 L50 82 L47 53 L18 50 L47 47 Z"
        fill="url(#raizelStarGrad)"
      />
      {/* Accent Satellite Stars */}
      <circle cx="28" cy="28" r="2.5" fill="#4DD8FF" />
      <circle cx="72" cy="28" r="2" fill="#F2B84B" />
      <circle cx="76" cy="68" r="3" fill="#4DD8FF" />
      <circle cx="26" cy="70" r="1.8" fill="#9D7BFF" />
      {/* Connecting fine filaments */}
      <line
        x1="28"
        y1="28"
        x2="47"
        y2="47"
        stroke="#4DD8FF"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <line
        x1="72"
        y1="28"
        x2="53"
        y2="47"
        stroke="#F2B84B"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <line
        x1="76"
        y1="68"
        x2="53"
        y2="53"
        stroke="#4DD8FF"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <line
        x1="26"
        y1="70"
        x2="47"
        y2="53"
        stroke="#9D7BFF"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <defs>
        <linearGradient
          id="raizelStarGrad"
          x1="18"
          y1="18"
          x2="82"
          y2="82"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#4DD8FF" />
          <stop offset="100%" stopColor="#9D7BFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
