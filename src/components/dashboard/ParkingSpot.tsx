'use client';

import React from 'react';
import { ParkingSpot as ParkingSpotType } from '@/types/parking';

interface ParkingSpotProps {
  spot: ParkingSpotType;
  onClick: (spot: ParkingSpotType) => void;
}

export const TopDownCarIcon = () => (
  <svg
    viewBox="0 0 24 40"
    className="w-5 h-8 sm:w-6 sm:h-9 md:w-6 md:h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
  >
    {/* Main car body */}
    <path
      d="M5 8C5 4 7 1.5 12 1.5C17 1.5 19 4 19 8L19.5 14C20.8 15 20.8 17.5 19.5 18.5L19.5 33C19.5 36.5 17 38.5 12 38.5C7 38.5 4.5 36.5 4.5 33L4.5 18.5C3.2 17.5 3.2 15 4.5 14L5 8Z"
      fill="currentColor"
    />
    {/* Front windshield */}
    <path
      d="M6.5 10C7.5 8 9.5 7.5 12 7.5C14.5 7.5 16.5 8 17.5 10L18 14C17.5 14.8 15 15 12 15C9 15 6.5 14.8 6 14L6.5 10Z"
      fill="#0c1022"
      opacity="0.45"
    />
    {/* Roof area */}
    <rect x="7" y="16" width="10" height="9.5" rx="2" fill="currentColor" />
    {/* Rear window */}
    <path
      d="M7 26.5C8 26 9.8 25.8 12 25.8C14.2 25.8 16 26 17 26.5L17.5 29C16.8 29.8 14.5 30 12 30C9.5 30 7.2 29.8 6.5 29L7 26.5Z"
      fill="#0c1022"
      opacity="0.45"
    />
    {/* Headlights */}
    <ellipse cx="6.5" cy="3.5" rx="1" ry="1.2" fill="#fff" opacity="0.9" />
    <ellipse cx="17.5" cy="3.5" rx="1" ry="1.2" fill="#fff" opacity="0.9" />
  </svg>
);

export const OutOfServiceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-300 opacity-70"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" />
    <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" stroke="currentColor" />
  </svg>
);

export const ParkingSpot: React.FC<ParkingSpotProps> = ({ spot, onClick }) => {
  const isFree = spot.status === 'FREE';
  const isOccupied = spot.status === 'OCCUPIED';
  const isOutOfService = spot.status === 'OUT_OF_SERVICE';

  // Styles exactly matching the screenshot
  const statusStyles = {
    FREE: 'bg-gradient-to-b from-[#22c55e] to-[#16a34a] border-emerald-400/60 shadow-[0_0_12px_rgba(34,197,94,0.35)] hover:shadow-[0_0_18px_rgba(34,197,94,0.6)]',
    OCCUPIED: 'bg-gradient-to-b from-[#ef4444] to-[#dc2626] border-red-400/60 shadow-[0_0_12px_rgba(239,68,68,0.35)] hover:shadow-[0_0_18px_rgba(239,68,68,0.6)]',
    OUT_OF_SERVICE: 'bg-[#475569]/80 border-slate-500/50 shadow-none hover:bg-[#526176]',
  }[spot.status];

  return (
    <button
      type="button"
      onClick={() => onClick(spot)}
      title={`Bay ${spot.id} - ${spot.status}`}
      className={`group relative flex flex-col items-center justify-between rounded-xl sm:rounded-2xl p-1.5 sm:p-2 md:p-2.5 transition-all duration-200 border cursor-pointer select-none h-24 sm:h-28 md:h-32 w-full focus:outline-none focus:ring-2 focus:ring-[#7655F5] hover:scale-105 ${statusStyles}`}
    >
      {/* Top icon representation (Car for Free/Occupied, Prohibited for Out of service) */}
      <div className="flex-1 flex items-center justify-center pt-0.5">
        {isOutOfService ? (
          <OutOfServiceIcon />
        ) : (
          <TopDownCarIcon />
        )}
      </div>

      {/* Spot Number at bottom */}
      <div className="mt-1 flex items-center justify-center">
        <span className="text-xs sm:text-sm md:text-base font-bold text-white drop-shadow-sm tracking-wide">
          {spot.id}
        </span>
      </div>
    </button>
  );
};
