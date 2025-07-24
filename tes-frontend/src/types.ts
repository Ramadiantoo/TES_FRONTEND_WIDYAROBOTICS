// src/types.ts
export interface Vehicle {
  id: number;
  name: string;
  status: string;
  speed: number;
  updated_at: string;
}

export interface VehicleTelemetry {
  vehicleId: number;
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}