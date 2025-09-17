// Local storage utilities for persisting configurations

import type {
  KeyboardConfiguration,
  KeyboardLayout,
  AppSettings,
  UserPreferences,
} from '@/types';

const STORAGE_KEYS = {
  CONFIGURATIONS: 'keyboard-configurator-configs',
  LAYOUTS: 'keyboard-configurator-layouts',
  SETTINGS: 'keyboard-configurator-settings',
  PREFERENCES: 'keyboard-configurator-preferences',
} as const;

// Configuration storage
export function saveConfiguration(configuration: KeyboardConfiguration): void {
  const configurations = loadConfigurations();
  const existingIndex = configurations.findIndex(c => c.id === configuration.id);
  
  if (existingIndex >= 0) {
    configurations[existingIndex] = configuration;
  } else {
    configurations.push(configuration);
  }
  
  localStorage.setItem(STORAGE_KEYS.CONFIGURATIONS, JSON.stringify(configurations));
}

export function loadConfigurations(): KeyboardConfiguration[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONFIGURATIONS);
    if (!stored) return [];
    
    const configurations = JSON.parse(stored);
    // Convert date strings back to Date objects
    return configurations.map((config: any) => ({
      ...config,
      createdAt: new Date(config.createdAt),
      updatedAt: new Date(config.updatedAt),
    }));
  } catch (error) {
    console.error('Failed to load configurations:', error);
    return [];
  }
}

export function loadConfiguration(id: string): KeyboardConfiguration | null {
  const configurations = loadConfigurations();
  return configurations.find(c => c.id === id) || null;
}

export function deleteConfiguration(id: string): void {
  const configurations = loadConfigurations();
  const filtered = configurations.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CONFIGURATIONS, JSON.stringify(filtered));
}

// Layout storage
export function saveLayout(layout: KeyboardLayout): void {
  const layouts = loadLayouts();
  const existingIndex = layouts.findIndex(l => l.id === layout.id);
  
  if (existingIndex >= 0) {
    layouts[existingIndex] = layout;
  } else {
    layouts.push(layout);
  }
  
  localStorage.setItem(STORAGE_KEYS.LAYOUTS, JSON.stringify(layouts));
}

export function loadLayouts(): KeyboardLayout[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAYOUTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load layouts:', error);
    return [];
  }
}

export function loadLayout(id: string): KeyboardLayout | null {
  const layouts = loadLayouts();
  return layouts.find(l => l.id === id) || null;
}

// Settings storage
export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) return getDefaultSettings();
    
    return { ...getDefaultSettings(), ...JSON.parse(stored) };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return getDefaultSettings();
  }
}

export function getDefaultSettings(): AppSettings {
  return {
    theme: 'system',
    autoSave: true,
    autoSaveInterval: 30,
    defaultKeyboardCategory: '60%',
    showKeyLabels: true,
    showKeyIds: false,
    gridSize: 20,
    snapToGrid: true,
    maxUndoHistory: 50,
  };
}

// User preferences storage
export function savePreferences(preferences: UserPreferences): void {
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
}

export function loadPreferences(): UserPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!stored) return getDefaultPreferences();
    
    return { ...getDefaultPreferences(), ...JSON.parse(stored) };
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return getDefaultPreferences();
  }
}

export function getDefaultPreferences(): UserPreferences {
  return {
    recentConfigurations: [],
    favoriteLayouts: [],
    customTemplates: [],
    keyboardShortcuts: {
      'save': 'Ctrl+S',
      'undo': 'Ctrl+Z',
      'redo': 'Ctrl+Y',
      'copy': 'Ctrl+C',
      'paste': 'Ctrl+V',
    },
  };
}

// Utility functions
export function addToRecentConfigurations(configId: string): void {
  const preferences = loadPreferences();
  const recent = preferences.recentConfigurations.filter(id => id !== configId);
  recent.unshift(configId);
  
  // Keep only the last 10 recent configurations
  preferences.recentConfigurations = recent.slice(0, 10);
  savePreferences(preferences);
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

export function exportAllData(): string {
  const data = {
    configurations: loadConfigurations(),
    layouts: loadLayouts(),
    settings: loadSettings(),
    preferences: loadPreferences(),
    exportedAt: new Date().toISOString(),
  };
  
  return JSON.stringify(data, null, 2);
}

export function importAllData(jsonData: string): void {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.configurations) {
      localStorage.setItem(STORAGE_KEYS.CONFIGURATIONS, JSON.stringify(data.configurations));
    }
    
    if (data.layouts) {
      localStorage.setItem(STORAGE_KEYS.LAYOUTS, JSON.stringify(data.layouts));
    }
    
    if (data.settings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }
    
    if (data.preferences) {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(data.preferences));
    }
  } catch (error) {
    throw new Error('Invalid import data format');
  }
}