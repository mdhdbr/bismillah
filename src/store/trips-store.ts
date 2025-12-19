
"use client";

import { create } from "zustand";
import { trips as initialTrips } from "@/lib/data";
import type { Trip } from "@/lib/types";

interface TripsState {
  trips: Trip[];
  updateTrip: (updatedTrip: Trip) => void;
  addTrip: (newTrip: Trip) => void;
  removeTrips: (tripIds: string[]) => void;
}

export const useTripsStore = create<TripsState>((set) => ({
  trips: initialTrips,
  updateTrip: (updatedTrip) =>
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === updatedTrip.id ? updatedTrip : trip
      ),
    })),
  addTrip: (newTrip) =>
    set((state) => ({
        trips: [newTrip, ...state.trips],
    })),
  removeTrips: (tripIds) =>
    set((state) => ({
      trips: state.trips.filter((trip) => !tripIds.includes(trip.id)),
    })),
}));
