

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect }from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { vehicles, drivers } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";

const incidentTypes = [
  "Accident",
  "Vehicle Breakdown",
  "Traffic Violation",
  "Customer Complaint",
  "Property Damage",
  "Injury",
  "Other",
] as const;

const severityLevels = ["Low", "Medium", "High", "Critical"] as const;

const formSchema = z.object({
  incidentId: z.string(),
  incidentDate: z.date({ required_error: "Incident date is required." }),
  incidentTime: z.string().min(1, "Incident time is required."),
  location: z.string().min(1, "Location is required."),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  incidentType: z.enum(incidentTypes),
  severity: z.enum(severityLevels),
  description: z.string().min(10, "Please provide a detailed description."),
});

interface IncidentReportFormProps {
    agent: User;
}

export function IncidentReportForm({ agent }: IncidentReportFormProps) {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentId: "",
      incidentTime: format(new Date(), "HH:mm"),
      location: "",
      severity: "Low",
      description: "",
    },
  });
  
  useEffect(() => {
    // Generate a default Incident ID on the client side
    const generatedId = `INC-${Date.now().toString().slice(-6)}`;
    form.setValue("incidentId", generatedId);
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log({ ...values, agentId: agent.id });
    
    // Simulate API call
    setTimeout(() => {
        toast({
            title: "Report Submitted",
            description: `Incident report ${values.incidentId} has been successfully filed by ${agent.name}.`,
        });
        form.reset();
         const generatedId = `INC-${Date.now().toString().slice(-6)}`;
        form.setValue("incidentId", generatedId);
        form.setValue("incidentTime", format(new Date(), "HH:mm"));
        setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Incident Report</CardTitle>
        <CardDescription>
          Fill out the form below with all available details. You are logged in as <span className="font-semibold text-primary">{agent.name}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="incidentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident ID</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={!isAdminMode} className={!isAdminMode ? "bg-muted" : ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="incidentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Incident Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? (
                                format(field.value, "PPP")
                                ) : (
                                <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="incidentTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location of Incident</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., King Fahd Road, near Kingdom Centre" {...field} />
                  </FormControl>
                  <FormDescription>
                    Be as specific as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Involved</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="N/A">Not Applicable</SelectItem>
                        {vehicles.map(v => (
                            <SelectItem key={v.id} value={v.id}>{v.plateNumber} ({v.type})</SelectItem>
                        ))}
                      </SelectContent>
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
                    <FormLabel>Driver Involved</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a driver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                         <SelectItem value="N/A">Not Applicable</SelectItem>
                         {drivers.map(d => (
                            <SelectItem key={d.id} value={d.id}>{d.user.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="incidentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Incident</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an incident type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incidentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Severity Level</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2"
                      >
                        {severityLevels.map(level => (
                             <FormItem key={level} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={level} />
                                </FormControl>
                                <FormLabel className="font-normal">{level}</FormLabel>
                            </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what happened, the parties involved, and any damages."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Attach Photos</FormLabel>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
