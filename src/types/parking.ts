export type SpotStatus = 'FREE' | 'OCCUPIED' | 'OUT_OF_SERVICE';

export interface ParkingSpot {
  id: number;
  label: string;
  status: SpotStatus;
  lastUpdated: string;
  zone: string;
  floor: string;
  sensorId: string;
  sensorType: string;
  batteryLevel: number;
  signalStrength: string;
  distanceReading?: number; // Distance in cm
  vehiclePlate?: string;
}

export interface ParkingActivity {
  id: string;
  spotId: number;
  status: SpotStatus;
  timestamp: string;
  description: string;
}

export interface ParkingStatistics {
  total: number;
  available: number;
  occupied: number;
  outOfService: number;
  occupancyRate: number; // percentage (0 - 100)
}

export interface OccupancyHistoryPoint {
  time: string;
  rate: number;
  occupied: number;
}

/**
 * Interface prepared for future MQTT broker payload
 * Topic pattern: parking/spot/{spotId}/status
 */
export interface MqttStatusMessage {
  spotId: number;
  status: SpotStatus;
  timestamp: string;
  sensorId?: string;
  distanceReading?: number;
}
