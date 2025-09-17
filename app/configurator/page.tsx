'use client';

import { useState, useEffect } from 'react';
import { KeyboardView, ConfigurationPanel, HardwareInfoPanel } from '@/components';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { 
  create60PercentLayout, 
  createEmptyConfiguration,
  assessBuildDifficulty,
  saveConfiguration,
  loadConfigurations,
} from '@/lib';
import type { KeyboardLayout, KeyboardConfiguration } from '@/types';

export default function ConfiguratorPage() {
  const [layout, setLayout] = useState<KeyboardLayout | null>(null);
  const [configuration, setConfiguration] = useState<KeyboardConfiguration | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedSwitch, setSelectedSwitch] = useState<string>('cherry-mx-red');
  const [viewportSettings, setViewportSettings] = useState({
    zoom: 1,
    panX: 0,
    panY: 0,
    gridVisible: false,
    snapToGrid: true,
  });

  // Initialize with 60% layout
  useEffect(() => {
    const defaultLayout = create60PercentLayout();
    const defaultConfig = createEmptyConfiguration(defaultLayout.id, 'My Keyboard');
    
    setLayout(defaultLayout);
    setConfiguration(defaultConfig);
  }, []);

  const handleKeySelect = (keyId: string) => {
    setSelectedKeys(prev => 
      prev.includes(keyId) 
        ? prev.filter(id => id !== keyId)
        : [...prev, keyId]
    );
  };

  const handleKeyDoubleClick = (keyId: string) => {
    // Open key mapping modal
    console.log('Double clicked key:', keyId);
  };

  const handleConfigurationChange = (newConfig: KeyboardConfiguration) => {
    setConfiguration(newConfig);
  };

  const handleSaveConfiguration = () => {
    if (configuration) {
      saveConfiguration(configuration);
      // Show success notification
    }
  };

  const handleLoadConfiguration = () => {
    const configs = loadConfigurations();
    if (configs.length > 0) {
      setConfiguration(configs[0]);
    }
  };

  const handleZoomIn = () => {
    setViewportSettings(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom * 1.2, 3),
    }));
  };

  const handleZoomOut = () => {
    setViewportSettings(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom / 1.2, 0.5),
    }));
  };

  const handleResetView = () => {
    setViewportSettings({
      zoom: 1,
      panX: 0,
      panY: 0,
      gridVisible: false,
      snapToGrid: true,
    });
  };

  const buildDifficulty = layout && configuration 
    ? assessBuildDifficulty(configuration, layout, {
        solderingRequired: false, // Assume hot-swap for now
        customFirmware: configuration.layers.length > 1,
      })
    : null;

  const layoutOptions = [
    { value: '60-percent', label: '60% Layout' },
    { value: 'tkl', label: 'TKL (87-key)' },
    { value: 'full', label: 'Full Size (104-key)' },
  ];

  if (!layout || !configuration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading configurator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Keyboard Configurator</h1>
            {buildDifficulty && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Build Difficulty:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  buildDifficulty.level <= 2 ? 'bg-green-100 text-green-800' :
                  buildDifficulty.level <= 3 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {buildDifficulty.name} ({buildDifficulty.estimatedTime}h)
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Select
              options={layoutOptions}
              value={layout.id}
              onChange={(value) => {
                if (value === '60-percent') {
                  const newLayout = create60PercentLayout();
                  setLayout(newLayout);
                  setConfiguration(createEmptyConfiguration(newLayout.id));
                }
              }}
            />
            <Button variant="outline" onClick={handleLoadConfiguration}>
              Load
            </Button>
            <Button onClick={handleSaveConfiguration}>
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Configuration */}
        <ConfigurationPanel
          configuration={configuration}
          onConfigurationChange={handleConfigurationChange}
          selectedKeyId={selectedKeys[0]}
        />

        {/* Center - Keyboard View */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {selectedKeys.length} key{selectedKeys.length !== 1 ? 's' : ''} selected
                </span>
                {selectedKeys.length > 0 && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedKeys([])}
                  >
                    Clear Selection
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewportSettings(prev => ({ ...prev, gridVisible: !prev.gridVisible }))}
                  className={`p-2 rounded ${viewportSettings.gridVisible ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  title="Toggle grid"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
                  <button
                    onClick={handleZoomOut}
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Zoom out"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="px-2 text-sm font-medium min-w-[60px] text-center">
                    {Math.round(viewportSettings.zoom * 100)}%
                  </span>
                  
                  <button
                    onClick={handleZoomIn}
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Zoom in"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                <button
                  onClick={handleResetView}
                  className="p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  title="Reset view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Keyboard Display */}
          <KeyboardView
            layout={layout}
            configuration={configuration}
            selectedKeys={selectedKeys}
            onKeySelect={handleKeySelect}
            onKeyDoubleClick={handleKeyDoubleClick}
            viewportSettings={viewportSettings}
            interactive={true}
          />
        </div>

        {/* Right Panel - Hardware Info */}
        <HardwareInfoPanel
          selectedKey={selectedKeys.length === 1 ? layout.keys.find(k => k.id === selectedKeys[0]) : undefined}
          selectedSwitch={selectedSwitch}
          onSwitchChange={setSelectedSwitch}
          keyCount={layout.keys.length}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <span>Layout: {layout.name}</span>
            <span>Keys: {layout.keys.length}</span>
            <span>Layers: {configuration.layers.length}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Last saved: Never</span>
            <span>Version: {configuration.version}</span>
          </div>
        </div>
      </div>
    </div>
  );
}