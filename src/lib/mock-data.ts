
import type { Vehicle, Driver } from "@/types/tracking";

const generateRandomCoordinate = (lat: number, lng: number, radius: number) => {
  const y0 = lat;
  const x0 = lng;
  const rd = radius / 111300; // about 111300 meters in one degree

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  return {
    lat: y + y0,
    lng: x + x0,
  };
};

const riyadhCenter = { lat: 24.7136, lng: 46.6753 };
const jeddahCenter = { lat: 21.4858, lng: 39.1925 };
const dammamCenter = { lat: 26.4207, lng: 50.0888 };
const cityCenters = [riyadhCenter, jeddahCenter, dammamCenter];

const mockRiyadhRoute = [
    [46.6753, 24.7136],
    [46.6853, 24.7196],
    [46.6953, 24.7256],
    [46.7053, 24.7316],
    [46.7153, 24.7356],
    [46.7253, 24.7386],
    [46.7353, 24.7406],
];

const mockJeddahRoute = [
    [39.1925, 21.4858],
    [39.1905, 21.4958],
    [39.1885, 21.5058],
    [39.1865, 21.5158],
];

const mockDammamRoute = [
    [50.0888, 26.4207],
    [50.0988, 26.4257],
    [50.1088, 26.4307],
    [50.1188, 26.4357],
];


const drivers: Driver[] = [
    { id: 'DRV001', name: 'Saleh Al-Mansoori', phone: '+966-50-123-4567', shiftEnd: '18:00' },
    { id: 'DRV002', name: 'Fatima Al-Jameel', phone: '+966-50-234-5678', shiftEnd: '19:00' },
    { id: 'DRV003', name: 'Khalid Al-Harbi', phone: '+966-50-345-6789', shiftEnd: '20:00' },
    { id: 'DRV004', name: 'Noura Al-Saud', phone: '+966-50-456-7890', shiftEnd: '17:00' },
    { id: 'DRV005', name: 'Tariq Al-Ghamdi', phone: '+966-50-567-8901', shiftEnd: '21:00' },
];

export const mockVehicles: Vehicle[] = [
  { id: 'VEH001', plateNumber: 'A 1234', callsign: 'Alpha 1', type: 'EXECUTIVE', status: 'POB', ...generateRandomCoordinate(riyadhCenter.lat, riyadhCenter.lng, 5000), speed: 80, fuel: 75, driver: drivers[0], route: mockRiyadhRoute },
  { id: 'VEH002', plateNumber: 'B 5678', callsign: 'Bravo 2', type: 'SALOON', status: 'ON_ROUTE', ...generateRandomCoordinate(riyadhCenter.lat, riyadhCenter.lng, 5000), speed: 65, fuel: 90, driver: drivers[1], route: [[46.6753, 24.7136], [46.6700, 24.7200], [46.6650, 24.7250]] },
  { id: 'VEH003', plateNumber: 'C 9012', callsign: 'Charlie 3', type: 'MPV', status: 'EMPTY', ...generateRandomCoordinate(jeddahCenter.lat, jeddahCenter.lng, 5000), speed: 0, fuel: 60, driver: drivers[2] },
  { id: 'VEH004', plateNumber: 'D 3456', callsign: 'Delta 4', type: 'COACH', status: 'RECEIVED', ...generateRandomCoordinate(dammamCenter.lat, dammamCenter.lng, 5000), speed: 40, fuel: 50, driver: drivers[3], route: mockDammamRoute },
  { id: 'VEH005', plateNumber: 'E 7890', callsign: 'Echo 5', type: 'VAN', status: 'ACCEPTED', ...generateRandomCoordinate(riyadhCenter.lat, riyadhCenter.lng, 5000), speed: 0, fuel: 85, driver: drivers[4] },
];
