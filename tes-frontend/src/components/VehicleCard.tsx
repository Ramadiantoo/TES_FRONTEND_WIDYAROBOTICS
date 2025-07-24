// src/components/VehicleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Pastikan ShadCN button terinstal
import type { Vehicle } from '../types'; // Impor tipe Vehicle

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <Card className="flex flex-col h-full"> {/* Menambahkan flex dan h-full */}
      <CardHeader>
        <CardTitle>{vehicle.name}</CardTitle>
        <CardDescription>ID: {vehicle.id}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2"> {/* Menambahkan flex-grow */}
        <p><span className="font-semibold">Status:</span> {vehicle.status}</p>
        <p><span className="font-semibold">Speed:</span> {vehicle.speed} km/h</p>
        <p><span className="font-semibold">Last Updated:</span> {new Date(vehicle.updated_at).toLocaleString()}</p>
      </CardContent>
      <div className="p-6 pt-0"> {/* Wrapper untuk tombol agar di bawah */}
        <Link to={`/vehicles/${vehicle.id}`}>
          <Button className="w-full">Detail</Button>
        </Link>
      </div>
    </Card>
  );
};

export default VehicleCard;