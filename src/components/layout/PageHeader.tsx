"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 32,
      gap: 16,
      flexWrap: 'wrap',
    }}>
      <div>
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: subtitle ? 4 : 0,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
