'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TopStatsProps {
  total: number;
  available: number;
  occupied: number;
  occupancyRate: number;
}

export const TopStatsRow: React.FC<TopStatsProps> = ({
  total,
  available,
  occupied,
  occupancyRate,
}) => {
  const availablePercent = total > 0 ? Math.round((available / total) * 100) : 65;
  const occupiedPercent = total > 0 ? Math.round((occupied / total) * 100) : 35;

  // Circular gauge math for Card 4
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (occupancyRate / 100) * circumference;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {/* 1. Total Spaces Card */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#13162d] p-5 border border-[#1f2444] shadow-lg">
        {/* Blue "P" Icon Badge */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2563eb] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          <span className="text-2xl font-black tracking-tight font-sans">P</span>
        </div>

        <div>
          <span className="text-3xl font-bold tracking-tight text-white block">
            {total}
          </span>
          <span className="text-xs font-medium text-[#94A3B8] tracking-wide">
            Total Spaces
          </span>
        </div>
      </div>

      {/* 2. Available Spaces Card */}
      <div className="flex items-center justify-between rounded-2xl bg-[#13162d] p-5 border border-[#1f2444] shadow-lg">
        <div className="flex items-center gap-4">
          {/* Green Car Icon Badge */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#16a34a] text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>

          <div>
            <span className="text-3xl font-bold tracking-tight text-white block">
              {available}
            </span>
            <span className="text-xs font-medium text-[#94A3B8] tracking-wide">
              Available
            </span>
          </div>
        </div>

        {/* Green Percentage Pill */}
        <span className="rounded-full bg-[#16a34a] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
          {availablePercent}%
        </span>
      </div>

      {/* 3. Occupied Spaces Card */}
      <div className="flex items-center justify-between rounded-2xl bg-[#13162d] p-5 border border-[#1f2444] shadow-lg">
        <div className="flex items-center gap-4">
          {/* Red Car Icon Badge */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>

          <div>
            <span className="text-3xl font-bold tracking-tight text-white block">
              {occupied}
            </span>
            <span className="text-xs font-medium text-[#94A3B8] tracking-wide">
              Occupied
            </span>
          </div>
        </div>

        {/* Red Percentage Pill */}
        <span className="rounded-full bg-[#dc2626] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
          {occupiedPercent}%
        </span>
      </div>

      {/* 4. Occupancy Rate Circular Gauge Card */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#13162d] p-5 border border-[#1f2444] shadow-lg">
        {/* Donut Progress Ring */}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <svg className="h-16 w-16 -rotate-90 transform" viewBox="0 0 64 64">
            {/* Background ring */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="#1e2438"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Active glowing green/cyan arc */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="#10b981"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Centered Percentage */}
          <span className="absolute text-xs font-bold text-white tracking-tight">
            {occupancyRate}%
          </span>
        </div>

        <div>
          <span className="text-sm font-bold text-white block">
            Occupancy Rate
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs font-bold text-[#22c55e] flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
              +5%
            </span>
            <span className="text-[11px] text-[#94A3B8]">vs. last hour</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatCard = TopStatsRow;
