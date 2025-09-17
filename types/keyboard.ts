// Core keyboard types for the configurator

export interface Position {
  x: number;
  y: number;
}

export interface KeySize {
  width: number;
  height: number;
}

export interface KeyDefinition {
  id: string;
  position: Position;
  size: KeySize;
  defaultLabel: string;
  keyCode: string;
  row: number;
  column: number;
  keycapSize?: string; // Reference to KEYCAP_SIZES id
  keycapVariant?: string; // Reference to specific variant
  recommendedProfile?: string[]; // Compatible keycap profiles
}

export interface KeyMapping {
  keyId: string;
  customLabel?: string;
  action: KeyAction;
  modifiers?: KeyModifier[];
}

export interface KeyAction {
  type: 'key' | 'macro' | 'layer' | 'function';
  value: string;
  description?: string;
}

export interface KeyModifier {
  type: 'ctrl' | 'alt' | 'shift' | 'cmd' | 'fn';
  required: boolean;
}

export interface KeyboardLayout {
  id: string;
  name: string;
  description: string;
  keys: KeyDefinition[];
  dimensions: {
    width: number;
    height: number;
  };
  category: KeyboardCategory;
}

export interface KeyboardConfiguration {
  id: string;
  name: string;
  layoutId: string;
  keyMappings: KeyMapping[];
  layers: Layer[];
  createdAt: Date;
  updatedAt: Date;
  version: string;
}

export interface Layer {
  id: string;
  name: string;
  keyMappings: KeyMapping[];
  isDefault: boolean;
  order: number;
}

export type KeyboardCategory = '60%' | '65%' | '75%' | 'TKL' | 'Full' | 'Custom';

export type KeyState = 'default' | 'pressed' | 'selected' | 'highlighted' | 'disabled';