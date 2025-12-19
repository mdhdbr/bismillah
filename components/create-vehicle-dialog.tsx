
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { drivers } from "@/lib/data";
import { Vehicle, VehicleType, VehicleStatus, VehicleCategory } from "@/lib/types";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet } from "lucide-react";


const vehicleTypes: VehicleType[] = [
  "SEDAN", "PREMIUM_SEDAN", "LUXURY_CAR", "SUV", "MPV", "MINI_BUS", "LIGHT_BUS", "HEAVY_BUS",
  "TRUCK_3T", "TRUCK_5T", "TRUCK_7T", "TRUCK_10T", "TRUCK_15T",
  "TRAILER", "FLATBED", "CONTAINER_40FT", "CONTAINER_60FT",
  "CRANE_TRAILER", "FORKLIFT", "MOBILE_CRANE", "STATIONARY_EQUIPMENT",
  "BACKHOE_LOADER", "BOBCAT", "DUMP_TRUCK", "WATER_TRUCK", "OTHER"
];

const vehicleStatuses: VehicleStatus[] = ["AVAILABLE", "ASSIGNED", "ON_TRIP", "MAINTENANCE", "OUT_OF_SERVICE"];
const passengerTypes: VehicleType[] = ["SEDAN", "PREMIUM_SEDAN", "LUXURY_CAR", "SUV", "MPV", "MINI_BUS", "LIGHT_BUS", "HEAVY_BUS"];

const getCategory = (type: VehicleType): VehicleCategory => {
  return passengerTypes.includes(type) ? 'PASSENGER' : 'FREIGHT';
}

const formSchema = z.object({
  plateNumber: z.string().min(1, "Plate number is required."),
  type: z.enum(vehicleTypes, { required_error: "Vehicle type is required" }),
  status: z.enum(vehicleStatuses),
  driverId: z.string().optional(),
});

type CreateVehicleFormValues = z.infer<typeof formSchema>;

interface CreateVehicleDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onVehicleSubmit: (vehicleData: Vehicle) => void;
  vehicle: Vehicle | null;
}

export function CreateVehicleDialog({ isOpen, onOpenChange, onVehicleSubmit, vehicle }: CreateVehicleDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const isEditing = !!vehicle;

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

  const form = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plateNumber: "",
      status: "AVAILABLE",
      type: undefined,
      driverId: undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        form.reset({
          plateNumber: vehicle.plateNumber,
          type: vehicle.type,
          status: vehicle.status,
          driverId: vehicle.driverId || "none",
        });
      } else {
        form.reset({
          plateNumber: "",
          status: "AVAILABLE",
          type: undefined,
          driverId: "none",
        });
      }
    }
  }, [isOpen, vehicle, isEditing, form]);

  const onSubmit = (values: CreateVehicleFormValues) => {
    setIsSubmitting(true);

    const selectedDriver = drivers.find(d => d.id === values.driverId);

    const processedVehicle: Vehicle = {
      ...vehicle, // Spread existing data to keep IDs and other fields
      id: isEditing ? vehicle.id : `vehicle-${Date.now()}`,
      vin: isEditing ? vehicle.vin : `VIN-${Date.now().toString().slice(-8)}`,
      plateNumber: values.plateNumber,
      type: values.type,
      category: getCategory(values.type),
      status: values.status,
      driverId: values.driverId === "none" ? undefined : values.driverId,
      driver: values.driverId === "none" ? undefined : selectedDriver,
      // Keep non-form fields from original object if editing
      currentFuel: isEditing ? vehicle.currentFuel : 100,
      currentLocation: isEditing ? vehicle.currentLocation : { lat: 24.7136, lng: 46.6753 },
      nextMaintenance: isEditing ? vehicle.nextMaintenance : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      capacity: isEditing ? vehicle.capacity : 0,
    };

    setTimeout(() => {
      onVehicleSubmit(processedVehicle);
      toast({
        title: isEditing ? "Vehicle Updated" : "Vehicle Created",
        description: `Vehicle ${processedVehicle.plateNumber} has been saved.`,
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 500);
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Ready for Processing",
        description: `File "${file.name}" is ready. The next step would be to parse and validate it.`,
      });
    }
  };

  const title = isEditing ? `Edit Vehicle (${vehicle.plateNumber})` : "Add New Vehicle";
  const description = isEditing ? "Update the details for this vehicle." : "Fill in the details manually or upload an Excel file.";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="manual">
           <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload" disabled={!isAdminMode}>Upload Excel</TabsTrigger>
          </TabsList>
           <TabsContent value="manual" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                <FormField
                  control={form.control}
                  name="plateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plate Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1234 ABC" {...field} />
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a vehicle type" /></SelectTrigger></FormControl>
                        <SelectContent>{vehicleTypes.map(type => (<SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>))}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                        <SelectContent>{vehicleStatuses.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
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
                        <FormControl><SelectTrigger><SelectValue placeholder="Assign a driver (optional)" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="none">Unassigned</SelectItem>
                          {drivers.map(d => (<SelectItem key={d.id} value={d.id}>{d.user.name}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Fuel Level</FormLabel>
                      <FormControl>
                        <Input placeholder="Synced from IoT" disabled value={isEditing ? vehicle.currentFuel + '%' : '100%'}/>
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel>Next Service</FormLabel>
                      <FormControl>
                        <Input placeholder="Synced from Records" disabled value={isEditing && vehicle.nextMaintenance ? new Date(vehicle.nextMaintenance).toLocaleDateString() : 'N/A'} />
                      </FormControl>
                    </FormItem>
                </div>


                <DialogFooter className="pt-4 pr-4 sticky bottom-0 bg-background">
                  <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Changes"}</Button>
                </DialogFooter>
              </form>
            </Form>
           </TabsContent>
            <TabsContent value="upload">
              <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-muted rounded-lg text-center min-h-[300px]">
                  <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">Bulk Upload Vehicles</h3>
                  <p className="text-muted-foreground text-sm mb-4">Upload a .xlsx or .csv file to add or update vehicles.</p>
                  <Button asChild>
                    <label htmlFor="vehicle-excel-upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                      <input id="vehicle-excel-upload" type="file" className="sr-only" onChange={handleFileUpload} accept=".xlsx, .csv" />
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
