// src/hooks/useVehicleStore.ts
import { create } from 'zustand';
import type { Vehicle, VehicleTelemetry } from '../types';

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicleTelemetry: VehicleTelemetry | null;
  loadingVehicles: boolean;
  errorVehicles: string | null;
  loadingTelemetry: boolean;
  errorTelemetry: string | null;

  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicleTelemetry: (telemetry: VehicleTelemetry | null) => void;
  setLoadingVehicles: (loading: boolean) => void;
  setErrorVehicles: (error: string | null) => void;
  setLoadingTelemetry: (loading: boolean) => void;
  setErrorTelemetry: (error: string | null) => void;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  selectedVehicleTelemetry: null,
  loadingVehicles: false,
  errorVehicles: null,
  loadingTelemetry: false,
  errorTelemetry: null,

  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicleTelemetry: (telemetry) => set({ selectedVehicleTelemetry: telemetry }),
  setLoadingVehicles: (loading) => set({ loadingVehicles: loading }),
  setErrorVehicles: (error) => set({ errorVehicles: error }),
  setLoadingTelemetry: (loading) => set({ loadingTelemetry: loading }),
  setErrorTelemetry: (error) => set({ errorTelemetry: error }),
}));