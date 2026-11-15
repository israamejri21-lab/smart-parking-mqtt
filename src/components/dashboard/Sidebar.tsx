'use client';

import React from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Bell,
  Settings,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const SmartParkLogo = () => (
  <svg
    viewBox="0 0 54 36"
    fill="none"
    className="w-14 h-9 text-[#7655F5] drop-shadow-[0_0_12px_rgba(118,85,245,0.75)]"
  >
    {/* Sleek futuristic sports car outline matching screenshot */}
    <path
      d="M4 22C5 17 11 15 17 14L27 6C31 3 38 3 43 8L49 15C52 17 53 19 52 23C51 26 47 27 43 27C41 27 40 26 38 24C36 22 31 22 29 24C28 26 27 27 24 27H18C16 27 15 26 13 24C11 22 6 22 4 24C3.5 23.5 3 22.8 4 22Z"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 14L28 7C32 4.5 38 4.5 42 9L47 15H19Z"
      stroke="currentColor"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <circle cx="11" cy="25" r="4" stroke="currentColor" strokeWidth="2.8" />
    <circle cx="38" cy="25" r="4" stroke="currentColor" strokeWidth="2.8" />
    <ellipse cx="50" cy="18" rx="2" ry="1.2" fill="#c4b5fd" />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'statistics', label: 'Statistics', icon: BarChart2 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col justify-between bg-[#0d0f22] border-r border-[#1a1f3c] transition-all duration-300 w-60 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="flex flex-col items-center justify-center pt-7 pb-6 px-4 text-center relative">
            <button
              type="button"
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden absolute right-3 top-4 text-[#94A3B8] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Glowing Logo */}
            <SmartParkLogo />

            <h1 className="mt-2 text-xl font-extrabold tracking-tight text-white">
              SmartPark
            </h1>
            <p className="text-[11px] font-medium text-[#94A3B8]">
              Smart Parking Management
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="px-4 space-y-2 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center w-full gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#5037d8] text-white shadow-lg shadow-[#5037d8]/40'
                      : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>

                  {/* Red circular notification badge */}
                  {item.badge && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[11px] font-bold text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Graphic: Futuristic City, Car & Slogan */}
        <div className="p-4 select-none">
          <div className="relative rounded-2xl bg-gradient-to-t from-[#141233] to-transparent p-3 pt-6 border-t border-purple-500/20 text-center flex flex-col items-center overflow-hidden">
            {/* Ambient neon purple glow */}
            <div className="absolute -bottom-6 h-24 w-32 rounded-full bg-[#7655F5]/30 blur-2xl pointer-events-none" />

            {/* City Silhouette SVG with "P" sign and Car */}
            <svg
              className="w-full h-18 text-purple-400"
              viewBox="0 0 160 70"
              fill="none"
            >
              {/* Skyline Skyscrapers */}
              <rect x="10" y="25" width="14" height="45" fill="#1b1c3b" />
              <rect x="26" y="10" width="18" height="60" fill="#25244e" />
              <rect x="46" y="28" width="12" height="42" fill="#1b1c3b" />
              <rect x="100" y="20" width="16" height="50" fill="#202146" />
              <rect x="118" y="8" width="22" height="62" fill="#282654" />
              <rect x="142" y="30" width="14" height="40" fill="#1b1c3b" />

              {/* Windows dots */}
              <circle cx="32" cy="18" r="1" fill="#7655F5" opacity="0.8" />
              <circle cx="38" cy="18" r="1" fill="#7655F5" opacity="0.8" />
              <circle cx="32" cy="24" r="1" fill="#7655F5" opacity="0.8" />
              <circle cx="38" cy="24" r="1" fill="#7655F5" opacity="0.8" />
              <circle cx="125" cy="16" r="1" fill="#a855f7" opacity="0.8" />
              <circle cx="132" cy="16" r="1" fill="#a855f7" opacity="0.8" />

              {/* Glowing Purple "P" Parking Billboard */}
              <rect x="74" y="22" width="18" height="20" rx="3" fill="#5037d8" stroke="#9333ea" strokeWidth="1.5" />
              <text x="83" y="37" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
              <line x1="83" y1="42" x2="83" y2="65" stroke="#4c1d95" strokeWidth="2" />

              {/* Ground road line */}
              <line x1="0" y1="65" x2="160" y2="65" stroke="#3b3b64" strokeWidth="1.5" />

              {/* Stylized Modern Car on the road */}
              <path
                d="M12 60C14 56 18 54 24 53L32 48C36 46 42 46 47 50L53 54C56 56 57 58 55 61H12Z"
                fill="#818cf8"
                opacity="0.9"
              />
              <circle cx="20" cy="62" r="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
              <circle cx="45" cy="62" r="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
              {/* Headlights beam */}
              <polygon points="54,58 75,55 75,64 54,61" fill="#c084fc" opacity="0.25" />
            </svg>

            {/* Slogan */}
            <p className="mt-1 text-xs text-slate-300 font-sans italic tracking-wide">
              Find a spot.<br />
              Save time. <span className="text-[#a855f7] not-italic">💜</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
