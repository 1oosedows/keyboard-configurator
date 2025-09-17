'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import type { ConfigurationPanelProps, KeyAction, KeyModifier } from '@/types';

export function ConfigurationPanel({
  configuration,
  onConfigurationChange,
  selectedKeyId,
}: ConfigurationPanelProps) {
  const [isKeyMappingModalOpen, setIsKeyMappingModalOpen] = useState(false);
  const [activeLayerId, setActiveLayerId] = useState(
    configuration.layers.find(l => l.isDefault)?.id || configuration.layers[0]?.id
  );

  const activeLayer = configuration.layers.find(l => l.id === activeLayerId);
  const selectedKeyMapping = selectedKeyId 
    ? activeLayer?.keyMappings.find(m => m.keyId === selectedKeyId)
    : undefined;

  const actionTypeOptions = [
    { value: 'key', label: 'Key Press' },
    { value: 'macro', label: 'Macro' },
    { value: 'layer', label: 'Layer Switch' },
    { value: 'function', label: 'Function' },
  ];

  const layerOptions = configuration.layers.map(layer => ({
    value: layer.id,
    label: layer.name,
  }));

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
        <p className="text-sm text-gray-600 mt-1">{configuration.name}</p>
      </div>

      {/* Layer selector */}
      <div className="p-4 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Active Layer
        </label>
        <Select
          options={layerOptions}
          value={activeLayerId}
          onChange={setActiveLayerId}
        />
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline" className="flex-1">
            Add Layer
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            disabled={activeLayer?.isDefault}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Selected key info */}
      {selectedKeyId ? (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Key</h3>
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-sm font-mono">{selectedKeyId}</p>
            {selectedKeyMapping ? (
              <div className="mt-2">
                <p className="text-xs text-gray-600">
                  Action: {selectedKeyMapping.action.type}
                </p>
                <p className="text-xs text-gray-600">
                  Value: {selectedKeyMapping.action.value}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-2">No mapping assigned</p>
            )}
          </div>
          <Button
            size="sm"
            className="w-full mt-2"
            onClick={() => setIsKeyMappingModalOpen(true)}
          >
            {selectedKeyMapping ? 'Edit Mapping' : 'Assign Mapping'}
          </Button>
        </div>
      ) : (
        <div className="p-4 border-b border-gray-200">
          <p className="text-sm text-gray-500 text-center py-8">
            Select a key to configure its mapping
          </p>
        </div>
      )}

      {/* Layer mappings list */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Layer Mappings ({activeLayer?.keyMappings.length || 0})
          </h3>
          <div className="space-y-2">
            {activeLayer?.keyMappings.map((mapping) => (
              <div
                key={mapping.keyId}
                className={cn(
                  'p-2 rounded-md border text-sm cursor-pointer hover:bg-gray-50',
                  {
                    'border-blue-300 bg-blue-50': mapping.keyId === selectedKeyId,
                    'border-gray-200': mapping.keyId !== selectedKeyId,
                  }
                )}
              >
                <div className="font-mono text-xs text-gray-600">
                  {mapping.keyId}
                </div>
                <div className="font-medium">
                  {mapping.action.type}: {mapping.action.value}
                </div>
                {mapping.customLabel && (
                  <div className="text-xs text-gray-500">
                    Label: {mapping.customLabel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="outline" className="w-full">
          Export Configuration
        </Button>
        <Button variant="outline" className="w-full">
          Save Configuration
        </Button>
      </div>

      {/* Key Mapping Modal */}
      <Modal
        isOpen={isKeyMappingModalOpen}
        onClose={() => setIsKeyMappingModalOpen(false)}
        title="Configure Key Mapping"
      >
        <KeyMappingForm
          keyId={selectedKeyId}
          mapping={selectedKeyMapping}
          onSave={(mapping) => {
            // Handle saving the mapping
            setIsKeyMappingModalOpen(false);
          }}
          onCancel={() => setIsKeyMappingModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

interface KeyMappingFormProps {
  keyId?: string;
  mapping?: any;
  onSave: (mapping: any) => void;
  onCancel: () => void;
}

function KeyMappingForm({ keyId, mapping, onSave, onCancel }: KeyMappingFormProps) {
  const [actionType, setActionType] = useState(mapping?.action.type || 'key');
  const [actionValue, setActionValue] = useState(mapping?.action.value || '');
  const [customLabel, setCustomLabel] = useState(mapping?.customLabel || '');

  const actionTypeOptions = [
    { value: 'key', label: 'Key Press' },
    { value: 'macro', label: 'Macro' },
    { value: 'layer', label: 'Layer Switch' },
    { value: 'function', label: 'Function' },
  ];

  const handleSave = () => {
    if (!keyId || !actionValue) return;

    const newMapping = {
      keyId,
      customLabel: customLabel || undefined,
      action: {
        type: actionType,
        value: actionValue,
      },
      modifiers: [],
    };

    onSave(newMapping);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Key ID
        </label>
        <input
          type="text"
          value={keyId || ''}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Custom Label (optional)
        </label>
        <input
          type="text"
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter custom label..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Action Type
        </label>
        <Select
          options={actionTypeOptions}
          value={actionType}
          onChange={setActionType}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Action Value
        </label>
        <input
          type="text"
          value={actionValue}
          onChange={(e) => setActionValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={
            actionType === 'key' ? 'KeyA, KeyB, etc.' :
            actionType === 'macro' ? 'Enter macro sequence...' :
            actionType === 'layer' ? 'Layer name or number...' :
            'Function name...'
          }
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={handleSave} className="flex-1">
          Save Mapping
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}