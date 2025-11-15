// src/ai/flows/personalized-channel-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized channel recommendations based on viewing history.
 *
 * - getPersonalizedChannelRecommendations - A function that returns personalized channel recommendations.
 * - PersonalizedChannelRecommendationsInput - The input type for the getPersonalizedChannelRecommendations function.
 * - PersonalizedChannelRecommendationsOutput - The return type for the getPersonalizedChannelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedChannelRecommendationsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of channel IDs representing the user viewing history.'),
  allChannels: z.array(z.object({id: z.string(), name: z.string()})).describe('An array of all available channels.'),
  numberOfRecommendations: z
    .number()
    .default(5)
    .describe('The maximum number of channel recommendations to return.'),
});
export type PersonalizedChannelRecommendationsInput = z.infer<
  typeof PersonalizedChannelRecommendationsInputSchema
>;

const PersonalizedChannelRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.object({id: z.string(), name: z.string()}))
    .describe('An array of recommended channels based on viewing history.'),
});
export type PersonalizedChannelRecommendationsOutput = z.infer<
  typeof PersonalizedChannelRecommendationsOutputSchema
>;

export async function getPersonalizedChannelRecommendations(
  input: PersonalizedChannelRecommendationsInput
): Promise<PersonalizedChannelRecommendationsOutput> {
  return personalizedChannelRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedChannelRecommendationsPrompt',
  input: {schema: PersonalizedChannelRecommendationsInputSchema},
  output: {schema: PersonalizedChannelRecommendationsOutputSchema},
  prompt: `You are a TV channel recommendation expert. Given a user's viewing history and a list of all available channels, you will provide personalized channel recommendations.

User Viewing History: {{#if viewingHistory}}{{#each viewingHistory}}- {{{this}}}{{/each}}{{else}}None{{/if}}

All Channels: {{#each allChannels}}{{{name}}} (ID: {{{id}}}) {{/each}}

Based on this viewing history, recommend {{numberOfRecommendations}} channels from the 'All Channels' list that the user might enjoy. Only return channels that are in the All Channels list. DO NOT make up channel IDs that do not exist in the All Channels list.

Ensure the output is valid JSON.`,
});

const personalizedChannelRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedChannelRecommendationsFlow',
    inputSchema: PersonalizedChannelRecommendationsInputSchema,
    outputSchema: PersonalizedChannelRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
