// src/pages/VehicleListPage.tsx (Kode ini tidak berubah dari sebelumnya)
import React, { useEffect, useMemo } from 'react';
import { useVehicleStore } from '../hooks/useVehicleStore';
import { getVehicles } from '../api/vehicles';
import VehicleCard from '../components/VehicleCard'; 
import LoadingSpinner from '../components/LoadingSpinner';
import { Input } from "@/components/ui/input"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { Button } from "@/components/ui/button"; 
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
        setErrorVehicles(err.message || "Failed to fetch vehicles.");
      } finally {
        setLoadingVehicles(false);
      }
    };
    fetchVehicles();
  }, [setVehicles, setLoadingVehicles, setErrorVehicles]);

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.id.toString().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(vehicle => vehicle.status === filterStatus);
    }

    return filtered;
  }, [vehicles, searchTerm, filterStatus]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loadingVehicles) {
    return <LoadingSpinner />;
  }

  if (errorVehicles) {
    return <div className="text-red-600 text-center mt-8 text-xl">Error: {errorVehicles}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-primary-foreground">Vehicle Dashboard</h1>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-grow max-w-md">
          <Input
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          )}
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredVehicles.length === 0 && !loadingVehicles && !errorVehicles ? (
        <div className="text-center text-muted-foreground text-lg mt-10">No vehicles found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleListPage;