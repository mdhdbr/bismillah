

"use client";

import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition, useState, useEffect } from "react";
import { suggestAssignments, SuggestAssignmentsOutput } from "@/ai/flows/automated-dispatch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Loader2, Bot, CheckCircle, AlertTriangle, User, Truck } from "lucide-react";
import { vehicles, drivers } from "@/lib/data";
import { VehicleType } from "@/lib/types";
import { Separator } from "./ui/separator";

const uniqueVehicleTypes = [...new Set(vehicles.map(v => v.type))] as [string, ...string[]];

const formSchema = z.object({
  jobId: z.string().min(1, "Job ID is required."),
  vehicleType: z.enum(uniqueVehicleTypes),
  pickupLat: z.coerce.number().min(-90).max(90, "Invalid latitude."),
  pickupLng: z.coerce.number().min(-180).max(180, "Invalid longitude."),
  driverFatigueThreshold: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export function AutomatedDispatchForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SuggestAssignmentsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [defaultJobId, setDefaultJobId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobId: "",
      pickupLat: 24.7136,
      pickupLng: 46.6753,
      driverFatigueThreshold: "MEDIUM",
      vehicleType: uniqueVehicleTypes[0],
    },
  });
  
  useEffect(() => {
    // Generate a default Job ID on the client side to avoid hydration mismatch
    const generatedId = `JOB-${Date.now().toString().slice(-4)}`;
    setDefaultJobId(generatedId);
    form.reset({
        ...form.getValues(),
        jobId: generatedId,
    });
  }, [form]);


  const { isSubmitting } = useFormState({ control: form.control });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const assignmentInput = {
          jobId: values.jobId,
          vehicleType: values.vehicleType,
          pickupLocation: {
            lat: values.pickupLat,
            lng: values.pickupLng,
          },
          driverFatigueThreshold: values.driverFatigueThreshold as 'LOW' | 'MEDIUM' | 'HIGH',
        };
        const res = await suggestAssignments(assignmentInput);
        setResult(res);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  }
  
  const suggestedVehicle = result ? vehicles.find(v => v.id === result.vehicleId) : null;
  const suggestedDriver = result ? drivers.find(d => d.id === result.driverId) : null;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Automated Dispatch</CardTitle>
          <CardDescription>Let AI suggest the best vehicle and driver for the job.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., JOB-1234" {...field} />
                    </FormControl>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {uniqueVehicleTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pickupLat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Latitude</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.0001" placeholder="e.g., 24.7136" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickupLng"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Longitude</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.0001" placeholder="e.g., 46.6753" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="driverFatigueThreshold"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Max Driver Fatigue</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="LOW" />
                          </FormControl>
                          <FormLabel className="font-normal">Low</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="MEDIUM" />
                          </FormControl>
                          <FormLabel className="font-normal">Medium</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="HIGH" />
                          </FormControl>
                          <FormLabel className="font-normal">High</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending || isSubmitting} className="w-full">
                {isPending || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Suggest Assignment"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="min-h-[400px] flex items-center justify-center">
            <CardContent className="pt-6 w-full">
            {isPending ? (
                <div className="text-center text-muted-foreground">
                    <Bot className="mx-auto h-12 w-12 mb-4 animate-bounce" />
                    <p className="font-medium text-lg">AI is analyzing options...</p>
                    <p>Considering proximity, availability, vehicle type, and driver fatigue.</p>
                </div>
            ) : error ? (
                <div className="text-center text-destructive">
                    <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
                    <p className="font-medium text-lg">Suggestion Failed</p>
                    <p className="text-sm">{error}</p>
                </div>
            ) : result && suggestedVehicle && suggestedDriver ? (
                 <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                            <CheckCircle className="h-6 w-6"/>
                            <span>Optimal Assignment Found</span>
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm">{result.reasoning}</p>
                    </div>
                    <Separator />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="flex items-start gap-4">
                            <Truck className="h-8 w-8 text-primary flex-shrink-0 mt-1"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Vehicle</p>
                                <p className="font-semibold">{suggestedVehicle.plateNumber}</p>
                                <p className="text-sm">{suggestedVehicle.type}</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <User className="h-8 w-8 text-primary flex-shrink-0 mt-1"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Driver</p>
                                <p className="font-semibold">{suggestedDriver.user.name}</p>
                                <p className="text-sm">Fatigue: {suggestedDriver.fatigueLevel}</p>
                            </div>
                         </div>
                     </div>
                     <Button className="w-full">Confirm & Dispatch</Button>
                 </div>
            ) : (
                 <div className="text-center text-muted-foreground">
                    <Bot className="mx-auto h-12 w-12 mb-4" />
                    <p className="font-medium text-lg">Awaiting Job Details</p>
                    <p>Fill out the form to get an AI-powered suggestion.</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
