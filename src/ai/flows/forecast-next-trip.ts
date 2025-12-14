'use server';
/**
 * @fileOverview An AI agent to forecast the next optimal trip for a vehicle.
 *
 * - forecastNextTrip - A function that takes a vehicle and a list of pending jobs and suggests the best next trip.
 * - ForecastNextTripInput - The input type for the forecastNextTrip function.
 * - ForecastNextTripOutput - The return type for the forecastNextTrip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Vehicle, Trip } from '@/lib/types';
import { trips as allTrips } from '@/lib/data';

const ForecastNextTripInputSchema = z.object({
  vehicle: z.any().describe("The vehicle that is completing its current trip."),
  currentTrip: z.any().describe("The current trip the vehicle is on."),
  pendingTrips: z.array(z.any()).describe("A list of all available jobs that are not yet assigned."),
});
export type ForecastNextTripInput = z.infer<typeof ForecastNextTripInputSchema>;

const ForecastNextTripOutputSchema = z.object({
  nextJobId: z.string().optional().describe('The ID of the suggested next job. Can be null if no suitable job is found.'),
  reasoning: z.string().describe('A detailed explanation for the suggestion, focusing on how it minimizes dead kilometers and meets job requirements.'),
  distanceToNextPickup: z.number().optional().describe('The distance in kilometers from the current drop-off point to the next pickup point.'),
});
export type ForecastNextTripOutput = z.infer<typeof ForecastNextTripOutputSchema>;


export async function forecastNextTrip(vehicle: Vehicle, currentTrip: Trip): Promise<ForecastNextTripOutput> {
    const pendingTrips = allTrips.filter(t => t.status === 'PENDING');
    
    const input: ForecastNextTripInput = {
        vehicle,
        currentTrip,
        pendingTrips
    };
    return forecastNextTripFlow(input);
}


const prompt = ai.definePrompt({
  name: 'forecastNextTripPrompt',
  input: {schema: ForecastNextTripInputSchema},
  output: {schema: ForecastNextTripOutputSchema},
  prompt: `You are an AI logistics expert. Your task is to forecast the next optimal job for a vehicle that is about to complete its current trip. The primary goal is to minimize "dead kilometers" – the distance traveled empty to the next pickup location.

Current Vehicle:
- ID: {{{vehicle.id}}}
- Type: {{{vehicle.type}}}
- Current Trip Drop-off Location: Lat: {{{currentTrip.dropoffLocation.lat}}}, Lng: {{{currentTrip.dropoffLocation.lng}}}

Analyze the list of pending jobs below and recommend the best one for this vehicle to take on next.

Available Pending Jobs:
{{#each pendingTrips}}
- Job ID: {{{this.jobId}}}
  - Pickup Location: Lat: {{{this.pickupLocation.lat}}}, Lng: {{{this.pickupLocation.lng}}}
  - Required Vehicle Type: {{{this.type}}} (matches vehicle category: {{this.vehicle.category}})
{{/each}}

Your recommendation must consider:
1.  **Proximity:** The chosen job's pickup location must be as close as possible to the current trip's drop-off location.
2.  **Vehicle Compatibility:** The vehicle type must be suitable for the job (e.g., a passenger vehicle for a passenger trip).
3.  **Efficiency:** Explain why the chosen job is the most efficient next step.

If no suitable jobs are available (e.g., none are nearby or compatible), state that and leave the nextJobId as null.

Calculate the distance to the next pickup and provide your reasoning.
`,
});

const forecastNextTripFlow = ai.defineFlow(
  {
    name: 'forecastNextTripFlow',
    inputSchema: ForecastNextTripInputSchema,
    outputSchema: ForecastNextTripOutputSchema,
  },
  async input => {
    // In a real application, you would calculate real distances between coordinates.
    // For this simulation, we'll let the AI infer based on the provided lat/lng.
    const {output} = await prompt(input);
    return output!;
  }
);
