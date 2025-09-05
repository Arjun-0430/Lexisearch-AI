
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

    try {
        const response = await fetch(`${apiUrl}/search?${params.toString()}`);
        if (!response.ok) {
            console.error("Failed to fetch cases from backend:", response.statusText);
            return [];
        }
        return await response.json();
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
    if (disposalNature) params.append('disposalNature', disposalNature);
    if (startDateStr) params.append('startDate', startDateStr);
    if (endDateStr) params.append('endDate', endDateStr);

    const filteredCases = await fetchCasesFromBackend(params);

    if (filteredCases.length === 0) {
        return [];
    }

    if (query && filteredCases.length > 1) {
        try {
            const rankedResults = await aiRankedSearchResults({
                query: query,
                searchResults: filteredCases,
            });
            return rankedResults as Case[];
        } catch (error) {
            console.error("AI Ranking failed:", error);
            return filteredCases; // Fallback to unranked results
        }
    }

    return filteredCases;
}
