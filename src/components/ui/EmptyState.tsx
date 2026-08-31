"use client";

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: 'var(--color-bg-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
      }}>
        <Icon size={28} style={{ color: 'var(--color-text-muted)' }} />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', maxWidth: 300 }}>
        {description}
      </p>
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}
