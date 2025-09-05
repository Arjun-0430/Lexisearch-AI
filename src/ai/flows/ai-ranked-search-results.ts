'use server';
/**
 * @fileOverview AI-powered flow to rank search results based on relevance.
 *
 * - aiRankedSearchResults - A function that ranks search results using AI.
 * - AIRankedSearchResultsInput - The input type for the aiRankedSearchResults function.
 * - AIRankedSearchResultsOutput - The return type for the aiRankedSearchResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRankedSearchResultsInputSchema = z.object({
  query: z.string().describe('The search query.'),
  searchResults: z.array(z.record(z.any())).describe('The list of search results to rank.'),
});
export type AIRankedSearchResultsInput = z.infer<typeof AIRankedSearchResultsInputSchema>;

const AIRankedSearchResultsOutputSchema = z.array(z.record(z.any())).describe('The ranked list of search results.');
export type AIRankedSearchResultsOutput = z.infer<typeof AIRankedSearchResultsOutputSchema>;

export async function aiRankedSearchResults(input: AIRankedSearchResultsInput): Promise<AIRankedSearchResultsOutput> {
  return aiRankedSearchResultsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRankedSearchResultsPrompt',
  input: {schema: AIRankedSearchResultsInputSchema},
  output: {schema: AIRankedSearchResultsOutputSchema},
  prompt: `You are an AI expert in ranking search results based on relevance.

Given the search query: {{{query}}}

And the following search results:

{{#each searchResults}}
{{@index}}: {{this}}
{{/each}}

Rank the search results based on their relevance to the search query. Return the ranked list of search results.
Ensure that the output is a valid JSON array of objects.
`, // Ensure output is a valid JSON array
});

const aiRankedSearchResultsFlow = ai.defineFlow(
  {
    name: 'aiRankedSearchResultsFlow',
    inputSchema: AIRankedSearchResultsInputSchema,
    outputSchema: AIRankedSearchResultsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    try {
      if (output) {
        // Attempt to parse the output as JSON
        const parsedOutput = JSON.parse(output.text);
        return parsedOutput as AIRankedSearchResultsOutput;
      }
      return [] as AIRankedSearchResultsOutput;
    } catch (error) {
      console.error('Error parsing JSON output from prompt:', error);
      // If parsing fails, return the original search results (unranked)
      return input.searchResults as AIRankedSearchResultsOutput;
    }
  }
);
