'use client';

import React from 'react';
import { ParkingSpot as ParkingSpotType } from '@/types/parking';
import { ParkingSpot } from './ParkingSpot';
import { MapPin } from 'lucide-react';

interface ParkingMapProps {
  spots: ParkingSpotType[];
  onSelectSpot: (spot: ParkingSpotType) => void;
}

export const ParkingMap: React.FC<ParkingMapProps> = ({ spots, onSelectSpot }) => {
  const row1 = spots.slice(0, 10);
  const row2 = spots.slice(10, 20);

  return (
    <div className="rounded-2xl bg-[#13162d] p-5 sm:p-6 border border-[#1f2444] shadow-xl">
      {/* Header & Legend */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#8b5cf6]" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Parking Lot Overview
          </h2>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e]" />
            <span className="text-slate-300">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444]" />
            <span className="text-slate-300">Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#64748b]" />
            <span className="text-slate-300">Out of Service</span>
          </div>
        </div>
      </div>

      {/* Realistic Aerial Parking Lot Container */}
      <div className="relative rounded-2xl bg-[#101426] p-3 sm:p-5 md:p-6 border border-white/5 overflow-hidden">
        {/* Perimeter Hedgerow / Tree Decoration (Matching the aerial photo) */}
        <div className="pointer-events-none absolute inset-0 border-[10px] sm:border-[14px] border-[#132c1c]/90 rounded-2xl opacity-90 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#15803d_20%,transparent_20%)] [background-size:16px_16px] opacity-25" />
        </div>

        {/* Parking Lot Ground (Inner Asphalt) */}
        <div className="relative z-10 rounded-xl bg-[#191d2e] p-3 sm:p-4 border border-white/10 shadow-inner">
          {/* Top Row: Spots 1 to 10 */}
          <div className="relative pl-6 sm:pl-10">
            {/* White curb background */}
            <div className="grid grid-cols-10 gap-1 sm:gap-2 md:gap-2.5 relative">
              {row1.map((spot) => (
                <div key={spot.id} className="relative">
                  <ParkingSpot spot={spot} onClick={onSelectSpot} />
                </div>
              ))}
            </div>
          </div>

          {/* Central Driving Lane with Entrance Barrier on Left */}
          <div className="my-3 sm:my-4 md:my-5 relative flex items-center h-12 sm:h-14 md:h-16 bg-[#141724] rounded-lg px-2 sm:px-4 border-y border-white/10 shadow-inner">
            {/* Security Guard Booth & Barrier Arm on Left */}
            <div className="absolute left-1 sm:left-2 flex items-center gap-1 sm:gap-1.5 z-20">
              {/* Toll/Guard Booth */}
              <div className="h-7 w-5 sm:h-9 sm:w-6 bg-[#334155] rounded border border-slate-500 shadow flex flex-col justify-between p-0.5">
                <div className="h-1.5 w-full bg-cyan-400/80 rounded-xs" />
                <div className="h-1 w-full bg-slate-600 rounded-xs" />
              </div>
              {/* Striped Barrier Gate Arm */}
              <div className="relative flex items-center">
                <div className="h-5 w-1.5 bg-[#f59e0b] rounded-sm" />
                <div className="h-1.5 w-8 sm:w-14 rounded-r bg-[repeating-linear-gradient(45deg,#ea580c,#ea580c_4px,#ffffff_4px,#ffffff_8px)] shadow-md" />
              </div>
            </div>

            {/* Lane Marking: Left Arrow -->, Dashed Line, Right Arrow <-- */}
            <div className="flex-1 flex items-center justify-between pl-14 sm:pl-24 pr-4 text-white/70 select-none">
              {/* White Left Arrow --> */}
              <div className="flex items-center">
                <svg
                  className="w-8 sm:w-12 h-4 sm:h-5 text-white/80"
                  viewBox="0 0 40 14"
                  fill="none"
                >
                  <path
                    d="M0 7H34M34 7L27 1M34 7L27 13"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Dashed Center Road Line */}
              <div className="flex-1 mx-4 sm:mx-8 border-b-2 border-dashed border-white/20 h-0" />

              {/* White Right Arrow <-- */}
              <div className="flex items-center">
                <svg
                  className="w-8 sm:w-12 h-4 sm:h-5 text-white/80"
                  viewBox="0 0 40 14"
                  fill="none"
                >
                  <path
                    d="M40 7H6M6 7L13 1M6 7L13 13"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Row: Spots 11 to 20 */}
          <div className="relative pl-6 sm:pl-10">
            <div className="grid grid-cols-10 gap-1 sm:gap-2 md:gap-2.5 relative">
              {row2.map((spot) => (
                <div key={spot.id} className="relative">
                  <ParkingSpot spot={spot} onClick={onSelectSpot} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
