'use server';

/**
 * @fileOverview Generates a custom soundscape suggestion based on the user's emotional state.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SoundscapePresetInputSchema = z.object({
  moodDescription: z
    .string()
    .describe('A natural description of how the user feels.'),
});
export type SoundscapePresetInput = z.infer<typeof SoundscapePresetInputSchema>;

const SoundscapePresetOutputSchema = z.object({
  suggestion: z
    .string()
    .describe('Short, friendly advice on which ambient sounds to blend and why.'),
});
export type SoundscapePresetOutput = z.infer<typeof SoundscapePresetOutputSchema>;

export async function generateSoundscapePreset(
  input: SoundscapePresetInput
): Promise<SoundscapePresetOutput> {
  return generateSoundscapePresetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSoundscapePresetPrompt',
  input: { schema: SoundscapePresetInputSchema },
  output: { schema: SoundscapePresetOutputSchema },
  prompt: `
You're a sound therapist helping users create a calming ambient environment.

Available ambient sounds:
- Ocean Waves
- Forest Ambience
- Gentle Rain
- Morning Birds
- Night Crickets
- Cafe Buzz

Suggest 2 to 4 of these to match the user's emotional state.

Instructions:
- Be warm, supportive, and concise (1-2 sentences)
- Use the **exact sound names** as listed above
- Recommend **specific volume levels from 1-100%**
  (e.g., “Ocean Waves at 30% volume” or “Cafe Buzz at 10% volume”)
- Combine sounds that complement each other
- Do **not** list sounds irrelevant to the user's state

User's mood:
{{{moodDescription}}}

Respond with only the sound suggestions and their volume settings.
Do not include extra labels, explanation, or formatting.
`,
});

const generateSoundscapePresetFlow = ai.defineFlow(
  {
    name: 'generateSoundscapePresetFlow',
    inputSchema: SoundscapePresetInputSchema,
    outputSchema: SoundscapePresetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input, {
      options: {
        model: 'googleai/gemini-2.0-flash',
        temperature: 0.85,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 150,
      },
    });

    return output!;
  }
);
