"use client"

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Truck, Users, AlertTriangle, ShipWheel, MessageSquare, LocateIcon } from "lucide-react";
import { vehicles, drivers, conversations } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { PageHeader } from "@/components/page-header";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { TripStatus, FatigueLevel, VehicleType, Driver, Trip, RiskLevel } from "@/lib/types";
import { isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { useTripsStore } from "@/store/trips-store";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const RiskIndicator = ({ level }: { level?: RiskLevel }) => {
    if (!level) return null;
    const riskConfig = {
        LOW: { color: "bg-green-500", label: "Low Risk" },
        MEDIUM: { color: "bg-yellow-500", label: "Medium Risk" },
        HIGH: { color: "bg-red-500", label: "High Risk" },
    };
    const config = riskConfig[level];

    return (
        <div className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", config.color)} />
            <span className="text-xs text-muted-foreground hidden lg:inline">{config.label}</span>
        </div>
    )
}

export default function DashboardPage() {
  const { trips } = useTripsStore();

  const activeTripStatuses: TripStatus[] = ['ACCEPTED', 'TO_PICKUP', 'ARRIVED', 'BOARDED', 'POB', 'ON_ROUTE', 'AT_DROPOFF', 'AT_PICKUP', 'LOADING', 'UNLOADING'];
  const activeTrips = trips.filter(
    (t) => activeTripStatuses.includes(t.status)
  ).length;
  const idleDrivers = drivers.filter((d) => d.currentStatus === "ON_DUTY" && !trips.some(t => t.driverId === d.id && (t.status === 'ON_ROUTE' || t.status === 'POB' || t.status === 'ON_TRIP'))).length;
  
  const criticalAlerts = drivers.filter(
    (d) => d.fatigueLevel === "CRITICAL" || d.fatigueLevel === "HIGH"
  ).length;
  
  const unreadConversations = conversations.filter(
    (c) => c.messages[c.messages.length - 1]?.sender === 'other'
  ).length;

  // --- FLEET COMPOSITION CHART LOGIC ---
  const vehicleTypeMap = new Map<string, number>();
  vehicles.forEach(vehicle => {
      const normalizedType = vehicle.type.trim().toUpperCase().replace(/ /g, '_');
      if (!vehicleTypeMap.has(normalizedType)) {
          vehicleTypeMap.set(normalizedType, 0);
      }
      vehicleTypeMap.set(normalizedType, vehicleTypeMap.get(normalizedType)! + 1);
  });

  const chartDataFleetComposition = Array.from(vehicleTypeMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  // --- END FLEET COMPOSITION CHART LOGIC ---


  // --- DRIVER FATIGUE CHART LOGIC ---
  const allFatigueLevels: FatigueLevel[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const fatigueData = new Map<FatigueLevel, number>(
    allFatigueLevels.map(level => [level, 0])
  );
  
  drivers.forEach(driver => {
    const level = driver.fatigueLevel;
    if (fatigueData.has(level)) {
      fatigueData.set(level, fatigueData.get(level)! + 1);
    }
  });

  const chartDataFatigue = Array.from(fatigueData.entries()).map(([name, value]) => ({
    name,
    value,
  }));
  
  const COLORS = {
    LOW: "hsl(var(--chart-2))",
    MEDIUM: "#f59e0b",
    HIGH: "#f97316",
    CRITICAL: "hsl(var(--destructive))",
  };
  // --- END DRIVER FATIGUE CHART LOGIC ---

  const awaitingJobs = useMemo(() => trips.filter(trip => trip.status === 'PENDING'), [trips]);
  const availableDrivers = drivers.filter(d => d.currentStatus === 'AVAILABLE');

  const getQualifiedDrivers = (jobType: "PASSENGER" | "SHIPMENT" | "EQUIPMENT"): Driver[] => {
    return availableDrivers.filter(driver => {
      if (jobType === 'PASSENGER') {
        // Standard drivers can handle passenger jobs. Heavy drivers can only if they drive a bus.
        if (driver.user.role === 'DRIVER') return true;
        if (driver.user.role === 'HEAVY_DRIVER') {
           const vehicle = vehicles.find(v => v.driverId === driver.id);
           return vehicle && (vehicle.type === 'MINI_BUS' || vehicle.type === 'LIGHT_BUS' || vehicle.type === 'HEAVY_BUS');
        }
      }
      if (jobType === 'SHIPMENT' || jobType === 'EQUIPMENT') {
        // Only heavy drivers can handle freight/equipment.
        return driver.user.role === 'HEAVY_DRIVER';
      }
      return false;
    });
  };


  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your fleet operations." />
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
        <Link href="/dashboard/fleet">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.length}</div>
              <p className="text-xs text-muted-foreground">Managed across the fleet</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/sms">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadConversations}</div>
              <p className="text-xs text-muted-foreground">Conversations needing a reply</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/jobs">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
              <ShipWheel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTrips}</div>
              <p className="text-xs text-muted-foreground">Currently on route</p>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{idleDrivers}</div>
            <p className="text-xs text-muted-foreground">Available for dispatch</p>
          </CardContent>
        </Card>
        <Link href="/dashboard/drivers" className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Card className="hover:bg-accent transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">{criticalAlerts}</div>
                <p className="text-xs text-muted-foreground">High/Critical fatigue alerts</p>
            </CardContent>
            </Card>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 md:gap-8">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Fleet Composition</CardTitle>
            <CardDescription>Total number of vehicles per type across the entire fleet.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={chartDataFleetComposition} layout="vertical" margin={{ left: 120, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={110} interval={0} tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="Vehicles" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Driver Fatigue Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie data={chartDataFatigue} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {chartDataFatigue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Awaiting Jobs ({awaitingJobs.length})</CardTitle>
          <CardDescription>These jobs are pending and need to be assigned to a driver and vehicle.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="overflow-x-auto">
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Dropoff</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Qualified Driver</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-center">Locate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {awaitingJobs.length > 0 ? awaitingJobs.map((trip) => {
                  const qualifiedDrivers = getQualifiedDrivers(trip.type);
                  return (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium text-primary">{trip.jobId}</TableCell>
                    <TableCell>{trip.type}</TableCell>
                    <TableCell>{trip.pickupLocation.address}</TableCell>
                    <TableCell>{trip.dropoffLocation.address}</TableCell>
                    <TableCell>{new Date(trip.scheduledAt).toLocaleString()}</TableCell>
                    <TableCell>{trip.distance ? `${trip.distance.toFixed(1)} km` : 'N/A'}</TableCell>
                    <TableCell>
                      <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select a driver" />
                          </SelectTrigger>
                          <SelectContent>
                            {qualifiedDrivers.length > 0 ? (
                              qualifiedDrivers.map(driver => (
                                <SelectItem key={driver.id} value={driver.id}>
                                  {driver.user.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-drivers" disabled>
                                No qualified drivers
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                    </TableCell>
                    <TableCell>
                      <RiskIndicator level={qualifiedDrivers[0]?.risk || 'LOW'} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/fleet/tracking?lat=${trip.pickupLocation.lat}&lng=${trip.pickupLocation.lng}&jobId=${trip.jobId}`}>
                            <LocateIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No jobs are currently awaiting assignment.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
           </div>
        </CardContent>
      </Card>
    </>
  );
}
