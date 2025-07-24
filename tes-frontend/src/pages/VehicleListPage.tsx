// src/pages/VehicleListPage.tsx
import React, { useEffect } from 'react';
import { useVehicleStore } from '../hooks/useVehicleStore';
import { getVehicles } from '../api/vehicles';
import VehicleCard from '../components/VehicleCard'; // Perhatikan impor relatif ini
import LoadingSpinner from '../components/LoadingSpinner';
import type { Vehicle } from '../types';

const VehicleListPage: React.FC = () => {
  const { vehicles, loadingVehicles, errorVehicles, setVehicles, setLoadingVehicles, setErrorVehicles } = useVehicleStore();

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoadingVehicles(true);
      setErrorVehicles(null);
      try {
        const data: Vehicle[] = await getVehicles();
        setVehicles(data);
      } catch (err: any) {
        setErrorVehicles(err.message || "Failed to fetch vehicles.");
      } finally {
        setLoadingVehicles(false);
      }
    };
    fetchVehicles();
  }, [setVehicles, setLoadingVehicles, setErrorVehicles]);

  if (loadingVehicles) {
    return <LoadingSpinner />;
  }

  if (errorVehicles) {
    return <div className="text-red-600 text-center mt-8">Error: {errorVehicles}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Vehicle List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehicleListPage;