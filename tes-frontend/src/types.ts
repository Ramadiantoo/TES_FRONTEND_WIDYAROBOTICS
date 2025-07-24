// src/types.ts

export interface Vehicle {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'; // Contoh status
  speed: number;
  updated_at: string; // ISO 8601 string
}

export interface VehicleTelemetry {
  vehicleId: number;
  odometer: number;
  fuel_level: number;
  timestamp: string; // ISO 8601 string
  latitude: number;
  longitude: number;
  speed: number;
}