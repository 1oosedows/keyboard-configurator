'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { KeycapReference } from '@/components/reference/KeycapReference';
import { cn } from '@/lib/utils';
import {
  KEYCAP_SIZES,
  KEYCAP_PROFILES,
  getKeycapDimensions,
  getKeycapRecommendations,
} from '@/lib/keycap-reference';
import type { KeyDefinition } from '@/types';

interface KeycapInfoPanelProps {
  selectedKey?: KeyDefinition;
  className?: string;
}

export function KeycapInfoPanel({ selectedKey, className }: KeycapInfoPanelProps) {
  const [showReference, setShowReference] = useState(false);

  if (!selectedKey) {
    return (
      <div className={cn('p-4 bg-gray-50 rounded-lg', className)}>
        <p className="text-sm text-gray-500 text-center">
          Select a key to view keycap information
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => setShowReference(true)}
        >
          Browse Keycap Reference
        </Button>
        <KeycapReference
          isOpen={showReference}
          onClose={() => setShowReference(false)}
        />
      </div>
    );
  }

  const keycapSize = selectedKey.keycapSize 
    ? KEYCAP_SIZES.find(s => s.id === selectedKey.keycapSize)
    : null;

  const dimensions = selectedKey.keycapSize 
    ? getKeycapDimensions(selectedKey.keycapSize, selectedKey.keycapVariant)
    : null;

  const compatibleProfiles = selectedKey.recommendedProfile 
    ? KEYCAP_PROFILES.filter(p => selectedKey.recommendedProfile!.includes(p.id))
    : KEYCAP_PROFILES;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Key Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Selected Key</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Label:</span>
            <span className="font-mono">{selectedKey.defaultLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Key Code:</span>
            <span className="font-mono text-xs">{selectedKey.keyCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Position:</span>
            <span>Row {selectedKey.row + 1}, Col {selectedKey.column + 1}</span>
          </div>
        </div>
      </div>

      {/* Keycap Size Info */}
      {keycapSize && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Keycap Size</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-medium">{keycapSize.name}</span>
            </div>
            {dimensions && (
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span>{dimensions.width}×{dimensions.height}mm</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Units:</span>
              <span>{keycapSize.units}u</span>
            </div>
          </div>
          
          {/* Visual representation */}
          <div className="mt-3 p-2 bg-gray-50 rounded">
            <div className="text-xs text-gray-600 mb-1">Visual size:</div>
            <div
              className="bg-white border-2 border-gray-300 rounded flex items-center justify-center text-xs font-medium"
              style={{
                width: `${Math.min(keycapSize.units * 30, 120)}px`,
                height: '30px',
              }}
            >
              {selectedKey.defaultLabel}
            </div>
          </div>

          {/* Common uses */}
          <div className="mt-3">
            <div className="text-xs text-gray-600 mb-1">Common uses:</div>
            <div className="flex flex-wrap gap-1">
              {keycapSize.commonUses.map((use) => (
                <span
                  key={use}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compatible Profiles */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Compatible Profiles</h3>
        <div className="space-y-2">
          {compatibleProfiles.slice(0, 3).map((profile) => (
            <div
              key={profile.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <div>
                <div className="font-medium text-sm">{profile.name}</div>
                <div className="text-xs text-gray-600">{profile.height}mm height</div>
              </div>
              <div className="text-xs text-gray-500">
                {profile.topSurface}
              </div>
            </div>
          ))}
          {compatibleProfiles.length > 3 && (
            <div className="text-xs text-gray-500 text-center">
              +{compatibleProfiles.length - 3} more profiles
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Buying Recommendations</h3>
        <div className="space-y-3">
          {getKeycapRecommendations('60-percent', 'mid').slice(0, 2).map((rec, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm">
                  {rec.profile.name} - {rec.material.name}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  {rec.estimatedPrice}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                {rec.material.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setShowReference(true)}
        >
          View Full Keycap Reference
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          Find Compatible Sets
        </Button>
      </div>

      <KeycapReference
        isOpen={showReference}
        onClose={() => setShowReference(false)}
      />
    </div>
  );
}