import React from "react";

const LineChart = ({ color }) => {
  const points = [10, 25, 15, 30, 20, 40, 35];
  const w = 80, h = 40;

  const toPath = (pts, close = false) => {
    const max = Math.max(...pts);
    const min = Math.min(...pts);
    const coords = pts.map((p, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((p - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    });

    if (close) {
      coords.push(`L ${w} ${h} L 0 ${h} Z`);
    }

    return coords.join(" ");
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 80 40">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* الـ gradient fill */}
      <path  d={toPath(points, true)} fill={`url(#grad-${color})`} />

      {/* الـ line */}
      <path d={toPath(points)} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
};
export default LineChart;
