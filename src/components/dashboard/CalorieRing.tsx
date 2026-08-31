"use client";

import { motion } from "framer-motion";

interface CalorieRingProps {
  consumed: number;
  goal: number;
  size?: number;
}

export default function CalorieRing({ consumed, goal, size = 200 }: CalorieRingProps) {
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);
  const strokeWidth = 12;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isOver = consumed > goal;

  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-bg-tertiary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isOver ? "url(#gradientOver)" : "url(#gradientNormal)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradientNormal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" />
            <stop offset="100%" stopColor="var(--color-accent-secondary)" />
          </linearGradient>
          <linearGradient id="gradientOver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-danger)" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <motion.span
          style={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {Math.round(consumed)}
        </motion.span>
        <span style={{
          fontSize: 12,
          color: 'var(--color-text-muted)',
          fontWeight: 500,
          marginTop: 2,
        }}>
          kcal consumed
        </span>
        <div style={{
          marginTop: 8,
          padding: '4px 12px',
          borderRadius: 20,
          background: isOver
            ? 'rgba(239, 68, 68, 0.12)'
            : 'rgba(16, 185, 129, 0.12)',
          fontSize: 12,
          fontWeight: 600,
          color: isOver
            ? 'var(--color-danger-light)'
            : 'var(--color-success-light)',
        }}>
          {isOver ? `${Math.round(consumed - goal)} over` : `${Math.round(remaining)} left`}
        </div>
      </div>
    </div>
  );
}
