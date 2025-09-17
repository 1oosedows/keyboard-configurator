// Configuration and settings types

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  autoSave: boolean;
  autoSaveInterval: number; // in seconds
  defaultKeyboardCategory: import('./keyboard').KeyboardCategory;
  showKeyLabels: boolean;
  showKeyIds: boolean;
  gridSize: number;
  snapToGrid: boolean;
  maxUndoHistory: number;
}

export interface ExportOptions {
  format: 'json' | 'qmk' | 'via' | 'csv';
  includeMetadata: boolean;
  compressOutput: boolean;
  layersToExport: string[]; // layer IDs
}

export interface ImportOptions {
  format: 'json' | 'qmk' | 'via' | 'csv';
  mergeWithExisting: boolean;
  overwriteExisting: boolean;
  validateKeys: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'missing_key' | 'invalid_keycode' | 'duplicate_mapping' | 'invalid_layer';
  message: string;
  keyId?: string;
  layerId?: string;
}

export interface ValidationWarning {
  type: 'unused_key' | 'complex_macro' | 'layer_conflict';
  message: string;
  keyId?: string;
  layerId?: string;
}

export interface ConfigurationTemplate {
  id: string;
  name: string;
  description: string;
  layoutId: string;
  configuration: Partial<import('./keyboard').KeyboardConfiguration>;
  tags: string[];
  isBuiltIn: boolean;
}

export interface UserPreferences {
  recentConfigurations: string[]; // configuration IDs
  favoriteLayouts: string[]; // layout IDs
  customTemplates: ConfigurationTemplate[];
  keyboardShortcuts: Record<string, string>;
}