import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const imagesDir = path.join(process.cwd(), 'public', 'images');
        const files = fs.readdirSync(imagesDir);

        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/images/${file}`)
            .sort();

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error listing images:', error);
        return NextResponse.json({ images: [] });
    }
}
