
"use client";

import { Vehicle } from "@/types/tracking";
import { cn } from "@/lib/utils";
import { useTrackingStore } from "@/store/tracking-store";
import { Car, Bike, Ship, Bus, Truck } from "lucide-react";
import React from "react";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const vehicleTypeIcons: Record<Vehicle["type"], React.ElementType> = {
    COACH: Bus,
    BIKE: Bike,
    BOAT: Ship,
    ECO: Car,
    ESTATE: Car,
    EXECUTIVE: Car,
    MPV: Bus,
    PUSH_BIKE: Bike,
    SALOON: Car,
    SHUTTLE_BUS: Bus,
    VAN: Truck,
};


export default function VehicleMarker({ vehicle }: { vehicle: Vehicle }) {
  const { selectVehicle, selectedVehicle } = useTrackingStore();
  
  const isSelected = selectedVehicle?.id === vehicle.id;
  const Icon = vehicleTypeIcons[vehicle.type] || Car;

  const statusColors = {
    POB: "var(--primary)",
    ON_ROUTE: "#3b82f6", // blue-500
    EMPTY: "#9ca3af", // gray-400
    RECEIVED: "#f59e0b", // yellow-500
    ACCEPTED: "#a855f7", // purple-500
    ARRIVED: "#f97316", // orange-500
  };

  const statusColor = statusColors[vehicle.status] || "#6b7280"; // gray-500 default

  return (
    <AdvancedMarker
        position={{ lat: vehicle.lat, lng: vehicle.lng }}
        onClick={() => selectVehicle(vehicle)}
    >
        <Pin 
            background={statusColor}
            borderColor={isSelected ? "black" : "white"}
            glyphColor="white"
            scale={isSelected ? 1.2 : 1}
        >
            <Icon className="h-5 w-5" />
        </Pin>
    </AdvancedMarker>
  );
}
