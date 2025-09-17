'use client';

import { useState } from 'react';
import { BuildCard, BuildDifficultyBadge } from '@/components';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import type { CommunityBuild } from '@/types/community';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'builds' | 'forum' | 'challenges'>('builds');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('featured');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  // Mock data - in production this would come from API
  const mockBuilds: CommunityBuild[] = [
    {
      id: 'build-1',
      title: 'Minimalist 60% Daily Driver',
      description: 'Clean and simple build perfect for office work. Cherry MX Browns with PBT keycaps for a premium typing experience.',
      author: {
        id: 'user-1',
        username: 'keeb_master',
        displayName: 'Keyboard Master',
        avatar: '',
        joinDate: new Date('2023-01-15'),
        reputation: 2847,
        badges: [
          {
            id: 'helpful-member',
            name: 'Helpful Member',
            description: 'Received 100+ helpful votes',
            icon: '🤝',
            rarity: 'uncommon',
            unlockedAt: new Date(),
          },
        ],
        stats: {
          buildsShared: 12,
          helpfulVotes: 156,
          forumPosts: 89,
          marketplaceRating: 4.9,
          marketplaceSales: 23,
          buildDifficultiesCompleted: [1, 2, 3],
        },
      },
      configuration: {
        id: 'config-1',
        name: 'Daily Driver',
        layoutId: '60-percent',
        keyMappings: [],
        layers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
      },
      images: [
        { id: 'img-1', url: '/placeholder-keyboard.jpg', order: 0, type: 'glamour' },
      ],
      tags: ['60%', 'office', 'tactile', 'pbt', 'cherry-mx'],
      difficulty: {
        level: 2,
        name: 'Easy',
        description: 'Simple modifications - stabilizer tuning, basic lubing',
        requirements: ['Hot-swap PCB', 'Stabilizer modification'],
        estimatedTime: 4,
        toolsNeeded: [],
        skillsRequired: [],
      },
      estimatedCost: 180,
      buildTime: 4,
      likes: 47,
      views: 892,
      comments: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      featured: true,
      verified: true,
    },
    {
      id: 'build-2',
      title: 'RGB Gaming Beast',
      description: 'High-performance gaming keyboard with custom RGB lighting and linear switches for competitive gaming.',
      author: {
        id: 'user-2',
        username: 'gamer_pro',
        displayName: 'Pro Gamer',
        avatar: '',
        joinDate: new Date('2023-06-20'),
        reputation: 1456,
        badges: [],
        stats: {
          buildsShared: 5,
          helpfulVotes: 23,
          forumPosts: 34,
          marketplaceRating: 4.7,
          marketplaceSales: 8,
          buildDifficultiesCompleted: [1, 2],
        },
      },
      configuration: {
        id: 'config-2',
        name: 'Gaming Beast',
        layoutId: 'tkl',
        keyMappings: [],
        layers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
      },
      images: [
        { id: 'img-2', url: '/placeholder-keyboard.jpg', order: 0, type: 'glamour' },
      ],
      tags: ['tkl', 'gaming', 'linear', 'rgb', 'gateron'],
      difficulty: {
        level: 3,
        name: 'Intermediate',
        description: 'Through-hole soldering, custom firmware, case modifications',
        requirements: ['Through-hole soldering', 'Custom firmware flashing'],
        estimatedTime: 8,
        toolsNeeded: [],
        skillsRequired: [],
      },
      estimatedCost: 320,
      buildTime: 8,
      likes: 89,
      views: 1247,
      comments: [],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      featured: false,
      verified: true,
    },
  ];

  const tabs = [
    { id: 'builds', label: 'Community Builds', count: mockBuilds.length },
    { id: 'forum', label: 'Forum', count: 1247 },
    { id: 'challenges', label: 'Challenges', count: 3 },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: '1', label: 'Beginner' },
    { value: '2', label: 'Easy' },
    { value: '3', label: 'Intermediate' },
    { value: '4', label: 'Advanced' },
    { value: '5', label: 'Expert' },
  ];

  const popularTags = ['60%', 'tkl', 'full-size', 'tactile', 'linear', 'clicky', 'rgb', 'wireless'];
  const tagOptions = [
    { value: 'all', label: 'All Tags' },
    ...popularTags.map(tag => ({ value: tag, label: tag })),
  ];

  const filteredBuilds = mockBuilds.filter(build => {
    if (difficultyFilter !== 'all' && build.difficulty.level.toString() !== difficultyFilter) {
      return false;
    }
    if (tagFilter !== 'all' && !build.tags.includes(tagFilter)) {
      return false;
    }
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
                <h1 className="text-3xl font-bold text-gray-900">Community</h1>
                <p className="text-gray-600 mt-1">
                  Discover amazing builds, get help, and share your creations
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Share Your Build
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="mt-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={cn(
                      'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    {tab.label}
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'builds' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={(value) => setSortBy(value as any)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Difficulty:</label>
                  <Select
                    options={difficultyOptions}
                    value={difficultyFilter}
                    onChange={(value) => setDifficultyFilter(value as any)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Tag:</label>
                  <Select
                    options={tagOptions}
                    value={tagFilter}
                    onChange={setTagFilter}
                  />
                </div>

                <div className="ml-auto text-sm text-gray-600">
                  {filteredBuilds.length} build{filteredBuilds.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>

            {/* Builds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuilds.map((build) => (
                <BuildCard key={build.id} build={build} />
              ))}
            </div>

            {/* Load More */}
            {filteredBuilds.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">Load More Builds</Button>
              </div>
            )}

            {/* Empty State */}
            {filteredBuilds.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No builds found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or be the first to share a build!</p>
                <Button>Share Your Build</Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Forum Coming Soon</h3>
            <p className="text-gray-600">Community discussions and help forums are in development.</p>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Build Challenges Coming Soon</h3>
            <p className="text-gray-600">Monthly build challenges and competitions are in development.</p>
          </div>
        )}
      </div>
    </div>
  );
}