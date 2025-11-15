'use server';

import {
  getPersonalizedChannelRecommendations,
  PersonalizedChannelRecommendationsInput,
} from './flows/personalized-channel-recommendations';

export async function getRecommendations(
  input: PersonalizedChannelRecommendationsInput
) {
  try {
    const result = await getPersonalizedChannelRecommendations(input);
    return result;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    // Return a structured error or an empty list
    return { recommendations: [] };
  }
}
