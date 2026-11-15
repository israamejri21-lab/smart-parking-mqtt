'use client';

import React from 'react';
import { ParkingSpot, SpotStatus } from '@/types/parking';
import {
  X,
  Radio,
  Battery,
  Wifi,
  Gauge,
  Clock,
  Car,
  CheckCircle2,
  AlertTriangle,
  Send,
  Layers,
  MapPin,
} from 'lucide-react';

interface ParkingDetailsModalProps {
  spot: ParkingSpot | null;
  onClose: () => void;
  onUpdateStatus: (spotId: number, status: SpotStatus) => void;
}

export const ParkingDetailsModal: React.FC<ParkingDetailsModalProps> = ({
  spot,
  onClose,
  onUpdateStatus,
}) => {
  if (!spot) return null;

  const isFree = spot.status === 'FREE';
  const isOccupied = spot.status === 'OCCUPIED';
  const isOutOfService = spot.status === 'OUT_OF_SERVICE';

  const statusBadge = {
    FREE: {
      text: 'Available',
      badgeClass: 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/40',
      icon: CheckCircle2,
    },
    OCCUPIED: {
      text: 'Occupied',
      badgeClass: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/40',
      icon: Car,
    },
    OUT_OF_SERVICE: {
      text: 'Out of Service',
      badgeClass: 'bg-[#64748B]/20 text-[#94A3B8] border-[#64748B]/40',
      icon: AlertTriangle,
    },
  }[spot.status];

  const StatusIcon = statusBadge.icon;

  // Simulated MQTT payload string preview
  const mqttPreview = JSON.stringify(
    {
      spotId: spot.id,
      label: spot.label,
      status: spot.status,
      timestamp: spot.lastUpdated,
      distanceCm: spot.distanceReading || 0,
      sensorId: spot.sensorId,
    },
    null,
    2
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#171D38] border border-white/10 shadow-2xl p-6 overflow-hidden text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#7655F5]/20 blur-3xl" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10152B] border border-white/10 font-bold text-lg text-white">
              {spot.id < 10 ? `0${spot.id}` : spot.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-white">Space #{spot.id}</h3>
                <span className="text-sm font-semibold text-[#7655F5]">{spot.label}</span>
              </div>
              <p className="text-xs text-[#94A3B8] flex items-center gap-2 mt-0.5">
                <MapPin className="h-3 w-3" />
                <span>{spot.floor} • {spot.zone}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#94A3B8] hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Live Status Banner */}
        <div className="my-4 flex items-center justify-between rounded-xl bg-[#10152B] p-3.5 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${statusBadge.badgeClass}`}>
              <StatusIcon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block">Current Status</span>
              <span className="text-base font-bold text-white">{statusBadge.text}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block flex items-center justify-end gap-1">
              <Clock className="h-3 w-3" /> Updated
            </span>
            <span className="text-xs font-mono text-slate-300">{spot.lastUpdated}</span>
          </div>
        </div>

        {/* Vehicle plate details if occupied */}
        {isOccupied && spot.vehiclePlate && (
          <div className="mb-4 flex items-center justify-between rounded-xl bg-red-950/20 border border-red-500/20 p-3">
            <div className="flex items-center gap-2 text-xs text-red-300">
              <Car className="h-4 w-4" />
              <span>Detected Vehicle License Plate:</span>
            </div>
            <span className="rounded bg-black/60 px-2.5 py-1 font-mono text-xs font-bold text-white border border-white/10">
              {spot.vehiclePlate}
            </span>
          </div>
        )}

        {/* Sensor Telemetry Grid */}
        <div className="mb-5 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-[#10152B]/70 p-3 border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Radio className="h-3.5 w-3.5 text-[#7655F5]" />
              <span>Sensor ID</span>
            </div>
            <p className="mt-1 font-mono text-sm font-semibold text-white">{spot.sensorId}</p>
            <span className="text-[10px] text-slate-400">{spot.sensorType}</span>
          </div>

          <div className="rounded-xl bg-[#10152B]/70 p-3 border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Gauge className="h-3.5 w-3.5 text-emerald-400" />
              <span>Distance Reading</span>
            </div>
            <p className="mt-1 font-mono text-sm font-semibold text-white">
              {spot.distanceReading ? `${spot.distanceReading} cm` : 'Offline / Null'}
            </p>
            <span className="text-[10px] text-slate-400">
              {isOccupied ? 'Target Object Detected' : isFree ? 'Clear Beam Path' : 'No Signal'}
            </span>
          </div>

          <div className="rounded-xl bg-[#10152B]/70 p-3 border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Wifi className="h-3.5 w-3.5 text-blue-400" />
              <span>Signal (RSSI)</span>
            </div>
            <p className="mt-1 font-mono text-sm font-semibold text-white">{spot.signalStrength}</p>
            <span className="text-[10px] text-slate-400">Protocol: MQTT / 802.11 b/g/n</span>
          </div>

          <div className="rounded-xl bg-[#10152B]/70 p-3 border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Battery className="h-3.5 w-3.5 text-amber-400" />
              <span>Battery Level</span>
            </div>
            <p className="mt-1 font-mono text-sm font-semibold text-white">{spot.batteryLevel}%</p>
            <span className="text-[10px] text-slate-400">Hardwired Backup Ready</span>
          </div>
        </div>

        {/* Administrative State Control (Requirement 5) */}
        <div className="rounded-xl bg-[#10152B] p-4 border border-white/5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Send className="h-3.5 w-3.5" />
              Administrative Simulation Controls
            </span>
            <span className="text-[10px] text-[#94A3B8]">Override Sensor State</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onUpdateStatus(spot.id, 'FREE')}
              disabled={isFree}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold transition-all border ${
                isFree
                  ? 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E] opacity-50 cursor-not-allowed'
                  : 'bg-[#22C55E]/20 hover:bg-[#22C55E] border-[#22C55E]/40 text-[#4ade80] hover:text-white'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Set Free</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateStatus(spot.id, 'OCCUPIED')}
              disabled={isOccupied}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold transition-all border ${
                isOccupied
                  ? 'bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444] opacity-50 cursor-not-allowed'
                  : 'bg-[#EF4444]/20 hover:bg-[#EF4444] border-[#EF4444]/40 text-[#f87171] hover:text-white'
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              <span>Set Occupied</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateStatus(spot.id, 'OUT_OF_SERVICE')}
              disabled={isOutOfService}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold transition-all border ${
                isOutOfService
                  ? 'bg-[#64748B]/10 border-[#64748B]/20 text-slate-400 opacity-50 cursor-not-allowed'
                  : 'bg-[#64748B]/20 hover:bg-[#64748B] border-[#64748B]/40 text-slate-300 hover:text-white'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Set Offline</span>
            </button>
          </div>
        </div>

        {/* MQTT Integration Telemetry Topic preview */}
        <div className="mt-3 text-[11px] text-[#94A3B8] font-mono bg-black/40 p-2.5 rounded-lg border border-white/5">
          <div className="flex items-center justify-between text-[10px] text-purple-300/80 mb-1">
            <span>MQTT Inbound Topic:</span>
            <span>parking/spot/{spot.id}/status</span>
          </div>
          <p className="truncate text-slate-400">
            Payload: {`{"spotId": ${spot.id}, "status": "${spot.status}", "distance": ${spot.distanceReading || 0}}`}
          </p>
        </div>
      </div>
    </div>
  );
};
