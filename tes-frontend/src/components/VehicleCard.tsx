// src/components/VehicleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden
                      shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                      transform hover:-translate-y-1 border border-gray-400">
      <CardHeader className="bg-muted/30 p-4 border-b">
        <CardTitle className="text-xl font-bold text-primary-foreground">{vehicle.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">ID: {vehicle.id}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 p-4 text-base ">
        <p><span className="font-semibold text-foreground">Status:</span> <span className={`font-medium ${vehicle.status === 'ACTIVE' ? 'text-green-500' : vehicle.status === 'INACTIVE' ? 'text-red-500' : 'text-yellow-500'}`}>{vehicle.status}</span></p>
        <p><span className="font-semibold text-foreground">Speed:</span> {vehicle.speed} km/h</p>
        <p><span className="font-semibold text-foreground">Last Updated:</span> <span className="text-sm text-muted-foreground">{new Date(vehicle.updated_at).toLocaleString()}</span></p>
      </CardContent>
      <div className="p-4 pt-0">
        <Link to={`/vehicles/${vehicle.id}`}>
          <Button className="w-full text-lg py-2 bg-blue-900 text-white hover:bg-blue-800 border-transparent">Lihat Detail</Button>
        </Link>
      </div>
    </Card>
  );
};

export default VehicleCard;