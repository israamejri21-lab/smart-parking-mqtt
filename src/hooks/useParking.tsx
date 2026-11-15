'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  ParkingSpot,
  ParkingActivity,
  ParkingStatistics,
  SpotStatus,
  OccupancyHistoryPoint,
  MqttStatusMessage,
} from '@/types/parking';
import {
  INITIAL_PARKING_SPOTS,
  INITIAL_ACTIVITIES,
  INITIAL_24H_OCCUPANCY,
} from '@/data/parkingData';

interface ParkingContextType {
  spots: ParkingSpot[];
  activities: ParkingActivity[];
  statistics: ParkingStatistics;
  occupancyHistory: OccupancyHistoryPoint[];
  selectedSpot: ParkingSpot | null;
  isSimulationActive: boolean;
  simulationIntervalSec: number;
  lastSimulatedAt: Date | null;
  selectSpot: (spot: ParkingSpot | null) => void;
  updateSpotStatus: (spotId: number, newStatus: SpotStatus) => void;
  toggleSimulation: (override?: boolean) => void;
  triggerManualSimulation: () => void;
  handleMqttMessage: (payload: MqttStatusMessage) => void;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export function ParkingProvider({ children }: { children: React.ReactNode }) {
  const [spots, setSpots] = useState<ParkingSpot[]>(INITIAL_PARKING_SPOTS);
  const [activities, setActivities] = useState<ParkingActivity[]>(INITIAL_ACTIVITIES);
  const [occupancyHistory, setOccupancyHistory] = useState<OccupancyHistoryPoint[]>(INITIAL_24H_OCCUPANCY);
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(true);
  const [lastSimulatedAt, setLastSimulatedAt] = useState<Date | null>(null);
  const simulationIntervalSec = 12; // Updates every 12 seconds (within 10-15s range)

  useEffect(() => {
    setLastSimulatedAt(new Date());
  }, []);

  // Derived selected spot to keep inspection modal updated when status changes
  const selectedSpot = useMemo(() => {
    if (selectedSpotId === null) return null;
    return spots.find((s) => s.id === selectedSpotId) || null;
  }, [selectedSpotId, spots]);

  // Dynamically calculate parking statistics from spots array
  const statistics = useMemo<ParkingStatistics>(() => {
    const total = spots.length;
    const available = spots.filter((s) => s.status === 'FREE').length;
    const occupied = spots.filter((s) => s.status === 'OCCUPIED').length;
    const outOfService = spots.filter((s) => s.status === 'OUT_OF_SERVICE').length;

    // Standard Occupancy Rate = (Occupied / Total) * 100
    const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

    return {
      total,
      available,
      occupied,
      outOfService,
      occupancyRate,
    };
  }, [spots]);

  // Core status updater used by manual UI actions, simulation, and future MQTT
  const updateSpotStatus = useCallback((spotId: number, newStatus: SpotStatus) => {
    setSpots((prevSpots) => {
      const targetSpot = prevSpots.find((s) => s.id === spotId);
      if (!targetSpot || targetSpot.status === newStatus) {
        return prevSpots;
      }

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // Generate activity description
      let description = '';
      if (newStatus === 'FREE') {
        description = `Space #${spotId} is now available`;
      } else if (newStatus === 'OCCUPIED') {
        description = `Space #${spotId} is now occupied`;
      } else {
        description = `Space #${spotId} is out of service`;
      }

      // Add event to recent activities (max 10)
      const newActivity: ParkingActivity = {
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        spotId,
        status: newStatus,
        timestamp: timeString,
        description,
      };

      setActivities((prevActs) => [newActivity, ...prevActs.slice(0, 9)]);

      // Update spot object
      return prevSpots.map((spot) => {
        if (spot.id !== spotId) return spot;

        return {
          ...spot,
          status: newStatus,
          lastUpdated: 'Just now',
          distanceReading:
            newStatus === 'OCCUPIED'
              ? Math.floor(Math.random() * 25) + 25 // 25-50cm
              : newStatus === 'FREE'
              ? Math.floor(Math.random() * 20) + 240 // 240-260cm
              : 0,
          vehiclePlate:
            newStatus === 'OCCUPIED'
              ? spot.vehiclePlate || `${Math.floor(Math.random() * 800) + 100}-TUN-${Math.floor(Math.random() * 800) + 100}`
              : undefined,
        };
      });
    });
  }, []);

  // Future MQTT payload handler
  const handleMqttMessage = useCallback(
    (payload: MqttStatusMessage) => {
      console.log('[MQTT Inbound Simulation] Received topic parking/spot/' + payload.spotId + '/status:', payload);
      updateSpotStatus(payload.spotId, payload.status);
    },
    [updateSpotStatus]
  );

  // Random simulation step
  const triggerManualSimulation = useCallback(() => {
    setSpots((prevSpots) => {
      if (prevSpots.length === 0) return prevSpots;

      // Pick a random spot
      const randomIndex = Math.floor(Math.random() * prevSpots.length);
      const spot = prevSpots[randomIndex];

      let nextStatus: SpotStatus;
      if (spot.status === 'FREE') {
        // High probability of becoming occupied, low probability of maintenance
        nextStatus = Math.random() < 0.85 ? 'OCCUPIED' : 'OUT_OF_SERVICE';
      } else if (spot.status === 'OCCUPIED') {
        // Mostly becomes free
        nextStatus = Math.random() < 0.9 ? 'FREE' : 'OUT_OF_SERVICE';
      } else {
        // If out of service, restore to free
        nextStatus = 'FREE';
      }

      setLastSimulatedAt(new Date());
      updateSpotStatus(spot.id, nextStatus);
      return prevSpots;
    });
  }, [updateSpotStatus]);

  // Simulation timer with clean interval disposal
  useEffect(() => {
    if (!isSimulationActive) return;

    const intervalId = setInterval(() => {
      triggerManualSimulation();
    }, simulationIntervalSec * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isSimulationActive, simulationIntervalSec, triggerManualSimulation]);

  // Toggle simulation
  const toggleSimulation = useCallback((override?: boolean) => {
    setIsSimulationActive((prev) => (override !== undefined ? override : !prev));
  }, []);

  const selectSpot = useCallback((spot: ParkingSpot | null) => {
    setSelectedSpotId(spot ? spot.id : null);
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        spots,
        activities,
        statistics,
        occupancyHistory,
        selectedSpot,
        isSimulationActive,
        simulationIntervalSec,
        lastSimulatedAt,
        selectSpot,
        updateSpotStatus,
        toggleSimulation,
        triggerManualSimulation,
        handleMqttMessage,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
}

export function useParking() {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParking must be used within a ParkingProvider');
  }
  return context;
}
