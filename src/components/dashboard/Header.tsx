'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Menu, Play, Pause } from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  isSimulationActive: boolean;
  onToggleSimulation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  isSimulationActive,
  onToggleSimulation,
}) => {
  const [timeString, setTimeString] = useState('18:24:37');
  const [dateString, setDateString] = useState('15 Nov 2026');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
      setDateString(
        now.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 sm:px-8 py-3 select-none">
      {/* Left: Mobile hamburger + "Live | 18:24:37 • 15 Nov 2026" */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#13162d] text-white lg:hidden border border-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
          {/* Green Live Indicator */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse" />
            <span className="font-semibold text-white">Live</span>
          </div>

          <span className="text-[#3b4266]">|</span>

          {/* Time & Date */}
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs sm:text-sm">
            <span>{timeString}</span>
            <span className="text-[#64748b]">•</span>
            <span>{dateString}</span>
          </div>
        </div>
      </div>

      {/* Right: Simulation toggle, Notification Bell, User Avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Discreet Simulation Toggle */}
        <button
          type="button"
          onClick={onToggleSimulation}
          title={isSimulationActive ? 'Pause Auto Simulation' : 'Resume Auto Simulation'}
          className={`hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border transition-all ${
            isSimulationActive
              ? 'bg-[#5037d8]/20 text-purple-300 border-[#5037d8]/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {isSimulationActive ? (
            <>
              <Pause className="h-3 w-3 text-purple-400" />
              <span>Sim Active</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 text-amber-400" />
              <span>Sim Paused</span>
            </>
          )}
        </button>

        {/* Bell Icon */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full ring-2 ring-purple-500/60 p-0.5 bg-gradient-to-tr from-purple-500 to-indigo-500 overflow-hidden shadow-lg">
            <div className="h-full w-full rounded-full bg-[#1e1b4b] flex items-center justify-center text-xs font-bold text-white">
              <span className="bg-gradient-to-tr from-pink-400 to-purple-300 bg-clip-text text-transparent">
                👩‍💻
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
