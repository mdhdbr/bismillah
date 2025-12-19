
"use client";
import type { Trip, TripStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { MapPin, User, Package, Clock, ShieldCheck, History, Timer, Milestone, Siren } from "lucide-react";
import { StatusBadge } from "./status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { format, subMinutes } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { socketService } from "@/lib/services/socketService";


interface CurrentJobCardProps {
    trip: Trip;
}

const passengerTripStatuses: TripStatus[] = ["ACCEPTED", "TO_PICKUP", "ARRIVED", "BOARDED", "POB", "ON_ROUTE", "AT_DROPOFF", "COMPLETED", "EMPTY", "CANCELLED"];
const freightTripStatuses: TripStatus[] = ["ACCEPTED", "TO_PICKUP", "ARRIVED", "LOADING", "ON_ROUTE", "AT_DROPOFF", "UNLOADING", "COMPLETED", "EMPTY", "CANCELLED"];


type StatusEvent = { status: TripStatus; timestamp: Date; };

export function CurrentJobCard({ trip }: CurrentJobCardProps) {
    const { toast } = useToast();
    const [statusHistory, setStatusHistory] = useState<StatusEvent[]>([]);
    const [otp, setOtp] = useState("");
    const [showOtpPrompt, setShowOtpPrompt] = useState(false);

    useEffect(() => {
        // When a new trip is loaded, initialize its status history with the current time.
        setStatusHistory([{ status: trip.status, timestamp: new Date() }]);
    }, [trip.id]);


    const tripStatuses = trip.type === 'PASSENGER' ? passengerTripStatuses : freightTripStatuses;
    const currentStatus = statusHistory.length > 0 ? statusHistory[statusHistory.length - 1].status : trip.status;
    
    const scheduledTime = new Date(trip.scheduledAt);
    const recommendedStartTime = subMinutes(scheduledTime, trip.estimatedDuration || 30);


    const handleStatusChange = (newStatus: TripStatus) => {
        // Prevent adding duplicate status
        if (newStatus === currentStatus) return;

        const needsOtp = (newStatus === 'LOADING' || newStatus === 'ON_ROUTE' || newStatus === 'COMPLETED' || newStatus === 'BOARDED' || newStatus === 'POB');
        if (needsOtp && !showOtpPrompt && otp === "") {
             // For passenger, POB needs OTP. For others, ON_ROUTE might.
             if ((trip.type === 'PASSENGER' && (newStatus === 'POB')) || (trip.type !== 'PASSENGER' && newStatus === 'ON_ROUTE')) {
                setShowOtpPrompt(true);
                return;
             }
        }
        
        setShowOtpPrompt(false);
        setStatusHistory(prev => [...prev, { status: newStatus, timestamp: new Date() }]);
    }

    const handleOtpSubmit = () => {
        // OTP check
        if (otp === '1234') {
            let nextStatus: TripStatus | undefined;
            if (trip.type === 'PASSENGER') {
                if (currentStatus === 'ARRIVED' || currentStatus === 'BOARDED') {
                    nextStatus = 'POB';
                }
            } else { // Freight/Equipment
                 if (currentStatus === 'ARRIVED' || currentStatus === 'LOADING') {
                    nextStatus = 'ON_ROUTE';
                }
            }

            if (nextStatus) {
                 setStatusHistory(prev => [...prev, { status: nextStatus!, timestamp: new Date() }]);
            }
            setShowOtpPrompt(false);
            setOtp("");
        } else {
            alert("Invalid OTP");
        }
    }

    const handleSos = () => {
      if (!window.confirm("Are you sure you want to trigger an SOS? This will send an immediate alert to all supervisors.")) {
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const sosData = {
            userId: socketService.getUserId(),
            lat: latitude,
            lng: longitude,
            time: Date.now(),
          };
          socketService.emit("sos", sosData);
          toast({
            variant: "destructive",
            title: "SOS Alert Sent!",
            description: "Your emergency alert has been sent to supervisors with your current location.",
          });
        },
        (error) => {
          console.error("Error getting location for SOS:", error);
          // Send SOS even without location
           socketService.emit("sos", {
            userId: socketService.getUserId(),
            time: Date.now(),
          });
          toast({
            variant: "destructive",
            title: "SOS Alert Sent (Location Failed)",
            description: "Your emergency alert has been sent, but your location could not be determined.",
          });
        }
      );
    };

    const getNextStatusAfterOtp = () => {
       if (trip.type === 'PASSENGER') {
            if (currentStatus === 'ARRIVED' || currentStatus === 'BOARDED') return 'POB';
        } else {
            if (currentStatus === 'ARRIVED' || currentStatus === 'LOADING') return 'ON_ROUTE';
        }
        return 'COMPLETED';
    }


    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                        <CardTitle>Current Job: {trip.jobId}</CardTitle>
                        <CardDescription>Scheduled for {new Date(trip.scheduledAt).toLocaleTimeString()}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="destructive" size="sm" onClick={handleSos}>
                           <Siren className="mr-2 h-4 w-4"/> SOS
                        </Button>
                        <StatusBadge status={currentStatus} className="self-start sm:self-auto" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert variant="default" className="bg-primary/10 border-primary/20">
                     <Timer className="h-4 w-4" />
                     <AlertTitle>Recommended Departure: {format(recommendedStartTime, "hh:mm a")}</AlertTitle>
                     <AlertDescription>
                        To arrive for pickup at {format(scheduledTime, "hh:mm a")}, you should depart around the recommended time.
                     </AlertDescription>
                </Alert>

                {trip.distance && (
                     <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Milestone className="h-4 w-4" />
                                <span>Total Distance</span>
                            </div>
                            <span className="font-semibold text-base">{trip.distance?.toFixed(1)} km</span>
                        </div>
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-medium">From</p>
                            <p className="text-muted-foreground">{trip.pickupLocation.address}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-medium">To</p>
                            <p className="text-muted-foreground">{trip.dropoffLocation.address}</p>
                        </div>
                    </div>
                </div>

                {trip.type === 'PASSENGER' && (
                    <>
                        <Separator />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Customer</p>
                                    <p className="text-muted-foreground">John Doe</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Package className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Extras</p>
                                    <p className="text-muted-foreground">Child Seat, 2x Water Bottle</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
                <Button className="w-full">
                    <MapPin className="mr-2 h-4 w-4" /> Open in Maps
                </Button>

                {showOtpPrompt && (
                    <Alert>
                        <ShieldCheck className="h-4 w-4"/>
                        <AlertTitle>Confirm with Customer</AlertTitle>
                        <AlertDescription>
                           <p className="mb-2">Please ask the customer for the OTP to proceed to status: <span className="font-semibold">{statusConfig[getNextStatusAfterOtp()].label}</span></p>
                           <div className="flex gap-2">
                             <Input 
                                type="text" 
                                placeholder="Enter 4-digit OTP" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={4}
                              />
                             <Button onClick={handleOtpSubmit}>Submit</Button>
                           </div>
                        </AlertDescription>
                    </Alert>
                )}
                
                 <div className="flex items-center w-full gap-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <Select onValueChange={(value: TripStatus) => handleStatusChange(value)} value={currentStatus}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Update job status" />
                        </SelectTrigger>
                        <SelectContent>
                            {tripStatuses.map(status => (
                                <SelectItem key={status} value={status}>
                                    <StatusBadge status={status} dot={false} className="border-none shadow-none" />
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                        <History className="h-4 w-4" />
                        <span>Status History</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        {statusHistory.map((event, index) => (
                            <div key={index} className="flex justify-between items-center text-muted-foreground">
                                <StatusBadge status={event.status} size="sm" />
                                <span>{format(event.timestamp, "hh:mm:ss a")}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
const statusConfig: Record<TripStatus, { label: string }> = {
  // Trip Status
  PENDING: { label: "Pending" },
  ACCEPTED: { label: "Accepted" },
  TO_PICKUP: { label: "To Pickup" },
  AT_PICKUP: { label: "At Pickup" },
  POB: { label: "POB" },
  ON_ROUTE: { label: "On Route" },
  AT_DROPOFF: { label: "At Dropoff" },
  UNLOADING: { label: "Unloading" },
  COMPLETED: { label: "Completed" },
  CANCELLED: { label: "Cancelled" },
  LOADING: { label: "Loading" },
  AT_WORK: { label: "At Work" },
  EMPTY: { label: "Empty" },
  ARRIVED: { label: "Arrived" },
  BOARDED: { label: "Boarded" },
};
