
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Driver, DriverStatus, FatigueLevel, UserRole } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet } from "lucide-react";


const driverStatuses: DriverStatus[] = ["ON_DUTY", "OFF_DUTY", "ON_BREAK", "FORCED_REST", "AVAILABLE", "ON_TRIP"];
const fatigueLevels: FatigueLevel[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
const userRoles: UserRole[] = ["DRIVER", "HEAVY_DRIVER"];

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  licenseNumber: z.string().min(1, "License number is required."),
  currentStatus: z.enum(driverStatuses),
  fatigueLevel: z.enum(fatigueLevels),
  totalDutyHours: z.coerce.number().min(0, "Duty hours must be a positive number."),
  role: z.enum(userRoles),
});

type CreateDriverFormValues = z.infer<typeof formSchema>;

interface CreateDriverDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDriverSubmit: (driverData: Driver) => void;
  driver: Driver | null;
}

export function CreateDriverDialog({ isOpen, onOpenChange, onDriverSubmit, driver }: CreateDriverDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const isEditing = !!driver;

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

  const form = useForm<CreateDriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      licenseNumber: "",
      currentStatus: "OFF_DUTY",
      fatigueLevel: "LOW",
      totalDutyHours: 0,
      role: "DRIVER",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        form.reset({
          name: driver.user.name,
          email: driver.user.email,
          licenseNumber: driver.licenseNumber,
          currentStatus: driver.currentStatus,
          fatigueLevel: driver.fatigueLevel,
          totalDutyHours: driver.totalDutyHours,
          role: driver.user.role,
        });
      } else {
        form.reset({
          name: "",
          email: "",
          licenseNumber: "",
          currentStatus: "OFF_DUTY",
          fatigueLevel: "LOW",
          totalDutyHours: 0,
          role: "DRIVER",
        });
      }
    }
  }, [isOpen, driver, isEditing, form]);

  const onSubmit = (values: CreateDriverFormValues) => {
    setIsSubmitting(true);
    
    const userId = isEditing ? driver.userId : `user-${Date.now()}`;
    
    const processedDriver: Driver = {
      id: isEditing ? driver.id : `driver-${Date.now()}`,
      userId: userId,
      user: {
        id: userId,
        name: values.name,
        email: values.email,
        role: values.role,
        isActive: true, // Assuming active, could be a form field
      },
      licenseNumber: values.licenseNumber,
      currentStatus: values.currentStatus,
      fatigueLevel: values.fatigueLevel,
      totalDutyHours: values.totalDutyHours,
    };

    setTimeout(() => {
      onDriverSubmit(processedDriver);
      toast({
        title: isEditing ? "Driver Updated" : "Driver Created",
        description: `Driver ${processedDriver.user.name} has been saved.`,
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
  
  const title = isEditing ? `Edit Driver (${driver.user.name})` : "Add New Driver";
  const description = isEditing ? "Update the details for this driver." : "Fill in the details manually or upload an Excel file.";

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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="e.g., john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License No.</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., D1234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger></FormControl>
                        <SelectContent>{userRoles.map(s => (<SelectItem key={s} value={s}>{s.replace(/_/g, ' ')}</SelectItem>))}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="currentStatus"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                            <SelectContent>{driverStatuses.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="fatigueLevel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Fatigue</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select fatigue level" /></SelectTrigger></FormControl>
                            <SelectContent>{fatigueLevels.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="totalDutyHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duty Hours (Today)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                    <h3 className="text-lg font-semibold">Bulk Upload Drivers</h3>
                    <p className="text-muted-foreground text-sm mb-4">Upload a .xlsx or .csv file to add or update drivers.</p>
                    <Button asChild>
                      <label htmlFor="driver-excel-upload">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                        <input id="driver-excel-upload" type="file" className="sr-only" onChange={handleFileUpload} accept=".xlsx, .csv" />
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
