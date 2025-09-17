'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { CommunityBuild } from '@/types/community';

interface BuildCardProps {
  build: CommunityBuild;
  onLike?: (buildId: string) => void;
  onView?: (buildId: string) => void;
  className?: string;
}

export function BuildCard({ build, onLike, onView, className }: BuildCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(build.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(build.id);
  };

  const handleView = () => {
    onView?.(build.id);
  };

  const getDifficultyColor = (level: number) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || colors[1];
  };

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden', className)}>
      {/* Image */}
      {build.images.length > 0 && (
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <img
            src={build.images[0].url}
            alt={build.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
            onClick={handleView}
          />
          {build.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}
          {build.verified && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 
            className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleView}
          >
            {build.title}
          </h3>
          <div className={cn('px-2 py-1 rounded text-xs font-medium', getDifficultyColor(build.difficulty.level))}>
            {build.difficulty.name}
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            {build.author.avatar ? (
              <img src={build.author.avatar} alt={build.author.displayName} className="w-full h-full rounded-full" />
            ) : (
              <span className="text-xs font-medium text-gray-600">
                {build.author.displayName.charAt(0)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600">{build.author.displayName}</span>
          <div className="flex items-center gap-1">
            {build.author.badges.slice(0, 2).map(badge => (
              <span key={badge.id} className="text-xs" title={badge.description}>
                {badge.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {build.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {build.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
          {build.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
              +{build.tags.length - 3}
            </span>
          )}
        </div>

        {/* Build info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-4">
            <span>${build.estimatedCost}</span>
            <span>{build.buildTime}h build</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{build.views} views</span>
            <span>•</span>
            <span>{build.comments.length} comments</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center gap-1 px-3 py-1 rounded text-sm transition-colors',
              isLiked 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <svg 
              className={cn('w-4 h-4', isLiked ? 'fill-current' : 'fill-none')} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {likeCount}
          </button>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleView}>
              View Build
            </Button>
            <Button size="sm" variant="outline">
              Clone Config
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}