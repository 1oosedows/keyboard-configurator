'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import {
  KEYCAP_PROFILES,
  KEYCAP_SIZES,
  KEYCAP_MATERIALS,
  KEYCAP_SOURCES,
  getKeycapDimensions,
  getKeycapRecommendations,
  type KeycapProfile,
  type KeycapSize,
  type KeycapMaterial,
} from '@/lib/keycap-reference';

interface KeycapReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeycapReference({ isOpen, onClose }: KeycapReferenceProps) {
  const [activeTab, setActiveTab] = useState<'profiles' | 'sizes' | 'materials' | 'sources'>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<string>('cherry');
  const [selectedSize, setSelectedSize] = useState<string>('1u');
  const [budgetFilter, setBudgetFilter] = useState<'budget' | 'mid' | 'premium'>('mid');

  const tabs = [
    { id: 'profiles', label: 'Profiles' },
    { id: 'sizes', label: 'Sizes & Variants' },
    { id: 'materials', label: 'Materials' },
    { id: 'sources', label: 'Where to Buy' },
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget ($30-60)' },
    { value: 'mid', label: 'Mid-range ($60-120)' },
    { value: 'premium', label: 'Premium ($120+)' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keycap Reference Guide">
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profiles Tab */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KEYCAP_PROFILES.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  isSelected={selectedProfile === profile.id}
                  onSelect={() => setSelectedProfile(profile.id)}
                />
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Profile Comparison</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Height:</strong> SA (13.5mm) &gt; MT3 (13.5mm) &gt; OEM (9.5mm) &gt; Cherry (9.2mm) &gt; XDA (8.5mm) &gt; DSA (7.4mm)
                </div>
                <div>
                  <strong>Sculpting:</strong> Sculpted profiles have different heights per row, uniform profiles are the same height
                </div>
                <div>
                  <strong>Surface:</strong> Spherical = curved in all directions, Cylindrical = curved front-to-back only
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sizes Tab */}
        {activeTab === 'sizes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {KEYCAP_SIZES.map((size) => (
                <SizeCard
                  key={size.id}
                  size={size}
                  isSelected={selectedSize === size.id}
                  onSelect={() => setSelectedSize(size.id)}
                />
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Size Reference</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• 1u (unit) = 19.05mm = 0.75 inches</p>
                <p>• Standard key spacing includes 0.5mm gap between keys</p>
                <p>• ISO Enter is L-shaped and takes up 1.25u × 2u space</p>
                <p>• Stepped Caps Lock has a small step for the Ctrl key position</p>
              </div>
            </div>
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KEYCAP_MATERIALS.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Material Recommendations</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p><strong>For beginners:</strong> PBT plastic - durable, good feel, reasonable price</p>
                <p><strong>For premium experience:</strong> POM - incredibly smooth, long-lasting</p>
                <p><strong>For budget builds:</strong> Quality ABS - lighter weight, many color options</p>
                <p><strong>For collectors:</strong> Artisan resin - unique designs, conversation pieces</p>
              </div>
            </div>
          </div>
        )}

        {/* Sources Tab */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <label className="text-sm font-medium text-gray-700">Budget Range:</label>
              <Select
                options={budgetOptions}
                value={budgetFilter}
                onChange={(value) => setBudgetFilter(value as any)}
              />
            </div>
            
            <div className="space-y-4">
              {getKeycapRecommendations('60-percent', budgetFilter).map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} />
              ))}
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-900 mb-2">Buying Tips</h3>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>• Group buys offer the best prices but have long wait times (3-12 months)</p>
                <p>• Check compatibility with your keyboard layout (ANSI/ISO/JIS)</p>
                <p>• Consider buying extra keys for future layouts</p>
                <p>• Join r/mechanicalkeyboards for group buy announcements</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function ProfileCard({ profile, isSelected, onSelect }: {
  profile: KeycapProfile;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={cn(
        'p-4 border rounded-lg cursor-pointer transition-all',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{profile.name}</h3>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {profile.height}mm
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{profile.description}</p>
      <div className="flex flex-wrap gap-1">
        {profile.manufacturer.slice(0, 3).map((mfg) => (
          <span key={mfg} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {mfg}
          </span>
        ))}
      </div>
    </div>
  );
}

function SizeCard({ size, isSelected, onSelect }: {
  size: KeycapSize;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={cn(
        'p-4 border rounded-lg cursor-pointer transition-all',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{size.name}</h3>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {size.widthMm}×{size.heightMm}mm
        </span>
      </div>
      <div className="mb-2">
        <div
          className="bg-gray-300 border border-gray-400 rounded"
          style={{
            width: `${Math.min(size.units * 20, 80)}px`,
            height: '20px',
          }}
        />
      </div>
      <div className="text-xs text-gray-600">
        <p className="mb-1">Common uses:</p>
        <div className="flex flex-wrap gap-1">
          {size.commonUses.slice(0, 3).map((use) => (
            <span key={use} className="bg-gray-100 px-1 py-0.5 rounded">
              {use}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaterialCard({ material }: { material: KeycapMaterial }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{material.name}</h3>
        <span className={cn(
          'text-xs px-2 py-1 rounded',
          material.priceRange === 'Budget' ? 'bg-green-100 text-green-800' :
          material.priceRange === 'Mid' ? 'bg-blue-100 text-blue-800' :
          material.priceRange === 'Premium' ? 'bg-purple-100 text-purple-800' :
          'bg-yellow-100 text-yellow-800'
        )}>
          {material.priceRange}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{material.description}</p>
      <div className="space-y-1 text-xs text-gray-600">
        <p><strong>Durability:</strong> {material.durability}</p>
        <p><strong>Feel:</strong> {material.feel}</p>
        <p><strong>Sound:</strong> {material.sound}</p>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: any }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">
          {recommendation.profile.name} - {recommendation.material.name}
        </h3>
        <span className="text-sm font-medium text-green-600">
          {recommendation.estimatedPrice}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        {recommendation.profile.description}
      </p>
      <div className="space-y-2">
        {recommendation.sources.map((source: any, index: number) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="font-medium">{source.vendor}</span>
            <span className="text-gray-600">{source.availability}</span>
          </div>
        ))}
      </div>
    </div>
  );
}