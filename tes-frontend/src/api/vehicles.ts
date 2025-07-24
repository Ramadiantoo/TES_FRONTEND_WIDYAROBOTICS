// src/api/vehicles.ts
import type { Vehicle, VehicleTelemetry } from '../types';

// Mock data for demonstration
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    status: "ACTIVE",
    speed: 60,
    updated_at: "2025-07-23T10:00:00Z"
  },
  {
    id: 2,
    name: "Honda CRV",
    status: "INACTIVE",
    speed: 0,
    updated_at: "2025-07-23T09:30:00Z"
  },
  {
    id: 3,
    name: "Mitsubishi Pajero Sport",
    status: "ACTIVE",
    speed: 85,
    updated_at: "2025-07-23T09:45:00Z"
  },
  {
    id: 4,
    name: "Suzuki Ertiga",
    status: "MAINTENANCE",
    speed: 0,
    updated_at: "2025-07-22T18:00:00Z"
  }
];

const mockTelemetry: Record<number, VehicleTelemetry> = {
  1: {
    vehicleId: 1,
    odometer: 123456.78,
    fuel_level: 70.2,
    timestamp: "2025-07-23T10:00:00Z",
    latitude: -6.12,
    longitude: 106.85,
    speed: 60
  },
  2: {
    vehicleId: 2,
    odometer: 98765.43,
    fuel_level: 30.5,
    timestamp: "2025-07-23T09:30:00Z",
    latitude: -6.20,
    longitude: 106.80,
    speed: 0
  },
  3: {
    vehicleId: 3,
    odometer: 23456.78,
    fuel_level: 85.0,
    timestamp: "2025-07-23T09:45:00Z",
    latitude: -6.30,
    longitude: 106.90,
    speed: 85
  },
  4: {
    vehicleId: 4,
    odometer: 54321.00,
    fuel_level: 10.0,
    timestamp: "2025-07-22T18:00:00Z",
    latitude: -6.15,
    longitude: 106.75,
    speed: 0
  }
};

export const getVehicles = async (): Promise<Vehicle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVehicles);
    }, 500); // Simulate network delay
  });
};

export const getVehicleTelemetry = async (id: number): Promise<VehicleTelemetry> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const telemetry = mockTelemetry[id];
      if (telemetry) {
        resolve(telemetry);
      } else {
        reject(new Error("Telemetry data not found for this vehicle."));
      }
    }, 700); // Simulate network delay
  });
};