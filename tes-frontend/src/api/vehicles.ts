// src/api/vehicles.ts
import axios from 'axios';
import type { Vehicle, VehicleTelemetry } from '../types';

// Data mock untuk simulasi API
const mockVehicles: Vehicle[] = [
  { id: 1, name: "Toyota Avanza", status: "ACTIVE", speed: 60, updated_at: "2025-07-23T10:00:00Z" },
  { id: 2, name: "Honda Civic", status: "INACTIVE", speed: 0, updated_at: "2025-07-23T09:30:00Z" },
  { id: 3, name: "Ford Ranger", status: "ACTIVE", speed: 85, updated_at: "2025-07-23T10:05:00Z" },
  { id: 4, name: "Mercedes-Benz C-Class", status: "MAINTENANCE", speed: 0, updated_at: "2025-07-22T14:00:00Z" },
  { id: 5, name: "BMW X5", status: "ACTIVE", speed: 70, updated_at: "2025-07-23T10:10:00Z" },
];

const mockTelemetry: { [key: number]: VehicleTelemetry } = {
  1: { vehicleId: 1, odometer: 123456.78, fuel_level: 70.2, timestamp: "2025-07-23T10:00:00Z", latitude: -6.12, longitude: 106.85, speed: 60 },
  2: { vehicleId: 2, odometer: 234567.89, fuel_level: 30.5, timestamp: "2025-07-23T09:30:00Z", latitude: -6.20, longitude: 106.80, speed: 0 },
  3: { vehicleId: 3, odometer: 345678.90, fuel_level: 85.0, timestamp: "2025-07-23T10:05:00Z", latitude: -6.15, longitude: 106.90, speed: 85 },
  4: { vehicleId: 4, odometer: 456789.01, fuel_level: 5.0, timestamp: "2025-07-22T14:00:00Z", latitude: -6.25, longitude: 106.75, speed: 0 },
  5: { vehicleId: 5, odometer: 567890.12, fuel_level: 92.1, timestamp: "2025-07-23T10:10:00Z", latitude: -6.18, longitude: 106.88, speed: 70 },
};

// const API_BASE_URL = 'http://localhost:3000'; // Ini bisa dikomentari atau dihapus jika tidak digunakan

export const getVehicles = async (): Promise<Vehicle[]> => {
  // Simulasi panggilan API dengan penundaan
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVehicles);
    }, 500); // Penundaan 500ms
  });

  // Bagian axios ini HARUS TERKOMENTARI untuk saat ini:
  // try {
  //   const response = await axios.get<Vehicle[]>(`${API_BASE_URL}/vehicles`);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error fetching vehicles:", error);
  //   throw error;
  // }
};

export const getVehicleTelemetry = async (id: number): Promise<VehicleTelemetry> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const telemetry = mockTelemetry[id];
      if (telemetry) {
        resolve(telemetry);
      } else {
        reject(new Error(`Telemetry for vehicle ID ${id} not found.`));
      }
    }, 500); // Penundaan 500ms
  });

  // Bagian axios ini HARUS TERKOMENTARI untuk saat ini:
  // try {
  //   const response = await axios.get<VehicleTelemetry>(`${API_BASE_URL}/vehicles/${id}`);
  //   return response.data;
  // } catch (error) {
  //   console.error(`Error fetching telemetry for vehicle ${id}:`, error);
  //   throw error;
  // }
};