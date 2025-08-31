"use server";

import { GoogleGenAI } from "@google/genai";
/* import dotenv from "dotenv";

dotenv.config(); */

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const model = "gemini-2.5-flash-lite";

const config = {
  thinkingConfig: {
    thinkingBudget: 0,
  },
};

export async function runAi(prompt: string) {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Generate a resume summary 1-2 sentences for a person with the following details: ${prompt} in plain text format`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    contents,
    config,
  });
  return response.text;
}
