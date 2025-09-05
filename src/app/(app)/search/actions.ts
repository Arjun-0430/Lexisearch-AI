
"use server";

import { aiRankedSearchResults } from "@/ai/flows/ai-ranked-search-results";
import type { Case } from "@/lib/types";
import { parse, isAfter, isBefore, isEqual } from 'date-fns';

async function fetchCasesFromBackend(params: URLSearchParams): Promise<Case[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        console.error("API URL is not configured.");
        return [];
    }
    
    // The user's example uses `parties`, let's align with that if the query is present.
    // The backend seems to expect `parties` for the main search term.
    const query = params.get('q');
    if (query) {
        params.delete('q');
        params.set('parties', query);
    }

    try {
        const response = await fetch(`${apiUrl}/search?${params.toString()}`);
        if (!response.ok) {
            console.error("Failed to fetch cases from backend:", response.statusText);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return [];
        }
        const data = await response.json();
        // The backend returns an object with a `case_records` key
        return data.case_records as Case[];
    } catch (error) {
        console.error("Error fetching cases from backend:", error);
        return [];
    }
}

export async function performSearch(formData: FormData): Promise<Case[]> {
    const query = (formData.get('searchQuery') as string || '').toLowerCase();
    const state = formData.get('state') as string;
    const district = formData.get('district') as string;
    const establishment = formData.get('establishment') as string;
    const disposalNature = formData.get('disposalNature') as string;
    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;

    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (state) params.append('state', state);
    if (district) params.append('district', district);
    if (establishment) params.append('establishment', establishment);
    if (disposalNature) params.append('disposal_nature', disposalNature);
    if (startDateStr) params.append('start_date', startDateStr.split('T')[0]);
    if (endDateStr) params.append('end_date', endDateStr.split('T')[0]);

    const filteredCases = await fetchCasesFromBackend(params);

    if (filteredCases.length === 0) {
        return [];
    }

    // The AI ranking seems to cause issues, let's return the direct results for now.
    // if (query && filteredCases.length > 1) {
    //     try {
    //         const rankedResults = await aiRankedSearchResults({
    //             query: query,
    //             searchResults: filteredCases,
    //         });
    //         return rankedResults as Case[];
    //     } catch (error) {
    //         console.error("AI Ranking failed:", error);
    //         return filteredCases; // Fallback to unranked results
    //     }
    // }

    return filteredCases;
}
