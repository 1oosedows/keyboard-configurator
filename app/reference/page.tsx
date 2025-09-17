'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { KeycapReference, SwitchReference } from '@/components';
import { MiniSwitchRadarChart } from '@/components/charts/SwitchRadarChart';
import { MECHANICAL_SWITCHES, KEYCAP_PROFILES, KEYCAP_SIZES } from '@/lib';

export default function ReferencePage() {
  const [showKeycapReference, setShowKeycapReference] = useState(false);
  const [showSwitchReference, setShowSwitchReference] = useState(false);

  const popularSwitches = MECHANICAL_SWITCHES.slice(0, 8);
  const popularProfiles = KEYCAP_PROFILES.slice(0, 6);
  const commonSizes = KEYCAP_SIZES.filter(size => 
    ['1u', '1.25u', '1.5u', '2u', '2.25u', '6.25u'].includes(size.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hardware Reference Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides to mechanical switches, keycaps, and components 
              to help you make informed decisions for your build
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔘</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mechanical Switches</h2>
              <p className="text-gray-600 mb-6">
                Explore our comprehensive database of mechanical switches with detailed 
                specifications, sound profiles, and radar charts
              </p>
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setShowSwitchReference(true)}
              >
                Browse Switches
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⌨️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Keycaps & Profiles</h2>
              <p className="text-gray-600 mb-6">
                Learn about different keycap profiles, materials, sizes, and 
                find the perfect set for your keyboard
              </p>
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setShowKeycapReference(true)}
              >
                Browse Keycaps
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Switches Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Popular Switches</h2>
              <p className="text-gray-600">Most loved switches in the community</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowSwitchReference(true)}
            >
              View All Switches
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSwitches.map((sw) => (
              <div key={sw.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: sw.colorCode }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{sw.name}</h3>
                    <p className="text-sm text-gray-600">{sw.brand}</p>
                  </div>
                </div>

                <MiniSwitchRadarChart
                  characteristics={sw.characteristics}
                  color={sw.colorCode}
                  size={120}
                  className="mb-4"
                />

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>{sw.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Force:</span>
                    <span>{sw.specs.actuationForce}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel:</span>
                    <span>{sw.specs.totalTravel}mm</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    sw.priceRange === 'Budget' ? 'bg-green-100 text-green-800' :
                    sw.priceRange === 'Mid' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {sw.priceRange}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    sw.popularity === 'Legendary' ? 'bg-yellow-100 text-yellow-800' :
                    sw.popularity === 'Very Popular' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {sw.popularity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Keycap Profiles Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Keycap Profiles</h2>
              <p className="text-gray-600">Different profiles for different preferences</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowKeycapReference(true)}
            >
              View All Profiles
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProfiles.map((profile) => (
              <div key={profile.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{profile.name}</h3>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {profile.height}mm
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{profile.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Surface:</span>
                    <span className="capitalize">{profile.topSurface}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sculpted:</span>
                    <span>{profile.sculpted ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Manufacturers:</span>
                    <span className="text-right">{profile.manufacturer.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Keycap Sizes */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Common Keycap Sizes</h2>
              <p className="text-gray-600">Standard sizes and their typical uses</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowKeycapReference(true)}
            >
              View All Sizes
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commonSizes.map((size) => (
                <div key={size.id} className="flex items-center gap-4">
                  <div
                    className="bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-xs font-medium"
                    style={{
                      width: `${Math.min(size.units * 30, 90)}px`,
                      height: '30px',
                    }}
                  >
                    {size.name}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{size.name}</div>
                    <div className="text-xs text-gray-600">
                      {size.widthMm}×{size.heightMm}mm
                    </div>
                    <div className="text-xs text-gray-500">
                      {size.commonUses[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Reference Modals */}
      <KeycapReference
        isOpen={showKeycapReference}
        onClose={() => setShowKeycapReference(false)}
      />
      <SwitchReference
        isOpen={showSwitchReference}
        onClose={() => setShowSwitchReference(false)}
      />
    </div>
  );
}