'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { calculateShippingCost } from '@/lib/community';
import type { MarketplaceItem } from '@/types/community';

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onContact?: (itemId: string) => void;
  onWatch?: (itemId: string) => void;
  userLocation?: string;
  className?: string;
}

export function MarketplaceCard({ 
  item, 
  onContact, 
  onWatch, 
  userLocation = 'US',
  className 
}: MarketplaceCardProps) {
  const [isWatching, setIsWatching] = useState(false);
  const [watchCount, setWatchCount] = useState(item.watchers);

  const handleWatch = () => {
    setIsWatching(!isWatching);
    setWatchCount(prev => isWatching ? prev - 1 : prev + 1);
    onWatch?.(item.id);
  };

  const handleContact = () => {
    onContact?.(item.id);
  };

  const getConditionColor = (condition: string) => {
    const colors = {
      'new': 'bg-green-100 text-green-800',
      'like-new': 'bg-blue-100 text-blue-800',
      'good': 'bg-yellow-100 text-yellow-800',
      'fair': 'bg-orange-100 text-orange-800',
      'poor': 'bg-red-100 text-red-800',
    };
    return colors[condition as keyof typeof colors] || colors.good;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'sold': 'bg-gray-100 text-gray-800',
      'reserved': 'bg-yellow-100 text-yellow-800',
      'expired': 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const shippingInfo = calculateShippingCost(item, userLocation);

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden', className)}>
      {/* Image */}
      {item.images.length > 0 && (
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
          {item.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}
          {item.verified && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <div className={cn('absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium', getStatusColor(item.status))}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
          <div className={cn('px-2 py-1 rounded text-xs font-medium ml-2', getConditionColor(item.condition))}>
            {item.condition}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-gray-900">
            ${item.price}
            <span className="text-sm font-normal text-gray-500 ml-1">{item.currency}</span>
          </div>
          {shippingInfo.available && (
            <div className="text-sm text-gray-600">
              {shippingInfo.cost === 0 ? 'Free shipping' : `+$${shippingInfo.cost} shipping`}
            </div>
          )}
        </div>

        {/* Seller */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            {item.seller.avatar ? (
              <img src={item.seller.avatar} alt={item.seller.displayName} className="w-full h-full rounded-full" />
            ) : (
              <span className="text-xs font-medium text-gray-600">
                {item.seller.displayName.charAt(0)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600">{item.seller.displayName}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-600">
              {item.seller.stats.marketplaceRating.toFixed(1)} ({item.seller.stats.marketplaceSales})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Specifications */}
        {Object.keys(item.specifications).length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Key specs:</div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(item.specifications).slice(0, 3).map(([key, value]) => (
                <span key={key} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-4">
            <span>{item.views} views</span>
            <span>{watchCount} watching</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{item.shipping.shipsFrom}</span>
            {shippingInfo.available && (
              <>
                <span>•</span>
                <span>{shippingInfo.estimatedDays} days</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleContact}
            disabled={item.status !== 'active'}
          >
            {item.status === 'sold' ? 'Sold' : 
             item.status === 'reserved' ? 'Reserved' : 
             'Contact Seller'}
          </Button>
          <button
            onClick={handleWatch}
            className={cn(
              'p-2 rounded border transition-colors',
              isWatching 
                ? 'bg-blue-100 border-blue-300 text-blue-700' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            )}
            title={isWatching ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <svg className="w-4 h-4" fill={isWatching ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Questions indicator */}
        {item.questions.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            {item.questions.length} question{item.questions.length !== 1 ? 's' : ''} asked
          </div>
        )}
      </div>
    </div>
  );
}