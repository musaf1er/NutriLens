"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export default function LoadingSpinner({ size = 24, text }: LoadingSpinnerProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: 40,
    }}>
      <Loader2
        size={size}
        style={{ color: 'var(--color-accent-primary)', animation: 'spin 1s linear infinite' }}
      />
      {text && (
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{text}</p>
      )}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
