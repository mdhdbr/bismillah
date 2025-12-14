"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";
import { trips, drivers, vehicles } from "@/lib/data";
import { addDays, format, startOfWeek } from 'date-fns';

const tripDataByDay = trips.reduce((acc, trip) => {
    if (trip.completedAt) {
        const day = format(new Date(trip.completedAt), 'yyyy-MM-dd');
        if (!acc[day]) {
            acc[day] = 0;
        }
        acc[day]++;
    }
    return acc;
}, {} as Record<string, number>);

const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
const tripChartData = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i);
    const dayKey = format(date, 'yyyy-MM-dd');
    return {
        date: format(date, 'MMM dd'),
        trips: tripDataByDay[dayKey] || 0
    }
});


const vehicleStatusData = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const vehicleStatusChartData = Object.entries(vehicleStatusData).map(([name, value]) => ({ name, value }));

const COLORS = {
  AVAILABLE: "hsl(var(--chart-2))",
  ON_TRIP: "hsl(var(--chart-1))",
  MAINTENANCE: "#f59e0b",
  ASSIGNED: "#3b82f6",
  OUT_OF_SERVICE: "hsl(var(--destructive))",
};


export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Analyze fleet performance and operational efficiency."
      />
      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Completed Trips This Week</CardTitle>
                <CardDescription>Number of trips completed each day over the last week.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[350px] w-full">
                    <ResponsiveContainer>
                        <LineChart data={tripChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="trips" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Current Vehicle Status</CardTitle>
                     <CardDescription>Breakdown of the fleet's current operational status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                         <ResponsiveContainer>
                            <PieChart>
                                <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                                <Pie data={vehicleStatusChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {vehicleStatusChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                ))}
                                </Pie>
                             </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Trip Distance Distribution</CardTitle>
                    <CardDescription>Distribution of trip distances across the fleet.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{}} className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={trips.filter(t => t.distance)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="jobId" tick={false} label="Trips" />
                                <YAxis label={{ value: 'km', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip content={<ChartTooltipContent />} cursor={{fill: 'hsl(var(--muted))'}} />
                                <Bar dataKey="distance" name="Distance (km)" fill="hsl(var(--accent))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
