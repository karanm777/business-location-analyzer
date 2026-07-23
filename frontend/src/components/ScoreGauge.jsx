import React from "react";

const SIZE = 132;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const scoreColor = (score) => {
  if (score >= 70) return "#C97E28";
  if (score >= 45) return "#5F8474";
  return "#9A4531";
};

const ScoreGauge = ({ score }) => {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE;
  const color = scoreColor(clamped);

  const ticks = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        {ticks.map((i) => {
          const angle = (i / ticks.length) * 360;
          const isMajor = i % 6 === 0;
          const outer = SIZE / 2 - STROKE - 4;
          const inner = outer - (isMajor ? 6 : 3);
          const rad = (angle * Math.PI) / 180;
          const cx = SIZE / 2;
          const cy = SIZE / 2;
          return (
            <line
              key={i}
              x1={cx + outer * Math.cos(rad)}
              y1={cy + outer * Math.sin(rad)}
              x2={cx + inner * Math.cos(rad)}
              y2={cy + inner * Math.sin(rad)}
              stroke="#CFE0DC"
              strokeWidth={isMajor ? 1.6 : 1}
            />
          );
        })}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#EAF1EF"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-semibold text-ink-600 leading-none">
          {clamped}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-ink-400 mt-1">
          out of 100
        </span>
      </div>
    </div>
  );
};

export default ScoreGauge;
