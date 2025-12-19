
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDriversStore } from "@/store/drivers-store";
import { useVehiclesStore } from "@/store/vehicles-store";
import { Driver, Vehicle, Trip, VehicleType } from "@/lib/types";
import {
  MapPin,
  User,
  Car,
  Truck as TruckIcon,
  QrCode,
  Mail,
  MessageSquare,
  Send,
  Briefcase,
  Clock,
  CalendarIcon,
  Copy,
  LocateIcon,
  Map as MapIcon,
  Milestone,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { StatusBadge } from "./status-badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { addHours, format } from "date-fns";
import { useTripsStore } from "@/store/trips-store";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDispatchStore } from "@/store/dispatch-store";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { initialPassengerRates, initialShipperRates, initialEquipmentRates, RateDetails, RateState } from "@/lib/rates";

const VAT_RATE = 0.15; // 15%

// Haversine distance calculation
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

const calculateTotalPerUnit = (details: RateDetails) => {
    const { per, rate, damages, handling, waiting, halting } = details;
    const percentageAmount = rate * (per / 100);
    const subtotal = rate + percentageAmount + damages + handling + waiting + halting;
    const vat = subtotal * VAT_RATE;
    return subtotal + vat;
}


export function ManualDispatchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { addTrip } = useTripsStore();
  const { drivers } = useDriversStore();
  const { vehicles } = useVehiclesStore();
  const {
    pickup: sharedPickup,
    dropoff: sharedDropoff,
    setPickup: setSharedPickup,
    setDropoff: setSharedDropoff,
    clearPickup,
    clearDropoff,
  } = useDispatchStore();

  const [bookingType, setBookingType] = useState<"passenger" | "shipper">("passenger");
  
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState(0);
  const [fare, setFare] = useState(0);
  const [notes, setNotes] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType | undefined>();

  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    new Date()
  );
  const [scheduledTime, setScheduledTime] = useState(format(new Date(), "HH:mm"));
  
  const [jobId, setJobId] = useState(`JOB-${Date.now().toString().slice(-6)}`);
  
  // State for post-assignment confirmation
  const [assignedDriver, setAssignedDriver] = useState<Driver | null>(null);
  const [assignedVehicle, setAssignedVehicle] = useState<Vehicle | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const [passengerRates, setPassengerRates] = useState<RateState>(initialPassengerRates);
  const [shipperRates, setShipperRates] = useState<RateState>(initialShipperRates);
  const [equipmentRates, setEquipmentRates] = useState<RateState>(initialEquipmentRates);

  const passengerVehicleTypes = useMemo(() => [
    ...new Set(
      vehicles
        .filter((v) => v.category === "PASSENGER")
        .map((v) => v.type)
    ),
  ], [vehicles]);

  const shipperVehicleTypes = useMemo(() => [
    ...new Set(
      vehicles
        .filter((v) => v.category === "FREIGHT" || v.category === "EQUIPMENT")
        .map((v) => v.type)
    ),
  ], [vehicles]);

  useEffect(() => {
    // Load rates from localStorage on mount
    try {
        const savedPassenger = localStorage.getItem('passengerRates');
        if (savedPassenger) setPassengerRates(JSON.parse(savedPassenger));
        
        const savedShipper = localStorage.getItem('shipperRates');
        if (savedShipper) setShipperRates(JSON.parse(savedShipper));

        const savedEquipment = localStorage.getItem('equipmentRates');
        if (savedEquipment) setEquipmentRates(JSON.parse(savedEquipment));
    } catch (error) {
        console.error("Failed to parse rates from localStorage for dispatch page", error);
    }
  }, []);

  useEffect(() => {
    // This effect runs when the component mounts and when query params change.
    const driverIdParam = searchParams.get('driverId');
    const vehicleIdParam = searchParams.get('vehicleId');
    const jobIdParam = searchParams.get('jobId');

    if (driverIdParam && vehicleIdParam && jobIdParam) {
      const driver = drivers.find(d => d.id === driverIdParam);
      const vehicle = vehicles.find(v => v.id === vehicleIdParam);
      
      if (driver && vehicle) {
        setAssignedDriver(driver);
        setAssignedVehicle(vehicle);
        setIsConfirming(true);

        // Pre-fill form from URL params
        setJobId(jobIdParam);
        const pickupParam = searchParams.get('pickup');
        const dropoffParam = searchParams.get('dropoff');
        const notesParam = searchParams.get('notes');
        const typeParam = searchParams.get('type') as "passenger" | "shipper";
        const fareParam = searchParams.get('fare');

        if (pickupParam) setPickup(decodeURIComponent(pickupParam));
        if (dropoffParam) setDropoff(decodeURIComponent(dropoffParam));
        if (notesParam) setNotes(decodeURIComponent(notesParam));
        if (typeParam) setBookingType(typeParam);
        if (fareParam) setFare(parseFloat(fareParam));

        toast({
            title: "Driver Selected for Assignment",
            description: "Review all job details and click 'Confirm & Dispatch' to finalize.",
        });
      }
    } else {
       // Generate a new job ID if not in confirmation mode
       setJobId(`JOB-${Date.now().toString().slice(-6)}`);
    }
  }, [searchParams, toast, drivers, vehicles]);

  useEffect(() => {
    if (sharedPickup) {
        setPickup(sharedPickup);
        clearPickup();
    }
  }, [sharedPickup, clearPickup]);
  
  useEffect(() => {
    if (sharedDropoff) {
        setDropoff(sharedDropoff);
        clearDropoff();
    }
  }, [sharedDropoff, clearDropoff]);

  const simulateGeocode = (locationStr: string, type: "pickup" | "dropoff") => {
    if (!locationStr) {
      if (type === "pickup") setPickupCoords(null);
      if (type === "dropoff") setDropoffCoords(null);
      return;
    };

    const coordMatch = locationStr.match(/^(-?\d+\.\d+),?\s*(-?\d+\.\d+)$/);
    if (coordMatch) {
        const coords: [number, number] = [parseFloat(coordMatch[1]), parseFloat(coordMatch[2])];
        if (type === "pickup") setPickupCoords(coords);
        if (type === "dropoff") setDropoffCoords(coords);
        return;
    }
    const locations: Record<string, [number, number]> = {
      riyadh: [24.7136, 46.6753],
      jeddah: [21.4858, 39.1925],
      dammam: [26.4207, 50.0888],
      "king khalid international airport": [24.9572, 46.6993],
      "kingdom centre": [24.7113, 46.6743]
    };
    const city = Object.keys(locations).find((c) => locationStr.toLowerCase().includes(c));
    const coords = city ? locations[city] : null;
    if (type === "pickup") setPickupCoords(coords);
    if (type === "dropoff") setDropoffCoords(coords);
  };

  useEffect(() => {
    simulateGeocode(pickup, "pickup");
  }, [pickup]);

  useEffect(() => {
    simulateGeocode(dropoff, "dropoff");
  }, [dropoff]);

  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const dist = getDistance(pickupCoords[0], pickupCoords[1], dropoffCoords[0], dropoffCoords[1]);
      setDistance(dist);
    } else {
      setDistance(0);
    }
  }, [pickupCoords, dropoffCoords]);
  
  useEffect(() => {
    if (distance > 0 && vehicleType) {
        let rateDetails: RateDetails | undefined;
        if (bookingType === 'passenger' && passengerRates[vehicleType]) {
            rateDetails = passengerRates[vehicleType]!;
        } else if (bookingType === 'shipper') {
          if (shipperRates[vehicleType]) {
            rateDetails = shipperRates[vehicleType]!;
          } else if (equipmentRates[vehicleType]) {
            // Equipment rates might be hourly, but for this form, we'll assume distance-based.
            rateDetails = equipmentRates[vehicleType]!;
          }
        }
        
        if (rateDetails) {
            const totalPerUnit = calculateTotalPerUnit(rateDetails);
            const totalFare = totalPerUnit * distance;
            setFare(totalFare);
        } else {
            setFare(0);
        }
    } else {
        setFare(0);
    }
  }, [distance, vehicleType, bookingType, passengerRates, shipperRates, equipmentRates]);


  const handleFindDriver = () => {
     if (!pickup || !dropoff) {
        toast({ variant: "destructive", title: "Location Missing", description: "Please provide both pickup and dropoff locations." });
        return;
    }
     if (!pickupCoords) {
        toast({ variant: "destructive", title: "Pickup Location Unresolved", description: "Could not determine coordinates for pickup. Try a different address." });
        return;
    }
    
    const queryParams = new URLSearchParams({
        jobId: jobId,
        lat: pickupCoords[0].toString(),
        lng: pickupCoords[1].toString(),
        pickup: encodeURIComponent(pickup),
        dropoff: encodeURIComponent(dropoff),
        notes: encodeURIComponent(notes),
        type: bookingType,
        fare: fare.toString(),
    });
    
    router.push(`/fleet/tracking?${queryParams.toString()}`);
  }

  const handleConfirmAndDispatch = () => {
    if (!assignedDriver || !assignedVehicle || !pickupCoords) {
        toast({ variant: "destructive", title: "Missing Information", description: "Cannot dispatch without a driver, vehicle, and pickup location." });
        return;
    }

    const finalScheduledAt = new Date(scheduledDate || new Date());
    if (scheduleType === "later") {
      const [hours, minutes] = scheduledTime.split(":").map(Number);
      finalScheduledAt.setHours(hours, minutes);
    }
    
    const newTrip: Trip = {
        id: `trip-${Date.now()}`,
        jobId: jobId,
        type: bookingType === 'passenger' ? 'PASSENGER' : 'SHIPMENT',
        status: 'PENDING',
        pickupLocation: { address: pickup, lat: pickupCoords?.[0] || 0, lng: pickupCoords?.[1] || 0 },
        dropoffLocation: { address: dropoff, lat: dropoffCoords?.[0] || 0, lng: dropoffCoords?.[1] || 0 },
        scheduledAt: finalScheduledAt.toISOString(),
        distance: distance,
        fare: fare,
        estimatedDuration: distance ? Math.round(distance * 1.5) : 0, // 1.5 min per km
        notes,
        driverId: assignedDriver.id,
        driver: assignedDriver,
        vehicleId: assignedVehicle.id,
        vehicle: assignedVehicle,
    };

    addTrip(newTrip);

    toast({
        title: "Job Dispatched!",
        description: `Job ${jobId} has been sent to ${assignedDriver.user.name}.`,
    });
    
    // Reset form for next dispatch
    setAssignedDriver(null);
    setAssignedVehicle(null);
    setIsConfirming(false);
    setPickup("");
    setDropoff("");
    setNotes("");
    setDistance(0);
    setFare(0);
    setVehicleType(undefined);
    router.replace('/dashboard/dispatch'); // Clear query params
  };

  const buildLocateUrl = (field: 'pickup' | 'dropoff') => {
    const params = new URLSearchParams();
    if(jobId) params.set('jobId', jobId);
    if(pickup) params.set('pickup', pickup);
    if(dropoff) params.set('dropoff', dropoff);
    if(notes) params.set('notes', notes);
    params.set('type', bookingType);
    params.set('fare', fare.toString());

    if(field === 'pickup' && pickupCoords) {
        params.set('lat', pickupCoords[0].toString());
        params.set('lng', pickupCoords[1].toString());
    }
    if(field === 'dropoff' && dropoffCoords) {
        params.set('lat', dropoffCoords[0].toString());
        params.set('lng', dropoffCoords[1].toString());
    }
    return `/fleet/tracking?${params.toString()}`;
  }


  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Manual Job Creation</CardTitle>
              <CardDescription>
                {isConfirming ? `Confirming assignment for Job ID: ${jobId}` : "Fill in the details to create and assign a new job."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Booking Type</Label>
                <RadioGroup
                  defaultValue="passenger"
                  value={bookingType}
                  onValueChange={(value: "passenger" | "shipper") => {
                    if (!isConfirming) {
                        setBookingType(value);
                        setVehicleType(undefined); // Reset vehicle type on change
                        setFare(0); // Reset fare
                    }
                  }}
                  disabled={isConfirming}
                  className="mt-2 grid grid-cols-2 gap-4"
                >
                  <RadioGroupItem value="passenger" id="passenger" className="peer sr-only"/>
                  <Label htmlFor="passenger" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <Car className="h-5 w-5" /> Passenger
                  </Label>
                  <RadioGroupItem value="shipper" id="shipper" className="peer sr-only"/>
                  <Label htmlFor="shipper" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <TruckIcon className="h-5 w-5" /> Shipper
                  </Label>
                </RadioGroup>
              </div>

               <div className="space-y-2">
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select
                  value={vehicleType}
                  onValueChange={(value: VehicleType) => setVehicleType(value)}
                  disabled={isConfirming}
                >
                  <SelectTrigger id="vehicle-type">
                    <SelectValue placeholder="Select a vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(bookingType === "passenger"
                      ? passengerVehicleTypes
                      : shipperVehicleTypes
                    ).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="flex items-center gap-2">
                        <Input id="pickup" placeholder="Enter pickup address or lat,lng" value={pickup} onChange={(e) => setPickup(e.target.value)} disabled={isConfirming} />
                         <Button variant="ghost" size="icon" asChild>
                            <Link href={buildLocateUrl('pickup')}><LocateIcon className="h-5 w-5" /></Link>
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dropoff">Dropoff Location</Label>
                    <div className="flex items-center gap-2">
                        <Input id="dropoff" placeholder="Enter dropoff address or lat,lng" value={dropoff} onChange={(e) => setDropoff(e.target.value)} disabled={isConfirming} />
                        <Button variant="ghost" size="icon" asChild>
                           <Link href={buildLocateUrl('dropoff')}><LocateIcon className="h-5 w-5" /></Link>
                        </Button>
                    </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="space-y-2">
                    <Label>Estimated Distance</Label>
                    <div className="p-2 h-10 border rounded-lg bg-muted/50 flex items-center justify-between animate-in fade-in-0 duration-300">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Milestone className="h-5 w-5" />
                        </div>
                         {distance > 0 ? (
                           <span className="font-bold text-base text-primary">{distance.toFixed(1)} km</span>
                         ) : (
                            <span className="text-sm text-muted-foreground">Calculating...</span>
                         )}
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="fare">Fare Amount (SAR)</Label>
                      <Input id="fare" type="text" placeholder="Fare amount" value={fare > 0 ? fare.toFixed(2) : ""} readOnly disabled={isConfirming} className="bg-muted/50 font-bold" />
                  </div>
              </div>


              <div>
                <Label>Schedule</Label>
                <RadioGroup
                  value={scheduleType}
                  onValueChange={(v: "now" | "later") => setScheduleType(v)}
                  disabled={isConfirming}
                  className="mt-2 grid grid-cols-2 gap-4"
                >
                  <RadioGroupItem value="now" id="now" className="peer sr-only" />
                  <Label htmlFor="now" className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Assign Now
                  </Label>
                  <RadioGroupItem value="later" id="later" className="peer sr-only"/>
                  <Label htmlFor="later" className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Schedule for Later
                  </Label>
                </RadioGroup>
              </div>

              {scheduleType === "later" && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in-0 duration-500">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !scheduledDate && "text-muted-foreground")} disabled={isConfirming}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduledDate ? format(scheduledDate, "PPP") : (<span>Pick a date</span>)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus/>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} disabled={isConfirming} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="note">Notes for Driver</Label>
                <Textarea id="note" placeholder="Add special instructions, contact numbers, etc." value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              
              {isConfirming && assignedDriver && assignedVehicle && (
                <div className="p-4 border rounded-lg bg-muted/50 space-y-4 animate-in fade-in-0 duration-300">
                    <h3 className="font-semibold">Selected Driver & Vehicle</h3>
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>{assignedDriver.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{assignedDriver.user.name}</p>
                                <p className="text-sm text-muted-foreground">{assignedDriver.licenseNumber}</p>
                            </div>
                        </div>
                        <div className="text-right">
                           <p className="font-medium text-primary">{assignedVehicle.plateNumber}</p>
                           <p className="text-sm text-muted-foreground">{assignedVehicle.type}</p>
                        </div>
                    </div>
                </div>
              )}

            </CardContent>
             <CardFooter>
                 {isConfirming ? (
                     <Button className="w-full" size="lg" onClick={handleConfirmAndDispatch}>
                        <Send className="mr-2 h-4 w-4" />
                        Confirm & Dispatch Job
                     </Button>
                 ) : (
                     <Button className="w-full" size="lg" onClick={handleFindDriver} disabled={scheduleType === 'later'}>
                        <MapIcon className="mr-2 h-4 w-4" />
                        {scheduleType === 'later' ? 'Save Scheduled Job' : 'Find Driver on Map'}
                     </Button>
                 )}
             </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
