
"use client";

import { create } from "zustand";
import { drivers as initialDrivers } from "@/lib/data";
import type { Driver } from "@/lib/types";

interface DriversState {
  drivers: Driver[];
  addDriver: (newDriver: Driver) => void;
  updateDriver: (updatedDriver: Driver) => void;
  removeDriver: (driverId: string) => void;
}

export const useDriversStore = create<DriversState>((set) => ({
  drivers: initialDrivers,
  addDriver: (newDriver) =>
    set((state) => ({
      drivers: [newDriver, ...state.drivers],
    })),
  updateDriver: (updatedDriver) =>
    set((state) => ({
      drivers: state.drivers.map((driver) =>
        driver.id === updatedDriver.id ? updatedDriver : driver
      ),
    })),
  removeDriver: (driverId) =>
    set((state) => ({
      drivers: state.drivers.filter((driver) => driver.id !== driverId),
    })),
}));
