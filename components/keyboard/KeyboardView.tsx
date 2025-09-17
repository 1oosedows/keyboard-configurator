'use client';

import { useState, useCallback } from 'react';
import { Key } from './Key';
import { cn } from '@/lib/utils';
import type { KeyboardViewProps, KeyState } from '@/types';

export function KeyboardView({
  layout,
  configuration,
  selectedKeys = [],
  onKeySelect,
  onKeyDoubleClick,
  viewportSettings = {
    zoom: 1,
    panX: 0,
    panY: 0,
    gridVisible: false,
    snapToGrid: false,
  },
  theme,
  interactive = true,
}: KeyboardViewProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const handleKeyClick = useCallback((keyId: string) => {
    if (!interactive) return;
    onKeySelect?.(keyId);
  }, [interactive, onKeySelect]);

  const handleKeyDoubleClick = useCallback((keyId: string) => {
    if (!interactive) return;
    onKeyDoubleClick?.(keyId);
  }, [interactive, onKeyDoubleClick]);

  const getKeyState = useCallback((keyId: string): KeyState => {
    if (pressedKeys.has(keyId)) return 'pressed';
    if (selectedKeys.includes(keyId)) return 'selected';
    return 'default';
  }, [pressedKeys, selectedKeys]);

  const getKeyMapping = useCallback((keyId: string) => {
    if (!configuration) return undefined;
    
    // Get mapping from the default layer for now
    const defaultLayer = configuration.layers.find(layer => layer.isDefault);
    return defaultLayer?.keyMappings.find(mapping => mapping.keyId === keyId);
  }, [configuration]);

  // Calculate container dimensions
  const UNIT_SIZE = 48;
  const containerWidth = layout.dimensions.width * UNIT_SIZE * viewportSettings.zoom;
  const containerHeight = layout.dimensions.height * UNIT_SIZE * viewportSettings.zoom;

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      <div
        className={cn(
          'relative mx-auto border-2 border-dashed border-gray-300 rounded-lg',
          { 'bg-grid-pattern': viewportSettings.gridVisible }
        )}
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          transform: `scale(${viewportSettings.zoom}) translate(${viewportSettings.panX}px, ${viewportSettings.panY}px)`,
          transformOrigin: 'top left',
        }}
      >
        {layout.keys.map((keyDef) => (
          <Key
            key={keyDef.id}
            definition={keyDef}
            mapping={getKeyMapping(keyDef.id)}
            state={getKeyState(keyDef.id)}
            onClick={() => handleKeyClick(keyDef.id)}
            onDoubleClick={() => handleKeyDoubleClick(keyDef.id)}
            className={cn({
              'pointer-events-none': !interactive,
            })}
          />
        ))}
        
        {/* Layout info overlay */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600">
          {layout.name} ({layout.keys.length} keys)
        </div>
      </div>
      
      {/* Zoom controls */}
      {interactive && (
        <div className="fixed bottom-4 right-4 flex gap-2">
          <button
            className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            onClick={() => {
              // Zoom out logic would go here
            }}
          >
            -
          </button>
          <span className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm">
            {Math.round(viewportSettings.zoom * 100)}%
          </span>
          <button
            className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            onClick={() => {
              // Zoom in logic would go here
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}