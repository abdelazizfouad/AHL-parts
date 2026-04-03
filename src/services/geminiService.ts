import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface VINInfo {
  make: string;
  model: string;
  year: string;
  engine: string;
  trim: string;
  transmission: string;
  bodyStyle: string;
  recommendedParts: string[];
  partInfo?: {
    name: string;
    description: string;
    estimatedPriceRange: string;
  };
}

export async function decodeVIN(input: string): Promise<VINInfo | null> {
  if (!input) return null;

  const isVIN = input.length === 17;

  try {
    const prompt = isVIN 
      ? `Decode this Mercedes-Benz VIN: ${input}. Provide real technical details. 
         If you can't find the exact car, provide the most likely details for a Mercedes with this VIN pattern.`
      : `Provide technical details for this Mercedes-Benz part number: ${input}. 
         Explain what this part is and which models it fits.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${prompt}
      Provide the following details in JSON format:
      {
        "make": "Mercedes-Benz",
        "model": "e.g. E-Class W213",
        "year": "e.g. 2018",
        "engine": "e.g. 2.0L I4 Turbo",
        "trim": "e.g. E300",
        "transmission": "e.g. 9G-TRONIC",
        "bodyStyle": "e.g. Sedan",
        "recommendedParts": ["Brake Pads", "Oil Filter", "Air Filter"],
        "partInfo": {
          "name": "Name of the part if searching by part number",
          "description": "Technical description",
          "estimatedPriceRange": "e.g. 5000 - 8000 EGP"
        }
      }
      If the input is invalid or not related to Mercedes-Benz, return an error object.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as VINInfo;
  } catch (error) {
    console.error("Error decoding VIN with AI:", error);
    return null;
  }
}
