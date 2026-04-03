export interface Product {
  id?: string;
  name: string;
  partNumber: string;
  price: number;
  image: string;
  compatibility: string;
  category: string;
  description?: string;
  createdAt?: any;
}

export const CATEGORIES = [
  "Accessories",
  "Air Conditioning",
  "Body & Chassis",
  "Brakes",
  "Cooling System",
  "Electrical & Lighting",
  "Engine & Drivetrain",
  "Exhaust System",
  "Fuel System",
  "Interior & Trim",
  "Oil & Fluids",
  "Steering & Suspension",
  "Tools & Garage",
  "Transmission & Clutch",
  "Wheels & Tires"
] as const;

export type Category = typeof CATEGORIES[number];
