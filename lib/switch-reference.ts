// Comprehensive mechanical switch reference with characteristics and sourcing

export interface SwitchCharacteristics {
  tactility: number; // 0-10 (0 = linear, 10 = very tactile)
  clickiness: number; // 0-10 (0 = silent, 10 = very clicky)
  smoothness: number; // 0-10 (0 = scratchy, 10 = buttery smooth)
  weight: number; // 0-10 (0 = very light, 10 = very heavy)
  sound: number; // 0-10 (0 = silent, 10 = loud)
  stability: number; // 0-10 (0 = wobbly, 10 = rock solid)
}

export interface SwitchSpecs {
  actuationForce: number; // in grams
  bottomOutForce: number; // in grams
  actuationDistance: number; // in mm
  totalTravel: number; // in mm
  springType: string;
  housingMaterial: 'Nylon' | 'Polycarbonate' | 'POM' | 'UHMWPE' | 'Mixed';
  stemMaterial: 'POM' | 'Nylon' | 'UHMWPE' | 'LY';
}

export interface MechanicalSwitch {
  id: string;
  name: string;
  brand: string;
  type: 'Linear' | 'Tactile' | 'Clicky';
  description: string;
  characteristics: SwitchCharacteristics;
  specs: SwitchSpecs;
  colorCode: string; // hex color for visual identification
  popularity: 'Niche' | 'Popular' | 'Very Popular' | 'Legendary';
  availability: 'Common' | 'Limited' | 'Rare' | 'Discontinued';
  priceRange: 'Budget' | 'Mid' | 'Premium' | 'Luxury';
  bestFor: string[];
  notRecommendedFor: string[];
  variants?: string[];
  releaseYear?: number;
}

export interface SwitchSource {
  vendor: string;
  url: string;
  pricePerSwitch: string;
  minimumOrder: number;
  availability: 'In Stock' | 'Pre-order' | 'Out of Stock';
  shippingRegions: string[];
  notes?: string;
}

// Comprehensive switch database
export const MECHANICAL_SWITCHES: MechanicalSwitch[] = [
  // Cherry MX Series
  {
    id: 'cherry-mx-red',
    name: 'Cherry MX Red',
    brand: 'Cherry',
    type: 'Linear',
    description: 'The gold standard linear switch, smooth and consistent',
    characteristics: {
      tactility: 0,
      clickiness: 0,
      smoothness: 7,
      weight: 4,
      sound: 3,
      stability: 9,
    },
    specs: {
      actuationForce: 45,
      bottomOutForce: 75,
      actuationDistance: 2.0,
      totalTravel: 4.0,
      springType: 'Progressive',
      housingMaterial: 'Nylon',
      stemMaterial: 'POM',
    },
    colorCode: '#FF4444',
    popularity: 'Legendary',
    availability: 'Common',
    priceRange: 'Mid',
    bestFor: ['Gaming', 'Fast typing', 'Beginners'],
    notRecommendedFor: ['Typing accuracy', 'Quiet environments'],
    variants: ['Cherry MX Red Silent', 'Cherry MX Speed Silver'],
    releaseYear: 2008,
  },
  {
    id: 'cherry-mx-blue',
    name: 'Cherry MX Blue',
    brand: 'Cherry',
    type: 'Clicky',
    description: 'Classic clicky switch with satisfying tactile bump and audible click',
    characteristics: {
      tactility: 8,
      clickiness: 9,
      smoothness: 6,
      weight: 5,
      sound: 9,
      stability: 9,
    },
    specs: {
      actuationForce: 50,
      bottomOutForce: 60,
      actuationDistance: 2.2,
      totalTravel: 4.0,
      springType: 'Progressive',
      housingMaterial: 'Nylon',
      stemMaterial: 'POM',
    },
    colorCode: '#4444FF',
    popularity: 'Legendary',
    availability: 'Common',
    priceRange: 'Mid',
    bestFor: ['Typing', 'Tactile feedback', 'Retro feel'],
    notRecommendedFor: ['Gaming', 'Quiet environments', 'Shared spaces'],
    releaseYear: 1985,
  },
  {
    id: 'cherry-mx-brown',
    name: 'Cherry MX Brown',
    brand: 'Cherry',
    type: 'Tactile',
    description: 'Gentle tactile bump without the click, versatile for all uses',
    characteristics: {
      tactility: 5,
      clickiness: 0,
      smoothness: 6,
      weight: 4,
      sound: 4,
      stability: 9,
    },
    specs: {
      actuationForce: 45,
      bottomOutForce: 55,
      actuationDistance: 2.0,
      totalTravel: 4.0,
      springType: 'Progressive',
      housingMaterial: 'Nylon',
      stemMaterial: 'POM',
    },
    colorCode: '#8B4513',
    popularity: 'Very Popular',
    availability: 'Common',
    priceRange: 'Mid',
    bestFor: ['All-purpose', 'Office work', 'Balanced feel'],
    notRecommendedFor: ['Heavy typists', 'Strong tactile preference'],
    releaseYear: 1994,
  },

  // Gateron Series
  {
    id: 'gateron-yellow',
    name: 'Gateron Yellow',
    brand: 'Gateron',
    type: 'Linear',
    description: 'Smooth linear switch, often preferred over Cherry MX Red',
    characteristics: {
      tactility: 0,
      clickiness: 0,
      smoothness: 8,
      weight: 5,
      sound: 4,
      stability: 7,
    },
    specs: {
      actuationForce: 50,
      bottomOutForce: 60,
      actuationDistance: 2.0,
      totalTravel: 4.0,
      springType: 'Progressive',
      housingMaterial: 'Nylon',
      stemMaterial: 'POM',
    },
    colorCode: '#FFD700',
    popularity: 'Very Popular',
    availability: 'Common',
    priceRange: 'Budget',
    bestFor: ['Budget builds', 'Smooth typing', 'Gaming'],
    notRecommendedFor: ['Premium feel seekers'],
    variants: ['Gateron Yellow Pro', 'Gateron Yellow KS-9'],
  },

  // Kailh Series
  {
    id: 'kailh-box-jade',
    name: 'Kailh Box Jade',
    brand: 'Kailh',
    type: 'Clicky',
    description: 'Thick click bar mechanism, very satisfying and loud',
    characteristics: {
      tactility: 9,
      clickiness: 10,
      smoothness: 7,
      weight: 6,
      sound: 10,
      stability: 8,
    },
    specs: {
      actuationForce: 50,
      bottomOutForce: 60,
      actuationDistance: 1.8,
      totalTravel: 3.6,
      springType: 'Progressive',
      housingMaterial: 'Polycarbonate',
      stemMaterial: 'POM',
    },
    colorCode: '#00FF7F',
    popularity: 'Popular',
    availability: 'Common',
    priceRange: 'Budget',
    bestFor: ['Clicky enthusiasts', 'Typing', 'Satisfying feedback'],
    notRecommendedFor: ['Quiet environments', 'Gaming', 'Shared spaces'],
  },

  // Holy Panda
  {
    id: 'holy-panda',
    name: 'Holy Panda',
    brand: 'Drop/Invyr',
    type: 'Tactile',
    description: 'Legendary tactile switch with sharp, pronounced bump',
    characteristics: {
      tactility: 9,
      clickiness: 0,
      smoothness: 8,
      weight: 7,
      sound: 6,
      stability: 8,
    },
    specs: {
      actuationForce: 67,
      bottomOutForce: 67,
      actuationDistance: 2.0,
      totalTravel: 4.0,
      springType: 'Progressive',
      housingMaterial: 'Polycarbonate',
      stemMaterial: 'POM',
    },
    colorCode: '#FF69B4',
    popularity: 'Legendary',
    availability: 'Limited',
    priceRange: 'Premium',
    bestFor: ['Tactile enthusiasts', 'Premium builds', 'Typing'],
    notRecommendedFor: ['Light typists', 'Budget builds', 'Gaming'],
    variants: ['Glorious Panda', 'Drop Holy Panda X'],
  },

  // Topre
  {
    id: 'topre-45g',
    name: 'Topre 45g',
    brand: 'Topre',
    type: 'Tactile',
    description: 'Electro-capacitive switch with unique rubber dome feel',
    characteristics: {
      tactility: 6,
      clickiness: 0,
      smoothness: 9,
      weight: 4,
      sound: 7,
      stability: 10,
    },
    specs: {
      actuationForce: 45,
      bottomOutForce: 45,
      actuationDistance: 2.0,
      totalTravel: 4.0,
      springType: 'Conical',
      housingMaterial: 'POM',
      stemMaterial: 'POM',
    },
    colorCode: '#E6E6FA',
    popularity: 'Niche',
    availability: 'Limited',
    priceRange: 'Luxury',
    bestFor: ['Premium typing', 'Unique feel', 'Office work'],
    notRecommendedFor: ['Gaming', 'Budget builds', 'Strong tactile preference'],
  },

  // Novelkeys Cream
  {
    id: 'novelkeys-cream',
    name: 'NovelKeys Cream',
    brand: 'NovelKeys',
    type: 'Linear',
    description: 'Self-lubricating POM housing, gets smoother with use',
    characteristics: {
      tactility: 0,
      clickiness: 0,
      smoothness: 9,
      weight: 6,
      sound: 8,
      stability: 7,
    },
    specs: {
      actuationForce: 55,
      bottomOutForce: 70,
      actuationDistance: 2.0,
      totalTravel: 4.0,
      springType: 'Progressive',
      housingMaterial: 'POM',
      stemMaterial: 'POM',
    },
    colorCode: '#FFF8DC',
    popularity: 'Popular',
    availability: 'Limited',
    priceRange: 'Premium',
    bestFor: ['Enthusiast builds', 'Deep sound', 'Smooth typing'],
    notRecommendedFor: ['Budget builds', 'Immediate smoothness'],
  },

  // Zealios
  {
    id: 'zealios-v2-67g',
    name: 'Zealios V2 67g',
    brand: 'ZealPC',
    type: 'Tactile',
    description: 'Premium tactile switch with strong, rounded bump',
    characteristics: {
      tactility: 8,
      clickiness: 0,
      smoothness: 9,
      weight: 6,
      sound: 5,
      stability: 9,
    },
    specs: {
      actuationForce: 67,
      bottomOutForce: 67,
      actuationDistance: 2.0,
      totalTravel: 4.0,
      springType: 'Progressive',
      housingMaterial: 'Polycarbonate',
      stemMaterial: 'POM',
    },
    colorCode: '#9370DB',
    popularity: 'Popular',
    availability: 'Common',
    priceRange: 'Premium',
    bestFor: ['Tactile enthusiasts', 'Premium builds', 'Typing'],
    notRecommendedFor: ['Budget builds', 'Light typists'],
    variants: ['62g', '65g', '67g', '78g'],
  },
];

// Switch sourcing information
export const SWITCH_SOURCES: Record<string, SwitchSource[]> = {
  'cherry-mx-red': [
    {
      vendor: 'Mechanical Keyboards',
      url: 'https://mechanicalkeyboards.com',
      pricePerSwitch: '$0.50-0.70',
      minimumOrder: 10,
      availability: 'In Stock',
      shippingRegions: ['US', 'Canada'],
    },
    {
      vendor: 'KBDfans',
      url: 'https://kbdfans.com',
      pricePerSwitch: '$0.45-0.65',
      minimumOrder: 10,
      availability: 'In Stock',
      shippingRegions: ['Worldwide'],
    },
  ],
  'holy-panda': [
    {
      vendor: 'Drop',
      url: 'https://drop.com',
      pricePerSwitch: '$0.75-1.00',
      minimumOrder: 70,
      availability: 'Pre-order',
      shippingRegions: ['US', 'EU', 'Asia'],
      notes: 'Often sold in group buys',
    },
  ],
};

// Utility functions
export function getSwitchesByType(type: 'Linear' | 'Tactile' | 'Clicky'): MechanicalSwitch[] {
  return MECHANICAL_SWITCHES.filter(sw => sw.type === type);
}

export function getSwitchesByBrand(brand: string): MechanicalSwitch[] {
  return MECHANICAL_SWITCHES.filter(sw => sw.brand.toLowerCase() === brand.toLowerCase());
}

export function getSwitchById(id: string): MechanicalSwitch | undefined {
  return MECHANICAL_SWITCHES.find(sw => sw.id === id);
}

export function getPopularSwitches(): MechanicalSwitch[] {
  return MECHANICAL_SWITCHES.filter(sw => 
    sw.popularity === 'Very Popular' || sw.popularity === 'Legendary'
  );
}

export function getBudgetSwitches(): MechanicalSwitch[] {
  return MECHANICAL_SWITCHES.filter(sw => sw.priceRange === 'Budget');
}

export function getSwitchRecommendations(
  useCase: 'gaming' | 'typing' | 'office' | 'enthusiast',
  budget: 'budget' | 'mid' | 'premium'
): MechanicalSwitch[] {
  let filtered = MECHANICAL_SWITCHES;

  // Filter by budget
  if (budget === 'budget') {
    filtered = filtered.filter(sw => sw.priceRange === 'Budget' || sw.priceRange === 'Mid');
  } else if (budget === 'mid') {
    filtered = filtered.filter(sw => sw.priceRange === 'Mid' || sw.priceRange === 'Premium');
  } else {
    filtered = filtered.filter(sw => sw.priceRange === 'Premium' || sw.priceRange === 'Luxury');
  }

  // Filter by use case
  const useCaseMap: Record<string, string[]> = {
    gaming: ['Gaming', 'Fast typing'],
    typing: ['Typing', 'All-purpose'],
    office: ['Office work', 'Quiet environments'],
    enthusiast: ['Premium builds', 'Enthusiast builds'],
  };

  const relevantKeywords = useCaseMap[useCase] || [];
  filtered = filtered.filter(sw => 
    sw.bestFor.some(use => 
      relevantKeywords.some(keyword => use.toLowerCase().includes(keyword.toLowerCase()))
    )
  );

  return filtered.slice(0, 5); // Return top 5 recommendations
}

export function compareCharacteristics(switch1Id: string, switch2Id: string): {
  switch1: MechanicalSwitch;
  switch2: MechanicalSwitch;
  differences: Record<keyof SwitchCharacteristics, number>;
} | null {
  const sw1 = getSwitchById(switch1Id);
  const sw2 = getSwitchById(switch2Id);
  
  if (!sw1 || !sw2) return null;

  const differences: Record<keyof SwitchCharacteristics, number> = {
    tactility: Math.abs(sw1.characteristics.tactility - sw2.characteristics.tactility),
    clickiness: Math.abs(sw1.characteristics.clickiness - sw2.characteristics.clickiness),
    smoothness: Math.abs(sw1.characteristics.smoothness - sw2.characteristics.smoothness),
    weight: Math.abs(sw1.characteristics.weight - sw2.characteristics.weight),
    sound: Math.abs(sw1.characteristics.sound - sw2.characteristics.sound),
    stability: Math.abs(sw1.characteristics.stability - sw2.characteristics.stability),
  };

  return { switch1: sw1, switch2: sw2, differences };
}

export function calculateSwitchCost(switchId: string, quantity: number): {
  estimatedCost: number;
  priceRange: string;
  notes: string[];
} {
  const sw = getSwitchById(switchId);
  if (!sw) return { estimatedCost: 0, priceRange: 'Unknown', notes: [] };

  const basePrices = {
    Budget: 0.30,
    Mid: 0.55,
    Premium: 0.80,
    Luxury: 1.20,
  };

  const basePrice = basePrices[sw.priceRange];
  const estimatedCost = basePrice * quantity;
  
  const notes: string[] = [];
  if (sw.availability === 'Limited') notes.push('Limited availability - may require group buy');
  if (sw.availability === 'Rare') notes.push('Rare switch - expect higher prices');
  if (quantity < 70) notes.push('Small quantities may have higher per-unit cost');

  return {
    estimatedCost,
    priceRange: `$${(basePrice * 0.8).toFixed(2)} - $${(basePrice * 1.2).toFixed(2)} per switch`,
    notes,
  };
}