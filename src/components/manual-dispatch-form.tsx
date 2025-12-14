

"use client";

import { useState, useMemo, useEffect } from "react";
import QRCode from "react-qr-code";
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { drivers, vehicles, trips } from "@/lib/data";
import { Driver, Vehicle } from "@/lib/types";
import { MapPin, User, Car, Truck as TruckIcon, QrCode, Mail, MessageSquare, Send, Briefcase, Clock, LocateFixed, Terminal } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { StatusBadge } from "./status-badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { addHours, format } from "date-fns";
import { cn } from "@/lib/utils";

const passengerVehicleTypes = vehicles.filter(v => v.category === 'PASSENGER').map(v => v.type);
const freightVehicleTypes = vehicles.filter(v => v.category !== 'PASSENGER').map(v => v.type);
const uniquePassengerVehicles = [...new Set(passengerVehicleTypes)];
const uniqueFreightVehicles = [...new Set(freightVehicleTypes)];

interface ManualDispatchFormProps {
    apiKey?: string;
}

type LocationSelection = 'pickup' | 'dropoff' | null;

interface Location {
    lat: number;
    lng: number;
    address: string;
}

function MapInteraction({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    const map = useMap();
    
    useEffect(() => {
        if (!map) return;
        
        const clickListener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
                onLocationSelect(e.latLng.lat(), e.latLng.lng());
            }
        });

        return () => clickListener.remove();
    }, [map, onLocationSelect]);

    return null;
}

export function ManualDispatchForm({ apiKey }: ManualDispatchFormProps) {
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState<"passenger" | "shipper">("passenger");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [jobDetails, setJobDetails] = useState({ id: "", fare: 0 });
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [locationSelection, setLocationSelection] = useState<LocationSelection>(null);
  const [pickup, setPickup] = useState<Location>({ lat: 0, lng: 0, address: "King Khalid International Airport, Riyadh" });
  const [dropoff, setDropoff] = useState<Location>({ lat: 0, lng: 0, address: "Kingdom Centre, Riyadh" });

  const availableDrivers = useMemo(() => {
    const onDutyDrivers = drivers.filter(d => d.currentStatus === 'ON_DUTY' || d.currentStatus === 'AVAILABLE' || d.currentStatus === 'ON_TRIP');
    if (bookingType === 'passenger') {
      return onDutyDrivers.filter(driver => {
        if (driver.user.role === 'DRIVER') return true;
        if (driver.user.role === 'HEAVY_DRIVER') {
          const vehicle = vehicles.find(v => v.driverId === driver.id);
          return vehicle && (vehicle.type === 'MINI_BUS' || vehicle.type === 'LIGHT_BUS' || vehicle.type === 'HEAVY_BUS');
        }
        return false;
      });
    } else {
      return onDutyDrivers.filter(driver => driver.user.role === 'HEAVY_DRIVER');
    }
  }, [bookingType]);

  const position = { lat: 23.8859, lng: 45.0792 };

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setLocationSelection(null);
  }
  
  const handleMapLocationSelect = (lat: number, lng: number) => {
    if (locationSelection === 'pickup') {
      setPickup({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    } else if (locationSelection === 'dropoff') {
      setDropoff({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    }
    setLocationSelection(null); // Deselect after picking
  };


  const handleAssignJob = () => {
    if (!selectedDriver) {
        toast({
            variant: "destructive",
            title: "No driver selected",
            description: "Please select an available driver from the list to assign the job.",
        });
        return;
    }
    
    const newJobId = `JOB-${Date.now().toString().slice(-6)}`;
    const fare = bookingType === 'passenger' ? 85.50 : 450.00;
    const generatedPaymentLink = `https://pay.mhb-logistics.sa/payment?jobId=${newJobId}&amount=${fare}&account=fixed_company_account`;
    
    setJobDetails({ id: newJobId, fare });
    setPaymentLink(generatedPaymentLink);
    setCustomerEmail("");
    setCustomerPhone("");
    setShowQrDialog(true);
    
    toast({
        title: "Job Assigned & Payment Ready",
        description: `${newJobId} assigned to ${selectedDriver.user.name}. QR code generated.`,
    });
  }

  const handleSendPayment = (method: 'all' | 'email' | 'sms') => {
    if ((method === 'all' || method === 'email') && !customerEmail) {
        toast({ variant: "destructive", title: "Email required", description: "Please enter a customer email address." });
        return;
    }
    if ((method === 'all' || method === 'sms') && !customerPhone) {
        toast({ variant: "destructive", title: "Phone required", description: "Please enter a customer phone number." });
        return;
    }

    let sentTo = [];
    if (method === 'all' || method === 'email') sentTo.push('email');
    if (method === 'all' || method === 'sms') sentTo.push('SMS');

    toast({
        title: "Payment Link Sent!",
        description: `The payment link for ${jobDetails.id} has been sent via ${sentTo.join(' and ')}.`,
    });
  }

  const renderMap = () => {
    if (!apiKey) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            A valid Google Maps API key is required to display the map. This may also indicate that billing is not enabled for your project.
          </AlertDescription>
        </Alert>
      );
    }
    return (
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={6}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="manual-dispatch-map"
          className="h-full w-full"
          cursor={locationSelection ? 'crosshair' : 'default'}
        >
          {locationSelection && <MapInteraction onLocationSelect={handleMapLocationSelect} />}

          {availableDrivers.map((driver) => {
            const vehicle = vehicles.find(v => v.driverId === driver.id);
            if (!vehicle) return null;
            return (
              <AdvancedMarker
                key={`driver-${driver.id}`}
                position={vehicle.currentLocation}
                onClick={() => handleDriverSelect(driver)}
              >
                <Pin
                  background={selectedDriver?.id === driver.id ? "var(--accent)" : "var(--primary)"}
                  borderColor={"#fff"}
                  glyphColor={"#fff"}
                />
              </AdvancedMarker>
            )
          })}
          
           {pickup.lat !== 0 && (
             <AdvancedMarker position={pickup} title="Pickup">
               <Pin background={"#16a34a"} glyphColor={"#fff"} borderColor={"#fff"}><MapPin/></Pin>
             </AdvancedMarker>
           )}
           {dropoff.lat !== 0 && (
             <AdvancedMarker position={dropoff} title="Dropoff">
               <Pin background={"#dc2626"} glyphColor={"#fff"} borderColor={"#fff"}><MapPin/></Pin>
             </AdvancedMarker>
           )}
        </Map>
      </APIProvider>
    );
  };

  const getVehicleStatusForDriver = (driverId: string) => {
    const onTrip = trips.some(t => t.driverId === driverId && (t.status === 'ON_ROUTE' || t.status === 'AT_WORK' || t.status === "POB" || t.status === "ON_TRIP"));
    if (onTrip) {
      return { label: 'On Job', icon: <Briefcase className="w-3 h-3 text-blue-500" /> };
    }
    const vehicle = vehicles.find(v => v.driverId === driverId);
    if (!vehicle || vehicle.status === 'AVAILABLE') {
       return { label: 'Empty', icon: <Briefcase className="w-3 h-3 text-green-500" /> };
    }
    return { label: 'N/A', icon: <Briefcase className="w-3 h-3 text-gray-500" /> };
  };
  
  const getDutyEndTime = (driver: Driver) => {
      if (driver.dutyStartTime) {
          const startTime = new Date(driver.dutyStartTime);
          const endTime = addHours(startTime, 8);
          return format(endTime, "hh:mm a");
      }
      return 'N/A';
  }


  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Manual Job Creation</CardTitle>
                    <CardDescription>Fill in the details to create and assign a new job.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>Booking Type</Label>
                        <RadioGroup defaultValue="passenger" onValueChange={(value: "passenger" | "shipper") => { setBookingType(value); setSelectedDriver(null); }} className="mt-2 grid grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="passenger" id="passenger" className="peer sr-only" />
                                <Label htmlFor="passenger" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    <Car className="h-5 w-5" /> Passenger
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="shipper" id="shipper" className="peer sr-only" />
                                <Label htmlFor="shipper" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    <TruckIcon className="h-5 w-5" /> Shipper
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pickup">Pickup Location</Label>
                             <div className="flex gap-2">
                                <Input id="pickup" placeholder="Enter or select on map" value={pickup.address} onChange={e => setPickup(p => ({ ...p, address: e.target.value }))} />
                                <Button variant="outline" size="icon" onClick={() => setLocationSelection('pickup')} className={cn(locationSelection === 'pickup' && 'ring-2 ring-primary')}>
                                    <LocateFixed className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="dropoff">Dropoff Location</Label>
                             <div className="flex gap-2">
                                <Input id="dropoff" placeholder="Enter or select on map" value={dropoff.address} onChange={e => setDropoff(p => ({ ...p, address: e.target.value }))} />
                                <Button variant="outline" size="icon" onClick={() => setLocationSelection('dropoff')} className={cn(locationSelection === 'dropoff' && 'ring-2 ring-primary')}>
                                    <LocateFixed className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="vehicle-type">Vehicle Type</Label>
                        <Select>
                            <SelectTrigger id="vehicle-type">
                                <SelectValue placeholder="Select a vehicle type" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                                {bookingType === 'passenger' ? 
                                    uniquePassengerVehicles.map(type => (
                                        <SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>
                                    )) :
                                    uniqueFreightVehicles.map(type => (
                                        <SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="note">Notes for Driver</Label>
                        <Textarea id="note" placeholder="Add any special instructions..." />
                    </div>

                    <Button className="w-full" onClick={handleAssignJob}>
                        {selectedDriver ? `Assign to ${selectedDriver.user.name} & Generate Payment` : 'Select a Driver to Assign & Generate Payment'}
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Find Available Driver</CardTitle>
                    {locationSelection && <CardDescription className="text-accent-foreground animate-pulse">Click on the map to set the {locationSelection} location.</CardDescription>}
                </CardHeader>
                <CardContent>
                     <div className="h-64 rounded-lg overflow-hidden border">
                        {renderMap()}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Driver List ({availableDrivers.length})</CardTitle>
                </CardHeader>
                 <CardContent className="p-0">
                    <ScrollArea className="h-72">
                      <div className="p-4 space-y-3">
                        {availableDrivers.length > 0 ? availableDrivers.map((driver) => {
                          const vehicleStatus = getVehicleStatusForDriver(driver.id);
                          const dutyEndTime = getDutyEndTime(driver);
                          return (
                            <div
                              key={driver.id}
                              onClick={() => handleDriverSelect(driver)}
                              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedDriver?.id === driver.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:bg-accent"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{driver.user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                      <h4 className="font-semibold text-primary">{driver.user.name}</h4>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <span>Fatigue: {driver.fatigueLevel}</span>
                                          <Separator orientation="vertical" className="h-3" />
                                          <div className="flex items-center gap-1">
                                            {vehicleStatus.icon}
                                            <span>{vehicleStatus.label}</span>
                                          </div>
                                          <Separator orientation="vertical" className="h-3" />
                                          <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>Ends: {dutyEndTime}</span>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                                <StatusBadge status={driver.currentStatus} size="sm" />
                              </div>
                            </div>
                          )
                        }) : (
                          <div className="text-center text-muted-foreground p-8">
                            No available drivers for this booking type.
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    </div>
    <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><QrCode/> Payment QR Code Generated</DialogTitle>
                <DialogDescription>
                    The customer can scan this code to pay the fare of <span className="font-bold">{jobDetails.fare.toFixed(2)} SAR</span> for Job ID <span className="font-bold text-primary">{jobDetails.id}</span>.
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg">
                {paymentLink && <QRCode value={paymentLink} size={200} />}
            </div>
             <div className="text-center text-xs text-muted-foreground break-all px-4">
                {paymentLink}
            </div>

            <Separator className="my-2" />

            <div className="px-6 pb-2 space-y-4">
                <h4 className="text-sm font-medium">Send Payment Link to Customer</h4>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="customer-email">
                            <div className="flex items-center gap-1.5">
                                <Mail className="h-4 w-4" />
                                Customer Email
                            </div>
                        </Label>
                        <Input id="customer-email" type="email" placeholder="customer@email.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customer-phone">
                             <div className="flex items-center gap-1.5">
                                <MessageSquare className="h-4 w-4" />
                                Customer Phone
                            </div>
                        </Label>
                        <Input id="customer-phone" type="tel" placeholder="+966 5X XXX XXXX" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                    </div>
                </div>
                 <Button type="button" className="w-full" onClick={() => handleSendPayment('all')}>
                    <Send className="mr-2 h-4 w-4" />
                    Send to Email & SMS
                </Button>
                <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" onClick={() => handleSendPayment('email')}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email Only
                    </Button>
                    <Button type="button" variant="outline" onClick={() => handleSendPayment('sms')}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send SMS Only
                    </Button>
                </div>
            </div>

            <DialogFooter className="px-6 pb-6 pt-0">
                <DialogClose asChild>
                    <Button type="button" variant="secondary" className="w-full">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}

    