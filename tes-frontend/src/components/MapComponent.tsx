// src/components/MapComponent.tsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
  vehicleName?: string;
}

// A component to update the map view when props change
function ChangeView({ center, zoom }: { center: L.LatLngExpression, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, vehicleName }) => {
  const position: L.LatLngTuple = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-[400px] w-full rounded-md shadow-md">
      <ChangeView center={position} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {vehicleName ? `Vehicle: ${vehicleName}` : 'Vehicle Location'} <br /> Lat: {latitude}, Lng: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;