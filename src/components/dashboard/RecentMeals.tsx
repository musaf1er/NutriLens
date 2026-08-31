"use client";

import { UtensilsCrossed, Flame } from "lucide-react";
import { format } from "date-fns";

interface MealSummary {
  id: string;
  name: string;
  mealType: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  date: string;
}

interface RecentMealsProps {
  meals: MealSummary[];
}

const mealTypeColors: Record<string, string> = {
  BREAKFAST: '#f59e0b',
  LUNCH: '#10b981',
  DINNER: '#6366f1',
  SNACK: '#ec4899',
};

const mealTypeIcons: Record<string, string> = {
  BREAKFAST: '🌅',
  LUNCH: '☀️',
  DINNER: '🌙',
  SNACK: '🍎',
};

export default function RecentMeals({ meals }: RecentMealsProps) {
  if (meals.length === 0) {
    return (
      <div style={{
        padding: 40,
        textAlign: 'center',
        color: 'var(--color-text-muted)',
      }}>
        <UtensilsCrossed size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
        <p style={{ fontSize: 14 }}>No meals logged today</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="card"
          style={{
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
            borderRadius: 12,
          }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: `${mealTypeColors[meal.mealType] || '#6366f1'}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0,
          }}>
            {mealTypeIcons[meal.mealType] || '🍽️'}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {meal.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
              {meal.mealType.charAt(0) + meal.mealType.slice(1).toLowerCase()} · {format(new Date(meal.date), 'h:mm a')}
            </div>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--color-calories)',
            }}>
              <Flame size={14} />
              {Math.round(meal.totalCalories)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
              kcal
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
