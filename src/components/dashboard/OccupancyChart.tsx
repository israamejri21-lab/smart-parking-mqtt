'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { OccupancyHistoryPoint } from '@/types/parking';
import { BarChart2, ChevronDown } from 'lucide-react';

interface OccupancyChartProps {
  data: OccupancyHistoryPoint[];
  currentRate: number;
}

export const OccupancyChart: React.FC<OccupancyChartProps> = ({ data, currentRate }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format data with rate percentage
  const chartData = data.map((d) => ({
    time: d.time,
    rate: d.rate,
    displayRate: `${d.rate}%`,
  }));

  const lastPoint = chartData[chartData.length - 1];

  return (
    <div className="rounded-2xl bg-[#13162d] p-5 border border-[#1f2444] shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-[#8b5cf6]" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Occupancy Trend
          </h3>
        </div>

        {/* Dropdown Filter Pill */}
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-[#1a1e38] px-2.5 py-1 text-xs font-medium text-slate-300 border border-white/5 hover:bg-[#22284b] transition-colors"
        >
          <span>Last 24h</span>
          <ChevronDown className="h-3 w-3 text-[#94A3B8]" />
        </button>
      </div>

      {/* Recharts Curve Container */}
      <div className="my-2 h-44 sm:h-48 w-full relative">
        {/* Floating current rate badge on top of latest point */}
        <div className="absolute right-3 top-3 z-10 flex flex-col items-center pointer-events-none">
          <span className="rounded-md bg-[#7655F5] px-2 py-0.5 text-[11px] font-bold text-white shadow-lg shadow-[#7655F5]/40">
            {currentRate}%
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-[#7655F5] -mt-1" />
        </div>

        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 15, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2544"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#1f2544' }}
                ticks={['00h', '06h', '12h', '18h']}
              />

              <YAxis
                domain={[0, 100]}
                stroke="#64748B"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: '#1f2544' }}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(val) => `${val}%`}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg bg-[#0e1124] px-2.5 py-1.5 border border-[#7655F5]/40 shadow-xl text-xs text-white">
                        <span className="font-semibold text-purple-300">
                          {label}: {payload[0].value}%
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="natural"
                dataKey="rate"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: '#8b5cf6',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[#94A3B8]">
            Loading occupancy trend...
          </div>
        )}
      </div>
    </div>
  );
};
