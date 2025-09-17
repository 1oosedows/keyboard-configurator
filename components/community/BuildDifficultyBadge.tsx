'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import type { BuildDifficulty, BuildStep } from '@/types/community';

interface BuildDifficultyBadgeProps {
  difficulty: BuildDifficulty;
  showDetails?: boolean;
  buildSteps?: BuildStep[];
  className?: string;
}

export function BuildDifficultyBadge({ 
  difficulty, 
  showDetails = false, 
  buildSteps = [],
  className 
}: BuildDifficultyBadgeProps) {
  const [showModal, setShowModal] = useState(false);

  const getDifficultyConfig = (level: number) => {
    const configs = {
      1: { color: 'bg-green-100 text-green-800 border-green-200', icon: '🟢' },
      2: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '🔵' },
      3: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🟡' },
      4: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '🟠' },
      5: { color: 'bg-red-100 text-red-800 border-red-200', icon: '🔴' },
    };
    return configs[level as keyof typeof configs] || configs[1];
  };

  const config = getDifficultyConfig(difficulty.level);

  return (
    <>
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium',
          config.color,
          showDetails && 'cursor-pointer hover:opacity-80',
          className
        )}
        onClick={showDetails ? () => setShowModal(true) : undefined}
      >
        <span>{config.icon}</span>
        <span>{difficulty.name}</span>
        <span className="text-xs opacity-75">({difficulty.estimatedTime}h)</span>
        {showDetails && (
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>

      {showDetails && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`${difficulty.name} Build Guide`}
        >
          <div className="space-y-6">
            {/* Overview */}
            <div>
              <h3 className="font-medium mb-2">Overview</h3>
              <p className="text-sm text-gray-600 mb-4">{difficulty.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Estimated Time:</span>
                  <span className="ml-2">{difficulty.estimatedTime} hours</span>
                </div>
                <div>
                  <span className="font-medium">Difficulty Level:</span>
                  <span className="ml-2">{difficulty.level}/5</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="font-medium mb-2">Requirements</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {difficulty.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Needed */}
            <div>
              <h3 className="font-medium mb-2">Tools Needed</h3>
              <div className="space-y-2">
                {difficulty.toolsNeeded.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className="text-xs text-gray-600">{tool.description}</div>
                    </div>
                    <div className="text-right">
                      {tool.required && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Required
                        </span>
                      )}
                      {tool.estimatedCost && (
                        <div className="text-xs text-gray-500 mt-1">
                          ~${tool.estimatedCost}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Required */}
            <div>
              <h3 className="font-medium mb-2">Skills Required</h3>
              <div className="space-y-2">
                {difficulty.skillsRequired.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{skill.name}</div>
                      <div className="text-xs text-gray-600">{skill.description}</div>
                    </div>
                    <span className={cn(
                      'text-xs px-2 py-1 rounded',
                      skill.level === 'basic' ? 'bg-green-100 text-green-800' :
                      skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    )}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Build Steps Preview */}
            {buildSteps.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Build Steps ({buildSteps.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {buildSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.title}</div>
                        <div className="text-xs text-gray-600">{step.estimatedTime} min</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Take your time - rushing leads to mistakes</li>
                <li>• Have good lighting and a clean workspace</li>
                <li>• Watch tutorial videos before starting</li>
                <li>• Join the community Discord for live help</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

// Simplified version for inline use
export function SimpleDifficultyBadge({ 
  difficulty, 
  className 
}: { 
  difficulty: BuildDifficulty; 
  className?: string; 
}) {
  const config = {
    1: { color: 'bg-green-100 text-green-800', icon: '🟢' },
    2: { color: 'bg-blue-100 text-blue-800', icon: '🔵' },
    3: { color: 'bg-yellow-100 text-yellow-800', icon: '🟡' },
    4: { color: 'bg-orange-100 text-orange-800', icon: '🟠' },
    5: { color: 'bg-red-100 text-red-800', icon: '🔴' },
  }[difficulty.level] || { color: 'bg-gray-100 text-gray-800', icon: '⚪' };

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium', config.color, className)}>
      <span>{config.icon}</span>
      {difficulty.name}
    </span>
  );
}