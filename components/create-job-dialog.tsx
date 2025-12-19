
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { drivers, vehicles } from "@/lib/data";
import { Trip, TripType, Vehicle, Driver, TripStatus } from "@/lib/types";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tripTypes: TripType[] = ["PASSENGER", "SHIPMENT", "EQUIPMENT"];
const tripStatuses: TripStatus[] = ["PENDING", "ACCEPTED", "ON_ROUTE", "COMPLETED", "CANCELLED"];

const formSchema = z.object({
  jobId: z.string(),
  type: z.enum(tripTypes, { required_error: "Trip type is required" }),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  status: z.enum(tripStatuses),
  scheduledAtDate: z.date({ required_error: "Scheduled date is required" }),
  scheduledAtTime: z.string().min(1, "Scheduled time is required"),
  distance: z.coerce.number().optional(),
  fare: z.coerce.number().optional(),
  pickupAddress: z.string().min(1, "Pickup address is required."),
  dropoffAddress: z.string().min(1, "Dropoff address is required."),
});

type CreateJobFormValues = z.infer<typeof formSchema>;

interface CreateJobDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onJobCreated: (newJob: Trip) => void;
}

export function CreateJobDialog({ isOpen, onOpenChange, onJobCreated }: CreateJobDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const checkAdminMode = () => {
      const adminStatus = localStorage.getItem('isAdminMode') === 'true';
      setIsAdminMode(adminStatus);
    };

    checkAdminMode();
    window.addEventListener('storage', checkAdminMode);
    return () => {
      window.removeEventListener('storage', checkAdminMode);
    };
  }, []);

  const form = useForm<CreateJobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobId: "",
      status: "PENDING",
      scheduledAtTime: format(new Date(), "HH:mm"),
    },
  });

  useEffect(() => {
    if (isOpen) {
      const generatedId = `JOB-${Date.now().toString().slice(-6)}`;
      form.reset({
        jobId: generatedId,
        status: "PENDING",
        scheduledAtDate: new Date(),
        scheduledAtTime: format(new Date(), "HH:mm"),
        pickupAddress: "",
        dropoffAddress: "",
        vehicleId: undefined,
        driverId: undefined,
        type: undefined,
        distance: 0,
        fare: 0,
      });
    }
  }, [isOpen, form]);

  const onSubmit = (values: CreateJobFormValues) => {
    setIsSubmitting(true);
    const [hours, minutes] = values.scheduledAtTime.split(':').map(Number);
    const scheduledAt = new Date(values.scheduledAtDate);
    scheduledAt.setHours(hours, minutes);

    const selectedVehicle = vehicles.find(v => v.id === values.vehicleId);
    const selectedDriver = drivers.find(d => d.id === values.driverId);

    const newJob: Trip = {
      id: `trip-${Date.now()}`,
      jobId: values.jobId,
      type: values.type,
      status: values.status,
      vehicleId: values.vehicleId!,
      vehicle: selectedVehicle,
      driverId: values.driverId!,
      driver: selectedDriver,
      scheduledAt: scheduledAt.toISOString(),
      distance: values.distance,
      fare: values.fare,
      pickupLocation: { address: values.pickupAddress, lat: 0, lng: 0 }, // Lat/Lng can be geocoded later
      dropoffLocation: { address: values.dropoffAddress, lat: 0, lng: 0 },
      estimatedDuration: values.distance ? Math.round(values.distance * 2.5) : 0,
    };

    setTimeout(() => {
      onJobCreated(newJob);
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Ready for Processing",
        description: `File "${file.name}" is ready. The next step would be to parse and validate it.`,
      });
      // In a real implementation with xlsx library:
      // const data = await parseExcel(file);
      // await bulkUpdateFleetDrivers(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
          <DialogDescription>Add a new job by filling the form manually or uploading a file.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="manual">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload" disabled={!isAdminMode}>Upload Excel</TabsTrigger>
          </TabsList>
          <TabsContent value="manual" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="jobId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job ID</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly={!isAdminMode} className={!isAdminMode ? "bg-muted" : ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a job type" /></SelectTrigger></FormControl>
                            <SelectContent>{tripTypes.map(type => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vehicleId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a vehicle" /></SelectTrigger></FormControl>
                            <SelectContent>{vehicles.map(v => (<SelectItem key={v.id} value={v.id}>{v.plateNumber} ({v.type})</SelectItem>))}</SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="driverId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a driver" /></SelectTrigger></FormControl>
                            <SelectContent>{drivers.map(d => (<SelectItem key={d.id} value={d.id}>{d.user.name}</SelectItem>))}</SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="pickupAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pickup Address</FormLabel>
                                <FormControl><Input placeholder="e.g., King Khalid International Airport" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dropoffAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dropoff Address</FormLabel>
                                <FormControl><Input placeholder="e.g., Kingdom Centre, Riyadh" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                          <SelectContent>{tripStatuses.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="scheduledAtDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Scheduled Date & Time</FormLabel>
                            <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/>
                                    </PopoverContent>
                                </Popover>
                                <FormField control={form.control} name="scheduledAtTime" render={({ field }) => (
                                    <FormControl><Input type="time" {...field} className="w-32" /></FormControl>
                                )}/>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance (km)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 35" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fare (SAR)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 120.50" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <DialogFooter className="pt-4 pr-4">
                    <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Job"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="upload">
            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-muted rounded-lg text-center min-h-[300px]">
                <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">Upload Fleet & Driver Assignments</h3>
                <p className="text-muted-foreground text-sm mb-4">Upload a .xlsx or .csv file to bulk update assignments.</p>
                <Button asChild>
                  <label htmlFor="excel-upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                    <input id="excel-upload" type="file" className="sr-only" onChange={handleFileUpload} accept=".xlsx, .csv" />
                  </label>
                </Button>
                 <a href="#" className="text-xs text-primary hover:underline mt-4">Download template file</a>
                 {!isAdminMode && (
                    <p className="text-xs text-destructive mt-4">Note: This feature is only available in Admin Mode.</p>
                 )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
