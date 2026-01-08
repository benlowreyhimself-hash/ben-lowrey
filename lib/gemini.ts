import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function rephraseContent(content: string, wordCount: number): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are a professional copywriter for Ben Lowrey's personal brand. Ben is a creative entrepreneur, property developer, mortgage broker, and retreat organiser based in South Wales, UK.

Rephrase the following opportunity description to be approximately ${wordCount} words (can be ±5 words).
Keep the tone professional but approachable and warm. Maintain the core message and call-to-action.
Write in third person when referring to Ben, or first person if the original uses first person.
Do not include any quotation marks or extra formatting - just return the rephrased text.

Original text:
${content}

Rephrased text (approximately ${wordCount} words):`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
}
