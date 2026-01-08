import { NextRequest, NextResponse } from 'next/server';
import { rephraseContent } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const { content, wordCount } = await request.json();

        if (!content || typeof content !== 'string') {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            );
        }

        if (!wordCount || ![30, 50, 80, 100].includes(wordCount)) {
            return NextResponse.json(
                { error: 'Word count must be 30, 50, 80, or 100' },
                { status: 400 }
            );
        }

        const rephrased = await rephraseContent(content, wordCount);
        return NextResponse.json({ rephrased });
    } catch (error) {
        console.error('Rephrase error:', error);
        return NextResponse.json(
            { error: 'Failed to rephrase content' },
            { status: 500 }
        );
    }
}
