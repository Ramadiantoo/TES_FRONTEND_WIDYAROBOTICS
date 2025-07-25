// src/components/MapComponent.tsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { IoCar } from 'react-icons/io5';

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

function ChangeView({ center, zoom }: { center: L.LatLngExpression, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, vehicleName }) => {
  const position: L.LatLngTuple = [latitude, longitude];

  const customVehicleIcon = L.divIcon({
    html: renderToString(
      <div className="text-blue-600 text-4xl">
        <IoCar />
      </div>
    ),
    className: 'custom-leaflet-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-[400px] w-full rounded-md shadow-md">
      <ChangeView center={position} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      <Marker position={position} icon={customVehicleIcon}>
        <Popup>
          {vehicleName ? `Kendaraan: ${vehicleName}` : 'Lokasi Kendaraan'} <br /> Lintang: {latitude}, Bujur: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;