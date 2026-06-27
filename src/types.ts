export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  ph: number;
  mineralDensity: string; // e.g. "Low", "Medium", "Rich"
  activeBotanicals: string[];
  attributes: { label: string; value: string }[];
  accentColor: string;
  textColor: string;
}

export interface CustomBottle {
  vesselType: 'glass' | 'ceramic' | 'steel';
  vesselColor: string;
  waterBase: 'alkaline' | 'ionized' | 'sparkling';
  infusion: 'none' | 'lemon-ginger' | 'cucumber-mint' | 'berry-basil';
  engraving: string;
  price: number;
}

export interface CartItem {
  id: string; // product id or custom bundle id
  name: string;
  vesselType?: string;
  infusion?: string;
  engraving?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface HydrationProfile {
  weight: number; // in kg
  activityLevel: 'sedentary' | 'moderate' | 'active';
  climate: 'temperate' | 'humid' | 'dry';
}
