
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Driver, Vehicle, VehicleType, UserRole } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVehiclesStore } from "@/store/vehicles-store";
import { parse, format } from "date-fns";

const vehicleTypes: VehicleType[] = [
  "SEDAN", "PREMIUM_SEDAN", "LUXURY_CAR", "SUV", "MPV", "MINI_BUS", "LIGHT_BUS", "HEAVY_BUS",
  "TRUCK_3T", "TRUCK_5T", "TRUCK_7T", "TRUCK_10T", "TRUCK_15T",
  "TRAILER", "FLATBED", "CONTAINER_40FT", "CONTAINER_60FT",
  "CRANE_TRAILER", "FORKLIFT", "MOBILE_CRANE", "STATIONARY_EQUIPMENT",
  "BACKHOE_LOADER", "BOBCAT", "DUMP_TRUCK", "WATER_TRUCK", "OTHER"
];
const passengerTypes: VehicleType[] = ["SEDAN", "PREMIUM_SEDAN", "LUXURY_CAR", "SUV", "MPV", "MINI_BUS", "LIGHT_BUS", "HEAVY_BUS"];

const getCategory = (type: VehicleType) => {
  return passengerTypes.includes(type) ? 'PASSENGER' : 'FREIGHT';
}

// Helper to parse DD/MM/YYYY format
const parseDateString = (dateString: string | undefined): Date | undefined => {
  if (!dateString) return undefined;
  try {
    const parsed = parse(dateString, 'dd/MM/yyyy', new Date());
    // Check if the parsed date is valid
    if (isNaN(parsed.getTime())) return undefined;
    return parsed;
  } catch (e) {
    return undefined;
  }
};

const dateStringSchema = z.string().optional().refine((val) => {
    if (!val) return true; // Optional field
    return !isNaN(parse(val, 'dd/MM/yyyy', new Date()).getTime());
}, { message: "Invalid date format. Use DD/MM/YYYY" });

const formSchema = z.object({
  // Driver fields
  driverId: z.string().optional(), // Keep for editing context
  driverName: z.string().min(1, "Driver name is required."),
  driverPhone: z.string().optional(),
  licenseNumber: z.string().min(1, "License number is required."),
  licenseExpiry: dateStringSchema,
  
  // Vehicle fields
  vehicleId: z.string().optional(), // Keep for editing context
  vehiclePlateNumber: z.string().optional(),
  vehicleType: z.custom<VehicleType>().optional(),
  registrationExpiry: dateStringSchema,
  insuranceExpiry: dateStringSchema,
  nextMaintenance: dateStringSchema,
});

type ComplianceFormValues = z.infer<typeof formSchema>;

interface ComplianceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (driverData: Driver) => void;
  driver: Driver | null;
}

export function ComplianceDialog({ isOpen, onOpenChange, onSubmit, driver }: ComplianceDialogProps) {
  const isEditing = !!driver;
  const { vehicles } = useVehiclesStore();

  const form = useForm<ComplianceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverId: undefined,
      driverName: "",
      driverPhone: "",
      licenseNumber: "",
      licenseExpiry: "",
      vehicleId: undefined,
      vehiclePlateNumber: "",
      vehicleType: undefined,
      registrationExpiry: "",
      insuranceExpiry: "",
      nextMaintenance: "",
    }
  });

  useEffect(() => {
    const formatDateForInput = (dateString?: string) => {
        return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : '';
    };

    if (isOpen) {
      if (driver) { // Editing mode
        form.reset({
          driverId: driver.id,
          driverName: driver.user.name,
          driverPhone: driver.user.phone || "",
          licenseNumber: driver.licenseNumber,
          licenseExpiry: formatDateForInput(driver.licenseExpiry),
          vehicleId: driver.vehicle?.id,
          vehiclePlateNumber: driver.vehicle?.plateNumber,
          vehicleType: driver.vehicle?.type,
          registrationExpiry: formatDateForInput(driver.vehicle?.registrationExpiry),
          insuranceExpiry: formatDateForInput(driver.vehicle?.insuranceExpiry),
          nextMaintenance: formatDateForInput(driver.vehicle?.nextMaintenance),
        });
      } else { // Adding new record mode
        form.reset({
          driverId: undefined,
          driverName: "",
          driverPhone: "",
          licenseNumber: "",
          licenseExpiry: "",
          vehicleId: undefined,
          vehiclePlateNumber: "",
          vehicleType: undefined,
          registrationExpiry: "",
          insuranceExpiry: "",
          nextMaintenance: "",
        });
      }
    }
  }, [isOpen, driver, form]);
  
  const handleFormSubmit = (values: ComplianceFormValues) => {
    
    let finalDriver: Driver;
    let finalVehicle: Vehicle | undefined = undefined;

    // Construct vehicle object if plate number and type are provided
    if (values.vehiclePlateNumber && values.vehicleType) {
        finalVehicle = {
            id: values.vehicleId || `vehicle-${Date.now()}`,
            vin: isEditing && driver?.vehicle?.vin ? driver.vehicle.vin : `VIN-${Date.now()}`,
            plateNumber: values.vehiclePlateNumber,
            type: values.vehicleType,
            category: getCategory(values.vehicleType),
            status: isEditing && driver?.vehicle?.status ? driver.vehicle.status : 'AVAILABLE',
            currentFuel: isEditing && driver?.vehicle?.currentFuel ? driver.vehicle.currentFuel : 100,
            currentLocation: isEditing && driver?.vehicle?.currentLocation ? driver.vehicle.currentLocation : { lat: 24.7136, lng: 46.6753 },
            capacity: isEditing && driver?.vehicle?.capacity ? driver.vehicle.capacity : 0,
            registrationExpiry: parseDateString(values.registrationExpiry)?.toISOString(),
            insuranceExpiry: parseDateString(values.insuranceExpiry)?.toISOString(),
            nextMaintenance: parseDateString(values.nextMaintenance)?.toISOString(),
        }
    }
    
    // Construct driver object
    if (isEditing) {
        // Update existing driver
        finalDriver = {
            ...driver!,
            user: { ...driver!.user, name: values.driverName, phone: values.driverPhone },
            licenseNumber: values.licenseNumber,
            licenseExpiry: parseDateString(values.licenseExpiry)?.toISOString(),
            vehicleId: finalVehicle?.id,
            vehicle: finalVehicle,
        };
    } else {
        // Create new driver
        const newUserId = `user-${Date.now()}`;
        finalDriver = {
            id: `driver-${Date.now()}`,
            userId: newUserId,
            user: { 
                id: newUserId, 
                name: values.driverName, 
                email: `${values.driverName.toLowerCase().replace(/\s/g, '.')}@mhb.sa`,
                phone: values.driverPhone,
                role: 'DRIVER', 
                isActive: true 
            },
            licenseNumber: values.licenseNumber,
            licenseExpiry: parseDateString(values.licenseExpiry)?.toISOString(),
            vehicleId: finalVehicle?.id,
            vehicle: finalVehicle,
            currentStatus: 'OFF_DUTY',
            fatigueLevel: 'LOW',
            totalDutyHours: 0,
        };
    }
    
    onSubmit(finalDriver);
    onOpenChange(false);
  };
  
  const title = isEditing ? "Edit Data Record" : "Add New Driver & Vehicle Record";
  const description = isEditing ? "Update information for this driver and their assigned vehicle." : "Create a new driver and vehicle record with all their information.";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            
            <h3 className="text-lg font-semibold border-b pb-2">Driver Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="driverName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Driver Name</FormLabel>
                        <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="driverPhone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Driver Phone</FormLabel>
                        <FormControl><Input type="tel" placeholder="+966 5..." {...field} value={field.value || ''} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl><Input placeholder="Driver's license number" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="licenseExpiry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>License Expiry Date</FormLabel>
                            <FormControl>
                                <Input placeholder="DD/MM/YYYY" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <h3 className="text-lg font-semibold border-b pb-2 pt-4">Vehicle Information (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="vehiclePlateNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Vehicle Plate Number</FormLabel>
                        <FormControl><Input placeholder="e.g., 1234 ABC" {...field} value={field.value || ''} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a vehicle type" /></SelectTrigger></FormControl>
                            <SelectContent>{vehicleTypes.map(v => (<SelectItem key={v} value={v}>{v.replace(/_/g, " ")}</SelectItem>))}</SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <FormField
                    control={form.control}
                    name="registrationExpiry"
                    render={({ field }) => (
                       <FormItem>
                            <FormLabel>Registration Expiry</FormLabel>
                            <FormControl>
                                <Input placeholder="DD/MM/YYYY" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="insuranceExpiry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Insurance Expiry</FormLabel>
                            <FormControl>
                                <Input placeholder="DD/MM/YYYY" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="nextMaintenance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Next Service Date</FormLabel>
                            <FormControl>
                                <Input placeholder="DD/MM/YYYY" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <DialogFooter className="pt-4 sticky bottom-0 bg-background/95">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
