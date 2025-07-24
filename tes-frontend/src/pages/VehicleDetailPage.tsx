// src/pages/VehicleDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicleStore } from '../hooks/useVehicleStore';
import { getVehicleTelemetry } from '../api/vehicles';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from "@/components/ui/button"; // Impor Button dari ShadCN UI
import type { VehicleTelemetry } from '../types';

const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const vehicleId = Number(id);

  const {
    selectedVehicleTelemetry,
    loadingTelemetry,
    errorTelemetry,
    setSelectedVehicleTelemetry,
    setLoadingTelemetry,
    setErrorTelemetry,
  } = useVehicleStore();

  useEffect(() => {
    const fetchTelemetry = async () => {
      setLoadingTelemetry(true);
      setErrorTelemetry(null);
      try {
        const data: VehicleTelemetry = await getVehicleTelemetry(vehicleId);
        setSelectedVehicleTelemetry(data);
      } catch (err: any) {
        setErrorTelemetry(err.message || "Failed to fetch vehicle telemetry.");
      } finally {
        setLoadingTelemetry(false);
      }
    };

    if (id && !isNaN(vehicleId)) { // Pastikan ID valid
      fetchTelemetry();
    } else if (id && isNaN(vehicleId)) {
        setErrorTelemetry("Invalid Vehicle ID provided.");
    }
  }, [id, vehicleId, setSelectedVehicleTelemetry, setLoadingTelemetry, setErrorTelemetry]);

  if (loadingTelemetry) {
    return <LoadingSpinner />;
  }

  if (errorTelemetry) {
    return <div className="text-red-600 text-center mt-8">Error: {errorTelemetry}</div>;
  }

  if (!selectedVehicleTelemetry) {
    return <div className="text-center mt-8">No telemetry data found for this vehicle.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="mb-4 inline-block">
        <Button variant="outline">Back to Vehicle List</Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Vehicle Telemetry Detail (ID: {selectedVehicleTelemetry.vehicleId})</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <p className="mb-2"><span className="font-semibold">Odometer:</span> {selectedVehicleTelemetry.odometer.toFixed(2)} km</p>
        <p className="mb-2"><span className="font-semibold">Fuel Level:</span> {selectedVehicleTelemetry.fuel_level.toFixed(1)}%</p>
        <p className="mb-2"><span className="font-semibold">Speed:</span> {selectedVehicleTelemetry.speed} km/h</p>
        <p className="mb-2"><span className="font-semibold">Location:</span> Latitude {selectedVehicleTelemetry.latitude}, Longitude {selectedVehicleTelemetry.longitude}</p>
        <p className="mb-2"><span className="font-semibold">Timestamp:</span> {new Date(selectedVehicleTelemetry.timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default VehicleDetailPage;