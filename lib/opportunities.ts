// Venture categories for opportunities
export const VENTURES = [
    { id: 'property', name: 'Property Development', defaultImage: '/images/ben-lowrey-11-houses-header.jpeg' },
    { id: 'phantom', name: 'Phantom Assets', defaultImage: '/images/ben-lowrey-phantom-assets-header.jpg' },
    { id: 'mortgage', name: 'Mortgage Broker', defaultImage: '/images/property-1.jpg' },
    { id: 'realawake', name: 'Real Awake', defaultImage: '/images/ben-lowrey-real-awake-new-header.jpg' },
    { id: 'henparty', name: 'Hen Party Entertainment', defaultImage: '/images/ben-lowrey-hen-party-header.jpg' },
] as const;

export type VentureId = typeof VENTURES[number]['id'];

export interface Opportunity {
    id: string;
    ventureId: VentureId;
    title: string;
    description: string;
    createdAt: string;
}

export interface VentureSettings {
    [ventureId: string]: {
        customImage?: string;
    };
}

const STORAGE_KEY = 'ben-lowrey-opportunities';
const VENTURE_SETTINGS_KEY = 'ben-lowrey-venture-settings';
const UPLOADED_IMAGES_KEY = 'ben-lowrey-uploaded-images';
const BACKGROUND_IMAGES_KEY = 'ben-lowrey-background-images';

// Get venture settings from localStorage
export function getVentureSettings(): VentureSettings {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(VENTURE_SETTINGS_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

// Save venture settings
export function saveVentureSettings(settings: VentureSettings): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(VENTURE_SETTINGS_KEY, JSON.stringify(settings));
}

// Update a single venture's image
export function updateVentureImage(ventureId: VentureId, imageUrl: string): void {
    const settings = getVentureSettings();
    settings[ventureId] = { ...settings[ventureId], customImage: imageUrl };
    saveVentureSettings(settings);
}

// Get uploaded images from localStorage
export function getUploadedImages(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(UPLOADED_IMAGES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// Save an uploaded image (base64)
export function saveUploadedImage(base64Image: string): void {
    if (typeof window === 'undefined') return;
    const images = getUploadedImages();
    // Avoid duplicates
    if (!images.includes(base64Image)) {
        images.unshift(base64Image); // Add to front
        // Keep only last 20 uploads to avoid localStorage limits
        const trimmed = images.slice(0, 20);
        localStorage.setItem(UPLOADED_IMAGES_KEY, JSON.stringify(trimmed));
    }
}

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

// Get venture image by ID (checks custom settings first, then default)
export function getVentureImage(ventureId: VentureId): string {
    const settings = getVentureSettings();
    const customImage = settings[ventureId]?.customImage;
    if (customImage) return customImage;

    return VENTURES.find(v => v.id === ventureId)?.defaultImage || '/images/logo.jpg';
}

// Background images for homepage
export function getBackgroundImages(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(BACKGROUND_IMAGES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveBackgroundImages(images: string[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(BACKGROUND_IMAGES_KEY, JSON.stringify(images));
}

export function addBackgroundImage(imageUrl: string): void {
    const images = getBackgroundImages();
    if (!images.includes(imageUrl)) {
        images.push(imageUrl);
        saveBackgroundImages(images);
    }
}

export function removeBackgroundImage(imageUrl: string): void {
    const images = getBackgroundImages().filter(img => img !== imageUrl);
    saveBackgroundImages(images);
}
