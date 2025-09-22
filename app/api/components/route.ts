import { NextRequest, NextResponse } from 'next/server';

// Mock data for keyboard components
const switches = [
  {
    id: 'cherry-mx-red',
    name: 'Cherry MX Red',
    brand: 'Cherry',
    type: 'Linear',
    actuationForce: 45,
    travel: 4.0,
    color: '#FF4444',
    priceRange: 'Mid',
    description: 'Smooth linear switches perfect for gaming',
    specifications: {
      actuationPoint: 2.0,
      totalTravel: 4.0,
      actuationForce: 45,
      tactileForce: null,
      lifespan: 100000000,
    },
  },
  {
    id: 'cherry-mx-blue',
    name: 'Cherry MX Blue',
    brand: 'Cherry',
    type: 'Clicky',
    actuationForce: 50,
    travel: 4.0,
    color: '#4444FF',
    priceRange: 'Mid',
    description: 'Classic clicky switches with tactile feedback',
    specifications: {
      actuationPoint: 2.2,
      totalTravel: 4.0,
      actuationForce: 50,
      tactileForce: 60,
      lifespan: 100000000,
    },
  },
  {
    id: 'cherry-mx-brown',
    name: 'Cherry MX Brown',
    brand: 'Cherry',
    type: 'Tactile',
    actuationForce: 45,
    travel: 4.0,
    color: '#8B4513',
    priceRange: 'Mid',
    description: 'Tactile switches great for typing and gaming',
    specifications: {
      actuationPoint: 2.0,
      totalTravel: 4.0,
      actuationForce: 45,
      tactileForce: 55,
      lifespan: 100000000,
    },
  },
  {
    id: 'gateron-yellow',
    name: 'Gateron Yellow',
    brand: 'Gateron',
    type: 'Linear',
    actuationForce: 50,
    travel: 4.0,
    color: '#FFD700',
    priceRange: 'Budget',
    description: 'Smooth budget linear switches',
    specifications: {
      actuationPoint: 2.0,
      totalTravel: 4.0,
      actuationForce: 50,
      tactileForce: null,
      lifespan: 50000000,
    },
  },
];

const keycaps = [
  {
    id: 'oem-abs-black',
    name: 'OEM ABS Black',
    material: 'ABS',
    profile: 'OEM',
    color: 'Black',
    priceRange: 'Budget',
    description: 'Standard black ABS keycaps',
  },
  {
    id: 'cherry-pbt-white',
    name: 'Cherry PBT White',
    material: 'PBT',
    profile: 'Cherry',
    color: 'White',
    priceRange: 'Mid',
    description: 'Durable PBT keycaps with Cherry profile',
  },
];

const layouts = [
  {
    id: '60-percent',
    name: '60%',
    description: 'Compact layout without function keys',
    keyCount: 61,
    dimensions: { width: 294, height: 104 },
    features: ['Compact', 'Portable', 'Gaming-focused'],
  },
  {
    id: '65-percent',
    name: '65%',
    description: '60% layout with arrow keys',
    keyCount: 68,
    dimensions: { width: 314, height: 104 },
    features: ['Compact', 'Arrow keys', 'Balanced'],
  },
  {
    id: 'tkl',
    name: 'TKL (Tenkeyless)',
    description: 'Full-size without numpad',
    keyCount: 87,
    dimensions: { width: 360, height: 138 },
    features: ['Function keys', 'Arrow keys', 'No numpad'],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const brand = searchParams.get('brand');
    const priceRange = searchParams.get('priceRange');

    let data: any[] = [];

    switch (type) {
      case 'switches':
        data = switches;
        if (brand) {
          data = data.filter(item => item.brand.toLowerCase() === brand.toLowerCase());
        }
        if (priceRange) {
          data = data.filter(item => item.priceRange.toLowerCase() === priceRange.toLowerCase());
        }
        break;
      case 'keycaps':
        data = keycaps;
        if (priceRange) {
          data = data.filter(item => item.priceRange.toLowerCase() === priceRange.toLowerCase());
        }
        break;
      case 'layouts':
        data = layouts;
        break;
      default:
        return NextResponse.json({
          switches,
          keycaps,
          layouts,
        });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching components:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}