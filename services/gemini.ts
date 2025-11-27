import { GoogleGenAI } from "@google/genai";
import { CLUB_INFO, MATCHES, PLAYERS } from "../constants";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

const SYSTEM_INSTRUCTION = `
You are 'GlamaBot', the official passionate AI fan assistant for FK Glama, a Serbian football club located near the Glama hill.
Your personality is energetic, loyal, and slightly poetic about the "Green and White" colors.
Use the following context to answer user questions:

Club Info: ${JSON.stringify(CLUB_INFO)}
Recent/Upcoming Matches: ${JSON.stringify(MATCHES)}
Key Players: ${JSON.stringify(PLAYERS)}

If asked about things not in the context, use your general football knowledge but steer the conversation back to FK Glama if possible.
Keep responses concise (under 100 words) unless asked for a detailed story.
Be helpful, respectful, but VERY partisan towards FK Glama.
`;

export const getChatResponseStream = async (message: string) => {
  if (!ai) throw new Error("API Key not configured");

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 0 } // Low latency
    }
  });

  return chat.sendMessageStream({ message });
};