

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Car, CarFront, CarTaxiFront, Users, Bus, Calendar as CalendarIcon, MapPin, User, ShieldCheck, CreditCard, Wallet, Phone, Terminal } from "lucide-react";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { drivers, vehicles } from "@/lib/data";
import type { Trip, VehicleType } from "@/lib/types";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { StatusBadge } from "./status-badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import L from "leaflet";
import { useToast } from "@/hooks/use-toast";
import { useTripsStore } from "@/store/trips-store";

const vehicleOptions = [
  { type: "SEDAN" as VehicleType, label: "Sedan", icon: Car, capacity: 4, price: 55.00 },
  { type: "PREMIUM_SEDAN" as VehicleType, label: "Premium Sedan", icon: CarFront, capacity: 4, price: 85.50 },
  { type: "LUXURY_CAR" as VehicleType, label: "Luxury", icon: CarTaxiFront, capacity: 3, price: 150.00 },
  { type: "SUV" as VehicleType, label: "SUV", icon: Car, capacity: 6, price: 95.00 },
  { type: "MPV" as VehicleType, label: "MPV", icon: Car, capacity: 7, price: 110.00 },
  { type: "MINI_BUS" as VehicleType, label: "Mini Bus", icon: Bus, capacity: 15, price: 180.00 },
  { type: "HEAVY_BUS" as VehicleType, label: "Heavy Bus", icon: Bus, capacity: 50, price: 250.00 },
];

type ViewState = "login" | "booking" | "confirmed";

const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});
const driverIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});


export function PassengerAppClient() {
  const { toast } = useToast();
  const { addTrip } = useTripsStore();
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleOptions[0]);
  const [bookingType, setBookingType] = useState<"now" | "later">("now");
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [pickupTime, setPickupTime] = useState<string>("12:00");
  const [viewState, setViewState] = useState<ViewState>("login");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [pickupAddress, setPickupAddress] = useState("King Khalid International Airport");
  const [dropoffAddress, setDropoffAddress] = useState("Kingdom Centre");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];
  
  const assignedDriver = drivers.find(d => d.id === 'driver-002');
  const assignedVehicle = vehicles.find(v => v.id === 'vehicle-002');
  const passengerLocation: L.LatLngTuple = [24.7136, 46.6753]; // Riyadh, Saudi Arabia

  const handleSendOtp = () => {
    if (phone) {
        setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    if (otp === "1234") {
        setViewState("booking");
    } else {
        alert("Invalid OTP. Please enter '1234'.");
    }
  };

  const handleConfirmBooking = () => {
    const scheduledAt = new Date();
    if (bookingType === 'later' && pickupDate) {
      const [hour, minute] = pickupTime.split(':').map(Number);
      scheduledAt.setFullYear(pickupDate.getFullYear(), pickupDate.getMonth(), pickupDate.getDate());
      scheduledAt.setHours(hour, minute);
    }
    
    // Find a suitable vehicle to get the category, although we won't assign it.
    const vehicleForType = vehicles.find(v => v.type === selectedVehicle.type);

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      jobId: `JOB-${Date.now().toString().slice(-6)}`,
      type: "PASSENGER",
      status: "PENDING",
      pickupLocation: { address: pickupAddress, lat: 24.9876, lng: 46.6243 },
      dropoffLocation: { address: dropoffAddress, lat: 24.7136, lng: 46.6753 },
      scheduledAt: scheduledAt.toISOString(),
      distance: 35, // Estimated
      fare: selectedVehicle.price,
      estimatedDuration: 45, // Estimated
      vehicleId: 'unassigned',
      driverId: 'unassigned',
      // Store the requested vehicle type so dispatch can see it.
      vehicle: vehicleForType ? { ...vehicleForType, id: 'unassigned' } : undefined,
    };
    
    addTrip(newTrip);
    
    toast({
        title: "Booking Submitted",
        description: `Your ride request ${newTrip.jobId} is pending assignment and will appear on the dashboard.`,
    });

    setViewState("confirmed");
  };

  if (viewState === 'login') {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <Phone className="mx-auto h-12 w-12 text-primary"/>
                <CardTitle>Welcome</CardTitle>
                <CardDescription>Enter your phone number to begin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!otpSent ? (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+966 5X XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <Button onClick={handleSendOtp} className="w-full">Send OTP</Button>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input id="otp" type="text" placeholder="Enter 4-digit code (e.g., 1234)" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={4} />
                        </div>
                        <Button onClick={handleVerifyOtp} className="w-full">Verify & Continue</Button>
                        <Button variant="link" size="sm" className="w-full" onClick={() => setOtpSent(false)}>Change phone number</Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
  }

  if (viewState === 'confirmed') {
    if (!isClient) {
      return (
         <Alert variant="default">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Loading Map...</AlertTitle>
            <AlertDescription>
                The map is currently loading. Please wait a moment.
            </AlertDescription>
        </Alert>
      )
    }
    if (!assignedDriver || !assignedVehicle) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Booking Confirmed!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Your booking has been received and is awaiting driver assignment. You can monitor its status from the main dashboard.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => setViewState('booking')}>Book Another Ride</Button>
                </CardFooter>
            </Card>
        )
    }
    const driverLocation: L.LatLngTuple = [assignedVehicle.currentLocation.lat, assignedVehicle.currentLocation.lng];
    return (
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-[600px] rounded-lg overflow-hidden border">
           <MapContainer
                center={passengerLocation}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
             >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={passengerLocation} icon={userIcon} />
                <Marker position={driverLocation} icon={driverIcon} />
                <Polyline positions={[passengerLocation, driverLocation]} color="blue" dashArray="5, 10" />
           </MapContainer>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Driver on the way!</CardTitle>
                    <CardDescription>Your driver will arrive in approximately 5 minutes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarFallback>{assignedDriver.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{assignedDriver.user.name}</p>
                            <p className="text-muted-foreground">4.9 ★</p>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <p className="font-semibold">{assignedVehicle.type.replace(/_/g, ' ')}</p>
                        <p className="text-2xl font-bold text-primary tracking-widest">{assignedVehicle.plateNumber}</p>
                    </div>
                </CardContent>
                <CardFooter>
                     <Button variant="outline" className="w-full">Cancel Ride</Button>
                </CardFooter>
            </Card>
            <Alert>
                <ShieldCheck className="h-4 w-4"/>
                <AlertTitle>Share OTP with Driver</AlertTitle>
                <AlertDescription>
                    To start your trip, share this One-Time Password with your driver.
                    <p className="text-2xl font-bold text-center tracking-widest py-2">1234</p>
                </AlertDescription>
            </Alert>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book a Ride</CardTitle>
        <CardDescription>Enter your trip details to get a fare estimate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <Input id="pickup" placeholder="Enter pickup address" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropoff">Dropoff Location</Label>
            <Input id="dropoff" placeholder="Enter dropoff address" value={dropoffAddress} onChange={(e) => setDropoffAddress(e.target.value)} />
          </div>
        </div>

        <div>
          <Label>Select a Vehicle</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-2">
            {vehicleOptions.map((vehicle) => (
              <Card
                key={vehicle.type}
                className={cn(
                  "cursor-pointer text-center p-2 md:p-4 transition-all",
                  selectedVehicle.type === vehicle.type
                    ? "border-primary ring-2 ring-primary"
                    : "hover:border-primary/50"
                )}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <vehicle.icon className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold text-xs md:text-sm">{vehicle.label}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Users className="h-3 w-3" />{vehicle.capacity}</p>
              </Card>
            ))}
          </div>
        </div>

        <Separator />
        
        <div>
            <Label>Pickup Time</Label>
            <RadioGroup defaultValue="now" onValueChange={(value: "now" | "later") => setBookingType(value)} className="mt-2 grid grid-cols-2 gap-4">
                <div>
                    <RadioGroupItem value="now" id="now" className="peer sr-only" />
                    <Label htmlFor="now" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Book Now
                    </Label>
                </div>
                 <div>
                    <RadioGroupItem value="later" id="later" className="peer sr-only" />
                    <Label htmlFor="later" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Schedule for Later
                    </Label>
                </div>
            </RadioGroup>
        </div>

        {bookingType === 'later' && (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in-0 duration-300">
                <div className="space-y-2">
                    <Label>Pickup Date</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !pickupDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={pickupDate}
                            onSelect={setPickupDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                </div>
                <div className="space-y-2">
                    <Label>Pickup Time</Label>
                     <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="max-h-48">
                            {hours.flatMap(hour => 
                                minutes.map(minute => {
                                    const time = `${hour}:${minute}`;
                                    return <SelectItem key={time} value={time}>{time}</SelectItem>
                                })
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )}

        <Separator />

        <div>
          <Label>Extras & Add-ons</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="child-seat" />
              <Label htmlFor="child-seat" className="font-normal">Child Seat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="wheel-chair" />
              <Label htmlFor="wheel-chair" className="font-normal">Wheelchair Access</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="water" />
              <Label htmlFor="water" className="font-normal">Water Bottle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newspaper" />
              <Label htmlFor="newspaper" className="font-normal">Newspaper</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="tissue" />
              <Label htmlFor="tissue" className="font-normal">Tissue Box</Label>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="note">Note for the driver</Label>
          <Textarea id="note" placeholder="e.g., I have extra luggage." className="mt-2"/>
        </div>

        <Separator />
        
        <div>
            <Label>Payment Method</Label>
            <RadioGroup defaultValue="card" className="mt-2 grid grid-cols-2 gap-4">
                <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label htmlFor="card" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <CreditCard className="h-5 w-5" /> Card
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                    <Label htmlFor="cash" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <Wallet className="h-5 w-5" /> Cash
                    </Label>
                </div>
            </RadioGroup>
        </div>


      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">Estimated Fare</p>
            <p className="text-2xl font-bold text-primary">{selectedVehicle.price.toFixed(2)} SAR</p>
        </div>
        <Button size="lg" className="w-full sm:w-auto" onClick={handleConfirmBooking}>Confirm Booking</Button>
      </CardFooter>
    </Card>
  );
}
