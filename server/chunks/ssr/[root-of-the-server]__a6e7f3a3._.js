module.exports = [
"[project]/.next-internal/server/app/dashboard/jobs/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drivers",
    ()=>drivers,
    "trips",
    ()=>trips,
    "vehicles",
    ()=>vehicles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subHours.mjs [app-rsc] (ecmascript)");
;
const users = [
    {
        id: 'user-001',
        name: 'Saleh Al-Mansoori',
        email: 'saleh.mansoori@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-123-4567'
    },
    {
        id: 'user-002',
        name: 'Fatima Al-Jameel',
        email: 'fatima.jameel@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-234-5678'
    },
    {
        id: 'user-003',
        name: 'Khalid Al-Harbi',
        email: 'khalid.harbi@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-345-6789'
    },
    {
        id: 'user-004',
        name: 'Noura Al-Saud',
        email: 'noura.saud@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-456-7890'
    },
    {
        id: 'user-005',
        name: 'Tariq Al-Ghamdi',
        email: 'tariq.ghamdi@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-50-567-8901'
    },
    {
        id: 'user-006',
        name: 'Aisha Al-Otaibi',
        email: 'aisha.otaibi@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-50-678-9012'
    },
    {
        id: 'user-007',
        name: 'Mohammed Al-Zahrani',
        email: 'mohammed.zahrani@example.com',
        role: 'DRIVER',
        isActive: false,
        phone: '+966-50-789-0123'
    },
    {
        id: 'user-008',
        name: 'Laila Al-Qahtani',
        email: 'laila.qahtani@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-890-1234'
    },
    {
        id: 'user-009',
        name: 'Youssef Al-Shehri',
        email: 'youssef.shehri@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-50-901-2345'
    },
    {
        id: 'user-010',
        name: 'Reem Al-Mutairi',
        email: 'reem.mutairi@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-55-123-4567'
    },
    {
        id: 'user-011',
        name: 'Abdullah Al-Dossary',
        email: 'abdullah.dossary@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-55-234-5678'
    },
    {
        id: 'user-012',
        name: 'Sara Al-Anazi',
        email: 'sara.anazi@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-55-345-6789'
    },
    {
        id: 'user-013',
        name: 'Fahad Al-Shammeri',
        email: 'fahad.shammeri@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-55-456-7890'
    },
    {
        id: 'user-014',
        name: 'Hanan Al-Maliki',
        email: 'hanan.maliki@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-55-567-8901'
    },
    {
        id: 'user-015',
        name: 'Ibrahim Al-Johani',
        email: 'ibrahim.johani@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-55-678-9012'
    }
];
users[10].role = 'HEAVY_DRIVER';
users[13].role = 'HEAVY_DRIVER';
const drivers = [
    {
        id: 'driver-001',
        userId: 'user-001',
        user: users[0],
        licenseNumber: 'D1234567',
        totalDutyHours: 8,
        currentStatus: 'ON_TRIP',
        fatigueLevel: 'HIGH',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 8).toISOString()
    },
    {
        id: 'driver-002',
        userId: 'user-002',
        user: users[1],
        licenseNumber: 'D2345678',
        totalDutyHours: 4,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 4).toISOString()
    },
    {
        id: 'driver-003',
        userId: 'user-003',
        user: users[2],
        licenseNumber: 'D3456789',
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW'
    },
    {
        id: 'driver-004',
        userId: 'user-004',
        user: users[3],
        licenseNumber: 'D4567890',
        totalDutyHours: 12,
        currentStatus: 'FORCED_REST',
        fatigueLevel: 'CRITICAL',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 12).toISOString()
    },
    {
        id: 'driver-005',
        userId: 'user-005',
        user: users[4],
        licenseNumber: 'D5678901',
        totalDutyHours: 6,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'MEDIUM',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 6).toISOString()
    },
    {
        id: 'driver-006',
        userId: 'user-006',
        user: users[5],
        licenseNumber: 'D6789012',
        totalDutyHours: 2,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 2).toISOString()
    },
    {
        id: 'driver-007',
        userId: 'user-007',
        user: users[6],
        licenseNumber: 'D7890123',
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW'
    },
    {
        id: 'driver-008',
        userId: 'user-008',
        user: users[7],
        licenseNumber: 'D8901234',
        totalDutyHours: 7,
        currentStatus: 'ON_DUTY',
        fatigueLevel: 'MEDIUM',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 7).toISOString()
    },
    {
        id: 'driver-009',
        userId: 'user-009',
        user: users[8],
        licenseNumber: 'D9012345',
        totalDutyHours: 9,
        currentStatus: 'ON_TRIP',
        fatigueLevel: 'HIGH',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 9).toISOString()
    },
    {
        id: 'driver-010',
        userId: 'user-010',
        user: users[9],
        licenseNumber: 'D0123456',
        totalDutyHours: 1,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 1).toISOString()
    },
    {
        id: 'driver-011',
        userId: 'user-011',
        user: users[10],
        licenseNumber: 'D1123456',
        totalDutyHours: 5,
        currentStatus: 'ON_DUTY',
        fatigueLevel: 'MEDIUM',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 5).toISOString()
    },
    {
        id: 'driver-012',
        userId: 'user-012',
        user: users[11],
        licenseNumber: 'D1223456',
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW'
    },
    {
        id: 'driver-013',
        userId: 'user-013',
        user: users[12],
        licenseNumber: 'D1323456',
        totalDutyHours: 10,
        currentStatus: 'ON_DUTY',
        fatigueLevel: 'HIGH',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 10).toISOString()
    },
    {
        id: 'driver-014',
        userId: 'user-014',
        user: users[13],
        licenseNumber: 'D1423456',
        totalDutyHours: 3,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 3).toISOString()
    },
    {
        id: 'driver-015',
        userId: 'user-015',
        user: users[14],
        licenseNumber: 'D1523456',
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW'
    }
];
const vehicles = [
    {
        id: 'vehicle-001',
        plateNumber: 'A123BC',
        vin: 'VIN001',
        type: 'PREMIUM_SEDAN',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 75,
        status: 'ON_TRIP',
        currentLocation: {
            lat: 24.7136,
            lng: 46.6753
        },
        driverId: 'driver-001',
        nextMaintenance: '2024-08-15'
    },
    {
        id: 'vehicle-002',
        plateNumber: 'B456DE',
        vin: 'VIN002',
        type: 'SUV',
        category: 'PASSENGER',
        capacity: 6,
        currentFuel: 90,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.7742,
            lng: 46.7386
        },
        driverId: 'driver-002',
        nextMaintenance: '2024-09-01'
    },
    {
        id: 'vehicle-003',
        plateNumber: 'C789FG',
        vin: 'VIN003',
        type: 'TRUCK_5T',
        category: 'FREIGHT',
        capacity: 5000,
        currentFuel: 60,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.4225,
            lng: 39.8262
        },
        driverId: 'driver-005',
        nextMaintenance: '2024-07-30'
    },
    {
        id: 'vehicle-004',
        plateNumber: 'D012HI',
        vin: 'VIN004',
        type: 'MINI_BUS',
        category: 'PASSENGER',
        capacity: 15,
        currentFuel: 40,
        status: 'MAINTENANCE',
        currentLocation: {
            lat: 26.3986,
            lng: 50.2083
        },
        nextMaintenance: '2024-07-25'
    },
    {
        id: 'vehicle-005',
        plateNumber: 'E345JK',
        vin: 'VIN005',
        type: 'SEDAN',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 100,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.7400,
            lng: 46.6500
        },
        driverId: 'driver-010',
        nextMaintenance: '2024-10-10'
    },
    {
        id: 'vehicle-006',
        plateNumber: 'F678LM',
        vin: 'VIN006',
        type: 'TRUCK_10T',
        category: 'FREIGHT',
        capacity: 10000,
        currentFuel: 80,
        status: 'ON_TRIP',
        currentLocation: {
            lat: 24.8033,
            lng: 46.7667
        },
        driverId: 'driver-009',
        nextMaintenance: '2024-08-20'
    },
    {
        id: 'vehicle-007',
        plateNumber: 'G901NO',
        vin: 'VIN007',
        type: 'SUV',
        category: 'PASSENGER',
        capacity: 6,
        currentFuel: 55,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.5433,
            lng: 39.1728
        },
        driverId: 'driver-008',
        nextMaintenance: '2024-11-05'
    },
    {
        id: 'vehicle-008',
        plateNumber: 'H234PQ',
        vin: 'VIN008',
        type: 'LUXURY_CAR',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 25,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.4858,
            lng: 39.1925
        },
        nextMaintenance: '2024-09-12'
    },
    {
        id: 'vehicle-009',
        plateNumber: 'I567RS',
        vin: 'VIN009',
        type: 'FORKLIFT',
        category: 'EQUIPMENT',
        capacity: 2000,
        currentFuel: 95,
        status: 'OUT_OF_SERVICE',
        currentLocation: {
            lat: 26.2167,
            lng: 50.1833
        }
    },
    {
        id: 'vehicle-010',
        plateNumber: 'J890TU',
        vin: 'VIN010',
        type: 'LIGHT_BUS',
        category: 'PASSENGER',
        capacity: 25,
        currentFuel: 70,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.6877,
            lng: 46.7219
        },
        driverId: 'driver-011',
        nextMaintenance: '2024-12-01'
    },
    {
        id: 'vehicle-011',
        plateNumber: 'K123VW',
        vin: 'VIN011',
        type: 'TRUCK_15T',
        category: 'FREIGHT',
        capacity: 15000,
        currentFuel: 50,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.3891,
            lng: 39.8579
        },
        driverId: 'driver-013',
        nextMaintenance: '2024-08-22'
    },
    {
        id: 'vehicle-012',
        plateNumber: 'L456XY',
        vin: 'VIN012',
        type: 'SEDAN',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 85,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.6333,
            lng: 46.7167
        },
        driverId: 'driver-014',
        nextMaintenance: '2024-10-18'
    },
    {
        id: 'vehicle-013',
        plateNumber: 'M789ZA',
        vin: 'VIN013',
        type: 'MPV',
        category: 'PASSENGER',
        capacity: 7,
        currentFuel: 65,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.6167,
            lng: 39.1500
        },
        nextMaintenance: '2024-11-25'
    },
    {
        id: 'vehicle-014',
        plateNumber: 'N012AB',
        vin: 'VIN014',
        type: 'HEAVY_BUS',
        category: 'PASSENGER',
        capacity: 50,
        currentFuel: 78,
        status: 'MAINTENANCE',
        currentLocation: {
            lat: 24.7136,
            lng: 46.6753
        },
        nextMaintenance: '2024-07-28'
    },
    {
        id: 'vehicle-015',
        plateNumber: 'P345CD',
        vin: 'VIN015',
        type: 'FLATBED',
        category: 'FREIGHT',
        capacity: 20000,
        currentFuel: 92,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 26.4333,
            lng: 50.1167
        },
        driverId: 'driver-006',
        nextMaintenance: '2024-09-30'
    }
];
vehicles.forEach((v)=>{
    if (v.driverId) {
        const driver = drivers.find((d)=>d.id === v.driverId);
        if (driver) {
            v.driver = driver;
        }
    }
});
const trips = [
    {
        id: 'trip-001',
        jobId: 'JOB-9A4B1C',
        type: 'PASSENGER',
        status: 'POB',
        pickupLocation: {
            lat: 24.9876,
            lng: 46.6243,
            address: 'King Khalid International Airport, Riyadh'
        },
        dropoffLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'Kingdom Centre, Riyadh'
        },
        scheduledAt: '2024-07-28T10:00:00Z',
        vehicleId: 'vehicle-001',
        driverId: 'driver-001',
        distance: 35,
        fare: 120.50
    },
    {
        id: 'trip-002',
        jobId: 'JOB-8D7E6F',
        type: 'SHIPMENT',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 21.4225,
            lng: 39.8262,
            address: 'Jeddah Islamic Port'
        },
        dropoffLocation: {
            lat: 21.5433,
            lng: 39.1728,
            address: 'Al-Balad Warehouse, Jeddah'
        },
        scheduledAt: '2024-07-28T09:00:00Z',
        completedAt: '2024-07-28T11:30:00Z',
        vehicleId: 'vehicle-003',
        driverId: 'driver-005',
        distance: 55,
        fare: 450.00
    },
    {
        id: 'trip-003',
        jobId: 'JOB-7G6H5I',
        type: 'PASSENGER',
        status: 'PENDING',
        pickupLocation: {
            lat: 21.6167,
            lng: 39.1500,
            address: 'Red Sea Mall, Jeddah'
        },
        dropoffLocation: {
            lat: 21.4858,
            lng: 39.1925,
            address: 'Jeddah Corniche'
        },
        scheduledAt: '2024-07-28T14:00:00Z',
        vehicleId: 'vehicle-005',
        driverId: 'driver-010',
        distance: 12,
        fare: 45.00
    },
    {
        id: 'trip-004',
        jobId: 'JOB-6J5K4L',
        type: 'EQUIPMENT',
        status: 'AT_WORK',
        pickupLocation: {
            lat: 26.4333,
            lng: 50.1167,
            address: 'Dammam Industrial City 2'
        },
        dropoffLocation: {
            lat: 26.3986,
            lng: 50.2083,
            address: 'KFUPM, Dhahran'
        },
        scheduledAt: '2024-07-28T15:00:00Z',
        vehicleId: 'vehicle-006',
        driverId: 'driver-009',
        distance: 30,
        fare: 750.00
    },
    {
        id: 'trip-005',
        jobId: 'JOB-5L4M3N',
        type: 'PASSENGER',
        status: 'CANCELLED',
        pickupLocation: {
            lat: 24.6877,
            lng: 46.7219,
            address: 'Riyadh Park Mall'
        },
        dropoffLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'Al-Masmak Fortress, Riyadh'
        },
        scheduledAt: '2024-07-27T18:00:00Z',
        vehicleId: 'vehicle-007',
        driverId: 'driver-008',
        distance: 15,
        fare: 55.00
    },
    {
        id: 'trip-006',
        jobId: 'JOB-4N3O2P',
        type: 'SHIPMENT',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 21.3891,
            lng: 39.8579,
            address: 'Makkah Industrial Area'
        },
        dropoffLocation: {
            lat: 21.4225,
            lng: 39.8262,
            address: 'Abraj Al-Bait, Makkah'
        },
        scheduledAt: '2024-07-27T12:00:00Z',
        completedAt: '2024-07-27T13:30:00Z',
        vehicleId: 'vehicle-011',
        driverId: 'driver-013',
        distance: 25,
        fare: 600.00
    },
    {
        id: 'trip-007',
        jobId: 'JOB-3P2Q1R',
        type: 'PASSENGER',
        status: 'ON_ROUTE',
        pickupLocation: {
            lat: 24.6333,
            lng: 46.7167,
            address: 'Diriyah, Riyadh'
        },
        dropoffLocation: {
            lat: 24.8033,
            lng: 46.7667,
            address: 'Riyadh Front'
        },
        scheduledAt: '2024-07-28T11:00:00Z',
        vehicleId: 'vehicle-008',
        driverId: 'driver-004',
        distance: 28,
        fare: 95.00
    },
    {
        id: 'trip-008',
        jobId: 'JOB-2R1S0T',
        type: 'PASSENGER',
        status: 'PENDING',
        pickupLocation: {
            lat: 21.6167,
            lng: 39.1500,
            address: 'Mall of Arabia, Jeddah'
        },
        dropoffLocation: {
            lat: 21.5433,
            lng: 39.1728,
            address: 'Jeddah Waterfront'
        },
        scheduledAt: '2024-07-28T16:30:00Z',
        vehicleId: 'vehicle-012',
        driverId: 'driver-014',
        distance: 18,
        fare: 65.00
    }
].map((trip)=>{
    const vehicle = vehicles.find((v)=>v.id === trip.vehicleId);
    const driver = drivers.find((d)=>d.id === trip.driverId);
    return {
        ...trip,
        vehicle,
        driver,
        estimatedDuration: trip.distance ? Math.round(trip.distance * 2.5) : 0
    };
});
}),
"[project]/src/components/data-table/data-table.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DataTable",
    ()=>DataTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DataTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DataTable() from the server but DataTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/data-table/data-table.tsx <module evaluation>", "DataTable");
}),
"[project]/src/components/data-table/data-table.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DataTable",
    ()=>DataTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DataTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DataTable() from the server but DataTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/data-table/data-table.tsx", "DataTable");
}),
"[project]/src/components/data-table/data-table.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$data$2d$table$2f$data$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/data-table/data-table.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$data$2d$table$2f$data$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/data-table/data-table.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$data$2d$table$2f$data$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/dashboard/jobs/columns.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "columns",
    ()=>columns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call columns() from the server but columns is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/dashboard/jobs/columns.tsx <module evaluation>", "columns");
}),
"[project]/src/app/dashboard/jobs/columns.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "columns",
    ()=>columns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call columns() from the server but columns is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/dashboard/jobs/columns.tsx", "columns");
}),
"[project]/src/app/dashboard/jobs/columns.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$jobs$2f$columns$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/dashboard/jobs/columns.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$jobs$2f$columns$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/jobs/columns.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$jobs$2f$columns$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/page-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
function PageHeader({ title, description, action, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-1 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl md:text-2xl font-bold tracking-tight",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/page-header.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/page-header.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/page-header.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0",
                children: action
            }, void 0, false, {
                fileName: "[project]/src/components/page-header.tsx",
                lineNumber: 19,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/page-header.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
;
}),
"[project]/src/app/dashboard/jobs/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JobsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$data$2d$table$2f$data$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/data-table/data-table.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$jobs$2f$columns$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/jobs/columns.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/page-header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-rsc] (ecmascript) <export default as PlusCircle>");
;
;
;
;
;
;
;
function JobsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Jobs",
                description: "Manage all transportation jobs and assignments.",
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/jobs/page.tsx",
                            lineNumber: 14,
                            columnNumber: 25
                        }, void 0),
                        "Create Job"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/jobs/page.tsx",
                    lineNumber: 14,
                    columnNumber: 17
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/jobs/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$data$2d$table$2f$data$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DataTable"], {
                columns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$jobs$2f$columns$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["columns"],
                data: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trips"]
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/jobs/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/jobs/page.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/dashboard/jobs/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/jobs/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a6e7f3a3._.js.map