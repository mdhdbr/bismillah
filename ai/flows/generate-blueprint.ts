'use server';
/**
 * @fileOverview An AI flow to generate architectural blueprint images.
 *
 * - generateBlueprint - A function that takes a text prompt and generates an image.
 * - GenerateBlueprintInput - The input type for the generateBlueprint function.
 * - GenerateBlueprintOutput - The return type for the generateBlueprint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlueprintInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateBlueprintInput = z.infer<typeof GenerateBlueprintInputSchema>;

const GenerateBlueprintOutputSchema = z.object({
  imageUrl: z.string().describe("The data URI of the generated image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateBlueprintOutput = z.infer<typeof GenerateBlueprintOutputSchema>;

export async function generateBlueprint(input: GenerateBlueprintInput): Promise<GenerateBlueprintOutput> {
  return generateBlueprintFlow(input);
}

const generateBlueprintFlow = ai.defineFlow(
  {
    name: 'generateBlueprintFlow',
    inputSchema: GenerateBlueprintInputSchema,
    outputSchema: GenerateBlueprintOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Create a high-resolution, ultra-detailed, photorealistic architectural blueprint of a futuristic, planet-scale logistics and transport platform. The style should be clean, modern, and technical, like a master diagram for a global system. Use a dark navy blue background with glowing teal and white lines. The diagram should show interconnected layers: a physical layer with autonomous trucks and drones, a digital layer with data streams and AI cores, and a human interface layer with operators at command consoles. Include abstract representations of real-time data flow, predictive models, and global connectivity. The overall impression should be one of immense scale, intelligence, and precision. Render in 16:9 aspect ratio.`,
        config: {
            aspectRatio: '16:9',
        }
    });
    
    if (!media.url) {
        throw new Error('Image generation failed to return a URL.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
