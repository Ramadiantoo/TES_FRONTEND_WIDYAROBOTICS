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
import { IoArrowBackOutline } from 'react-icons/io5';

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
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Link to="/" className="mb-6 inline-flex items-center">
        {/* PERUBAHAN DI SINI: Warna tombol dan efek hover */}
        <Button variant="outline" className="text-base px-4 py-2 bg-blue-900 text-white hover:bg-blue-800 border-transparent rounded-md shadow-sm">
          <IoArrowBackOutline className="mr-2 h-4 w-4" />
          Kembali ke Daftar Kendaraan
        </Button>
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800 pb-4 border-b border-gray-200">
        Detail Telemetri Kendaraan (ID: {selectedVehicleTelemetry.vehicleId})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col p-4 shadow-lg border bg-white rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 p-6 border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-800">Data Telemetri Saat Ini</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-5 p-6 text-lg text-gray-700">
            <p><span className="font-semibold text-gray-800">Odometer:</span> <span className="text-gray-900">{selectedVehicleTelemetry.odometer.toFixed(2)}</span> km</p>
            
            <div>
              <span className="font-semibold text-gray-800">Level Bahan Bakar:</span>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                <div
                  className="h-4 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${selectedVehicleTelemetry.fuel_level}%`,
                    backgroundColor: selectedVehicleTelemetry.fuel_level > 20 ? '#4CAF50' : '#F44336'
                  }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{selectedVehicleTelemetry.fuel_level.toFixed(1)}%</span>
            </div>

            <SpeedDisplay speed={selectedVehicleTelemetry.speed} />
            <p><span className="font-semibold text-gray-800">Lokasi:</span> <span className="text-gray-900">Lintang {selectedVehicleTelemetry.latitude.toFixed(4)}, Bujur {selectedVehicleTelemetry.longitude.toFixed(4)}</span></p>
            
            <p>
              <span className="font-semibold text-gray-800">Timestamp:</span>{' '}
              <span className="text-gray-500 text-sm">
                {new Date(selectedVehicleTelemetry.timestamp).toLocaleString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col p-4 shadow-lg border bg-white rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 p-6 border-b border-gray-200">
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