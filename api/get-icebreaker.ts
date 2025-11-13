// This file should be placed in the `api` directory at the root of your project.
// e.g., /api/get-icebreaker.ts
// Hosting platforms like Vercel will automatically detect this as a serverless function.

import { GoogleGenAI } from "@google/genai";

// This function will be executed on the server, where process.env.API_KEY is securely stored.
export async function POST(request: Request) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const model = 'gemini-2.5-flash';

    const prompt = "Generate a single, clean, SFW icebreaker. It can be a funny pickup line or a classic dad joke. The tone should be lighthearted and witty. Do not include any introductory text, quotation marks, or explanations, just return the icebreaker itself.";

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });

    const text = response.text.trim();
    if (!text) {
        throw new Error("Received an empty response from the API.");
    }

    return new Response(JSON.stringify({ icebreaker: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in serverless function:", error);
    return new Response(JSON.stringify({ error: "Failed to communicate with the Gemini API." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}
