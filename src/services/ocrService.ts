import { GoogleGenAI, Type } from "@google/genai";
import { ReceiptData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeReceipt(base64Image: string, mimeType: string): Promise<ReceiptData> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType,
            data: base64Image,
          },
        },
        {
          text: "Analyze this receipt or invoice. Extract the merchant name, date, total amount, currency, items (name and individual price), and suggest a category. Return strictly JSON.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          merchant: { type: Type.STRING },
          total: { type: Type.NUMBER },
          date: { type: Type.STRING, description: "ISO date format" },
          currency: { type: Type.STRING },
          category: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                amount: { type: Type.NUMBER },
              },
              required: ["name", "amount"],
            },
          },
        },
        required: ["merchant", "total", "items", "category"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Could not parse receipt");
  
  return JSON.parse(text) as ReceiptData;
}
