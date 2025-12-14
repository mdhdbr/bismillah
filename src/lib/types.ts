
export type UserRole = "ADMIN" | "DISPATCHER" | "DRIVER" | "HEAVY_DRIVER" | "PASSENGER" | "SHIPPER";

export type DriverStatus = "OFF_DUTY" | "ON_DUTY" | "ON_TRIP" | "ON_BREAK" | "FORCED_REST" | "AVAILABLE";

export type FatigueLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type VehicleType = 
  // Passenger
  | "SEDAN" | "PREMIUM_SEDAN" | "LUXURY_CAR" | "SUV" | "MPV" | "MINI_BUS" | "LIGHT_BUS" | "HEAVY_BUS"
  // Freight & Equipment
  | "TRUCK_3T" | "TRUCK_5T" | "TRUCK_7T" | "TRUCK_10T" | "TRUCK_15T"
  | "TRAILER" | "FLATBED" | "CONTAINER_40FT" | "CONTAINER_60FT"
  | "CRANE_TRAILER" | "FORKLIFT" | "MOBILE_CRANE" | "STATIONARY_EQUIPMENT"
  | "BACKHOE_LOADER" | "BOBCAT" | "DUMP_TRUCK" | "WATER_TRUCK" | "OTHER";

export type VehicleCategory = "PASSENGER" | "FREIGHT" | "EQUIPMENT";

export type TripType = "PASSENGER" | "SHIPMENT" | "EQUIPMENT";

export type TripStatus = 
  | "PENDING" | "ACCEPTED" | "TO_PICKUP" | "AT_PICKUP" | "POB" // Passenger On Board
  | "ON_ROUTE" | "AT_DROPOFF" | "UNLOADING" | "COMPLETED" | "CANCELLED"
  | "LOADING" | "AT_WORK" | "EMPTY" | "ARRIVED" | "BOARDED";


export type Location = {
  lat: number;
  lng: number;
  address?: string;
};

export type User = {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  isActive: boolean;
};

export type Driver = {
  id: string;
  userId: string;
  user: User;
  licenseNumber: string;
  totalDutyHours: number;
  currentStatus: DriverStatus;
  fatigueLevel: FatigueLevel;
  dutyStartTime?: string;
};

export type Vehicle = {
  id: string;
  plateNumber: string;
  vin: string;
  type: VehicleType;
  category: VehicleCategory;
  capacity: number;
  currentFuel: number;
  status: VehicleStatus;
  currentLocation: Location;
  driverId?: string;
  driver?: Driver;
  lastMaintenance?: string;
  nextMaintenance?: string;
};

export type VehicleStatus = "AVAILABLE" | "ASSIGNED" | "ON_TRIP" | "MAINTENANCE" | "OUT_OF_SERVICE";

export type Trip = {
  id: string;
  jobId: string;
  type: TripType;
  status: TripStatus;
  pickupLocation: Location;
  dropoffLocation: Location;
  currentLocation?: Location;
  scheduledAt: string;
  startedAt?: string;
  completedAt?: string;
  estimatedDuration: number;
  vehicleId: string;
  vehicle?: Vehicle;
  driverId: string;
  driver?: Driver;
  distance?: number;
  fare?: number;
};
