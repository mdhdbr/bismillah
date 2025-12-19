
import type { VehicleType } from "./types";

export interface RateDetails {
    per: number;
    rate: number;
    damages: number;
    handling: number;
    waiting: number;
    halting: number;
}

export type RateState = Partial<Record<VehicleType, RateDetails>>;

export const initialPassengerRates: RateState = {
    "SEDAN": { per: 0, rate: 2.20, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "PREMIUM_SEDAN": { per: 0, rate: 2.80, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "LUXURY_CAR": { per: 0, rate: 10.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "SUV": { per: 0, rate: 3.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "MPV": { per: 0, rate: 3.50, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "MINI_BUS": { per: 0, rate: 3.50, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "LIGHT_BUS": { per: 0, rate: 4.50, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "HEAVY_BUS": { per: 0, rate: 4.50, damages: 0, handling: 0, waiting: 0, halting: 0 },
};

export const initialShipperRates: RateState = {
    "TRUCK_3T": { per: 0, rate: 5.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "TRUCK_5T": { per: 0, rate: 5.50, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "TRUCK_7T": { per: 0, rate: 7.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "TRUCK_10T": { per: 0, rate: 7.50, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "TRUCK_15T": { per: 0, rate: 9.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "TRAILER": { per: 0, rate: 12.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "FLATBED": { per: 0, rate: 12.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "CONTAINER_40FT": { per: 0, rate: 15.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "CONTAINER_60FT": { per: 0, rate: 20.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "CRANE_TRAILER": { per: 0, rate: 18.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "DUMP_TRUCK": { per: 0, rate: 8.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "WATER_TRUCK": { per: 0, rate: 6.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
};

export const initialEquipmentRates: RateState = {
    "FORKLIFT": { per: 0, rate: 30.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "MOBILE_CRANE": { per: 0, rate: 40.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "BACKHOE_LOADER": { per: 0, rate: 35.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
    "BOBCAT": { per: 0, rate: 25.00, damages: 0, handling: 0, waiting: 0, halting: 0 },
};
