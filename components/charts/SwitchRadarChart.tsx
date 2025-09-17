'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { SwitchCharacteristics } from '@/lib/switch-reference';

interface SwitchRadarChartProps {
  characteristics: SwitchCharacteristics;
  color?: string;
  size?: number;
  className?: string;
  showLabels?: boolean;
  comparison?: SwitchCharacteristics;
  comparisonColor?: string;
}

export function SwitchRadarChart({
  characteristics,
  color = '#3b82f6',
  size = 200,
  className,
  showLabels = true,
  comparison,
  comparisonColor = '#ef4444',
}: SwitchRadarChartProps) {
  const center = size / 2;
  const radius = (size - 40) / 2;

  const axes = [
    { key: 'tactility', label: 'Tactility', angle: 0 },
    { key: 'clickiness', label: 'Clickiness', angle: 60 },
    { key: 'smoothness', label: 'Smoothness', angle: 120 },
    { key: 'weight', label: 'Weight', angle: 180 },
    { key: 'sound', label: 'Sound', angle: 240 },
    { key: 'stability', label: 'Stability', angle: 300 },
  ] as const;

  const getPointPosition = (value: number, angle: number) => {
    const radian = (angle * Math.PI) / 180;
    const distance = (value / 10) * radius;
    return {
      x: center + distance * Math.cos(radian),
      y: center + distance * Math.sin(radian),
    };
  };

  const getAxisEndPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian),
    };
  };

  const getLabelPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    const labelRadius = radius + 15;
    return {
      x: center + labelRadius * Math.cos(radian),
      y: center + labelRadius * Math.sin(radian),
    };
  };

  const primaryPath = useMemo(() => {
    const points = axes.map(axis => {
      const value = characteristics[axis.key];
      return getPointPosition(value, axis.angle);
    });
    
    return `M ${points[0].x} ${points[0].y} ` +
           points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
           ' Z';
  }, [characteristics, axes, center, radius]);

  const comparisonPath = useMemo(() => {
    if (!comparison) return '';
    
    const points = axes.map(axis => {
      const value = comparison[axis.key];
      return getPointPosition(value, axis.angle);
    });
    
    return `M ${points[0].x} ${points[0].y} ` +
           points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
           ' Z';
  }, [comparison, axes, center, radius]);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {[2, 4, 6, 8, 10].map(value => (
          <circle
            key={value}
            cx={center}
            cy={center}
            r={(value / 10) * radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axes.map(axis => {
          const end = getAxisEndPosition(axis.angle);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* Comparison area (behind primary) */}
        {comparison && (
          <path
            d={comparisonPath}
            fill={comparisonColor}
            fillOpacity="0.1"
            stroke={comparisonColor}
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        )}

        {/* Primary area */}
        <path
          d={primaryPath}
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="2"
        />

        {/* Data points */}
        {axes.map(axis => {
          const value = characteristics[axis.key];
          const point = getPointPosition(value, axis.angle);
          return (
            <circle
              key={axis.key}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Comparison data points */}
        {comparison && axes.map(axis => {
          const value = comparison[axis.key];
          const point = getPointPosition(value, axis.angle);
          return (
            <circle
              key={`comp-${axis.key}`}
              cx={point.x}
              cy={point.y}
              r="3"
              fill={comparisonColor}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Axis labels */}
        {showLabels && axes.map(axis => {
          const labelPos = getLabelPosition(axis.angle);
          return (
            <text
              key={axis.key}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-600"
            >
              {axis.label}
            </text>
          );
        })}

        {/* Value labels */}
        {showLabels && axes.map(axis => {
          const value = characteristics[axis.key];
          const point = getPointPosition(value, axis.angle);
          return (
            <text
              key={`value-${axis.key}`}
              x={point.x}
              y={point.y - 8}
              textAnchor="middle"
              className="text-xs font-bold fill-gray-800"
            >
              {value}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      {comparison && (
        <div className="flex gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: color }}
            />
            <span>Primary</span>
          </div>
          <div className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full border-2 border-white border-dashed"
              style={{ backgroundColor: comparisonColor }}
            />
            <span>Comparison</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Simplified version for small displays
export function MiniSwitchRadarChart({
  characteristics,
  color = '#3b82f6',
  size = 80,
  className,
}: {
  characteristics: SwitchCharacteristics;
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <SwitchRadarChart
      characteristics={characteristics}
      color={color}
      size={size}
      className={className}
      showLabels={false}
    />
  );
}