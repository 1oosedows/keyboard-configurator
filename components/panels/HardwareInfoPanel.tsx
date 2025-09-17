'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { KeycapReference } from '@/components/reference/KeycapReference';
import { SwitchReference } from '@/components/reference/SwitchReference';
import { MiniSwitchRadarChart } from '@/components/charts/SwitchRadarChart';
import { cn } from '@/lib/utils';
import {
  KEYCAP_SIZES,
  getKeycapRecommendations,
} from '@/lib/keycap-reference';
import {
  MECHANICAL_SWITCHES,
  getSwitchRecommendations,
  calculateSwitchCost,
} from '@/lib/switch-reference';
import type { KeyDefinition } from '@/types';

interface HardwareInfoPanelProps {
  selectedKey?: KeyDefinition;
  selectedSwitch?: string; // switch ID
  onSwitchChange?: (switchId: string) => void;
  keyCount?: number;
  className?: string;
}

export function HardwareInfoPanel({
  selectedKey,
  selectedSwitch,
  onSwitchChange,
  keyCount = 87,
  className
}: HardwareInfoPanelProps) {
  const [showKeycapReference, setShowKeycapReference] = useState(false);
  const [showSwitchReference, setShowSwitchReference] = useState(false);
  const [activeTab, setActiveTab] = useState<'keycaps' | 'switches' | 'build'>('keycaps');

  const currentSwitch = selectedSwitch
    ? MECHANICAL_SWITCHES.find(sw => sw.id === selectedSwitch)
    : null;

  const keycapSize = selectedKey?.keycapSize
    ? KEYCAP_SIZES.find(s => s.id === selectedKey.keycapSize)
    : null;

  const switchCost = currentSwitch
    ? calculateSwitchCost(currentSwitch.id, keyCount)
    : null;

  const keycapRecommendations = getKeycapRecommendations('60-percent', 'mid');
  const switchRecommendations = getSwitchRecommendations('typing', 'mid');

  const tabs = [
    { id: 'keycaps', label: 'Keycaps' },
    { id: 'switches', label: 'Switches' },
    { id: 'build', label: 'Build Cost' },
  ];

  return (
    <div className={cn('w-80 bg-white border-l border-gray-200 flex flex-col', className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Hardware Guide</h2>
        <p className="text-sm text-gray-600 mt-1">Keycaps, switches & build info</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              'flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors',
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

      <div className="flex-1 overflow-auto">
        {/* Keycaps Tab */}
        {activeTab === 'keycaps' && (
          <div className="p-4 space-y-4">
            {selectedKey ? (
              <>
                {/* Selected Key Info */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="font-medium text-sm mb-2">Selected Key</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Label:</span>
                      <span className="font-mono">{selectedKey.defaultLabel}</span>
                    </div>
                    {keycapSize && (
                      <>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span>{keycapSize.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimensions:</span>
                          <span>{keycapSize.widthMm}×{keycapSize.heightMm}mm</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Visual size representation */}
                  {keycapSize && (
                    <div className="mt-2 p-2 bg-white rounded border">
                      <div
                        className="bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs font-medium"
                        style={{
                          width: `${Math.min(keycapSize.units * 25, 100)}px`,
                          height: '25px',
                        }}
                      >
                        {selectedKey.defaultLabel}
                      </div>
                    </div>
                  )}
                </div>

                {/* Compatible Profiles */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Compatible Profiles</h4>
                  <div className="space-y-1">
                    {selectedKey.recommendedProfile?.slice(0, 3).map((profileId) => (
                      <div key={profileId} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">
                        {profileId.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 mb-3">Select a key to view keycap info</p>
              </div>
            )}

            {/* Quick Recommendations */}
            <div>
              <h4 className="font-medium text-sm mb-2">Popular Sets</h4>
              <div className="space-y-2">
                {keycapRecommendations.slice(0, 2).map((rec, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                    <div className="font-medium">{rec.profile.name} - {rec.material.name}</div>
                    <div className="text-gray-600">{rec.estimatedPrice}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowKeycapReference(true)}
            >
              Browse All Keycaps
            </Button>
          </div>
        )}

        {/* Switches Tab */}
        {activeTab === 'switches' && (
          <div className="p-4 space-y-4">
            {currentSwitch ? (
              <>
                {/* Current Switch Info */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-sm">{currentSwitch.name}</h3>
                      <p className="text-xs text-gray-600">{currentSwitch.brand}</p>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: currentSwitch.colorCode }}
                    />
                  </div>

                  <MiniSwitchRadarChart
                    characteristics={currentSwitch.characteristics}
                    color={currentSwitch.colorCode}
                    size={80}
                    className="mb-2"
                  />

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{currentSwitch.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Actuation:</span>
                      <span>{currentSwitch.specs.actuationForce}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travel:</span>
                      <span>{currentSwitch.specs.totalTravel}mm</span>
                    </div>
                  </div>
                </div>

                {/* Switch Cost */}
                {switchCost && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Cost ({keyCount} switches)</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">${switchCost.estimatedCost.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {switchCost.priceRange} per switch
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 mb-3">No switch selected</p>
              </div>
            )}

            {/* Switch Recommendations */}
            <div>
              <h4 className="font-medium text-sm mb-2">Recommended</h4>
              <div className="space-y-2">
                {switchRecommendations.slice(0, 3).map((sw) => (
                  <div
                    key={sw.id}
                    className={cn(
                      'p-2 rounded text-xs cursor-pointer transition-colors',
                      currentSwitch?.id === sw.id
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    )}
                    onClick={() => onSwitchChange?.(sw.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{sw.name}</div>
                        <div className="text-gray-600">{sw.type} • {sw.specs.actuationForce}g</div>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: sw.colorCode }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowSwitchReference(true)}
            >
              Browse All Switches
            </Button>
          </div>
        )}

        {/* Build Cost Tab */}
        {activeTab === 'build' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-3">Build Cost Estimate</h3>

              <div className="space-y-3">
                {/* Switches */}
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">Switches</div>
                    <div className="text-xs text-gray-600">
                      {currentSwitch ? currentSwitch.name : 'Not selected'} × {keyCount}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    ${switchCost ? switchCost.estimatedCost.toFixed(2) : '0.00'}
                  </div>
                </div>

                {/* Keycaps */}
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">Keycaps</div>
                    <div className="text-xs text-gray-600">Cherry PBT set</div>
                  </div>
                  <div className="text-sm font-medium">$80.00</div>
                </div>

                {/* PCB */}
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">PCB</div>
                    <div className="text-xs text-gray-600">Hot-swap compatible</div>
                  </div>
                  <div className="text-sm font-medium">$45.00</div>
                </div>

                {/* Case */}
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">Case</div>
                    <div className="text-xs text-gray-600">Aluminum mid-range</div>
                  </div>
                  <div className="text-sm font-medium">$120.00</div>
                </div>

                {/* Stabilizers */}
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">Stabilizers</div>
                    <div className="text-xs text-gray-600">Cherry screw-in</div>
                  </div>
                  <div className="text-sm font-medium">$25.00</div>
                </div>

                {/* Total */}
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Total Estimate</div>
                    <div className="font-bold text-lg">
                      ${(270 + (switchCost?.estimatedCost || 0)).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Prices vary by vendor and availability
                  </div>
                </div>
              </div>
            </div>

            {/* Build Tips */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm text-blue-900 mb-2">Build Tips</h4>
              <div className="text-xs text-blue-800 space-y-1">
                <p>• Hot-swap PCBs let you try different switches</p>
                <p>• Buy 10% extra switches for spares</p>
                <p>• Consider switch films for tighter tolerances</p>
                <p>• Lube switches for smoother feel</p>
              </div>
            </div>
          </div>
        )}
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