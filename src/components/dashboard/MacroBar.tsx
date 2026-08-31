"use client";

import { motion } from "framer-motion";

interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
  color: string;
}

export default function MacroBar({ label, current, goal, unit = "g", color }: MacroBarProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 6,
        fontSize: 13,
      }}>
        <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 600 }}>
          <span style={{ color }}>{Math.round(current)}</span>
          <span style={{ color: 'var(--color-text-muted)' }}> / {goal}{unit}</span>
        </span>
      </div>
      <div style={{
        width: '100%',
        height: 8,
        borderRadius: 4,
        background: 'var(--color-bg-tertiary)',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
