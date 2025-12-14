
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Driver, DriverStatus, FatigueLevel, UserRole } from "@/lib/types";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  onDriverCreated: (newDriver: Driver) => void;
}

export function CreateDriverDialog({ isOpen, onOpenChange, onDriverCreated }: CreateDriverDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateDriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentStatus: "OFF_DUTY",
      fatigueLevel: "LOW",
      totalDutyHours: 0,
      role: "DRIVER",
    },
  });

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, form]);

  const onSubmit = (values: CreateDriverFormValues) => {
    setIsSubmitting(true);
    
    const userId = `user-${Date.now()}`;
    
    const newUser = {
      id: userId,
      name: values.name,
      email: values.email,
      role: values.role,
      isActive: true,
    };

    const newDriver: Driver = {
      id: `driver-${Date.now()}`,
      userId: userId,
      user: newUser,
      licenseNumber: values.licenseNumber,
      currentStatus: values.currentStatus,
      fatigueLevel: values.fatigueLevel,
      totalDutyHours: values.totalDutyHours,
    };

    setTimeout(() => {
      onDriverCreated(newDriver);
      toast({
        title: "Driver Created Successfully",
        description: `Driver ${newDriver.user.name} has been added.`,
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
          <DialogDescription>Fill in the details to add a new driver to the organization.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Driver"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
