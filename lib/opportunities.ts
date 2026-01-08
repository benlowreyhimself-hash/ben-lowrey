// Venture categories for opportunities
export const VENTURES = [
    { id: 'property', name: 'Property Development', emoji: '🏗️' },
    { id: 'phantom', name: 'Phantom Assets', emoji: '👻' },
    { id: 'mortgage', name: 'Mortgage Broker', emoji: '🏠' },
    { id: 'realawake', name: 'Real Awake', emoji: '🌅' },
    { id: 'henparty', name: 'Hen Party Entertainment', emoji: '🎉' },
] as const;

export type VentureId = typeof VENTURES[number]['id'];

export interface Opportunity {
    id: string;
    ventureId: VentureId;
    title: string;
    description: string;
    createdAt: string;
}

const STORAGE_KEY = 'ben-lowrey-opportunities';

// Get all opportunities from localStorage
export function getOpportunities(): Opportunity[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// Save an opportunity
export function saveOpportunity(opportunity: Omit<Opportunity, 'id' | 'createdAt'>): Opportunity {
    const opportunities = getOpportunities();
    const newOpportunity: Opportunity = {
        ...opportunity,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    opportunities.push(newOpportunity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
    return newOpportunity;
}

// Delete an opportunity
export function deleteOpportunity(id: string): void {
    const opportunities = getOpportunities().filter(o => o.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
}

// Update an opportunity
export function updateOpportunity(id: string, updates: Partial<Omit<Opportunity, 'id' | 'createdAt'>>): Opportunity | null {
    const opportunities = getOpportunities();
    const index = opportunities.findIndex(o => o.id === id);
    if (index === -1) return null;

    opportunities[index] = { ...opportunities[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
    return opportunities[index];
}

// Get venture name by ID
export function getVentureName(ventureId: VentureId): string {
    return VENTURES.find(v => v.id === ventureId)?.name || ventureId;
}

// Get venture emoji by ID
export function getVentureEmoji(ventureId: VentureId): string {
    return VENTURES.find(v => v.id === ventureId)?.emoji || '📌';
}
