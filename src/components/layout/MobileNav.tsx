"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScanLine,
  UtensilsCrossed,
  Scale,
  History,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/meals", label: "Meals", icon: UtensilsCrossed },
  { href: "/scan", label: "Scan", icon: ScanLine, isMain: true },
  { href: "/weight", label: "Weight", icon: Scale },
  { href: "/history", label: "History", icon: History },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="hide-desktop glass-strong" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '8px 12px',
      paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        if (item.isMain) {
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              textDecoration: 'none',
              marginTop: -20,
            }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
              }}>
                <Icon size={24} color="white" />
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-accent-primary-light)' }}>
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link key={item.href} href={item.href} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            textDecoration: 'none',
            padding: '6px 12px',
          }}>
            <Icon
              size={22}
              style={{
                color: isActive ? 'var(--color-accent-primary-light)' : 'var(--color-text-muted)',
              }}
            />
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--color-accent-primary-light)' : 'var(--color-text-muted)',
            }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
