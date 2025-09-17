'use client';

import { useState } from 'react';
import { MarketplaceCard } from '@/components';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { MARKETPLACE_CATEGORIES } from '@/lib/community';
import type { MarketplaceItem } from '@/types/community';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high' | 'popular'>('recent');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Mock marketplace items
  const mockItems: MarketplaceItem[] = [
    {
      id: 'item-1',
      title: 'GMK Olivia++ Light Base Kit',
      description: 'Beautiful pink and cream keycap set in excellent condition. Used for about 6 months, no shine or wear visible.',
      seller: {
        id: 'user-1',
        username: 'keeb_collector',
        displayName: 'Keeb Collector',
        avatar: '',
        joinDate: new Date('2022-03-15'),
        reputation: 3245,
        badges: [
          {
            id: 'trusted-seller',
            name: 'Trusted Seller',
            description: 'Maintained 4.8+ rating with 50+ sales',
            icon: '✅',
            rarity: 'rare',
            unlockedAt: new Date(),
          },
        ],
        stats: {
          buildsShared: 8,
          helpfulVotes: 89,
          forumPosts: 156,
          marketplaceRating: 4.9,
          marketplaceSales: 67,
          buildDifficultiesCompleted: [1, 2, 3, 4],
        },
      },
      category: { id: 'keycaps', name: 'Keycaps', description: 'Keycap sets and artisans', icon: '⌨️' },
      condition: 'like-new',
      price: 180,
      currency: 'USD',
      images: ['/placeholder-keycaps.jpg'],
      specifications: {
        'Profile': 'Cherry',
        'Material': 'ABS',
        'Compatibility': 'MX Style',
        'Layout': 'US ANSI',
      },
      shipping: {
        domestic: 8,
        international: 25,
        freeShippingThreshold: 200,
        shipsFrom: 'US',
        shipsTo: ['US', 'Canada', 'EU'],
        estimatedDays: 3,
      },
      status: 'active',
      views: 234,
      watchers: 12,
      questions: [
        {
          id: 'q1',
          question: 'Are the alphas included?',
          answer: 'Yes, this is the complete base kit with all alphas and modifiers.',
          asker: {
            id: 'user-2',
            username: 'newbie_builder',
            displayName: 'Newbie Builder',
            avatar: '',
            joinDate: new Date(),
            reputation: 45,
            badges: [],
            stats: {
              buildsShared: 0,
              helpfulVotes: 2,
              forumPosts: 8,
              marketplaceRating: 0,
              marketplaceSales: 0,
              buildDifficultiesCompleted: [],
            },
          },
          createdAt: new Date('2024-01-10'),
          answeredAt: new Date('2024-01-10'),
        },
      ],
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-08'),
      featured: true,
      verified: true,
    },
    {
      id: 'item-2',
      title: 'Gateron Yellow Pro Switches (90x)',
      description: 'Brand new Gateron Yellow Pro switches, never used. Perfect for linear builds.',
      seller: {
        id: 'user-3',
        username: 'switch_depot',
        displayName: 'Switch Depot',
        avatar: '',
        joinDate: new Date('2023-01-20'),
        reputation: 1876,
        badges: [],
        stats: {
          buildsShared: 3,
          helpfulVotes: 34,
          forumPosts: 67,
          marketplaceRating: 4.7,
          marketplaceSales: 89,
          buildDifficultiesCompleted: [1, 2, 3],
        },
      },
      category: { id: 'switches', name: 'Switches', description: 'Mechanical switches of all types', icon: '🔘' },
      condition: 'new',
      price: 45,
      currency: 'USD',
      images: ['/placeholder-switches.jpg'],
      specifications: {
        'Type': 'Linear',
        'Actuation Force': '50g',
        'Travel': '4.0mm',
        'Housing': 'Nylon',
        'Quantity': '90',
      },
      shipping: {
        domestic: 5,
        international: 15,
        shipsFrom: 'US',
        shipsTo: ['Worldwide'],
        estimatedDays: 2,
      },
      status: 'active',
      views: 156,
      watchers: 8,
      questions: [],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12'),
      featured: false,
      verified: true,
    },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...MARKETPLACE_CATEGORIES.map(cat => ({ value: cat.id, label: cat.name })),
  ];

  const conditionOptions = [
    { value: 'all', label: 'All Conditions' },
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const filteredItems = mockItems.filter(item => {
    if (categoryFilter !== 'all' && item.category.id !== categoryFilter) return false;
    if (conditionFilter !== 'all' && item.condition !== conditionFilter) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
                <p className="text-gray-600 mt-1">
                  Buy and sell keyboard components with trusted community members
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                List an Item
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select
                  options={categoryOptions}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <Select
                  options={conditionOptions}
                  value={conditionFilter}
                  onChange={setConditionFilter}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      placeholder="Min"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      placeholder="Max"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Popular Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Popular Categories
                </label>
                <div className="space-y-1">
                  {MARKETPLACE_CATEGORIES.slice(0, 4).map(category => (
                    <button
                      key={category.id}
                      onClick={() => setCategoryFilter(category.id)}
                      className={cn(
                        'w-full text-left px-2 py-1 rounded text-sm transition-colors',
                        categoryFilter === category.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={(value) => setSortBy(value as any)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MarketplaceCard key={item.id} item={item} />
              ))}
            </div>

            {/* Load More */}
            {filteredItems.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">Load More Items</Button>
              </div>
            )}

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all categories.</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setConditionFilter('all');
                    setPriceRange([0, 1000]);
                  }}>
                    Clear Filters
                  </Button>
                  <Button>List Your Item</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}