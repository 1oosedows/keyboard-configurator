// Predefined keyboard layouts and layout utilities

import type { KeyboardLayout, KeyDefinition, KeyboardCategory } from '@/types';

// Standard key sizes (in units, where 1 unit = standard key width)
export const KEY_SIZES = {
  standard: { width: 1, height: 1 },
  wide: { width: 1.25, height: 1 },
  tab: { width: 1.5, height: 1 },
  caps: { width: 1.75, height: 1 },
  shift: { width: 2.25, height: 1 },
  space: { width: 6.25, height: 1 },
  enter: { width: 2.25, height: 1 },
  backspace: { width: 2, height: 1 },
} as const;

// Create a standard 60% layout
export function create60PercentLayout(): KeyboardLayout {
  const keys: KeyDefinition[] = [];
  let keyId = 0;

  // Row 1 (numbers)
  const row1Keys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
  row1Keys.forEach((label, col) => {
    keys.push({
      id: `key-${keyId++}`,
      position: { x: col, y: 0 },
      size: KEY_SIZES.standard,
      defaultLabel: label,
      keyCode: `Key${label.toUpperCase()}`,
      row: 0,
      column: col,
      keycapSize: '1u',
      recommendedProfile: ['cherry', 'oem', 'sa', 'dsa', 'xda'],
    });
  });

  // Backspace
  keys.push({
    id: `key-${keyId++}`,
    position: { x: 13, y: 0 },
    size: KEY_SIZES.backspace,
    defaultLabel: 'Backspace',
    keyCode: 'Backspace',
    row: 0,
    column: 13,
    keycapSize: '2u',
    recommendedProfile: ['cherry', 'oem', 'sa', 'dsa', 'xda'],
  });

  // Row 2 (QWERTY top)
  keys.push({
    id: `key-${keyId++}`,
    position: { x: 0, y: 1 },
    size: KEY_SIZES.tab,
    defaultLabel: 'Tab',
    keyCode: 'Tab',
    row: 1,
    column: 0,
  });

  const row2Keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'];
  row2Keys.forEach((label, col) => {
    keys.push({
      id: `key-${keyId++}`,
      position: { x: 1.5 + col, y: 1 },
      size: KEY_SIZES.standard,
      defaultLabel: label,
      keyCode: `Key${label}`,
      row: 1,
      column: col + 1,
    });
  });

  // Row 3 (ASDF home row)
  keys.push({
    id: `key-${keyId++}`,
    position: { x: 0, y: 2 },
    size: KEY_SIZES.caps,
    defaultLabel: 'Caps',
    keyCode: 'CapsLock',
    row: 2,
    column: 0,
  });

  const row3Keys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"];
  row3Keys.forEach((label, col) => {
    keys.push({
      id: `key-${keyId++}`,
      position: { x: 1.75 + col, y: 2 },
      size: KEY_SIZES.standard,
      defaultLabel: label,
      keyCode: `Key${label}`,
      row: 2,
      column: col + 1,
    });
  });

  keys.push({
    id: `key-${keyId++}`,
    position: { x: 12.75, y: 2 },
    size: KEY_SIZES.enter,
    defaultLabel: 'Enter',
    keyCode: 'Enter',
    row: 2,
    column: 12,
  });

  // Row 4 (ZXCV bottom)
  keys.push({
    id: `key-${keyId++}`,
    position: { x: 0, y: 3 },
    size: KEY_SIZES.shift,
    defaultLabel: 'Shift',
    keyCode: 'ShiftLeft',
    row: 3,
    column: 0,
  });

  const row4Keys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'];
  row4Keys.forEach((label, col) => {
    keys.push({
      id: `key-${keyId++}`,
      position: { x: 2.25 + col, y: 3 },
      size: KEY_SIZES.standard,
      defaultLabel: label,
      keyCode: `Key${label}`,
      row: 3,
      column: col + 1,
    });
  });

  keys.push({
    id: `key-${keyId++}`,
    position: { x: 12.25, y: 3 },
    size: { width: 2.75, height: 1 },
    defaultLabel: 'Shift',
    keyCode: 'ShiftRight',
    row: 3,
    column: 11,
  });

  // Row 5 (bottom modifiers)
  const bottomRow = [
    { label: 'Ctrl', keyCode: 'ControlLeft', size: KEY_SIZES.wide },
    { label: 'Alt', keyCode: 'AltLeft', size: KEY_SIZES.wide },
    { label: 'Cmd', keyCode: 'MetaLeft', size: KEY_SIZES.wide },
    { label: 'Space', keyCode: 'Space', size: KEY_SIZES.space },
    { label: 'Cmd', keyCode: 'MetaRight', size: KEY_SIZES.wide },
    { label: 'Alt', keyCode: 'AltRight', size: KEY_SIZES.wide },
    { label: 'Fn', keyCode: 'Fn', size: KEY_SIZES.wide },
    { label: 'Ctrl', keyCode: 'ControlRight', size: KEY_SIZES.wide },
  ];

  let xPos = 0;
  bottomRow.forEach((key, col) => {
    keys.push({
      id: `key-${keyId++}`,
      position: { x: xPos, y: 4 },
      size: key.size,
      defaultLabel: key.label,
      keyCode: key.keyCode,
      row: 4,
      column: col,
    });
    xPos += key.size.width;
  });

  return {
    id: '60-percent-standard',
    name: '60% Standard',
    description: 'Standard 60% keyboard layout without function keys or arrow keys',
    keys,
    dimensions: { width: 15, height: 5 },
    category: '60%',
  };
}

// Utility functions
export function getKeyById(layout: KeyboardLayout, keyId: string): KeyDefinition | undefined {
  return layout.keys.find(key => key.id === keyId);
}

export function getKeysByRow(layout: KeyboardLayout, row: number): KeyDefinition[] {
  return layout.keys.filter(key => key.row === row);
}

export function getLayoutDimensions(layout: KeyboardLayout) {
  const maxX = Math.max(...layout.keys.map(key => key.position.x + key.size.width));
  const maxY = Math.max(...layout.keys.map(key => key.position.y + key.size.height));
  return { width: maxX, height: maxY };
}

export function validateLayout(layout: KeyboardLayout): boolean {
  // Check for duplicate key IDs
  const keyIds = layout.keys.map(key => key.id);
  const uniqueIds = new Set(keyIds);
  if (keyIds.length !== uniqueIds.size) return false;

  // Check for overlapping keys
  for (let i = 0; i < layout.keys.length; i++) {
    for (let j = i + 1; j < layout.keys.length; j++) {
      if (keysOverlap(layout.keys[i], layout.keys[j])) return false;
    }
  }

  return true;
}

function keysOverlap(key1: KeyDefinition, key2: KeyDefinition): boolean {
  const key1Right = key1.position.x + key1.size.width;
  const key1Bottom = key1.position.y + key1.size.height;
  const key2Right = key2.position.x + key2.size.width;
  const key2Bottom = key2.position.y + key2.size.height;

  return !(
    key1Right <= key2.position.x ||
    key2Right <= key1.position.x ||
    key1Bottom <= key2.position.y ||
    key2Bottom <= key1.position.y
  );
}