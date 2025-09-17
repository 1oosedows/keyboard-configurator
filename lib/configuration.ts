// Configuration management utilities

import type {
  KeyboardConfiguration,
  KeyMapping,
  Layer,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  KeyboardLayout,
} from '@/types';

export function createEmptyConfiguration(
  layoutId: string,
  name: string = 'New Configuration'
): KeyboardConfiguration {
  return {
    id: generateId(),
    name,
    layoutId,
    keyMappings: [],
    layers: [
      {
        id: 'default',
        name: 'Default',
        keyMappings: [],
        isDefault: true,
        order: 0,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    version: '1.0.0',
  };
}

export function addLayer(
  configuration: KeyboardConfiguration,
  name: string
): KeyboardConfiguration {
  const newLayer: Layer = {
    id: generateId(),
    name,
    keyMappings: [],
    isDefault: false,
    order: configuration.layers.length,
  };

  return {
    ...configuration,
    layers: [...configuration.layers, newLayer],
    updatedAt: new Date(),
  };
}

export function removeLayer(
  configuration: KeyboardConfiguration,
  layerId: string
): KeyboardConfiguration {
  // Don't allow removing the default layer
  const layer = configuration.layers.find(l => l.id === layerId);
  if (layer?.isDefault) {
    throw new Error('Cannot remove the default layer');
  }

  return {
    ...configuration,
    layers: configuration.layers.filter(l => l.id !== layerId),
    updatedAt: new Date(),
  };
}

export function updateKeyMapping(
  configuration: KeyboardConfiguration,
  layerId: string,
  keyMapping: KeyMapping
): KeyboardConfiguration {
  const layers = configuration.layers.map(layer => {
    if (layer.id !== layerId) return layer;

    const existingIndex = layer.keyMappings.findIndex(
      mapping => mapping.keyId === keyMapping.keyId
    );

    const updatedMappings = [...layer.keyMappings];
    if (existingIndex >= 0) {
      updatedMappings[existingIndex] = keyMapping;
    } else {
      updatedMappings.push(keyMapping);
    }

    return {
      ...layer,
      keyMappings: updatedMappings,
    };
  });

  return {
    ...configuration,
    layers,
    updatedAt: new Date(),
  };
}

export function removeKeyMapping(
  configuration: KeyboardConfiguration,
  layerId: string,
  keyId: string
): KeyboardConfiguration {
  const layers = configuration.layers.map(layer => {
    if (layer.id !== layerId) return layer;

    return {
      ...layer,
      keyMappings: layer.keyMappings.filter(mapping => mapping.keyId !== keyId),
    };
  });

  return {
    ...configuration,
    layers,
    updatedAt: new Date(),
  };
}

export function getKeyMapping(
  configuration: KeyboardConfiguration,
  layerId: string,
  keyId: string
): KeyMapping | undefined {
  const layer = configuration.layers.find(l => l.id === layerId);
  return layer?.keyMappings.find(mapping => mapping.keyId === keyId);
}

export function validateConfiguration(
  configuration: KeyboardConfiguration,
  layout: KeyboardLayout
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check if all mapped keys exist in the layout
  const layoutKeyIds = new Set(layout.keys.map(key => key.id));
  
  configuration.layers.forEach(layer => {
    layer.keyMappings.forEach(mapping => {
      if (!layoutKeyIds.has(mapping.keyId)) {
        errors.push({
          type: 'missing_key',
          message: `Key ${mapping.keyId} does not exist in layout`,
          keyId: mapping.keyId,
          layerId: layer.id,
        });
      }

      // Validate key codes
      if (mapping.action.type === 'key' && !isValidKeyCode(mapping.action.value)) {
        errors.push({
          type: 'invalid_keycode',
          message: `Invalid key code: ${mapping.action.value}`,
          keyId: mapping.keyId,
          layerId: layer.id,
        });
      }

      // Check for complex macros
      if (mapping.action.type === 'macro' && mapping.action.value.length > 50) {
        warnings.push({
          type: 'complex_macro',
          message: 'Macro is very long and may cause performance issues',
          keyId: mapping.keyId,
          layerId: layer.id,
        });
      }
    });
  });

  // Check for unused keys
  const mappedKeyIds = new Set(
    configuration.layers.flatMap(layer => 
      layer.keyMappings.map(mapping => mapping.keyId)
    )
  );

  layout.keys.forEach(key => {
    if (!mappedKeyIds.has(key.id)) {
      warnings.push({
        type: 'unused_key',
        message: `Key ${key.defaultLabel} is not mapped in any layer`,
        keyId: key.id,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function cloneConfiguration(
  configuration: KeyboardConfiguration,
  newName?: string
): KeyboardConfiguration {
  return {
    ...configuration,
    id: generateId(),
    name: newName || `${configuration.name} (Copy)`,
    createdAt: new Date(),
    updatedAt: new Date(),
    layers: configuration.layers.map(layer => ({
      ...layer,
      id: generateId(),
      keyMappings: [...layer.keyMappings],
    })),
  };
}

export function exportConfiguration(
  configuration: KeyboardConfiguration,
  format: 'json' | 'qmk' = 'json'
): string {
  if (format === 'json') {
    return JSON.stringify(configuration, null, 2);
  }

  // Basic QMK export (simplified)
  if (format === 'qmk') {
    const defaultLayer = configuration.layers.find(l => l.isDefault);
    if (!defaultLayer) throw new Error('No default layer found');

    const keymap = defaultLayer.keyMappings.map(mapping => {
      return `${mapping.keyId}: ${mapping.action.value}`;
    }).join('\n');

    return `// Generated keymap for ${configuration.name}\n${keymap}`;
  }

  throw new Error(`Unsupported export format: ${format}`);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function isValidKeyCode(keyCode: string): boolean {
  // Basic validation for common key codes
  const validKeyCodes = /^(Key[A-Z]|Digit[0-9]|Arrow(Up|Down|Left|Right)|Enter|Space|Tab|Shift(Left|Right)|Control(Left|Right)|Alt(Left|Right)|Meta(Left|Right)|Backspace|Delete|Home|End|PageUp|PageDown|F[1-9]|F1[0-2])$/;
  return validKeyCodes.test(keyCode);
}