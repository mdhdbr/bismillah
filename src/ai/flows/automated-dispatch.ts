'use server';
/**
 * @fileOverview An AI agent to automatically suggest vehicle and driver assignments for pending jobs.
 *
 * - suggestAssignments - A function that takes job criteria and suggests optimal vehicle and driver assignments.
 * - SuggestAssignmentsInput - The input type for the suggestAssignments function, defining job requirements.
 * - SuggestAssignmentsOutput - The return type for the suggestAssignments function, providing assignment suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAssignmentsInputSchema = z.object({
  jobId: z.string().describe('The ID of the job to be assigned.'),
  vehicleType: z.string().describe('The type of vehicle required for the job.'),
  pickupLocation: z.object({
    lat: z.number().describe('The latitude of the pickup location.'),
    lng: z.number().describe('The longitude of the pickup location.'),
  }).describe('The pickup location of the job.'),
  driverFatigueThreshold: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM').describe('Acceptable levels of driver fatigue (LOW, MEDIUM, or HIGH).'),
});
export type SuggestAssignmentsInput = z.infer<typeof SuggestAssignmentsInputSchema>;

const SuggestAssignmentsOutputSchema = z.object({
  vehicleId: z.string().describe('The ID of the suggested vehicle.'),
  driverId: z.string().describe('The ID of the suggested driver.'),
  reasoning: z.string().describe('Explanation of why this assignment is optimal, considering proximity, availability, vehicle type, and driver fatigue levels.'),
});
export type SuggestAssignmentsOutput = z.infer<typeof SuggestAssignmentsOutputSchema>;

export async function suggestAssignments(input: SuggestAssignmentsInput): Promise<SuggestAssignmentsOutput> {
  return suggestAssignmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAssignmentsPrompt',
  input: {schema: SuggestAssignmentsInputSchema},
  output: {schema: SuggestAssignmentsOutputSchema},
  prompt: `You are an expert logistics coordinator specializing in assigning vehicles and drivers to pending jobs. Given the following job criteria, suggest the most suitable vehicle and driver.

Job ID: {{{jobId}}}
Vehicle Type Required: {{{vehicleType}}}
Pickup Location: Latitude: {{{pickupLocation.lat}}}, Longitude: {{{pickupLocation.lng}}}
Driver Fatigue Threshold: {{{driverFatigueThreshold}}}

Consider the following factors when making your suggestion:

*   Proximity: Assign vehicles and drivers that are closest to the pickup location.
*   Availability: Only assign vehicles and drivers that are currently available and not already assigned to another job.
*   Vehicle Type: Ensure that the assigned vehicle is of the correct type for the job.
*   Driver Fatigue Levels: Only assign drivers whose fatigue levels are below the specified threshold.

Return the vehicle ID, driver ID, and a brief explanation of your reasoning.

Output:
\`\`\`
{
  "vehicleId": "<vehicle_id>",
  "driverId": "<driver_id>",
  "reasoning": "<reasoning>"
}
\`\`\`
`,
});

const suggestAssignmentsFlow = ai.defineFlow(
  {
    name: 'suggestAssignmentsFlow',
    inputSchema: SuggestAssignmentsInputSchema,
    outputSchema: SuggestAssignmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
