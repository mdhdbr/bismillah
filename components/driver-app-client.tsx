
"use client";

import type { Driver, Trip } from "@/lib/types";
import { useState, useEffect, useMemo, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DriverChecklist } from "./driver-checklist";
import { CurrentJobCard } from "./driver-current-job";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Clock, BedDouble, AlertTriangle, Check, X, Briefcase, Search, LogIn, Wifi, CheckCircle, Ban } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { trips } from "@/lib/data";
import { socketService } from "@/lib/services/socketService";

type ViewState = "login" | "duty";

interface DriverAppClientProps {
  allDrivers: Driver[];
  pendingTrips: Trip[];
  appType: "standard" | "heavy";
  initialDriverId?: string | null;
  initialJobId?: string | null;
}

const groomingItems = [
  "Uniform is clean and pressed",
  "Proper identification worn",
  "Clean shaven / Tidy beard",
  "Professional demeanor"
];

const vehicleHealthItems = [
  "Tire pressure checked",
  "Fuel level adequate",
  "Engine oil level checked",
  "Brakes and lights functional",
  "Interior is clean",
  "Exterior is clean",
  "No warning lights on dashboard",
  "Tool box checked",
  "Spare wheel available",
  "Safety triangle present",
  "Fire extinguisher (expiry & pressure)",
  "First-aid kit (expiry)",
  "Visibility Jacket"
];

interface PingData {
  pingId: string;
  from: string;
}

const sendLocationReply = (pingId: string) => {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socketService.emit("location-reply", {
                pingId,
                lat: latitude,
                lng: longitude,
                time: Date.now(),
            });
        },
        (error) => {
            console.error("Error getting location for ping reply:", error);
            socketService.emit("ping-response", { pingId, response: "ACK", error: "Location services disabled." });
        }
    );
};

const showPingNotification = (data: PingData, onAck: () => void, onReject: () => void) => {
  if (!('Notification' in window)) {
    console.warn("This browser does not support desktop notification");
    return;
  }
  
  const fireNotification = () => {
    const notification = new Notification("Dispatcher Ping", {
      body: `You have been pinged by dispatcher ${data.from}. Please respond.`,
      icon: "/truck-logo.png",
      requireInteraction: true,
    });

    // In a real PWA, you would use service worker actions.
    // For this demo, we'll just handle clicks.
    notification.onclick = () => {
        onAck();
        notification.close();
    }
  }

  if (Notification.permission === "granted") {
    fireNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        fireNotification();
      }
    });
  }
}

export function DriverAppClient({ allDrivers, pendingTrips, appType, initialDriverId, initialJobId }: DriverAppClientProps) {
  const { toast } = useToast();
  const [viewState, setViewState] = useState<ViewState>("login");
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(initialDriverId || null);
  const [otp, setOtp] = useState("");

  const [driver, setDriver] = useState<Driver | null>(null);
  const [isSignedOn, setIsSignedOn] = useState(false);
  const [signInTime, setSignInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionHours, setSessionHours] = useState(0);
  const [showDeclineMessage, setShowDeclineMessage] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [groomingChecklistComplete, setGroomingChecklistComplete] = useState(false);
  const [vehicleChecklistComplete, setVehicleChecklistComplete] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trip | undefined>(undefined);
  const [jobAccepted, setJobAccepted] = useState(false);
  const [activePing, setActivePing] = useState<PingData | null>(null);
  
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);


  const availableDrivers = useMemo(() => {
    if (appType === 'heavy') {
      return allDrivers.filter(d => d.user.role === 'HEAVY_DRIVER');
    }
    return allDrivers.filter(d => d.user.role === 'DRIVER' || d.user.role === 'HEAVY_DRIVER');
  }, [allDrivers, appType]);

  // Effect to handle auto-login via URL params
  useEffect(() => {
    if (initialDriverId) {
      const driverToLogin = allDrivers.find(d => d.id === initialDriverId);
      if (driverToLogin) {
        setDriver(driverToLogin);
        setViewState("duty");
        setIsSignedOn(true); // Auto sign-on when coming from an assignment
        toast({ title: "Auto-Logged In", description: `Welcome, ${driverToLogin.user.name}` });
      }
    }
  }, [initialDriverId, allDrivers, toast]);

  // Socket connection effect
  useEffect(() => {
    if (driver?.id && driver.user.role) {
      socketService.connect(driver.id, driver.user.role);
  
      const handlePing = (data: PingData) => {
        setActivePing(data);
        showPingNotification(data, 
          () => handlePingResponse(data.pingId, "ACK"), 
          () => handlePingResponse(data.pingId, "REJECT")
        );
      };
      
      socketService.on('ping', handlePing);
      
      // Start heartbeat when signed on
      if (isSignedOn) {
        // Send initial heartbeat immediately on sign-on
        socketService.emit("heartbeat");
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }
        heartbeatIntervalRef.current = setInterval(() => {
          socketService.emit("heartbeat");
        }, 15000);
      } else {
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }
      }
  
      return () => {
        socketService.off('ping', handlePing);
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }
        socketService.disconnect();
      };
    }
  }, [driver, isSignedOn]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentTime(new Date());
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isSignedOn) {
      if (!signInTime) {
        setSignInTime(new Date());
      }
      if (!currentTrip && pendingTrips.length > 0) {
        const assignedTrip = pendingTrips[0];
        setCurrentTrip(assignedTrip);
        toast({
          title: "New Job Assigned",
          description: `Job ${assignedTrip.jobId} has been allocated to you.`,
        });
      }
    } else if (signInTime) {
      const duration = (new Date().getTime() - signInTime.getTime()) / (1000 * 60 * 60);
      setSessionHours(duration);
      setShowSummary(true);
      setSignInTime(null);
      setCurrentTrip(undefined);
    }
  }, [isSignedOn, signInTime, currentTrip, pendingTrips, toast]);

  useEffect(() => {
    if (currentTrip) {
      setJobAccepted(currentTrip.status !== 'PENDING');
      setShowDeclineMessage(false);
      setGroomingChecklistComplete(false);
      setVehicleChecklistComplete(false);
    }
  }, [currentTrip?.id]);

  const handleLogin = () => {
    if (!selectedDriverId) {
      toast({ variant: "destructive", title: "Please select your Driver ID." });
      return;
    }
    if (otp !== "1234") {
      toast({ variant: "destructive", title: "Invalid OTP", description: "Please enter the correct OTP (hint: 1234)." });
      return;
    }
    const selectedDriver = allDrivers.find(d => d.id === selectedDriverId);
    if (selectedDriver) {
      setDriver(selectedDriver);
      setViewState("duty");
      setIsSignedOn(false); // Start as off-duty
      toast({ title: "Login Successful", description: `Welcome, ${selectedDriver.user.name}` });
    } else {
      toast({ variant: "destructive", title: "Driver not found" });
    }
  };
  
  const handleLogout = () => {
    if(isSignedOn) {
      setIsSignedOn(false); // This will trigger the summary dialog
    }
    socketService.disconnect();
    setViewState("login");
    setDriver(null);
    setOtp("");
    setSelectedDriverId(null);
  }

  const handleAcceptJob = () => {
    if (currentTrip) {
      setJobAccepted(true);
      const tripIndex = trips.findIndex(t => t.id === currentTrip.id);
      if (tripIndex !== -1) {
        trips[tripIndex].status = 'ACCEPTED';
        setCurrentTrip(trips[tripIndex]);
      }
    }
  };

  const handleDecline = () => {
    setShowDeclineMessage(true);
  };
  
  const handleSendDeclineReason = () => {
    if (!declineReason) {
        toast({variant: 'destructive', title: "Reason required", description: "Please provide a reason for declining."});
        return;
    }
    if (currentTrip) {
        const tripIndex = trips.findIndex(t => t.id === currentTrip.id);
        if (tripIndex !== -1) {
            trips[tripIndex].status = 'CANCELLED';
            trips[tripIndex].notes = `Declined by driver: ${declineReason}`;
        }
        toast({ title: "Job Declined", description: "Dispatch has been notified." });
        setCurrentTrip(undefined);
        setShowDeclineMessage(false);
        setDeclineReason("");
    }
  };

  const handlePingResponse = (pingId: string, response: "ACK" | "REJECT") => {
    if (response === 'ACK') {
      sendLocationReply(pingId);
      toast({title: "Acknowledged", description: "Location sent to dispatcher."})
    } else {
      socketService.emit("ping-response", { pingId, response: "REJECT", time: Date.now() });
      toast({variant: "destructive", title: "Rejected", description: "Dispatcher notified of rejection."})
    }
    setActivePing(null);
  };

  const closeSummary = () => {
    setShowSummary(false);
    if (sessionHours > 12) {
      toast({
        variant: "destructive",
        title: "Fatigue Alert",
        description: "Driver has exceeded 12 hours of duty. Alert sent to control panel."
      });
    }
  };

  if (viewState === 'login') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Driver Authentication</CardTitle>
          <CardDescription>Please sign in to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="driver-id">Driver ID</Label>
            <Select onValueChange={setSelectedDriverId} value={selectedDriverId || ""}>
              <SelectTrigger id="driver-id">
                <SelectValue placeholder="Select your driver ID" />
              </SelectTrigger>
              <SelectContent>
                {availableDrivers.map(d => (
                  <SelectItem key={d.id} value={d.id}>{d.user.name} ({d.id})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input id="otp" type="password" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter your OTP" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (!driver) return null; // Should not happen in 'duty' state

  const isNewJob = currentTrip?.status === 'PENDING';
  const isJobActive = currentTrip && currentTrip.status !== 'COMPLETED' && currentTrip.status !== 'CANCELLED';
  const allChecklistsComplete = groomingChecklistComplete && vehicleChecklistComplete;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h2 className="text-xl font-semibold">Welcome, {driver.user.name}</h2>
         </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="sign-on-switch"
              checked={isSignedOn}
              onCheckedChange={setIsSignedOn}
            />
            <Label htmlFor="sign-on-switch" className="text-lg">
              {isSignedOn ? "On Duty" : "Off Duty"}
            </Label>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      
      {isSignedOn && signInTime && currentTime && (
         <div className="text-right -mt-4">
            <div className="flex items-center justify-end gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Signed in at {signInTime.toLocaleTimeString()}
            </p>
          </div>
      )}

      {activePing && (
        <Alert className="bg-blue-50 border-blue-200">
            <Wifi className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Dispatcher Ping Received</AlertTitle>
            <AlertDescription className="text-blue-700 flex justify-between items-center">
                <p>Please acknowledge this ping from dispatcher {activePing.from}.</p>
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => handlePingResponse(activePing.pingId, "ACK")}>
                        <CheckCircle className="mr-2 h-4 w-4" /> ACK
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handlePingResponse(activePing.pingId, "REJECT")}>
                        <Ban className="mr-2 h-4 w-4" /> Reject
                    </Button>
                </div>
            </AlertDescription>
        </Alert>
      )}

      <Separator />

      {isSignedOn && (
        <div className="animate-in fade-in-0 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DriverChecklist 
                  title="Grooming Standards"
                  items={groomingItems}
                  onChecklistChange={setGroomingChecklistComplete}
                  tripId={currentTrip?.id || "none"}
              />
              <DriverChecklist 
                  title="Vehicle Health"
                  items={vehicleHealthItems}
                  onChecklistChange={setVehicleChecklistComplete}
                  tripId={currentTrip?.id || "none"}
              />
          </div>
            
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {isJobActive && jobAccepted ? (
                <CurrentJobCard trip={currentTrip!} />
              ) : isNewJob && !showDeclineMessage ? (
                <Card className="flex flex-col items-center justify-center h-full min-h-[300px]">
                  <CardHeader className="text-center">
                    <Briefcase className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle>New Job Available</CardTitle>
                    <CardDescription>A new job has been assigned to you. Please review and respond.</CardDescription>
                  </CardHeader>
                  <CardContent className="w-full max-w-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={handleDecline}><X className="mr-2" />Decline</Button>
                      <Button onClick={handleAcceptJob} disabled={!allChecklistsComplete}><Check className="mr-2" />Accept</Button>
                    </div>
                    {!allChecklistsComplete && (
                      <p className="text-center text-xs text-muted-foreground mt-3">
                        Please complete all checklist items before accepting the job.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ) : showDeclineMessage ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Message to Agent</CardTitle>
                    <CardDescription>Please state your reason for declining the job. This will be sent to the dispatch agent.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="e.g., Vehicle has a flat tire, End of my shift..." 
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowDeclineMessage(false)}>Cancel</Button>
                    <Button onClick={handleSendDeclineReason}>Send Message</Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="flex items-center justify-center h-full min-h-[300px] text-center">
                  <CardContent className="pt-6">
                    <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Searching for Jobs...</p>
                    <p className="text-muted-foreground">Looking for the next available job in your area.</p>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Add any notes about the vehicle or job..." />
                </CardContent>
              </Card>
              {!isJobActive && (
                <Card>
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <BedDouble className="h-6 w-6 text-muted-foreground" />
                    <CardTitle>Resting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">You are currently on duty but not on a trip. Your resting hours are being logged.</p>
                    <Button variant="secondary" className="w-full mt-4">Return to Station (Log Dead KMs)</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      <AlertDialog open={showSummary} onOpenChange={setShowSummary}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End of Duty Summary</AlertDialogTitle>
            <AlertDialogDescription>
              Summary of your session on {new Date().toLocaleDateString()}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Trips Completed</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Hours Worked</span>
              <span className="font-medium">{sessionHours.toFixed(2)} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Extra Hours (›8 hrs)</span>
              <span className="font-medium">{Math.max(0, sessionHours - 8).toFixed(2)} hrs</span>
            </div>
            {sessionHours > 12 && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive-foreground flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-semibold">Fatigue Alert</p>
                  <p>You have worked over 12 hours. This will be reported for fatigue monitoring.</p>
                </div>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSummary}>Acknowledge & Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
