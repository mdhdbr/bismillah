
import { create } from "zustand";

interface DispatchState {
  pickup: string | null;
  dropoff: string | null;
  setPickup: (location: string) => void;
  setDropoff: (location: string) => void;
  clearPickup: () => void;
  clearDropoff: () => void;
}

export const useDispatchStore = create<DispatchState>((set) => ({
  pickup: null,
  dropoff: null,
  setPickup: (location) => set({ pickup: location }),
  setDropoff: (location) => set({ dropoff: location }),
  clearPickup: () => set({ pickup: null }),
  clearDropoff: () => set({ dropoff: null }),
}));
