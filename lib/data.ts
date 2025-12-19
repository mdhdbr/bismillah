
import type { Driver, Vehicle, Trip, User, Conversation, DailyTripStats, RiskLevel } from './types';
import { subHours, subMinutes, formatISO, format, subDays, addMonths, addYears } from 'date-fns';

export const users: User[] = [
  { id: 'user-001', name: 'Saleh Al-Mansoori', email: 'saleh.mansoori@example.com', role: 'DRIVER', isActive: true, phone: '+966-50-123-4567' },
  { id: 'user-002', name: 'Fatima Al-Jameel', email: 'fatima.jameel@example.com', role: 'DRIVER', isActive: true, phone: '+966-50-234-5678' },
  { id: 'user-003', name: 'Khalid Al-Harbi', email: 'khalid.harbi@example.com', role: 'DRIVER', isActive: true, phone: '+966-50-345-6789' },
  { id: 'user-004', name: 'Noura Al-Saud', email: 'noura.saud@example.com', role: 'DRIVER', isActive: true, phone: '+966-50-456-7890' },
  { id: 'user-005', name: 'Tariq Al-Ghamdi', email: 'tariq.ghamdi@example.com', role: 'HEAVY_DRIVER', isActive: true, phone: '+966-50-567-8901' },
  { id: 'user-006', name: 'Aisha Al-Otaibi', email: 'aisha.otaibi@example.com', role: 'HEAVY_DRIVER', isActive: true, phone: '+966-50-678-9012' },
  { id: 'user-007', name: 'Mohammed Al-Zahrani', email: 'mohammed.zahrani@example.com', role: 'DRIVER', isActive: false, phone: '+966-50-789-0123' },
  { id: 'user-008', name: 'Laila Al-Qahtani', email: 'laila.qahtani@example.com', role: 'DRIVER', isActive: true, phone: '+966-50-890-1234' },
  { id: 'user-009', name: 'Youssef Al-Shehri', email: 'youssef.shehri@example.com', role: 'HEAVY_DRIVER', isActive: true, phone: '+966-50-901-2345' },
  { id: 'user-010', name: 'Reem Al-Mutairi', email: 'reem.mutairi@example.com', role: 'DRIVER', isActive: true, phone: '+966-55-123-4567' },
  { id: 'user-011', name: 'Abdullah Al-Dossary', email: 'abdullah.dossary@example.com', role: 'HEAVY_DRIVER', isActive: true, phone: '+966-55-234-5678' },
  { id: 'user-012', name: 'Sara Al-Anazi', email: 'sara.anazi@example.com', role: 'DRIVER', isActive: true, phone: '+966-55-345-6789' },
  { id: 'user-013', name: 'Fahad Al-Shammeri', email: 'fahad.shammeri@example.com', role: 'HEAVY_DRIVER', isActive: true, phone: '+966-55-456-7890' },
  { id: 'user-014', name: 'Hanan Al-Maliki', email: 'hanan.maliki@example.com', role: 'HEAVY_DRIVER', isActive: true, phone: '+966-55-567-8901' },
  { id: 'user-015', name: 'Ibrahim Al-Johani', email: 'ibrahim.johani@example.com', role: 'DRIVER', isActive: true, phone: '+966-55-678-9012' },
];

users[10].role = 'HEAVY_DRIVER';
users[13].role = 'HEAVY_DRIVER';

export let vehicles: Vehicle[] = [
  { id: 'vehicle-001', plateNumber: 'A123BC', vin: 'VIN001', type: 'PREMIUM_SEDAN', category: 'PASSENGER', capacity: 4, currentFuel: 75, status: 'ON_TRIP', currentLocation: { lat: 24.7136, lng: 46.6753 }, driverId: 'driver-001', registrationExpiry: addYears(new Date(), 1).toISOString(), insuranceExpiry: addMonths(new Date(), 6).toISOString(), nextMaintenance: '2024-08-15' },
  { id: 'vehicle-002', plateNumber: 'B456DE', vin: 'VIN002', type: 'SUV', category: 'PASSENGER', capacity: 6, currentFuel: 90, status: 'AVAILABLE', currentLocation: { lat: 24.7742, lng: 46.7386 }, driverId: 'driver-002', registrationExpiry: addYears(new Date(), 2).toISOString(), insuranceExpiry: addMonths(new Date(), 11).toISOString(), nextMaintenance: '2024-09-01' },
  { id: 'vehicle-003', plateNumber: 'C789FG', vin: 'VIN003', type: 'TRUCK_5T', category: 'FREIGHT', capacity: 5000, currentFuel: 60, status: 'AVAILABLE', currentLocation: { lat: 21.4225, lng: 39.8262 }, driverId: 'driver-005', registrationExpiry: addMonths(new Date(), 2).toISOString(), insuranceExpiry: addMonths(new Date(), 2).toISOString(), nextMaintenance: '2024-07-30' },
  { id: 'vehicle-004', plateNumber: 'D012HI', vin: 'VIN004', type: 'MINI_BUS', category: 'PASSENGER', capacity: 15, currentFuel: 40, status: 'MAINTENANCE', currentLocation: { lat: 26.3986, lng: 50.2083 }, registrationExpiry: subDays(new Date(), 10).toISOString(), insuranceExpiry: subDays(new Date(), 5).toISOString(), nextMaintenance: '2024-07-25' },
  { id: 'vehicle-005', plateNumber: 'E345JK', vin: 'VIN005', type: 'SEDAN', category: 'PASSENGER', capacity: 4, currentFuel: 100, status: 'AVAILABLE', currentLocation: { lat: 24.7400, lng: 46.6500 }, driverId: 'driver-010', registrationExpiry: addYears(new Date(), 1).toISOString(), insuranceExpiry: addMonths(new Date(), 8).toISOString(), nextMaintenance: '2024-10-10' },
  { id: 'vehicle-006', plateNumber: 'F678LM', vin: 'VIN006', type: 'TRUCK_10T', category: 'FREIGHT', capacity: 10000, currentFuel: 80, status: 'ON_TRIP', currentLocation: { lat: 24.8033, lng: 46.7667 }, driverId: 'driver-009', registrationExpiry: addMonths(new Date(), 9).toISOString(), insuranceExpiry: addMonths(new Date(), 9).toISOString(), nextMaintenance: '2024-08-20' },
  { id: 'vehicle-007', plateNumber: 'G901NO', vin: 'VIN007', type: 'SUV', category: 'PASSENGER', capacity: 6, currentFuel: 55, status: 'AVAILABLE', currentLocation: { lat: 21.5433, lng: 39.1728 }, driverId: 'driver-008', registrationExpiry: addMonths(new Date(), 7).toISOString(), insuranceExpiry: addMonths(new Date(), 5).toISOString(), nextMaintenance: '2024-11-05' },
  { id: 'vehicle-008', plateNumber: 'H234PQ', vin: 'VIN008', type: 'LUXURY_CAR', category: 'PASSENGER', capacity: 4, currentFuel: 25, status: 'AVAILABLE', currentLocation: { lat: 21.4858, lng: 39.1925 }, registrationExpiry: addYears(new Date(), 3).toISOString(), insuranceExpiry: addYears(new Date(), 1).toISOString(), nextMaintenance: '2024-09-12' },
  { id: 'vehicle-009', plateNumber: 'I567RS', vin: 'VIN009', type: 'FORKLIFT', category: 'EQUIPMENT', capacity: 2000, currentFuel: 95, status: 'OUT_OF_SERVICE', currentLocation: { lat: 26.2167, lng: 50.1833 } },
  { id: 'vehicle-010', plateNumber: 'J890TU', vin: 'VIN010', type: 'LIGHT_BUS', category: 'PASSENGER', capacity: 25, currentFuel: 70, status: 'AVAILABLE', currentLocation: { lat: 24.6877, lng: 46.7219 }, driverId: 'driver-011', registrationExpiry: addMonths(new Date(), 14).toISOString(), insuranceExpiry: addMonths(new Date(), 10).toISOString(), nextMaintenance: '2024-12-01' },
  { id: 'vehicle-011', plateNumber: 'K123VW', vin: 'VIN011', type: 'TRUCK_15T', category: 'FREIGHT', capacity: 15000, currentFuel: 50, status: 'AVAILABLE', currentLocation: { lat: 21.3891, lng: 39.8579 }, driverId: 'driver-013', registrationExpiry: addMonths(new Date(), 4).toISOString(), insuranceExpiry: addMonths(new Date(), 4).toISOString(), nextMaintenance: '2024-08-22' },
  { id: 'vehicle-012', plateNumber: 'L456XY', vin: 'VIN012', type: 'SEDAN', category: 'PASSENGER', capacity: 4, currentFuel: 85, status: 'AVAILABLE', currentLocation: { lat: 24.6333, lng: 46.7167 }, driverId: 'driver-014', registrationExpiry: subDays(new Date(), 30).toISOString(), insuranceExpiry: addMonths(new Date(), 1).toISOString(), nextMaintenance: '2024-10-18' },
  { id: 'vehicle-013', plateNumber: 'M789ZA', vin: 'VIN013', type: 'MPV', category: 'PASSENGER', capacity: 7, currentFuel: 65, status: 'AVAILABLE', currentLocation: { lat: 21.6167, lng: 39.1500 }, registrationExpiry: addMonths(new Date(), 5).toISOString(), insuranceExpiry: addMonths(new Date(), 5).toISOString(), nextMaintenance: '2024-11-25' },
  { id: 'vehicle-014', plateNumber: 'N012AB', vin: 'VIN014', type: 'HEAVY_BUS', category: 'PASSENGER', capacity: 50, currentFuel: 78, status: 'MAINTENANCE', currentLocation: { lat: 24.7136, lng: 46.6753 }, registrationExpiry: addMonths(new Date(), 20).toISOString(), insuranceExpiry: addMonths(new Date(), 9).toISOString(), nextMaintenance: '2024-07-28' },
  { id: 'vehicle-015', plateNumber: 'P345CD', vin: 'VIN015', type: 'FLATBED', category: 'FREIGHT', capacity: 20000, currentFuel: 92, status: 'AVAILABLE', currentLocation: { lat: 26.4333, lng: 50.1167 }, driverId: 'driver-006', registrationExpiry: addMonths(new Date(), 18).toISOString(), insuranceExpiry: addMonths(new Date(), 12).toISOString(), nextMaintenance: '2024-09-30' },
];

const riskLevels: RiskLevel[] = ['LOW', 'LOW', 'LOW', 'MEDIUM', 'HIGH'];

export const drivers: Driver[] = [
  { id: 'driver-001', userId: 'user-001', user: users[0], licenseNumber: 'D1234567', licenseExpiry: addYears(new Date(), 2).toISOString(), totalDutyHours: 8, currentStatus: 'ON_TRIP', fatigueLevel: 'HIGH', dutyStartTime: subHours(new Date(), 8).toISOString(), risk: 'HIGH' },
  { id: 'driver-002', userId: 'user-002', user: users[1], licenseNumber: 'D2345678', licenseExpiry: addMonths(new Date(), 6).toISOString(), totalDutyHours: 4, currentStatus: 'AVAILABLE', fatigueLevel: 'LOW', dutyStartTime: subHours(new Date(), 4).toISOString(), risk: 'LOW' },
  { id: 'driver-003', userId: 'user-003', user: users[2], licenseNumber: 'D3456789', licenseExpiry: subDays(new Date(), 90).toISOString(), totalDutyHours: 0, currentStatus: 'OFF_DUTY', fatigueLevel: 'LOW', risk: 'LOW' },
  { id: 'driver-004', userId: 'user-004', user: users[3], licenseNumber: 'D4567890', licenseExpiry: addYears(new Date(), 1).toISOString(), totalDutyHours: 12, currentStatus: 'FORCED_REST', fatigueLevel: 'CRITICAL', dutyStartTime: subHours(new Date(), 12).toISOString(), risk: 'HIGH' },
  { id: 'driver-005', userId: 'user-005', user: users[4], licenseNumber: 'D5678901', licenseExpiry: addMonths(new Date(), 3).toISOString(), totalDutyHours: 6, currentStatus: 'AVAILABLE', fatigueLevel: 'MEDIUM', dutyStartTime: subHours(new Date(), 6).toISOString(), risk: 'MEDIUM' },
  { id: 'driver-006', userId: 'user-006', user: users[5], licenseNumber: 'D6789012', licenseExpiry: addMonths(new Date(), 8).toISOString(), totalDutyHours: 2, currentStatus: 'AVAILABLE', fatigueLevel: 'LOW', dutyStartTime: subHours(new Date(), 2).toISOString(), risk: 'LOW' },
  { id: 'driver-007', userId: 'user-007', user: users[6], licenseNumber: 'D7890123', licenseExpiry: addYears(new Date(), 5).toISOString(), totalDutyHours: 0, currentStatus: 'OFF_DUTY', fatigueLevel: 'LOW', risk: 'LOW' },
  { id: 'driver-008', userId: 'user-008', user: users[7], licenseNumber: 'D8901234', licenseExpiry: addMonths(new Date(), 9).toISOString(), totalDutyHours: 7, currentStatus: 'ON_DUTY', fatigueLevel: 'MEDIUM', dutyStartTime: subHours(new Date(), 7).toISOString(), risk: 'MEDIUM' },
  { id: 'driver-009', userId: 'user-009', user: users[8], licenseNumber: 'D9012345', licenseExpiry: addMonths(new Date(), 1).toISOString(), totalDutyHours: 9, currentStatus: 'ON_TRIP', fatigueLevel: 'HIGH', dutyStartTime: subHours(new Date(), 9).toISOString(), risk: 'HIGH' },
  { id: 'driver-010', userId: 'user-010', user: users[9], licenseNumber: 'D0123456', licenseExpiry: addYears(new Date(), 2).toISOString(), totalDutyHours: 1, currentStatus: 'AVAILABLE', fatigueLevel: 'LOW', dutyStartTime: subHours(new Date(), 1).toISOString(), risk: 'LOW' },
  { id: 'driver-011', userId: 'user-011', licenseNumber: 'D1123456', user: users[10], licenseExpiry: addYears(new Date(), 3).toISOString(), totalDutyHours: 5, currentStatus: 'ON_DUTY', fatigueLevel: 'MEDIUM', dutyStartTime: subHours(new Date(), 5).toISOString(), risk: 'MEDIUM' },
  { id: 'driver-012', userId: 'user-012', licenseNumber: 'D1223456', user: users[11], licenseExpiry: subDays(new Date(), 5).toISOString(), totalDutyHours: 0, currentStatus: 'OFF_DUTY', fatigueLevel: 'LOW', risk: 'LOW' },
  { id: 'driver-013', userId: 'user-013', licenseNumber: 'D1323456', user: users[12], licenseExpiry: addMonths(new Date(), 7).toISOString(), totalDutyHours: 10, currentStatus: 'ON_DUTY', fatigueLevel: 'HIGH', dutyStartTime: subHours(new Date(), 10).toISOString(), risk: 'HIGH' },
  { id: 'driver-014', userId: 'user-014', licenseNumber: 'D1423456', user: users[13], licenseExpiry: addMonths(new Date(), 11).toISOString(), totalDutyHours: 3, currentStatus: 'AVAILABLE', fatigueLevel: 'LOW', dutyStartTime: subHours(new Date(), 3).toISOString(), risk: 'LOW' },
  { id: 'driver-015', userId: 'user-015', licenseNumber: 'D1523456', user: users[14], licenseExpiry: addYears(new Date(), 4).toISOString(), totalDutyHours: 0, currentStatus: 'OFF_DUTY', fatigueLevel: 'LOW', risk: 'LOW' },
].map((d, i) => ({ ...d, vehicle: vehicles.find(v => v.driverId === d.id), vehicleId: vehicles.find(v => v.driverId === d.id)?.id, risk: riskLevels[i % riskLevels.length] }));

vehicles = vehicles.map(v => ({
  ...v,
  driver: drivers.find(d => d.id === v.driverId)
}));

const now = new Date();
export let trips: Trip[] = [
  { id: 'trip-001', jobId: 'JOB-9A4B1C', type: 'PASSENGER', status: 'POB', pickupLocation: { lat: 24.9876, lng: 46.6243, address: 'King Khalid International Airport, Riyadh' }, dropoffLocation: { lat: 24.7136, lng: 46.6753, address: 'Kingdom Centre, Riyadh' }, scheduledAt: formatISO(subHours(now, 2)), vehicleId: 'vehicle-001', driverId: 'driver-001', distance: 35, fare: 120.50, estimatedDuration: 0 },
  { id: 'trip-002', jobId: 'JOB-8D7E6F', type: 'SHIPMENT', status: 'COMPLETED', pickupLocation: { lat: 21.4225, lng: 39.8262, address: 'Jeddah Islamic Port' }, dropoffLocation: { lat: 21.5433, lng: 39.1728, address: 'Al-Balad Warehouse, Jeddah' }, scheduledAt: formatISO(subHours(now, 4)), completedAt: formatISO(subHours(now, 2)), vehicleId: 'vehicle-003', driverId: 'driver-005', distance: 55, fare: 450.00, estimatedDuration: 0 },
  { id: 'trip-003', jobId: 'JOB-7G6H5I', type: 'PASSENGER', status: 'PENDING', pickupLocation: { lat: 21.6167, lng: 39.1500, address: 'Red Sea Mall, Jeddah' }, dropoffLocation: { lat: 21.4858, lng: 39.1925, address: 'Jeddah Corniche' }, scheduledAt: formatISO(subHours(now, -2)), vehicleId: 'vehicle-005', driverId: 'driver-010', distance: 12, fare: 45.00, estimatedDuration: 0 },
  { id: 'trip-004', jobId: 'JOB-6J5K4L', type: 'EQUIPMENT', status: 'AT_WORK', pickupLocation: { lat: 26.4333, lng: 50.1167, address: 'Dammam Industrial City 2' }, dropoffLocation: { lat: 26.3986, lng: 50.2083, address: 'KFUPM, Dhahran' }, scheduledAt: formatISO(subHours(now, -3)), vehicleId: 'vehicle-006', driverId: 'driver-009', distance: 30, fare: 750.00, estimatedDuration: 0 },
  { id: 'trip-005', jobId: 'JOB-5L4M3N', type: 'PASSENGER', status: 'CANCELLED', pickupLocation: { lat: 24.6877, lng: 46.7219, address: 'Riyadh Park Mall' }, dropoffLocation: { lat: 24.7136, lng: 46.6753, address: 'Al-Masmak Fortress, Riyadh' }, scheduledAt: formatISO(subDays(now, 1)), vehicleId: 'vehicle-007', driverId: 'driver-008', distance: 15, fare: 55.00, estimatedDuration: 0 },
  { id: 'trip-006', jobId: 'JOB-4N3O2P', type: 'SHIPMENT', status: 'COMPLETED', pickupLocation: { lat: 21.3891, lng: 39.8579, address: 'Makkah Industrial Area' }, dropoffLocation: { lat: 21.4225, lng: 39.8262, address: 'Abraj Al-Bait, Makkah' }, scheduledAt: formatISO(subDays(now, 1)), completedAt: formatISO(subDays(now, 1)), vehicleId: 'vehicle-011', driverId: 'driver-013', distance: 25, fare: 600.00, estimatedDuration: 0 },
  { id: 'trip-007', jobId: 'JOB-3P2Q1R', type: 'PASSENGER', status: 'ON_ROUTE', pickupLocation: { lat: 24.6333, lng: 46.7167, address: 'Diriyah, Riyadh' }, dropoffLocation: { lat: 24.8033, lng: 46.7667, address: 'Riyadh Front' }, scheduledAt: formatISO(subHours(now, 1)), vehicleId: 'vehicle-008', driverId: 'driver-004', distance: 28, fare: 95.00, estimatedDuration: 0 },
  { id: 'trip-008', jobId: 'JOB-2R1S0T', type: 'PASSENGER', status: 'PENDING', pickupLocation: { lat: 21.6167, lng: 39.1500, address: 'Mall of Arabia, Jeddah' }, dropoffLocation: { lat: 21.5433, lng: 39.1728, address: 'Jeddah Waterfront' }, scheduledAt: formatISO(subHours(now, -4)), vehicleId: 'vehicle-012', driverId: 'driver-014', distance: 18, fare: 65.00, estimatedDuration: 0 },
  // Add more trips with recent completedAt dates
  { id: 'trip-009', jobId: 'JOB-1S0T9U', type: 'SHIPMENT', status: 'COMPLETED', pickupLocation: { lat: 26.4207, lng: 50.0888, address: 'Dammam Port' }, dropoffLocation: { lat: 26.3986, lng: 50.2083, address: 'Al Khobar Warehouse' }, scheduledAt: formatISO(subDays(now, 2)), completedAt: formatISO(subDays(now, 2)), vehicleId: 'vehicle-015', driverId: 'driver-006', distance: 45, fare: 500.00, estimatedDuration: 0 },
  { id: 'trip-010', jobId: 'JOB-0T9U8V', type: 'PASSENGER', status: 'COMPLETED', pickupLocation: { lat: 24.7136, lng: 46.6753, address: 'Kingdom Centre, Riyadh' }, dropoffLocation: { lat: 24.6877, lng: 46.7219, address: 'Riyadh Park Mall' }, scheduledAt: formatISO(subDays(now, 3)), completedAt: formatISO(subDays(now, 3)), vehicleId: 'vehicle-002', driverId: 'driver-002', distance: 15, fare: 60.00, estimatedDuration: 0 },
  { id: 'trip-011', jobId: 'JOB-9U8V7W', type: 'PASSENGER', status: 'COMPLETED', pickupLocation: { lat: 24.7136, lng: 46.6753, address: 'Riyadh Gallery Mall' }, dropoffLocation: { lat: 24.7742, lng: 46.7386, address: 'KAFD, Riyadh' }, scheduledAt: formatISO(subDays(now, 4)), completedAt: formatISO(subDays(now, 4)), vehicleId: 'vehicle-001', driverId: 'driver-001', distance: 10, fare: 40.00, estimatedDuration: 0 },
  { id: 'trip-012', jobId: 'JOB-8V7W6X', type: 'PASSENGER', status: 'COMPLETED', pickupLocation: { lat: 21.4858, lng: 39.1925, address: 'Jeddah Airport' }, dropoffLocation: { lat: 21.4225, lng: 39.8262, address: 'Al-Haram, Mecca' }, scheduledAt: formatISO(subDays(now, 5)), completedAt: formatISO(subDays(now, 5)), vehicleId: 'vehicle-007', driverId: 'driver-008', distance: 95, fare: 250.00, estimatedDuration: 0 },
  { id: 'trip-013', jobId: 'JOB-7W6X5Y', type: 'SHIPMENT', status: 'COMPLETED', pickupLocation: { lat: 24.7136, lng: 46.6753, address: 'Riyadh Dry Port' }, dropoffLocation: { lat: 26.4207, lng: 50.0888, address: 'Dammam Industrial City' }, scheduledAt: formatISO(subDays(now, 6)), completedAt: formatISO(subDays(now, 6)), vehicleId: 'vehicle-006', driverId: 'driver-009', distance: 410, fare: 1800.00, estimatedDuration: 0 },
].map(trip => ({
  ...trip,
  vehicle: vehicles.find(v => v.id === trip.vehicleId),
  driver: drivers.find(d => d.id === trip.driverId),
  estimatedDuration: trip.distance ? Math.round(trip.distance * 2.5) : 0,
}));

// This simulates the pre-aggregated data that would come from `dailyTripStats/{YYYY-MM-DD}` in Firestore
export const dailyTripStats: DailyTripStats = {
    docId: format(new Date(), 'yyyy-MM-dd'),
    counts: {
        PREMIUM_SEDAN: 1, // trip-001 (active)
        TRUCK_5T: 1, // trip-002 (completed today)
        // SEDAN: 0, trip-003 is pending, not active
        TRUCK_10T: 1, // trip-004 (active)
        // SUV: 0, trip-005 was cancelled, not active
        // TRUCK_15T: 0, trip-006 completed yesterday
        LUXURY_CAR: 1, // trip-007 (active)
        // Other types have 0 active/completed trips today
    }
}


export const conversations: Conversation[] = [
  {
    id: 'conv-001',
    contactName: 'Passenger JOB-9A4B1C',
    contactType: 'Passenger',
    lastMessage: 'Thank you for the ride!',
    lastMessageTime: formatISO(subMinutes(new Date(), 5)),
    isUnread: false,
    messages: [
      { id: 'msg-1-1', sender: 'other', content: 'Hi, I am at gate 3. Where are you?', timestamp: formatISO(subMinutes(new Date(), 15)) },
      { id: 'msg-1-2', sender: 'me', content: 'On my way, will be there in 2 minutes. I am in a black Mercedes.', timestamp: formatISO(subMinutes(new Date(), 14)) },
      { id: 'msg-1-3', sender: 'other', content: 'Great, see you soon.', timestamp: formatISO(subMinutes(new Date(), 13)) },
      { id: 'msg-1-4', sender: 'other', content: 'Thank you for the ride!', timestamp: formatISO(subMinutes(new Date(), 5)) },
    ],
  },
  {
    id: 'conv-002',
    contactName: 'Agent Saleh Al-Mansoori',
    contactType: 'Agent',
    lastMessage: 'Understood, proceeding to location.',
    lastMessageTime: formatISO(subMinutes(new Date(), 22)),
    isUnread: true,
    messages: [
      { id: 'msg-2-1', sender: 'me', content: 'Saleh, please proceed to Dammam for an urgent pickup. Job ID: JOB-XJ5K8L', timestamp: formatISO(subMinutes(new Date(), 25)) },
      { id: 'msg-2-2', sender: 'other', content: 'Understood, proceeding to location.', timestamp: formatISO(subMinutes(new Date(), 22)) },
    ],
  },
  {
    id: 'conv-003',
    contactName: 'Shipper - Aramco',
    contactType: 'Shipper',
    lastMessage: 'We need 2 more flatbeds for tomorrow morning. Can you confirm?',
    lastMessageTime: formatISO(subHours(new Date(), 1)),
    isUnread: true,
    messages: [
      { id: 'msg-3-1', sender: 'other', content: 'Hi, the container has been loaded. Your driver can depart.', timestamp: formatISO(subHours(new Date(), 2)) },
      { id: 'msg-3-2', sender: 'me', content: 'Thank you for the update. We have informed the driver.', timestamp: formatISO(subHours(new Date(), 2)) },
      { id: 'msg-3-3', sender: 'other', content: 'We need 2 more flatbeds for tomorrow morning. Can you confirm?', timestamp: formatISO(subHours(new Date(), 1)) },
    ],
  },
  {
    id: 'conv-004',
    contactName: 'Driver Fatima Al-Jameel',
    contactType: 'Driver',
    lastMessage: 'My tire pressure is low, I need to find the nearest service station.',
    lastMessageTime: formatISO(subMinutes(new Date(), 45)),
    isUnread: true,
    messages: [
      { id: 'msg-4-1', sender: 'other', content: 'My tire pressure is low, I need to find the nearest service station.', timestamp: formatISO(subMinutes(new Date(), 45)) },
      { id: 'msg-4-2', sender: 'me', content: 'Acknowledged. Sending you location of a nearby approved vendor.', timestamp: formatISO(subMinutes(new Date(), 44)) },
    ],
  },
].map(c => ({...c, isUnread: c.messages[c.messages.length - 1]?.sender === 'other' }));

export const allDrivers = drivers;
