// Comprehensive keycap reference with dimensions, profiles, and sourcing info

export interface KeycapProfile {
  id: string;
  name: string;
  description: string;
  manufacturer: string[];
  height: number; // in mm
  topSurface: 'cylindrical' | 'spherical' | 'flat';
  sculpted: boolean;
}

export interface KeycapSize {
  id: string;
  name: string;
  units: number; // standard key width units (1u = 19.05mm)
  widthMm: number;
  heightMm: number;
  commonUses: string[];
  variants?: KeycapVariant[];
}

export interface KeycapVariant {
  id: string;
  name: string;
  description: string;
  widthMm: number;
  heightMm: number;
  shape: 'rectangular' | 'L-shaped' | 'stepped' | 'split' | 'curved';
  region: 'ANSI' | 'ISO' | 'JIS' | 'Universal';
}

export interface KeycapMaterial {
  id: string;
  name: string;
  description: string;
  durability: 'Low' | 'Medium' | 'High' | 'Very High';
  feel: string;
  sound: string;
  priceRange: 'Budget' | 'Mid' | 'Premium' | 'Luxury';
}

export interface KeycapSource {
  vendor: string;
  url: string;
  priceRange: string;
  availability: 'In Stock' | 'Pre-order' | 'Group Buy' | 'Discontinued';
  shippingRegions: string[];
  notes?: string;
}

// Standard keycap profiles
export const KEYCAP_PROFILES: KeycapProfile[] = [
  {
    id: 'cherry',
    name: 'Cherry',
    description: 'Classic cylindrical profile, medium height',
    manufacturer: ['GMK', 'Cherry', 'JTK', 'ePBT'],
    height: 9.2,
    topSurface: 'cylindrical',
    sculpted: true,
  },
  {
    id: 'oem',
    name: 'OEM',
    description: 'Most common profile, slightly taller than Cherry',
    manufacturer: ['Various', 'HyperX', 'Corsair', 'Razer'],
    height: 9.5,
    topSurface: 'cylindrical',
    sculpted: true,
  },
  {
    id: 'sa',
    name: 'SA (Spherical All)',
    description: 'Tall spherical profile, vintage feel',
    manufacturer: ['Signature Plastics', 'Maxkey'],
    height: 12.6,
    topSurface: 'spherical',
    sculpted: true,
  },
  {
    id: 'dsa',
    name: 'DSA (DCS Spherical All)',
    description: 'Low uniform spherical profile',
    manufacturer: ['Signature Plastics', 'PimpMyKeyboard'],
    height: 7.4,
    topSurface: 'spherical',
    sculpted: false,
  },
  {
    id: 'xda',
    name: 'XDA',
    description: 'Uniform flat profile, comfortable for all fingers',
    manufacturer: ['XIAMI', 'KBDfans'],
    height: 8.5,
    topSurface: 'flat',
    sculpted: false,
  },
  {
    id: 'mt3',
    name: 'MT3',
    description: 'Deep dish spherical, inspired by IBM keyboards',
    manufacturer: ['Drop', 'Matt3o'],
    height: 13.5,
    topSurface: 'spherical',
    sculpted: true,
  },
];

// Standard keycap sizes with variants
export const KEYCAP_SIZES: KeycapSize[] = [
  {
    id: '1u',
    name: '1 Unit',
    units: 1,
    widthMm: 19.05,
    heightMm: 19.05,
    commonUses: ['Letters', 'Numbers', 'Function keys', 'Arrow keys'],
  },
  {
    id: '1.25u',
    name: '1.25 Units',
    units: 1.25,
    widthMm: 23.81,
    heightMm: 19.05,
    commonUses: ['Ctrl', 'Alt', 'Win/Cmd', 'Fn'],
  },
  {
    id: '1.5u',
    name: '1.5 Units',
    units: 1.5,
    widthMm: 28.58,
    heightMm: 19.05,
    commonUses: ['Tab'],
  },
  {
    id: '1.75u',
    name: '1.75 Units',
    units: 1.75,
    widthMm: 33.34,
    heightMm: 19.05,
    commonUses: ['Caps Lock'],
  },
  {
    id: '2u',
    name: '2 Units',
    units: 2,
    widthMm: 38.1,
    heightMm: 19.05,
    commonUses: ['Backspace', 'Numpad 0', 'Numpad +'],
  },
  {
    id: '2.25u',
    name: '2.25 Units',
    units: 2.25,
    widthMm: 42.86,
    heightMm: 19.05,
    commonUses: ['Left Shift', 'Enter (ANSI)'],
    variants: [
      {
        id: 'ansi-enter',
        name: 'ANSI Enter',
        description: 'Standard US layout enter key',
        widthMm: 42.86,
        heightMm: 19.05,
        shape: 'rectangular',
        region: 'ANSI',
      },
    ],
  },
  {
    id: '2.75u',
    name: '2.75 Units',
    units: 2.75,
    widthMm: 52.39,
    heightMm: 19.05,
    commonUses: ['Right Shift'],
  },
  {
    id: '6.25u',
    name: '6.25 Units',
    units: 6.25,
    widthMm: 119.06,
    heightMm: 19.05,
    commonUses: ['Spacebar (standard)'],
  },
  {
    id: '7u',
    name: '7 Units',
    units: 7,
    widthMm: 133.35,
    heightMm: 19.05,
    commonUses: ['Spacebar (WKL)'],
  },
  {
    id: 'iso-enter',
    name: 'ISO Enter',
    units: 1.25, // Base width
    widthMm: 23.81,
    heightMm: 38.1, // Double height
    commonUses: ['Enter (ISO/European)'],
    variants: [
      {
        id: 'iso-enter-standard',
        name: 'ISO Enter',
        description: 'European/International layout enter key',
        widthMm: 23.81,
        heightMm: 38.1,
        shape: 'L-shaped',
        region: 'ISO',
      },
    ],
  },
  {
    id: 'stepped-caps',
    name: 'Stepped Caps Lock',
    units: 1.75,
    widthMm: 33.34,
    heightMm: 19.05,
    commonUses: ['Caps Lock (stepped)'],
    variants: [
      {
        id: 'stepped-caps-standard',
        name: 'Stepped Caps Lock',
        description: 'Caps lock with step for Ctrl key',
        widthMm: 33.34,
        heightMm: 19.05,
        shape: 'stepped',
        region: 'Universal',
      },
    ],
  },
];

// Keycap materials
export const KEYCAP_MATERIALS: KeycapMaterial[] = [
  {
    id: 'abs',
    name: 'ABS Plastic',
    description: 'Lightweight, smooth finish, develops shine over time',
    durability: 'Medium',
    feel: 'Smooth, slightly textured',
    sound: 'Higher pitched, clacky',
    priceRange: 'Budget',
  },
  {
    id: 'pbt',
    name: 'PBT Plastic',
    description: 'Durable, textured finish, resistant to shine',
    durability: 'High',
    feel: 'Textured, dry grip',
    sound: 'Lower pitched, thocky',
    priceRange: 'Mid',
  },
  {
    id: 'pom',
    name: 'POM (Polyoxymethylene)',
    description: 'Self-lubricating, very smooth, excellent durability',
    durability: 'Very High',
    feel: 'Very smooth, slippery',
    sound: 'Deep, muted',
    priceRange: 'Premium',
  },
  {
    id: 'resin',
    name: 'Artisan Resin',
    description: 'Hand-crafted, unique designs, collectible',
    durability: 'Medium',
    feel: 'Varies by maker',
    sound: 'Varies by design',
    priceRange: 'Luxury',
  },
];

// Popular keycap sources
export const KEYCAP_SOURCES: Record<string, KeycapSource[]> = {
  'cherry': [
    {
      vendor: 'GMK',
      url: 'https://www.gmk-electronic-design.de',
      priceRange: '$120-200+ per set',
      availability: 'Group Buy',
      shippingRegions: ['Worldwide'],
      notes: 'Premium Cherry profile, long lead times',
    },
    {
      vendor: 'ePBT',
      url: 'https://kbdfans.com',
      priceRange: '$60-120 per set',
      availability: 'In Stock',
      shippingRegions: ['Worldwide'],
      notes: 'PBT Cherry profile, good value',
    },
  ],
  'sa': [
    {
      vendor: 'Signature Plastics',
      url: 'https://pimpmykeyboard.com',
      priceRange: '$100-300+ per set',
      availability: 'Pre-order',
      shippingRegions: ['Worldwide'],
      notes: 'Original SA manufacturer',
    },
  ],
  'oem': [
    {
      vendor: 'HyperX',
      url: 'https://www.hyperxgaming.com',
      priceRange: '$30-60 per set',
      availability: 'In Stock',
      shippingRegions: ['US', 'EU', 'Asia'],
      notes: 'Gaming-focused designs',
    },
  ],
};

// Utility functions
export function getKeycapsByProfile(profileId: string): KeycapSize[] {
  // In a real implementation, this would filter keycaps by profile compatibility
  return KEYCAP_SIZES;
}

export function getKeycapDimensions(sizeId: string, variantId?: string): { width: number; height: number } {
  const size = KEYCAP_SIZES.find(s => s.id === sizeId);
  if (!size) return { width: 19.05, height: 19.05 };

  if (variantId && size.variants) {
    const variant = size.variants.find(v => v.id === variantId);
    if (variant) {
      return { width: variant.widthMm, height: variant.heightMm };
    }
  }

  return { width: size.widthMm, height: size.heightMm };
}

export function getCompatibleProfiles(layoutType: 'ANSI' | 'ISO' | 'JIS'): KeycapProfile[] {
  // All profiles are generally compatible, but some have regional variants
  return KEYCAP_PROFILES;
}

export function calculateKeycapSetPrice(keys: string[], profile: string, material: string): number {
  // Simplified pricing calculation
  const basePrice = profile === 'cherry' ? 120 : profile === 'sa' ? 150 : 80;
  const materialMultiplier = material === 'pbt' ? 1.2 : material === 'pom' ? 1.8 : 1;
  const keyCount = keys.length;
  
  return Math.round(basePrice * materialMultiplier * (keyCount / 104));
}

export function getKeycapRecommendations(layoutId: string, budget: 'budget' | 'mid' | 'premium'): {
  profile: KeycapProfile;
  material: KeycapMaterial;
  sources: KeycapSource[];
  estimatedPrice: string;
}[] {
  const recommendations = [];
  
  if (budget === 'budget') {
    recommendations.push({
      profile: KEYCAP_PROFILES.find(p => p.id === 'oem')!,
      material: KEYCAP_MATERIALS.find(m => m.id === 'abs')!,
      sources: KEYCAP_SOURCES['oem'] || [],
      estimatedPrice: '$30-60',
    });
  }
  
  if (budget === 'mid') {
    recommendations.push({
      profile: KEYCAP_PROFILES.find(p => p.id === 'cherry')!,
      material: KEYCAP_MATERIALS.find(m => m.id === 'pbt')!,
      sources: KEYCAP_SOURCES['cherry'] || [],
      estimatedPrice: '$60-120',
    });
  }
  
  if (budget === 'premium') {
    recommendations.push({
      profile: KEYCAP_PROFILES.find(p => p.id === 'sa')!,
      material: KEYCAP_MATERIALS.find(m => m.id === 'pom')!,
      sources: KEYCAP_SOURCES['sa'] || [],
      estimatedPrice: '$150-300+',
    });
  }
  
  return recommendations;
}