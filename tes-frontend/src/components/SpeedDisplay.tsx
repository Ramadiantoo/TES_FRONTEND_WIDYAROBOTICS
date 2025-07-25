// src/components/SpeedDisplay.tsx
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface SpeedDisplayProps {
  speed: number;
}

const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ speed }) => {
  let statusText: string;
  let badgeClass: string;

  if (speed === 0) {
    statusText = "Stopped";
    badgeClass = "bg-red-500 hover:bg-red-600 text-white"; 
  } else if (speed > 80) {
    statusText = "High Speed";
    badgeClass = "bg-orange-500 hover:bg-orange-600 text-white"; 
  } else {
    statusText = "Normal";
    badgeClass = "bg-green-500 hover:bg-green-600 text-white"; 
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">Current Speed: {speed} km/h</span>
      <Badge className={badgeClass}>{statusText}</Badge>
    </div>
  );
};

export default SpeedDisplay;