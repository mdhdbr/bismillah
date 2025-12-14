

"use client"

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
import { Truck, Users, AlertTriangle, ShipWheel, MessageSquare } from "lucide-react";
import { vehicles, drivers, trips } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { PageHeader } from "@/components/page-header";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

export default function DashboardPage() {
  const activeTrips = trips.filter(
    (t) => t.status === "ON_ROUTE" || t.status === "POB"
  ).length;
  const idleDrivers = drivers.filter((d) => d.currentStatus === "ON_DUTY" && !vehicles.some(v => v.driverId === d.id && v.status === "ON_TRIP")).length;
  const criticalAlerts = drivers.filter(
    (d) => d.fatigueLevel === "CRITICAL"
  ).length;

  const tripsByVehicleType = vehicles.reduce((acc, vehicle) => {
    const type = vehicle.type;
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type] += trips.filter((t) => t.vehicleId === vehicle.id).length;
    return acc;
  }, {} as Record<string, number>);

  const chartDataTrips = Object.entries(tripsByVehicleType)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value).slice(0, 5);

  const fatigueData = drivers.reduce((acc, driver) => {
    acc[driver.fatigueLevel] = (acc[driver.fatigueLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartDataFatigue = Object.entries(fatigueData).map(([name, value]) => ({
    name,
    value,
  }));
  
  const COLORS = {
    LOW: "hsl(var(--chart-2))",
    MEDIUM: "#f59e0b",
    HIGH: "#f97316",
    CRITICAL: "hsl(var(--destructive))",
  };

  const recentTrips = trips.slice(0, 5);

  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your fleet operations." />
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground">Managed across the fleet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">Messages exchanged today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
            <ShipWheel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTrips}</div>
            <p className="text-xs text-muted-foreground">Currently on route</p>
          </CardContent>
        </Card>
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
        <Card className="col-span-2 sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">High fatigue or issues</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 md:gap-8">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Trips by Vehicle Type</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={chartDataTrips} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="Trips" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
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
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="overflow-x-auto">
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Distance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium text-primary">{trip.jobId}</TableCell>
                    <TableCell>{trip.type}</TableCell>
                    <TableCell>{trip.vehicle?.plateNumber}</TableCell>
                    <TableCell>{trip.driver?.user.name}</TableCell>
                    <TableCell><StatusBadge status={trip.status} /></TableCell>
                    <TableCell className="text-right">{trip.distance?.toFixed(1) ?? 'N/A'} km</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
           </div>
        </CardContent>
      </Card>
    </>
  );
}
