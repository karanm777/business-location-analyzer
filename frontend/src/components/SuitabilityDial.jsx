import React, { useEffect, useState } from "react";

const CX = 120;
const CY = 140;
const RADIUS = 100;

const pointOnDial = (score, radius = RADIUS) => {
  const angle = 180 - score * 1.8;
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY - radius * Math.sin(rad)
  };
};

const arcPath = (fromScore, toScore) => {
  const start = pointOnDial(fromScore);
  const end = pointOnDial(toScore);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
};

const tierForScore = (score) => {
  if (score >= 70) return { color: "#1F8A5C", label: "Good range" };
  if (score >= 40) return { color: "#C98A2C", label: "Middle range" };
  return { color: "#B24C3A", label: "Low range" };
};

const SuitabilityDial = ({ score = 0, size = 240 }) => {
  const [needleRotation, setNeedleRotation] = useState(-90);

  useEffect(() => {
    const clamped = Math.max(0, Math.min(100, score));
    const timer = setTimeout(() => {
      setNeedleRotation(clamped * 1.8 - 90);
    }, 80);
    return () => clearTimeout(timer);
  }, [score]);

  const tier = tierForScore(score);

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 240 150" width={size} height={size * 0.625}>
        <path
          d={arcPath(0, 40)}
          stroke="#B24C3A"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d={arcPath(40, 70)}
          stroke="#C98A2C"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d={arcPath(70, 100)}
          stroke="#1F8A5C"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <g
          style={{
            transform: `rotate(${needleRotation}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
            transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY - RADIUS + 22}
            stroke="#14231F"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <circle cx={CX} cy={CY} r="7" fill="#14231F" />
      </svg>

      <div className="text-center -mt-2">
        <p className="font-mono text-4xl font-semibold text-ink leading-none">
          {score}
          <span className="text-lg text-muted">/100</span>
        </p>
        <p className="text-xs uppercase tracking-wide text-muted mt-1">{tier.label}</p>
      </div>
    </div>
  );
};

export default SuitabilityDial;
