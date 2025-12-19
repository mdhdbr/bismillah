
"use client";

import { create } from "zustand";
import { vehicles as initialVehicles } from "@/lib/data";
import type { Vehicle } from "@/lib/types";

interface VehiclesState {
  vehicles: Vehicle[];
  addVehicle: (newVehicle: Vehicle) => void;
  updateVehicle: (updatedVehicle: Vehicle) => void;
  removeVehicle: (vehicleId: string) => void;
}

export const useVehiclesStore = create<VehiclesState>((set) => ({
  vehicles: initialVehicles,
  addVehicle: (newVehicle) =>
    set((state) => ({
      vehicles: [newVehicle, ...state.vehicles],
    })),
  updateVehicle: (updatedVehicle) =>
    set((state) => ({
      vehicles: state.vehicles.map((vehicle) =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      ),
    })),
  removeVehicle: (vehicleId) =>
    set((state) => ({
      vehicles: state.vehicles.filter((vehicle) => vehicle.id !== vehicleId),
    })),
}));
