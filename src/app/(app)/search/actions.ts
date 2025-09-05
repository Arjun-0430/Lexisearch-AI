"use server";

import { aiRankedSearchResults } from "@/ai/flows/ai-ranked-search-results";
import { getCases } from "@/lib/data";
import type { Case } from "@/lib/types";
import { parse, isAfter, isBefore, isEqual } from 'date-fns';

export async function performSearch(formData: FormData): Promise<Case[]> {
    const query = (formData.get('searchQuery') as string || '').toLowerCase();
    const state = formData.get('state') as string;
    const district = formData.get('district') as string;
    const establishment = formData.get('establishment') as string;
    const disposalNature = formData.get('disposalNature') as string;
    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;

    const startDate = startDateStr ? new Date(startDateStr) : null;
    const endDate = endDateStr ? new Date(endDateStr) : null;
    
    // Simulate DB query with filtering
    const allCases = getCases();

    const filteredCases = allCases.filter(c => {
        const queryMatch = query ? 
            c.Party_Name.toLowerCase().includes(query) || 
            c.Case_Number.toLowerCase().includes(query) || 
            c.CNR.toLowerCase().includes(query) : true;
        
        const stateMatch = state ? c.State === state : true;
        const districtMatch = district ? c.District === district : true;
        const establishmentMatch = establishment ? c.Establishment === establishment : true;
        const disposalNatureMatch = disposalNature ? c.Disposal_Nature === disposalNature : true;

        const registrationDate = parse(c.Date_of_Registration, "dd-MM-yyyy", new Date());

        const startDateMatch = startDate ? (isAfter(registrationDate, startDate) || isEqual(registrationDate, startDate)) : true;
        const endDateMatch = endDate ? (isBefore(registrationDate, endDate) || isEqual(registrationDate, endDate)) : true;

        return queryMatch && stateMatch && districtMatch && establishmentMatch && disposalNatureMatch && startDateMatch && endDateMatch;
    });

    if (filteredCases.length === 0) {
        return [];
    }

    if (query && filteredCases.length > 1) {
        try {
            const rankedResults = await aiRankedSearchResults({
                query: query,
                searchResults: filteredCases,
            });
            // The AI might return a different structure, so we need to be careful
            // For this mock, we assume it returns the same structure and order.
            // A more robust solution would map the AI response back to our Case[] type.
            return rankedResults as Case[];
        } catch (error) {
            console.error("AI Ranking failed:", error);
            return filteredCases; // Fallback to unranked results
        }
    }

    return filteredCases;
}
