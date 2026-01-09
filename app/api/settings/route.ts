import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-settings.json');

interface SiteSettings {
    opportunities: Array<{
        id: string;
        ventureId: string;
        title: string;
        description: string;
        createdAt: string;
    }>;
    ventureImages: Record<string, string>;
    backgroundImages: string[];
    uploadedImages: string[];
}

function readSettings(): SiteSettings {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return {
            opportunities: [],
            ventureImages: {},
            backgroundImages: [],
            uploadedImages: []
        };
    }
}

function writeSettings(settings: SiteSettings): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(settings, null, 2));
}

// GET - Read settings
export async function GET() {
    const settings = readSettings();
    return NextResponse.json(settings);
}

// POST - Update settings
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const current = readSettings();

        // Merge with existing settings
        const updated: SiteSettings = {
            opportunities: body.opportunities ?? current.opportunities,
            ventureImages: body.ventureImages ?? current.ventureImages,
            backgroundImages: body.backgroundImages ?? current.backgroundImages,
            uploadedImages: body.uploadedImages ?? current.uploadedImages,
        };

        writeSettings(updated);
        return NextResponse.json({ success: true, settings: updated });
    } catch (error) {
        console.error('Failed to save settings:', error);
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}
