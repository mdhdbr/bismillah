
"use client";

import { useState, useMemo } from "react";
import type { User } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle, Phone, User as UserIcon, Building, CreditCard, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { users } from "@/lib/data";


const freightVehicleTypes = [
    "TRUCK_3T", "TRUCK_5T", "TRUCK_7T", "TRUCK_10T", "TRUCK_15T",
    "TRAILER", "FLATBED", "CONTAINER_40FT", "CONTAINER_60FT",
    "CRANE_TRAILER", "FORKLIFT", "MOBILE_CRANE", "STATIONARY_EQUIPMENT",
    "BACKHOE_LOADER", "BOBCAT", "DUMP_TRUCK", "WATER_TRUCK", "OTHER"
];

type ViewState = "selection" | "agentLogin" | "customerLogin" | "booking" | "confirmed";

interface ShipperPortalClientProps {
  allUsers: User[];
}

export function ShipperPortalClient({ allUsers }: ShipperPortalClientProps) {
  const { toast } = useToast();
  
  const [selectedVehicle, setSelectedVehicle] = useState(freightVehicleTypes[0]);
  const [viewState, setViewState] = useState<ViewState>("selection");
  const [eta, setEta] = useState("16:00");
  const [ata, setAta] = useState("");
  
  // Login State
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | { name: string; id: string } | null>(null);

  const availableAgents = useMemo(() => {
    return allUsers.filter(u => u.role === 'DISPATCHER' || u.role === 'ADMIN' || u.role === 'DRIVER' || u.role === 'HEAVY_DRIVER');
  }, [allUsers]);

  const handleSendOtp = () => {
    if (phone || selectedAgentId) {
        setOtpSent(true);
        const target = selectedAgentId ? `agent ${selectedAgentId}` : `phone number ${phone}`;
        toast({
            title: "OTP Sent",
            description: `An OTP has been sent for ${target}. (Hint: it's 1234)`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Phone number or Agent ID required",
        });
    }
  };

  const handleVerifyOtp = () => {
    if (otp !== "1234") {
      toast({ variant: "destructive", title: "Invalid OTP", description: "Please enter the correct OTP (1234)." });
      return;
    }
    
    let user: User | { name: string; id: string } | null = null;
    if (viewState === 'agentLogin' && selectedAgentId) {
        user = allUsers.find(u => u.id === selectedAgentId) || null;
    } else if (viewState === 'customerLogin' && phone) {
        user = { name: phone, id: phone };
    }

    if (user) {
        setLoggedInUser(user);
        setViewState("booking");
        toast({ title: "Login Successful", description: `Welcome, ${user.name}` });
    } else {
        toast({ variant: "destructive", title: "Login Failed", description: "Could not find user." });
    }
  };
  
  const handleLogout = () => {
    setViewState("selection");
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setSelectedAgentId(null);
    setLoggedInUser(null);
  }

  const handleConfirmBooking = () => {
    setViewState("confirmed");
    setTimeout(() => setAta("16:15"), 5000);
    toast({ title: "Shipment Confirmed!", description: `Your booking for a ${selectedVehicle.replace(/_/g, ' ')} has been confirmed.` });
  };

  const handleNewBooking = () => {
    setViewState("booking");
    setAta("");
    setEta("16:00");
  };
  
  if (viewState === 'selection') {
    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                 <Building className="mx-auto h-12 w-12 text-primary"/>
                <CardTitle>Shipper Portal</CardTitle>
                <CardDescription>Are you an agent or a customer?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20" onClick={() => setViewState('agentLogin')}>
                    <UserIcon className="mr-2 h-5 w-5"/> Agent
                </Button>
                <Button variant="outline" className="h-20" onClick={() => setViewState('customerLogin')}>
                    <Phone className="mr-2 h-5 w-5"/> Customer
                </Button>
            </CardContent>
        </Card>
    );
  }
  
  if (viewState === 'agentLogin' || viewState === 'customerLogin') {
     return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <CardTitle>{viewState === 'agentLogin' ? 'Agent Login' : 'Customer Login'}</CardTitle>
                <CardDescription>Please authenticate to continue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!otpSent ? (
                    <>
                        {viewState === 'agentLogin' ? (
                            <div className="space-y-2">
                                <Label htmlFor="agent-id">Agent ID</Label>
                                <Select onValueChange={setSelectedAgentId}>
                                    <SelectTrigger id="agent-id"><SelectValue placeholder="Select your agent ID" /></SelectTrigger>
                                    <SelectContent>{availableAgents.map(agent => (<SelectItem key={agent.id} value={agent.id}>{agent.name} ({agent.id})</SelectItem>))}</SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="+966 5X XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        )}
                        <Button onClick={handleSendOtp} className="w-full">Send OTP</Button>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input id="otp" type="text" placeholder="Enter 4-digit code (e.g., 1234)" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={4} />
                        </div>
                        <Button onClick={handleVerifyOtp} className="w-full">Verify & Continue</Button>
                        <Button variant="link" size="sm" className="w-full" onClick={() => setOtpSent(false)}>Go Back</Button>
                    </>
                )}
            </CardContent>
             <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => setViewState('selection')}>Cancel</Button>
            </CardFooter>
        </Card>
    );
  }

  if (viewState === "confirmed") {
    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <div>
                            <CardTitle>Shipment Confirmed</CardTitle>
                            <CardDescription>Your shipment is scheduled. Details below.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary"/>
                            <p className="font-medium">Estimated Time of Arrival (ETA)</p>
                        </div>
                        <p className="font-bold text-lg">{eta}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-green-600"/>
                            <p className="font-medium">Actual Time of Arrival (ATA)</p>
                        </div>
                        {ata ? 
                            <p className="font-bold text-lg text-green-600">{ata}</p> 
                            : <p className="text-sm text-muted-foreground">Pending...</p>
                        }
                    </div>
                    <Separator />
                    <div>
                        <p className="text-sm text-muted-foreground">Vehicle Type</p>
                        <p className="font-semibold">{selectedVehicle.replace(/_/g, ' ')}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleNewBooking}>Create New Shipment</Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">Signed in as <span className="font-semibold text-primary">{loggedInUser?.name}</span></p>
            <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
        <Card className="w-full">
        <CardHeader>
            <CardTitle>Create a Shipment</CardTitle>
            <CardDescription>Enter shipment details to book a vehicle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input id="pickup" placeholder="Enter pickup address" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dropoff">Dropoff Location</Label>
                <Input id="dropoff" placeholder="Enter dropoff address" />
            </div>
            </div>

            <div>
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger id="vehicle-type">
                        <SelectValue placeholder="Select a vehicle type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        {freightVehicleTypes.map(type => (
                            <SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="eta">E.T.A (Scheduled)</Label>
                    <Input id="eta" type="time" value={eta} onChange={(e) => setEta(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ata">A.T.A (Actual)</Label>
                    <Input id="ata" type="time" readOnly value={ata} placeholder="Will be set on arrival" className="bg-muted"/>
                </div>
            </div>
            
            <div>
            <Label htmlFor="note">Note for the driver</Label>
            <Textarea id="note" placeholder="e.g., Specify loading instructions, contact person, etc." className="mt-2"/>
            </div>
            
            {selectedVehicle === 'OTHER' && (
                <div className="space-y-2 animate-in fade-in-0 duration-300">
                    <Label htmlFor="other-note">Specify "Other" Vehicle Type</Label>
                    <Input id="other-note" placeholder="e.g., Low-bed trailer" />
                </div>
            )}
            
            <Separator />

            <div>
                <Label>Payment Details</Label>
                <RadioGroup defaultValue="invoice" className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="invoice" id="invoice" className="peer sr-only" />
                        <Label htmlFor="invoice" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <FileText className="h-5 w-5" /> On Invoice
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label htmlFor="card" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <CreditCard className="h-5 w-5" /> Credit Card
                        </Label>
                    </div>
                </RadioGroup>
                 <div className="space-y-2 mt-4">
                    <Label htmlFor="payment-ref">PO / Reference Number</Label>
                    <Input id="payment-ref" placeholder="Enter a reference number" />
                </div>
            </div>

        </CardContent>
        <CardFooter className="bg-muted/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Estimated Fare</p>
                <p className="text-2xl font-bold text-primary">450.00 SAR</p>
            </div>
            <Button size="lg" className="w-full sm:w-auto" onClick={handleConfirmBooking}>Confirm Shipment</Button>
        </CardFooter>
        </Card>
    </div>
  );
}
