'use client';

import { cn } from '@/lib/utils';
import type { KeyProps } from '@/types';

export function Key({
  definition,
  mapping,
  state,
  onClick,
  onDoubleClick,
  className,
}: KeyProps) {
  const { position, size, defaultLabel } = definition;
  const displayLabel = mapping?.customLabel || defaultLabel;

  // Convert key units to pixels (assuming 1 unit = 48px)
  const UNIT_SIZE = 48;
  const width = size.width * UNIT_SIZE;
  const height = size.height * UNIT_SIZE;
  const left = position.x * UNIT_SIZE;
  const top = position.y * UNIT_SIZE;

  const keyClasses = cn(
    'absolute border-2 rounded-md cursor-pointer transition-all duration-150',
    'flex items-center justify-center text-sm font-medium',
    'select-none hover:shadow-md',
    {
      // Default state
      'bg-white border-gray-300 text-gray-900 hover:bg-gray-50': state === 'default',
      
      // Pressed state
      'bg-blue-100 border-blue-400 text-blue-900 shadow-inner': state === 'pressed',
      
      // Selected state
      'bg-blue-500 border-blue-600 text-white shadow-lg': state === 'selected',
      
      // Highlighted state
      'bg-yellow-100 border-yellow-400 text-yellow-900': state === 'highlighted',
      
      // Disabled state
      'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed': state === 'disabled',
    },
    className
  );

  return (
    <div
      className={keyClasses}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      title={`${displayLabel} (${definition.keyCode})`}
    >
      <span className="truncate px-1">{displayLabel}</span>
      
      {mapping?.action.type === 'macro' && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
      )}
      
      {mapping?.action.type === 'layer' && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full" />
      )}
      
      {mapping?.action.type === 'function' && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full" />
      )}
    </div>
  );
}