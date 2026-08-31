"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScanLine,
  UtensilsCrossed,
  Scale,
  History,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/scan", label: "AI Scan", icon: ScanLine },
  { href: "/meals", label: "Meals", icon: UtensilsCrossed },
  { href: "/weight", label: "Weight", icon: Scale },
  { href: "/history", label: "History", icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hide-mobile" style={{
      width: 260,
      minHeight: '100vh',
      padding: '24px 16px',
      borderRight: '1px solid var(--color-border-subtle)',
      background: 'var(--color-bg-secondary)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 40,
    }}>
      {/* Logo */}
      <Link href="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 10, 
        padding: '0 12px',
        marginBottom: 36,
        textDecoration: 'none',
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Sparkles size={20} color="white" />
        </div>
        <span style={{ 
          fontSize: 20, 
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }} className="gradient-text">
          CalorieAI
        </span>
      </Link>

      {/* Nav Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 12,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: isActive ? 'var(--color-accent-glow)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--color-bg-tertiary)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }
              }}
            >
              <Icon size={20} style={{
                color: isActive ? 'var(--color-accent-primary-light)' : 'inherit',
              }} />
              {item.label}
              {item.href === '/scan' && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                  color: 'white',
                  letterSpacing: '0.05em',
                }}>
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div style={{
        padding: '16px',
        borderRadius: 12,
        background: 'var(--color-bg-tertiary)',
        border: '1px solid var(--color-border-subtle)',
      }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>
          AI-Powered Tracking
        </p>
        <p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
          Scan food photos to instantly log calories and macros
        </p>
      </div>
    </aside>
  );
}
