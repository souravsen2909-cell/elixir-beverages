import { Product } from './types';

export const products: Product[] = [
  {
    id: 'premium-alkaline',
    name: 'Premium Alkaline Water',
    tagline: 'Purely Yours, designed to elevate your day',
    description: 'Our premium alkaline water is crafted for those who crave the finest—smooth, refreshing, and packed with balance. Every sip is an experience, whether you’re reaching for the sleek 500 ml or the generous 1-litre bottle. It’s more than just water—it’s a pure moment of indulgence, designed to elevate your day, your health, and your hydration game. Go ahead, choose the premium side of life—you deserve it!',
    price: 5.50,
    image: '/images/elixir_packaged_bottles_1782573252364.jpg',
    ph: 8.8,
    mineralDensity: 'Rich & High Alkaline',
    activeBotanicals: ['Antioxidants', 'pH Boosters', 'Organic Trace Minerals'],
    attributes: [
      { label: 'Improved Cognitive Function', value: 'Rich antioxidant properties help improve overall cognitive function.' },
      { label: 'Neutralises Acidity', value: 'Our alkaline water helps neutralize acidity in the human body.' },
      { label: 'Reduced Risk', value: 'Slows down the progression of chronic diseases.' },
      { label: 'Antioxidant Properties', value: 'Helps neutralize free radicals potentially reducing oxidative stress.' }
    ],
    accentColor: 'from-emerald-400 to-teal-500',
    textColor: 'text-emerald-600'
  },
  {
    id: 'everyday-alkaline',
    name: 'Everyday Alkaline Water',
    tagline: 'Giving everyday hydration an upgrade!',
    description: 'Giving everyday hydration an upgrade! Our everyday alkaline water is all about keeping things crisp, refreshing, and just the right balance. Whether you’re reaching for a 500 ml to power through the day or grabbing a 1-litre bottle to stay refreshed all day long, you’ll notice the difference in every sip. It’s simple, it’s clean, and it’s the water your body’s been craving—hydrate smarter, not harder!',
    price: 3.50,
    image: '/images/elixir_packaged_bottles_1782573252364.jpg',
    ph: 7.8,
    mineralDensity: 'Medium Balanced Minerals',
    activeBotanicals: ['Pure Source minerals', 'Hydration salts'],
    attributes: [
      { label: 'Improved Bone Health', value: 'Rich mineral content strengthens overall bone health leading to an efficient existence.' },
      { label: 'Hydration', value: 'Rich mineral content of calcium & magnesium enhances hydration.' },
      { label: 'Increased Energy', value: 'Increases energy levels due to improved hydration and mineral intake.' },
      { label: 'Digestive Health', value: 'Helps reduce symptoms of acid reflux and improves digestion.' }
    ],
    accentColor: 'from-blue-500 to-cyan-500',
    textColor: 'text-cyan-600'
  }
];

export const customizerOptions = {
  vessels: [
    { id: 'glass', name: 'Prism Pure Glass', price: 12.00, desc: 'Ultra-thin, clear borosilicate glass with custom wood cork top.' },
    { id: 'ceramic', name: 'Pebble Matte Ceramic', price: 16.00, desc: 'Double-fired ceramic with soft touch satin-finish and loop strap.' },
    { id: 'steel', name: 'Vortex Thermal Steel', price: 22.00, desc: 'Double-walled vacuum insulated, retains cold temperature for 36 hours.' }
  ],
  colors: [
    { id: 'alpine-frost', name: 'Alpine Frost', value: '#F1F5F9', bgClass: 'bg-slate-100', textClass: 'text-slate-800' },
    { id: 'emerald-mint', name: 'Emerald Mint', value: '#D1FAE5', bgClass: 'bg-emerald-100', textClass: 'text-emerald-800' },
    { id: 'obsidian-jet', name: 'Obsidian Jet', value: '#1E293B', bgClass: 'bg-slate-800', textClass: 'text-white' },
    { id: 'rose-quartz', name: 'Rose Quartz', value: '#FFE4E6', bgClass: 'bg-rose-100', textClass: 'text-rose-800' },
    { id: 'glacial-blue', name: 'Glacial Blue', value: '#E0F2FE', bgClass: 'bg-sky-100', textClass: 'text-sky-800' }
  ],
  bases: [
    { id: 'alkaline', name: 'Pure Volcanic Alkaline (pH 8.2)', desc: 'Naturally filtered alkaline water with calcium and silicon.', price: 1.50 },
    { id: 'ionized', name: 'Active Electrolyte Ionized', desc: 'Charged with ionic magnesium & potassium for high athletic hydration.', price: 2.00 },
    { id: 'sparkling', name: 'Glacier Crisp Sparkling', desc: 'Gently carbonated, crisp carbonation for immediate palate activation.', price: 2.50 }
  ],
  infusions: [
    { id: 'none', name: 'Prism Clear (No Infusions)', desc: 'Zero added organic botanicals or flavors.', price: 0.00 },
    { id: 'lemon-ginger', name: 'Citrus Zest (Lemon & Ginger)', desc: 'Zesty organic lemon oils with a subtle warm throat-kick of ginger root.', price: 1.00 },
    { id: 'cucumber-mint', name: 'Cool Meadow (Cucumber & Mint)', desc: 'Crisp field-grown cucumber essence paired with active garden peppermint.', price: 1.00 },
    { id: 'berry-basil', name: 'Forest Dew (Wild Berry & Basil)', desc: 'Rich antioxidant-filled blackberry juices married with crushed sweet basil.', price: 1.50 }
  ]
};

export const carbonImpactCalculator = {
  plasticPerYear: 156, // Average single-use plastic bottles an average person buys per year
  carbonPerPlasticBottle: 82.8, // Grams of CO2 emitted to produce/transport one plastic bottle
  waterTransportSavings: 3.4 // Multiplier of savings when sourcing filtered local spring premium
};
