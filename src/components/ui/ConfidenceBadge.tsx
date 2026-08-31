"use client";

import { getConfidenceLevel } from "@/lib/ai/types";

interface ConfidenceBadgeProps {
  confidence: number;
  showLabel?: boolean;
}

export default function ConfidenceBadge({ confidence, showLabel = true }: ConfidenceBadgeProps) {
  const { label, color, textColor } = getConfidenceLevel(confidence);

  return (
    <span className={`badge ${color} ${textColor}`}>
      <span style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'currentColor',
      }} />
      {Math.round(confidence)}%{showLabel && ` ${label}`}
    </span>
  );
}
