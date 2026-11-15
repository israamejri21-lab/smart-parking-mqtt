'use client';

import React, { useState } from 'react';
import { ParkingProvider, useParking } from '@/hooks/useParking';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { TopStatsRow } from '@/components/dashboard/StatCard';
import { ParkingMap } from '@/components/dashboard/ParkingMap';
import { OccupancyChart } from '@/components/dashboard/OccupancyChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ParkingDetailsModal } from '@/components/dashboard/ParkingDetailsModal';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    spots,
    activities,
    statistics,
    occupancyHistory,
    selectedSpot,
    isSimulationActive,
    selectSpot,
    updateSpotStatus,
    toggleSimulation,
  } = useParking();

  const handleSelectSpotById = (spotId: number) => {
    const target = spots.find((s) => s.id === spotId);
    if (target) {
      selectSpot(target);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0d1b] text-white">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isMobileSidebarOpen}
        setIsOpenMobile={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-60 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          isSimulationActive={isSimulationActive}
          onToggleSimulation={toggleSimulation}
        />

        {/* Dashboard Content Container */}
        <main className="flex-1 px-4 sm:px-8 pb-8 pt-2 space-y-5 max-w-[1550px] w-full">
          {/* Top Row: 4 Metric Cards */}
          <section>
            <TopStatsRow
              total={statistics.total}
              available={statistics.available}
              occupied={statistics.occupied}
              occupancyRate={statistics.occupancyRate}
            />
          </section>

          {/* Main Visual Section: 2 Columns matching the photo layout */}
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Parking Lot Overview (approx 68% width) */}
            <div className="xl:col-span-8 flex flex-col">
              <ParkingMap spots={spots} onSelectSpot={selectSpot} />
            </div>

            {/* Right Column: Occupancy Trend + Recent Activity (approx 32% width) */}
            <div className="xl:col-span-4 flex flex-col justify-between gap-5">
              <OccupancyChart
                data={occupancyHistory}
                currentRate={statistics.occupancyRate}
              />

              <RecentActivity
                activities={activities}
                onSelectSpotById={handleSelectSpotById}
              />
            </div>
          </section>
        </main>
      </div>

      {/* Interactive Bay Details & Status Control Modal */}
      <ParkingDetailsModal
        spot={selectedSpot}
        onClose={() => selectSpot(null)}
        onUpdateStatus={updateSpotStatus}
      />
    </div>
  );
}

export default function Home() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#0b0d1b]" />}>
      <ParkingProvider>
        <DashboardContent />
      </ParkingProvider>
    </React.Suspense>
  );
}
