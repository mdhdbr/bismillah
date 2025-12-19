
export type VehicleStatus =
  | "EMPTY"
  | "RECEIVED"
  | "ACCEPTED"
  | "ON_ROUTE"
  | "ARRIVED"
  | "POB";

export type VehicleType =
  | "COACH"
  | "BIKE"
  | "BOAT"
  | "ECO"
  | "ESTATE"
  | "EXECUTIVE"
  | "MPV"
  | "PUSH_BIKE"
  | "SALOON"
  | "SHUTTLE_BUS"
  | "VAN";

export interface Vehicle {
  id: string;
  plateNumber: string;
  callsign: string;
  type: VehicleType;
  status: VehicleStatus;
  lat: number;
  lng: number;
  speed?: number;
  fuel?: number;
  battery?: number;
  driver?: Driver;
  route?: number[][];
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  shiftEnd: string;
  earnings?: number;
  onBreak?: boolean;
}
