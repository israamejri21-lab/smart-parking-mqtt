'use client';

import React from 'react';
import { ParkingActivity } from '@/types/parking';
import { Zap, ArrowRight } from 'lucide-react';

interface RecentActivityProps {
  activities: ParkingActivity[];
  onSelectSpotById?: (spotId: number) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  onSelectSpotById,
}) => {
  // Highlight status word with appropriate color
  const renderDescription = (act: ParkingActivity) => {
    const isOccupied = act.status === 'OCCUPIED';
    const isFree = act.status === 'FREE';

    return (
      <span className="text-xs sm:text-sm text-slate-200">
        Spot #{act.spotId} is now{' '}
        <span
          className={`font-semibold ${
            isOccupied
              ? 'text-[#ef4444]'
              : isFree
              ? 'text-[#22c55e]'
              : 'text-slate-400'
          }`}
        >
          {isOccupied ? 'Occupied' : isFree ? 'Available' : 'Out of Service'}
        </span>
      </span>
    );
  };

  return (
    <div className="rounded-2xl bg-[#13162d] p-5 border border-[#1f2444] shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b]" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Recent Activity
          </h3>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3 mt-1">
        {activities.slice(0, 4).map((act) => (
          <div
            key={act.id}
            onClick={() => onSelectSpotById && onSelectSpotById(act.spotId)}
            className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
          >
            {/* Green glowing bullet dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
            </span>

            {/* Time */}
            <span className="font-mono text-xs text-[#94A3B8] w-10 shrink-0">
              {act.timestamp}
            </span>

            {/* Formatted Text */}
            <div className="truncate flex-1">
              {renderDescription(act)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
