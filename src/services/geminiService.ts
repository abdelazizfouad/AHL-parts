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
}

export async function decodeVIN(vin: string): Promise<VINInfo | null> {
  if (!vin || vin.length !== 17) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Decode this Mercedes-Benz VIN: ${vin}. 
      Provide the following details in JSON format:
      {
        "make": "Mercedes-Benz",
        "model": "e.g. E-Class",
        "year": "e.g. 2015",
        "engine": "e.g. 3.5L V6",
        "trim": "e.g. E350",
        "transmission": "e.g. 7-Speed Automatic",
        "bodyStyle": "e.g. Sedan",
        "recommendedParts": ["Oil Filter", "Brake Pads", "Air Filter"]
      }
      If the VIN is invalid, return an error object.`,
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
