
"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";
import type { Map as MapInstance } from '@vis.gl/react-google-maps';

import { useTrackingStore } from "@/store/tracking-store";
import { mockVehicles } from "@/lib/mock-data";
import VehicleMarker from "./vehicle-marker";
import RouteLayer from "./route-layer";

interface TrackingMapProps {
    apiKey: string;
}

export default function TrackingMap({ apiKey }: TrackingMapProps) {
  const { vehicles, setVehicles, autoRefresh, selectedVehicle } = useTrackingStore();
  const mapRef = useRef<MapInstance>(null);

  useEffect(() => {
    // Initial load
    setVehicles(mockVehicles);

    if (!autoRefresh) return;
    
    // Simulate GPS push every 15 seconds
    const interval = setInterval(() => {
        setVehicles(currentVehicles => currentVehicles.map(v => ({
            ...v,
            lat: v.lat + (Math.random() - 0.5) * 0.002,
            lng: v.lng + (Math.random() - 0.5) * 0.002,
        }))); 
    }, 15000);

    return () => clearInterval(interval);
  }, [autoRefresh, setVehicles]);
  
  useEffect(() => {
    if (selectedVehicle && mapRef.current) {
        mapRef.current.panTo({ lat: selectedVehicle.lat, lng: selectedVehicle.lng });
        mapRef.current.setZoom(14);
    }
  }, [selectedVehicle]);


  return (
    <APIProvider apiKey={apiKey}>
        <Map
            ref={mapRef}
            defaultCenter={{ lat: 24.7136, lng: 46.6753 }}
            defaultZoom={10}
            mapId="mhb-fleet-map"
            gestureHandling="greedy"
            disableDefaultUI
        >
            {vehicles.map((v) => (
                <VehicleMarker key={v.id} vehicle={v} />
            ))}
            {/* Note: RouteLayer would need to be re-implemented for Google Maps */}
            {/* {selectedVehicle && selectedVehicle.route && (
                <RouteLayer coordinates={selectedVehicle.route} />
            )} */}
        </Map>
    </APIProvider>
  );
}
