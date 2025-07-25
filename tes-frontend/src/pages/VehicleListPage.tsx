// src/pages/VehicleListPage.tsx
import React, { useEffect, useMemo } from 'react';
import { useVehicleStore } from '../hooks/useVehicleStore';
import { getVehicles } from '../api/vehicles';
import VehicleCard from '../components/VehicleCard'; // Tetap gunakan VehicleCard
import LoadingSpinner from '../components/LoadingSpinner';
import MapComponent from '../components/MapComponent';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Vehicle } from '../types';

const VehicleListPage: React.FC = () => {
  const {
    vehicles,
    loadingVehicles,
    errorVehicles,
    setVehicles,
    setLoadingVehicles,
    setErrorVehicles,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
  } = useVehicleStore();

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoadingVehicles(true);
      setErrorVehicles(null);
      try {
        const data: Vehicle[] = await getVehicles();
        setVehicles(data);
      } catch (err: any) {
        setErrorVehicles(err.message || "Gagal mengambil data kendaraan.");
      } finally {
        setLoadingVehicles(false);
      }
    };
    fetchVehicles();
  }, [setVehicles, setLoadingVehicles, setErrorVehicles]);

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;
    // Terapkan filter pencarian
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.id.toString().includes(searchTerm)
      );
    }
    // Terapkan filter status
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(vehicle => vehicle.status === filterStatus);
    }
    return filtered;
  }, [vehicles, searchTerm, filterStatus]);

  const onlineVehicles = vehicles.filter(v => v.status === 'ACTIVE').length;
  const disconnectedVehicles = vehicles.filter(v => v.status === 'INACTIVE').length;
  const offlineVehicles = vehicles.filter(v => v.status === 'MAINTENANCE').length; // Mengasumsikan MAINTENANCE dipetakan ke offline

  // Tentukan pusat peta default, mungkin kendaraan aktif pertama atau area umum
  const defaultMapCenter = useMemo(() => {
    const activeVehicle = vehicles.find(v => v.status === 'ACTIVE');
    // Menggunakan lokasi default jika tidak ada kendaraan aktif atau tidak ada telemetri yang tersedia
    return activeVehicle ? { latitude: -6.12, longitude: 106.85, vehicleName: activeVehicle.name } : { latitude: -6.2088, longitude: 106.8456, vehicleName: "Bekasi, Indonesia" };
  }, [vehicles]);


  if (loadingVehicles) {
    return <LoadingSpinner />;
  }

  if (errorVehicles) {
    return <div className="text-red-600 text-center mt-8 text-xl">Error: {errorVehicles}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Kartu Gambaran Umum */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
        {/* PERUBAHAN DI SINI: flex flex-col items-center justify-center pada Card */}
        <Card className="flex flex-col items-center justify-center p-4 shadow-md bg-white rounded-lg">
          {/* Hapus mr-4 dari div ikon karena sekarang ditumpuk */}
          <div className="bg-green-100 rounded-full p-3"> 
            <img src="https://img.icons8.com/ios-filled/50/22C55E/car--v1.png" alt="Online" className="h-8 w-8"/>
          </div>
          {/* flex-grow tidak lagi diperlukan di sini karena konten Card sudah berpusat */}
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Kendaraan Online</p>
            <p className="text-2xl font-bold text-green-600">{onlineVehicles}</p>
          </div>
        </Card>

        {/* PERUBAHAN DI SINI: flex flex-col items-center justify-center pada Card */}
        <Card className="flex flex-col items-center justify-center p-4 shadow-md bg-white rounded-lg">
          {/* Hapus mr-4 dari div ikon */}
          <div className="bg-red-100 rounded-full p-3"> {/* Tambah mb-2 */}
            <img src="https://img.icons8.com/ios-filled/50/EF4444/car--v1.png" alt="Offline" className="h-8 w-8" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Kendaraan Offine</p>
            <p className="text-2xl font-bold text-red-600">{disconnectedVehicles}</p>
          </div>
        </Card>

        {/* PERUBAHAN DI SINI: flex flex-col items-center justify-center pada Card */}
        <Card className="flex flex-col items-center justify-center p-4 shadow-md bg-white rounded-lg">
          {/* Hapus mr-4 dari div ikon */}
          <div className="bg-yellow-100 rounded-full p-3 "> {/* Tambah mb-2 */}
            <img src="https://img.icons8.com/ios-filled/50/EAB308/car--v1.png" alt="Maintenance" className="h-8 w-8" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-yellow-500 text-sm">Kendaraan Maintenance</p>
            <p className="text-2xl font-bold text-yellow-600">{offlineVehicles}</p>
          </div>
        </Card>
      </div>

      {/* Gambaran Umum Peta */}
      <Card className="shadow-md">
        <CardHeader className="p-4 border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-800">Map Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <MapComponent
            latitude={defaultMapCenter.latitude}
            longitude={defaultMapCenter.longitude}
            vehicleName={defaultMapCenter.vehicleName}
          />
        </CardContent>
      </Card>

      {/* Bagian Daftar Titik Poin */}
      <Card className="shadow-md">
        <CardHeader className="p-4 border-b border-gray-200 flex flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800">Vehicle List</CardTitle>
          {/* Pencarian dan Filter dalam kartu daftar */}
          <div className="flex gap-4">
            <div className="relative">
              <Input
                placeholder="Cari berdasarkan nama atau ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pr-10"
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  &times;
                </button>
              )}
          </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter berdasarkan Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Status</SelectItem>
                <SelectItem value="ACTIVE">Aktif</SelectItem>
                <SelectItem value="INACTIVE">Tidak Aktif</SelectItem>
                <SelectItem value="MAINTENANCE">Pemeliharaan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {filteredVehicles.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-8">Tidak ada kendaraan yang cocok dengan kriteria Anda.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleListPage;