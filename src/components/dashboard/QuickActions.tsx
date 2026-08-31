"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ScanLine,
  Plus,
  Scale,
  TrendingUp,
} from "lucide-react";

const actions = [
  {
    href: "/scan",
    label: "AI Scan",
    description: "Scan food photo",
    icon: ScanLine,
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    shadow: "rgba(99, 102, 241, 0.3)",
  },
  {
    href: "/meals/add",
    label: "Add Meal",
    description: "Manual entry",
    icon: Plus,
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    shadow: "rgba(16, 185, 129, 0.3)",
  },
  {
    href: "/weight",
    label: "Log Weight",
    description: "Track progress",
    icon: Scale,
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    shadow: "rgba(245, 158, 11, 0.3)",
  },
  {
    href: "/history",
    label: "View Stats",
    description: "Analytics",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    shadow: "rgba(236, 72, 153, 0.3)",
  },
];

export default function QuickActions() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 12,
    }}>
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Link href={action.href} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              padding: '20px 12px',
              borderRadius: 16,
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-subtle)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-default)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: action.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${action.shadow}`,
              }}>
                <Icon size={22} color="white" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {action.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                  {action.description}
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
