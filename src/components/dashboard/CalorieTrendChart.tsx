"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface CalorieTrendChartProps {
  data: { date: string; calories: number }[];
  goal: number;
}

export default function CalorieTrendChart({ data, goal }: CalorieTrendChartProps) {
  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <defs>
            <linearGradient id="calorieGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border-subtle)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 12,
              fontSize: 13,
              color: 'var(--color-text-primary)',
              boxShadow: 'var(--shadow-elevated)',
            }}
            labelStyle={{ color: 'var(--color-text-secondary)', marginBottom: 4 }}
            formatter={(value: number) => [`${value} kcal`, 'Calories']}
          />
          {/* Goal reference line */}
          <Area
            type="monotone"
            dataKey={() => goal}
            stroke="var(--color-text-muted)"
            strokeDasharray="4 4"
            strokeWidth={1}
            fill="none"
            dot={false}
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="calories"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#calorieGradient)"
            dot={{ fill: '#6366f1', strokeWidth: 0, r: 3 }}
            activeDot={{
              fill: '#818cf8',
              strokeWidth: 0,
              r: 5,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
