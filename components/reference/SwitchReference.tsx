'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { SwitchRadarChart, MiniSwitchRadarChart } from '@/components/charts/SwitchRadarChart';
import { cn } from '@/lib/utils';
import {
  MECHANICAL_SWITCHES,
  getSwitchesByType,
  getSwitchesByBrand,
  getPopularSwitches,
  getBudgetSwitches,
  getSwitchRecommendations,
  compareCharacteristics,
  calculateSwitchCost,
  type MechanicalSwitch,
} from '@/lib/switch-reference';

interface SwitchReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SwitchReference({ isOpen, onClose }: SwitchReferenceProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'compare' | 'recommendations'>('browse');
  const [selectedSwitch, setSelectedSwitch] = useState<MechanicalSwitch | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'Linear' | 'Tactile' | 'Clicky'>('all');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [compareSwitch1, setCompareSwitch1] = useState<string>('');
  const [compareSwitch2, setCompareSwitch2] = useState<string>('');
  const [useCase, setUseCase] = useState<'gaming' | 'typing' | 'office' | 'enthusiast'>('typing');
  const [budget, setBudget] = useState<'budget' | 'mid' | 'premium'>('mid');

  const tabs = [
    { id: 'browse', label: 'Browse Switches' },
    { id: 'compare', label: 'Compare' },
    { id: 'recommendations', label: 'Recommendations' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Linear', label: 'Linear' },
    { value: 'Tactile', label: 'Tactile' },
    { value: 'Clicky', label: 'Clicky' },
  ];

  const brands = ['all', ...new Set(MECHANICAL_SWITCHES.map(sw => sw.brand))];
  const brandOptions = brands.map(brand => ({
    value: brand,
    label: brand === 'all' ? 'All Brands' : brand,
  }));

  const switchOptions = MECHANICAL_SWITCHES.map(sw => ({
    value: sw.id,
    label: `${sw.brand} ${sw.name}`,
  }));

  const useCaseOptions = [
    { value: 'gaming', label: 'Gaming' },
    { value: 'typing', label: 'Typing' },
    { value: 'office', label: 'Office Work' },
    { value: 'enthusiast', label: 'Enthusiast' },
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget ($0.30-0.55)' },
    { value: 'mid', label: 'Mid-range ($0.55-0.80)' },
    { value: 'premium', label: 'Premium ($0.80+)' },
  ];

  const getFilteredSwitches = () => {
    let filtered = MECHANICAL_SWITCHES;
    
    if (filterType !== 'all') {
      filtered = getSwitchesByType(filterType);
    }
    
    if (filterBrand !== 'all') {
      filtered = filtered.filter(sw => sw.brand === filterBrand);
    }
    
    return filtered;
  };

  const comparison = compareSwitch1 && compareSwitch2 
    ? compareCharacteristics(compareSwitch1, compareSwitch2)
    : null;

  const recommendations = getSwitchRecommendations(useCase, budget);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mechanical Switch Reference">
      <div className="max-w-6xl mx-auto">
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

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
              <Select
                options={typeOptions}
                value={filterType}
                onChange={(value) => setFilterType(value as any)}
                placeholder="Filter by type"
              />
              <Select
                options={brandOptions}
                value={filterBrand}
                onChange={setFilterBrand}
                placeholder="Filter by brand"
              />
            </div>

            {/* Switch Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredSwitches().map((sw) => (
                <SwitchCard
                  key={sw.id}
                  switch={sw}
                  isSelected={selectedSwitch?.id === sw.id}
                  onSelect={() => setSelectedSwitch(sw)}
                />
              ))}
            </div>

            {/* Selected Switch Details */}
            {selectedSwitch && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <SwitchDetails switch={selectedSwitch} />
              </div>
            )}
          </div>
        )}

        {/* Compare Tab */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Switch
                </label>
                <Select
                  options={switchOptions}
                  value={compareSwitch1}
                  onChange={setCompareSwitch1}
                  placeholder="Select first switch..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Second Switch
                </label>
                <Select
                  options={switchOptions}
                  value={compareSwitch2}
                  onChange={setCompareSwitch2}
                  placeholder="Select second switch..."
                />
              </div>
            </div>

            {comparison && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Characteristics Comparison</h3>
                  <SwitchRadarChart
                    characteristics={comparison.switch1.characteristics}
                    color={comparison.switch1.colorCode}
                    comparison={comparison.switch2.characteristics}
                    comparisonColor={comparison.switch2.colorCode}
                    size={300}
                  />
                </div>
                <div className="space-y-4">
                  <ComparisonTable comparison={comparison} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Use Case
                </label>
                <Select
                  options={useCaseOptions}
                  value={useCase}
                  onChange={(value) => setUseCase(value as any)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <Select
                  options={budgetOptions}
                  value={budget}
                  onChange={(value) => setBudget(value as any)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((sw) => (
                <RecommendationCard key={sw.id} switch={sw} />
              ))}
            </div>

            {/* Popular Switches */}
            <div>
              <h3 className="text-lg font-medium mb-4">Popular Switches</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {getPopularSwitches().slice(0, 8).map((sw) => (
                  <div key={sw.id} className="text-center">
                    <MiniSwitchRadarChart
                      characteristics={sw.characteristics}
                      color={sw.colorCode}
                      size={60}
                      className="mb-2"
                    />
                    <div className="text-xs font-medium">{sw.name}</div>
                    <div className="text-xs text-gray-500">{sw.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function SwitchCard({ 
  switch: sw, 
  isSelected, 
  onSelect 
}: { 
  switch: MechanicalSwitch; 
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
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{sw.name}</h3>
          <p className="text-sm text-gray-600">{sw.brand}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span 
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: sw.colorCode }}
          />
          <span className={cn(
            'text-xs px-2 py-1 rounded',
            sw.type === 'Linear' ? 'bg-blue-100 text-blue-800' :
            sw.type === 'Tactile' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          )}>
            {sw.type}
          </span>
        </div>
      </div>

      <MiniSwitchRadarChart
        characteristics={sw.characteristics}
        color={sw.colorCode}
        size={80}
        className="mb-3"
      />

      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Actuation:</span>
          <span>{sw.specs.actuationForce}g</span>
        </div>
        <div className="flex justify-between">
          <span>Travel:</span>
          <span>{sw.specs.totalTravel}mm</span>
        </div>
        <div className="flex justify-between">
          <span>Price:</span>
          <span className={cn(
            'font-medium',
            sw.priceRange === 'Budget' ? 'text-green-600' :
            sw.priceRange === 'Mid' ? 'text-blue-600' :
            sw.priceRange === 'Premium' ? 'text-purple-600' :
            'text-yellow-600'
          )}>
            {sw.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}

function SwitchDetails({ switch: sw }: { switch: MechanicalSwitch }) {
  const costInfo = calculateSwitchCost(sw.id, 87); // TKL keyboard

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{sw.brand} {sw.name}</h3>
        <SwitchRadarChart
          characteristics={sw.characteristics}
          color={sw.colorCode}
          size={250}
        />
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-sm text-gray-600">{sw.description}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Specifications</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Actuation Force: {sw.specs.actuationForce}g</div>
            <div>Bottom Out: {sw.specs.bottomOutForce}g</div>
            <div>Actuation: {sw.specs.actuationDistance}mm</div>
            <div>Total Travel: {sw.specs.totalTravel}mm</div>
            <div>Housing: {sw.specs.housingMaterial}</div>
            <div>Stem: {sw.specs.stemMaterial}</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Best For</h4>
          <div className="flex flex-wrap gap-1">
            {sw.bestFor.map((use) => (
              <span key={use} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {use}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Cost Estimate (87 keys)</h4>
          <div className="text-sm space-y-1">
            <div>Total: ${costInfo.estimatedCost.toFixed(2)}</div>
            <div>Per switch: {costInfo.priceRange}</div>
            {costInfo.notes.map((note, i) => (
              <div key={i} className="text-xs text-gray-600">• {note}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable({ comparison }: { comparison: any }) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Detailed Comparison</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Characteristic</th>
              <th className="text-center py-2">{comparison.switch1.name}</th>
              <th className="text-center py-2">{comparison.switch2.name}</th>
              <th className="text-center py-2">Difference</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(comparison.differences).map(([key, diff]) => (
              <tr key={key} className="border-b">
                <td className="py-2 capitalize">{key}</td>
                <td className="text-center py-2">
                  {comparison.switch1.characteristics[key as keyof typeof comparison.switch1.characteristics]}
                </td>
                <td className="text-center py-2">
                  {comparison.switch2.characteristics[key as keyof typeof comparison.switch2.characteristics]}
                </td>
                <td className="text-center py-2">
                  <span className={cn(
                    'px-2 py-1 rounded text-xs',
                    diff === 0 ? 'bg-gray-100 text-gray-800' :
                    diff <= 2 ? 'bg-green-100 text-green-800' :
                    diff <= 4 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  )}>
                    {diff}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecommendationCard({ switch: sw }: { switch: MechanicalSwitch }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{sw.brand} {sw.name}</h4>
          <p className="text-sm text-gray-600">{sw.type}</p>
        </div>
        <MiniSwitchRadarChart
          characteristics={sw.characteristics}
          color={sw.colorCode}
          size={60}
        />
      </div>
      <p className="text-sm text-gray-600 mb-3">{sw.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">{sw.specs.actuationForce}g • {sw.specs.totalTravel}mm</span>
        <span className={cn(
          'px-2 py-1 rounded text-xs',
          sw.priceRange === 'Budget' ? 'bg-green-100 text-green-800' :
          sw.priceRange === 'Mid' ? 'bg-blue-100 text-blue-800' :
          'bg-purple-100 text-purple-800'
        )}>
          {sw.priceRange}
        </span>
      </div>
    </div>
  );
}