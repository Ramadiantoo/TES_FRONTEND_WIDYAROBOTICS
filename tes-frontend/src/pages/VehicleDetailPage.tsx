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
        memoizedSetErrorTelemetry(err.message || "Gagal mengambil telemetri kendaraan.");
      } finally {
        memoizedSetLoadingTelemetry(false);
      }
    };
    if (id && !isNaN(vehicleId)) {
      fetchTelemetry();
    } else if (id && isNaN(vehicleId)) {
      memoizedSetErrorTelemetry("ID Kendaraan tidak valid diberikan.");
    }
  }, [id, vehicleId, memoizedSetSelectedTelemetry, memoizedSetLoadingTelemetry, memoizedSetErrorTelemetry]);

  if (loadingTelemetry) {
    return <LoadingSpinner />;
  }
  if (errorTelemetry) {
    return <div className="text-red-600 text-center mt-8 text-xl">Error: {errorTelemetry}</div>;
  }
  if (!selectedVehicleTelemetry) {
    return <div className="text-center mt-8 text-xl text-muted-foreground">Tidak ada data telemetri yang ditemukan untuk kendaraan ini.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="mb-6 inline-block">
        <Button variant="outline" className="text-base px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm">
          Kembali ke Daftar Kendaraan
        </Button>
      </Link>
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Detail Telemetri Kendaraan (ID: {selectedVehicleTelemetry.vehicleId})</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kartu Detail Kendaraan */}
        <Card className="flex flex-col shadow-lg border bg-white rounded-lg">
          <CardHeader className="bg-gray-50 p-6 border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-800">Data Telemetri Saat Ini</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-6 text-lg text-gray-700">
            <p><span className="font-semibold">Odometer:</span> {selectedVehicleTelemetry.odometer.toFixed(2)} km</p>
            <p><span className="font-semibold">Level Bahan Bakar:</span> {selectedVehicleTelemetry.fuel_level.toFixed(1)}%</p>
            <SpeedDisplay speed={selectedVehicleTelemetry.speed} />
            <p><span className="font-semibold">Lokasi:</span> Lintang {selectedVehicleTelemetry.latitude.toFixed(4)}, Bujur {selectedVehicleTelemetry.longitude.toFixed(4)}</p>
            <p><span className="font-semibold">Timestamp:</span> <span className="text-gray-500 text-sm">{new Date(selectedVehicleTelemetry.timestamp).toLocaleString()}</span></p>
          </CardContent>
        </Card>
        {/* Komponen Peta */}
        <Card className="flex flex-col p-4 shadow-lg border bg-white rounded-lg">
          <CardHeader className="bg-gray-50 p-6 border-b -m-4 mb-4 border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-800">Lokasi Kendaraan</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <MapComponent
              latitude={selectedVehicleTelemetry.latitude}
              longitude={selectedVehicleTelemetry.longitude}
              vehicleName={`ID Kendaraan: ${selectedVehicleTelemetry.vehicleId}`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleDetailPage;