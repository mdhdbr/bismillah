
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
import { Bar, BarChart, CartesianGrid, Legend, Line, ComposedChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trips, drivers, vehicles } from "@/lib/data";
import { TripStatus } from "@/lib/types";
import { format, subDays, parseISO } from 'date-fns';
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Percent } from "lucide-react";


// --- Financial Performance ---
const COST_PER_KM = 0.55; // Estimated cost per kilometer in SAR
const financialData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dailyTrips = trips.filter(t => t.completedAt && format(new Date(t.completedAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    
    const revenue = dailyTrips.reduce((sum, trip) => sum + (trip.fare || 0), 0);
    const costs = dailyTrips.reduce((sum, trip) => sum + ((trip.distance || 0) * COST_PER_KM), 0);

    return {
        date: format(date, 'MMM dd'),
        Revenue: revenue,
        Costs: costs,
    };
});

// --- On-Time Performance ---
const ON_TIME_GRACE_PERIOD_MINUTES = 15;
const performance = { onTime: 0, early: 0, delayed: 0 };
trips.forEach(trip => {
    if (trip.status === 'COMPLETED' && trip.completedAt && trip.estimatedDuration) {
        const scheduled = parseISO(trip.scheduledAt);
        const completed = parseISO(trip.completedAt);
        const estimatedArrival = new Date(scheduled.getTime() + trip.estimatedDuration * 60000);
        const gracePeriodEnd = new Date(estimatedArrival.getTime() + ON_TIME_GRACE_PERIOD_MINUTES * 60000);

        if (completed <= gracePeriodEnd && completed >= estimatedArrival) {
            performance.onTime++;
        } else if (completed < estimatedArrival) {
            performance.early++;
        } else {
            performance.delayed++;
        }
    }
});
const onTimePerformanceData = [
    { name: 'On Time', value: performance.onTime, fill: 'hsl(var(--chart-2))' },
    { name: 'Delayed', value: performance.delayed, fill: 'hsl(var(--chart-3))' },
    { name: 'Early', value: performance.early, fill: 'hsl(var(--chart-1))' },
];

// --- Trip Status Distribution ---
const tripStatusData = trips.reduce((acc, trip) => {
    acc[trip.status] = (acc[trip.status] || 0) + 1;
    return acc;
}, {} as Record<TripStatus, number>);
const tripStatusChartData = Object.entries(tripStatusData).map(([name, value]) => ({ name, value }));
const STATUS_COLORS: Record<string, string> = {
    PENDING: "#f97316", ON_ROUTE: "#3b82f6", POB: "#3b82f6", COMPLETED: "#16a34a", CANCELLED: "#ef4444",
    AT_PICKUP: "#eab308", AT_DROPOFF: "#eab308", ACCEPTED: "#8b5cf6", LOADING: "#eab308", UNLOADING: "#f59e0b",
    ARRIVED: "#14b8a6", AT_WORK: "#6366f1"
};

// --- Vehicle Utilization ---
const utilizationData = vehicles.map(v => {
    const completedTrips = trips.filter(t => t.vehicleId === v.id && t.status === 'COMPLETED').length;
    return { name: v.plateNumber, trips: completedTrips };
}).sort((a,b) => b.trips - a.trips).slice(0, 10);


function KpiInputCard() {
    const [totalTrips, setTotalTrips] = useState(1000);
    const [accountableAccidents, setAccountableAccidents] = useState(2);
    const [unaccountableAccidents, setUnaccountableAccidents] = useState(5);
    const [accountableComplaints, setAccountableComplaints] = useState(4);
    const [unaccountableComplaints, setUnaccountableComplaints] = useState(10);
    const [onTimeTrips, setOnTimeTrips] = useState(950);
    const [onTimeTarget, setOnTimeTarget] = useState(98);

    const kpiData = useMemo(() => {
        const accidentRate = totalTrips > 0 ? (accountableAccidents * 100000) / totalTrips : 0;
        const complaintRate = totalTrips > 0 ? (accountableComplaints / totalTrips) * 100 : 0;
        const onTimeRate = totalTrips > 0 ? (onTimeTrips / totalTrips) * 100 : 0;

        return [
            { name: "Accident Rate (per 100k)", Actual: accidentRate, Target: 0, fill: "hsl(var(--chart-3))" },
            { name: "Complaint Rate (%)", Actual: complaintRate, Target: 0, fill: "hsl(var(--chart-4))" },
            { name: "On-Time Arrival (%)", Actual: onTimeRate, Target: onTimeTarget, fill: "hsl(var(--chart-2))" },
        ];
    }, [totalTrips, accountableAccidents, accountableComplaints, onTimeTrips, onTimeTarget]);

    const formatTooltipValue = (value: any, name: string) => {
        if (name.includes('%')) {
             return `${Number(value).toFixed(2)}%`;
        }
        return Number(value).toFixed(2);
    }

    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Safety, People, & Customer KPIs</CardTitle>
                <CardDescription>Key performance indicators for non-financial metrics.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-semibold text-center">Monthly Data Input</h3>
                     <div className="grid grid-cols-2 gap-2">
                         <div className="space-y-2 col-span-2">
                            <Label htmlFor="total-trips">Total Trips per Month</Label>
                            <Input id="total-trips" type="number" value={totalTrips} onChange={e => setTotalTrips(Number(e.target.value))} />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="acc-accidents">Accountable Accidents</Label>
                            <Input id="acc-accidents" type="number" value={accountableAccidents} onChange={e => setAccountableAccidents(Number(e.target.value))} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="unacc-accidents">Unaccountable Accidents</Label>
                            <Input id="unacc-accidents" type="number" value={unaccountableAccidents} onChange={e => setUnaccountableAccidents(Number(e.target.value))} />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="acc-complaints">Accountable Complaints</Label>
                            <Input id="acc-complaints" type="number" value={accountableComplaints} onChange={e => setAccountableComplaints(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="unacc-complaints">Unaccountable Complaints</Label>
                            <Input id="unacc-complaints" type="number" value={unaccountableComplaints} onChange={e => setUnaccountableComplaints(Number(e.target.value))} />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="on-time-trips">On-Time Trips</Label>
                            <Input id="on-time-trips" type="number" value={onTimeTrips} onChange={e => setOnTimeTrips(Number(e.target.value))} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="on-time-target">On-Time Target (%)</Label>
                            <Input id="on-time-target" type="number" value={onTimeTarget} onChange={e => setOnTimeTarget(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                 <div className="flex flex-col justify-end pt-8">
                    <ChartContainer config={{}} className="h-[250px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={kpiData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={140} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))' }}
                                    content={<ChartTooltipContent
                                        formatter={(value, name, item) => (
                                            <div className="flex items-center">
                                                <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.payload.name.includes('Target') ? 'hsl(var(--muted-foreground))' : 'hsl(var(--primary))' }} />
                                                <span>{`${name}: ${formatTooltipValue(value, item.payload.name)}`}</span>
                                            </div>
                                        )}
                                    />}
                                />
                                <Legend />
                                <Bar dataKey="Target" fill="hsl(var(--muted-foreground))" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="Actual" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="KPI Dashboard"
        description="Analyze fleet performance and operational efficiency."
      />
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Financial Performance (Last 7 Days)</CardTitle>
                <CardDescription>Tracking daily revenue against estimated operational costs.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[350px] w-full">
                    <ResponsiveContainer>
                       <ComposedChart data={financialData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tickLine={false} axisLine={false} />
                          <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `SAR ${value}`} />
                          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--destructive))" tickFormatter={(value) => `SAR ${value}`} />
                          <Tooltip content={<ChartTooltipContent formatter={(value, name) => `${name}: SAR ${Number(value).toFixed(2)}`} />} />
                          <Legend />
                          <Bar dataKey="Revenue" yAxisId="left" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Line type="monotone" dataKey="Costs" yAxisId="right" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} />
                       </ComposedChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>On-Time Performance</CardTitle>
                 <CardDescription>Distribution of completed trips.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                     <ResponsiveContainer>
                        <PieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Pie data={onTimePerformanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {onTimePerformanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Legend />
                         </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Live Trip Status</CardTitle>
                <CardDescription>Distribution of all jobs by their current status.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer>
                        <BarChart data={tripStatusChartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="name" tick={{fontSize: 10}} angle={-45} textAnchor="end" height={50} />
                            <YAxis allowDecimals={false} />
                            <Tooltip content={<ChartTooltipContent />} cursor={{fill: 'hsl(var(--muted))'}} />
                            <Bar dataKey="value" name="Trips" radius={[4, 4, 0, 0]}>
                                {tripStatusChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#9ca3af'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        
        <KpiInputCard />

      </div>
    </>
  );
}
