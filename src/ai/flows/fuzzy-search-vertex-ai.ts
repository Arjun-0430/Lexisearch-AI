'use server';

/**
 * @fileOverview Implements a fuzzy search flow using Vertex AI to find
 *   close matches in court records even with partial or misspelled search terms.
 *
 * - fuzzySearchVertexAI - A function that handles the fuzzy search process.
 * - FuzzySearchVertexAIInput - The input type for the fuzzySearchVertexAI function.
 * - FuzzySearchVertexAIOutput - The return type for the fuzzySearchVertexAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FuzzySearchVertexAIInputSchema = z.object({
  searchQuery: z.string().describe('The search query string.'),
  state: z.string().optional().describe('The state to filter by.'),
  district: z.string().optional().describe('The district to filter by.'),
  establishment: z.string().optional().describe('The establishment to filter by.'),
  disposalNature: z.string().optional().describe('The disposal nature to filter by.'),
  startDate: z.string().optional().describe('The start date to filter by.'),
  endDate: z.string().optional().describe('The end date to filter by.'),
});
export type FuzzySearchVertexAIInput = z.infer<typeof FuzzySearchVertexAIInputSchema>;

const CourtRecordSchema = z.object({
  Sr_No: z.string(),
  State: z.string(),
  District: z.string(),
  Establishment: z.string(),
  CNR: z.string(),
  Case_Number: z.string(),
  Party_Name: z.string(),
  Date_of_Registration: z.string(),
  Purpose_Name: z.string(),
  Next_Date: z.string(),
  Disposal_Nature: z.string(),
  Date_of_Decision: z.string(),
});

const FuzzySearchVertexAIOutputSchema = z.array(CourtRecordSchema);

export type FuzzySearchVertexAIOutput = z.infer<typeof FuzzySearchVertexAIOutputSchema>;

export async function fuzzySearchVertexAI(input: FuzzySearchVertexAIInput): Promise<FuzzySearchVertexAIOutput> {
  return fuzzySearchVertexAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fuzzySearchVertexAIPrompt',
  input: {
    schema: FuzzySearchVertexAIInputSchema,
  },
  output: {
    schema: FuzzySearchVertexAIOutputSchema,
  },
  prompt: `You are a legal search assistant. Use the following search query and filters to locate court records.

  Search Query: {{{searchQuery}}}
  {{#if state}}State: {{{state}}}{{/if}}
  {{#if district}}District: {{{district}}}{{/if}}
  {{#if establishment}}Establishment: {{{establishment}}}{{/if}}
  {{#if disposalNature}}Disposal Nature: {{{disposalNature}}}{{/if}}
  {{#if startDate}}Start Date: {{{startDate}}}{{/if}}
  {{#if endDate}}End Date: {{{endDate}}}{{/if}}

  Return an array of court records that closely match the search criteria.`,
});

const fuzzySearchVertexAIFlow = ai.defineFlow(
  {
    name: 'fuzzySearchVertexAIFlow',
    inputSchema: FuzzySearchVertexAIInputSchema,
    outputSchema: FuzzySearchVertexAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
