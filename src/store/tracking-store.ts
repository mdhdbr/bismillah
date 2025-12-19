
import { create } from "zustand";
import { Vehicle } from "@/lib/types";

interface TrackingState {
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle;
  autoRefresh: boolean;
  showCallsigns: boolean;
  setVehicles: (v: Vehicle[]) => void;
  selectVehicle: (v?: Vehicle) => void;
  toggleAutoRefresh: () => void;
  toggleCallsigns: () => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  vehicles: [],
  autoRefresh: true,
  showCallsigns: true,
  setVehicles: (vehicles) => set({ vehicles }),
  selectVehicle: (v) => set({ selectedVehicle: v }),
  toggleAutoRefresh: () =>
    set((s) => ({ autoRefresh: !s.autoRefresh })),
  toggleCallsigns: () =>
    set((s) => ({ showCallsigns: !s.showCallsigns })),
}));
