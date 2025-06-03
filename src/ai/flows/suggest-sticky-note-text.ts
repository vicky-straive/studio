'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest text for sticky notes based on the surrounding PDF text.
 *
 * - suggestStickyNoteText -  A function that takes surrounding text as input and returns suggested text for a sticky note.
 * - SuggestStickyNoteTextInput - The input type for the suggestStickyNoteText function.
 * - SuggestStickyNoteTextOutput - The output type for the suggestStickyNoteText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStickyNoteTextInputSchema = z.object({
  surroundingText: z
    .string()
    .describe('The text surrounding the area where the sticky note is being added in the PDF.'),
});
export type SuggestStickyNoteTextInput = z.infer<
  typeof SuggestStickyNoteTextInputSchema
>;

const SuggestStickyNoteTextOutputSchema = z.object({
  suggestedText: z
    .string()
    .describe('The suggested text to use for the sticky note.'),
});
export type SuggestStickyNoteTextOutput = z.infer<
  typeof SuggestStickyNoteTextOutputSchema
>;

export async function suggestStickyNoteText(
  input: SuggestStickyNoteTextInput
): Promise<SuggestStickyNoteTextOutput> {
  return suggestStickyNoteTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStickyNoteTextPrompt',
  input: {schema: SuggestStickyNoteTextInputSchema},
  output: {schema: SuggestStickyNoteTextOutputSchema},
  prompt: `You are an AI assistant designed to suggest text for sticky notes in a PDF document.
  Based on the surrounding text, provide a concise and relevant suggestion for what the sticky note should say.
  Surrounding Text: {{{surroundingText}}}
  Suggestion: `,
});

const suggestStickyNoteTextFlow = ai.defineFlow(
  {
    name: 'suggestStickyNoteTextFlow',
    inputSchema: SuggestStickyNoteTextInputSchema,
    outputSchema: SuggestStickyNoteTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
