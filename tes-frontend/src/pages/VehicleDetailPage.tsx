// src/pages/VehicleDetailPage.tsx
import React, { useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicleStore } from '../hooks/useVehicleStore';
import { getVehicleTelemetry } from '../api/vehicles';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapComponent from '../components/MapComponent'; 
import SpeedDisplay from '../components/SpeedDisplay'; 
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

  const memoizedSetSelectedTelemetry = useCallback(setSelectedVehicleTelemetry, []);
  const memoizedSetLoadingTelemetry = useCallback(setLoadingTelemetry, []);
  const memoizedSetErrorTelemetry = useCallback(setErrorTelemetry, []);

  useEffect(() => {
    const fetchTelemetry = async () => {
      memoizedSetLoadingTelemetry(true);
      memoizedSetErrorTelemetry(null);
      try {
        const data: VehicleTelemetry = await getVehicleTelemetry(vehicleId);
        memoizedSetSelectedTelemetry(data);
      } catch (err: any) {
        memoizedSetErrorTelemetry(err.message || "Failed to fetch vehicle telemetry.");
      } finally {
        memoizedSetLoadingTelemetry(false);
      }
    };

    if (id && !isNaN(vehicleId)) {
      fetchTelemetry();
    } else if (id && isNaN(vehicleId)) {
      memoizedSetErrorTelemetry("Invalid Vehicle ID provided.");
    }
  }, [id, vehicleId, memoizedSetSelectedTelemetry, memoizedSetLoadingTelemetry, memoizedSetErrorTelemetry]); 
  
  if (loadingTelemetry) {
    return <LoadingSpinner />;
  }

  if (errorTelemetry) {
    return <div className="text-red-600 text-center mt-8 text-xl">Error: {errorTelemetry}</div>;
  }

  if (!selectedVehicleTelemetry) {
    return <div className="text-center mt-8 text-xl text-muted-foreground">No telemetry data found for this vehicle.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="mb-6 inline-block">
        <Button variant="outline" className="text-base px-4 py-2">Back to Vehicle List</Button>
      </Link>
      <h1 className="text-4xl font-extrabold mb-8 text-center text-primary-foreground">Vehicle Telemetry Detail (ID: {selectedVehicleTelemetry.vehicleId})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vehicle Details Card */}
        <Card className="flex flex-col shadow-lg border">
          <CardHeader className="bg-muted/20 p-6 border-b">
            <CardTitle className="text-2xl font-bold text-primary-foreground">Current Telemetry Data</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-6 text-lg">
            <p><span className="font-semibold">Odometer:</span> {selectedVehicleTelemetry.odometer.toFixed(2)} km</p>
            
            {/* Fuel Level - Kembali ke teks biasa */}
            <p><span className="font-semibold">Fuel Level:</span> {selectedVehicleTelemetry.fuel_level.toFixed(1)}%</p>

            <SpeedDisplay speed={selectedVehicleTelemetry.speed} /> 
            <p><span className="font-semibold">Location:</span> Latitude {selectedVehicleTelemetry.latitude.toFixed(4)}, Longitude {selectedVehicleTelemetry.longitude.toFixed(4)}</p>
            <p><span className="font-semibold">Timestamp:</span> <span className="text-muted-foreground text-sm">{new Date(selectedVehicleTelemetry.timestamp).toLocaleString()}</span></p>
          </CardContent>
        </Card>

        {/* Map Component */}
        <Card className="flex flex-col p-4 shadow-lg border">
          <CardHeader className="bg-muted/20 p-6 border-b -m-4 mb-4">
            <CardTitle className="text-2xl font-bold text-primary-foreground">Vehicle Location</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <MapComponent
              latitude={selectedVehicleTelemetry.latitude}
              longitude={selectedVehicleTelemetry.longitude}
              vehicleName={`Vehicle ID: ${selectedVehicleTelemetry.vehicleId}`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleDetailPage;