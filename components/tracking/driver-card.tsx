
"use client";

import { useState, useEffect } from "react";
import { useTrackingStore } from "@/store/tracking-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Phone, MessageSquare, Briefcase, Clock, Search, Check, ChevronsUpDown, Send, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVehiclesStore } from "@/store/vehicles-store";
import { useTripsStore } from "@/store/trips-store";
import type { Vehicle, Trip } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { forecastNextTrip, ForecastNextTripOutput } from "@/ai/flows/forecast-next-trip";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";

interface DriverCardProps {
  // jobId is now read from searchParams
}

export default function DriverCard({}: DriverCardProps) {
  const { selectedVehicle, selectVehicle } = useTrackingStore();
  const { vehicles } = useVehiclesStore();
  const { trips } = useTripsStore();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [activeVehicles, setActiveVehicles] = useState<Vehicle[]>([]);
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecast, setForecast] = useState<ForecastNextTripOutput | null>(null);

  const jobId = searchParams.get('jobId');

  useEffect(() => {
    const filterAndSetVehicles = () => {
      // If a jobId is present, we only want to see available vehicles. Otherwise, show all active.
      const filtered = vehicles.filter(vehicle => {
        const hasActiveDriver = vehicle.driver && ['ON_DUTY', 'AVAILABLE', 'ON_TRIP'].includes(vehicle.driver.currentStatus);
        if (jobId) {
            return vehicle.status === 'AVAILABLE' && hasActiveDriver;
        }
        return vehicle.status !== 'OUT_OF_SERVICE' && hasActiveDriver;
      });
      setActiveVehicles(filtered);
    };

    filterAndSetVehicles();
    const intervalId = setInterval(filterAndSetVehicles, 60000);
    return () => clearInterval(intervalId);
  }, [jobId, vehicles]);

  useEffect(() => {
    // When the selected vehicle changes, clear any previous forecast.
    setForecast(null);
  }, [selectedVehicle]);

  const handleSelectVehicle = (vehicleId: string) => {
    const foundVehicle = vehicles.find(v => v.id === vehicleId);

    if (foundVehicle) {
      selectVehicle(foundVehicle);
      toast({
        title: "Vehicle Found",
        description: `Now viewing ${foundVehicle.plateNumber}.`,
      });
       setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Not Found",
        description: `No vehicle found for the selected ID.`,
      });
    }
  };

  const handleAssignJob = () => {
    if (!selectedVehicle || !selectedVehicle.driver) {
        toast({ variant: 'destructive', title: 'Cannot Assign Job', description: 'No driver is associated with this vehicle.'});
        return;
    }
    if (!jobId) {
        toast({ variant: 'destructive', title: 'No Job Specified', description: 'Cannot assign a job without a Job ID.'});
        return;
    }

    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set('driverId', selectedVehicle.driver.id);
    currentParams.set('vehicleId', selectedVehicle.id);

    // Navigate back to the dispatch page with all the necessary info
    router.push(`/dashboard/dispatch?${currentParams.toString()}`);
  };

  const handleForecast = async () => {
    if (!selectedVehicle || !selectedVehicle.driver) return;
    const currentTrip = trips.find(t => t.driverId === selectedVehicle?.driverId && t.status !== 'COMPLETED' && t.status !== 'CANCELLED');
    if (!currentTrip) {
        toast({ variant: 'destructive', title: 'No Active Trip', description: 'Cannot forecast without an active trip to complete first.' });
        return;
    }
    
    setIsForecasting(true);
    setForecast(null);
    try {
        const result = await forecastNextTrip(selectedVehicle, currentTrip);
        setForecast(result);
    } catch (e) {
        console.error(e);
        toast({ variant: 'destructive', title: 'Forecasting Failed', description: 'The AI model could not generate a forecast.' });
    } finally {
        setIsForecasting(false);
    }
  }


  return (
    <div className="p-4 h-full flex flex-col">
        {!selectedVehicle ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                 <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>{jobId ? 'Find & Assign Driver' : 'Find Vehicle'}</CardTitle>
                        <CardDescription>
                            {jobId ? 'Select an available vehicle to assign this job to.' : 'Search by plate number, driver, or type.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                                >
                                {selectedVehicle
                                    ? selectedVehicle.plateNumber
                                    : activeVehicles.length > 0 ? `Select from ${activeVehicles.length} vehicles...` : "No available vehicles"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                                <Command>
                                <CommandInput placeholder="Search vehicles..." />
                                <CommandList>
                                <CommandEmpty>No vehicle found.</CommandEmpty>
                                <CommandGroup>
                                    {activeVehicles.map((vehicle) => (
                                    <CommandItem
                                        key={vehicle.id}
                                        value={`${vehicle.plateNumber} ${vehicle.driver?.user.name} ${vehicle.type}`}
                                        onSelect={() => {
                                           handleSelectVehicle(vehicle.id)
                                        }}
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedVehicle?.id === vehicle.id ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        <div className="flex flex-col">
                                            <span>{vehicle.plateNumber}</span>
                                            <span className="text-xs text-muted-foreground">{vehicle.driver?.user.name || 'Unassigned'}</span>
                                        </div>
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </CardContent>
                </Card>
                <div className="mt-8 text-muted-foreground">
                    <Briefcase className="h-12 w-12 mb-4 mx-auto" />
                    <h3 className="font-semibold">No Vehicle Selected</h3>
                    <p className="text-sm">Select a vehicle from the dropdown above to see its details.</p>
                </div>
            </div>
        ) : (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{selectedVehicle.plateNumber}</CardTitle>
                            <CardDescription>{selectedVehicle.type}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => selectVehicle(undefined)}>Clear Selection</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm">
                        <p><strong>Status:</strong> {selectedVehicle.status}</p>
                        <p><strong>Fuel:</strong> {selectedVehicle.currentFuel}%</p>
                    </div>

                    {selectedVehicle.driver && (
                        <>
                            <Separator />
                            <div>
                                <h4 className="font-semibold mb-2">Driver Details</h4>
                                <div className="text-sm space-y-1">
                                    <p><strong>Name:</strong> {selectedVehicle.driver.user.name}</p>
                                    <p><strong>Phone:</strong> {selectedVehicle.driver.user.phone || 'N/A'}</p>
                                    <p><strong>Fatigue Level:</strong> {selectedVehicle.driver.fatigueLevel}</p>
                                </div>
                            </div>
                        </>
                    )}

                    <Separator />
                    
                    {jobId ? (
                        <Button className="w-full" onClick={handleAssignJob} disabled={!selectedVehicle.driver}>
                            <Send className="mr-2 h-4 w-4" />
                            Assign Job to Driver
                        </Button>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" asChild disabled={!selectedVehicle.driver?.user.phone}>
                            <a href={`tel:${selectedVehicle.driver?.user.phone}`}>
                                <Phone className="mr-2 h-4 w-4"/> Call
                            </a>
                            </Button>
                            <Button variant="outline" asChild disabled={!selectedVehicle.driverId}>
                            <Link href={`/dashboard/sms?driverId=${selectedVehicle.driverId}`}>
                                <MessageSquare className="mr-2 h-4 w-4"/> Message
                            </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex-grow p-4 mt-4 border rounded-lg bg-muted/50">
                 <Button className="w-full mb-4" onClick={handleForecast} disabled={isForecasting}>
                    <Bot className="mr-2 h-4 w-4" />
                    {isForecasting ? "Forecasting..." : "Forecast Next Trip"}
                </Button>

                {isForecasting && <Skeleton className="w-full h-24" />}
                
                {forecast && (
                     <Alert>
                        <Bot className="h-4 w-4" />
                        <AlertTitle>AI Recommendation</AlertTitle>
                        <AlertDescription>
                            <p className="mb-2">{forecast.reasoning}</p>
                            {forecast.nextJobId && (
                                <p className="font-semibold">Suggested Next Job: <span className="text-primary">{forecast.nextJobId}</span></p>
                            )}
                        </AlertDescription>
                    </Alert>
                )}

                 {!forecast && !isForecasting && (
                     <div className="text-center text-muted-foreground text-sm py-8">
                         <h4 className="font-semibold mb-2 flex items-center justify-center"><Clock className="mr-2 h-4 w-4"/> Activity Log</h4>
                        <p>No recent activity.</p>
                        <p className="mt-4">Click "Forecast" to get an AI-powered job recommendation.</p>
                    </div>
                )}
            </div>
        </>
        )}
    </div>
  );
}
