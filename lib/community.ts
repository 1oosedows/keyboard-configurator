// Community features and marketplace functionality

import type {
  User,
  CommunityBuild,
  ForumPost,
  MarketplaceItem,
  BuildChallenge,
  Notification,
  Badge,
  MarketplaceReview,
} from '@/types/community';

// Mock data for development - in production this would come from API
export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    username: 'keeb_master',
    displayName: 'Keyboard Master',
    avatar: '/avatars/keeb_master.jpg',
    joinDate: new Date('2023-01-15'),
    reputation: 2847,
    badges: [
      {
        id: 'first-build',
        name: 'First Build',
        description: 'Completed your first keyboard build',
        icon: '🔧',
        rarity: 'common',
        unlockedAt: new Date('2023-02-01'),
      },
      {
        id: 'helpful-member',
        name: 'Helpful Member',
        description: 'Received 100+ helpful votes',
        icon: '🤝',
        rarity: 'uncommon',
        unlockedAt: new Date('2023-06-15'),
      },
    ],
    location: 'San Francisco, CA',
    bio: 'Mechanical keyboard enthusiast for 5+ years. Love helping newcomers!',
    socialLinks: {
      discord: 'keeb_master#1234',
      reddit: 'u/keeb_master',
      instagram: '@keeb_builds',
    },
    stats: {
      buildsShared: 12,
      helpfulVotes: 156,
      forumPosts: 89,
      marketplaceRating: 4.9,
      marketplaceSales: 23,
      buildDifficultiesCompleted: [1, 2, 3, 4],
    },
  },
];

export const FORUM_CATEGORIES = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'General keyboard talk and community chat',
    icon: '💬',
    color: '#3b82f6',
    postCount: 1247,
    moderators: [],
  },
  {
    id: 'build-help',
    name: 'Build Help',
    description: 'Get help with your keyboard builds',
    icon: '🔧',
    color: '#10b981',
    postCount: 892,
    moderators: [],
  },
  {
    id: 'show-and-tell',
    name: 'Show and Tell',
    description: 'Share your completed builds and photos',
    icon: '📸',
    color: '#f59e0b',
    postCount: 634,
    moderators: [],
  },
  {
    id: 'group-buys',
    name: 'Group Buys',
    description: 'Discuss ongoing and upcoming group buys',
    icon: '🛒',
    color: '#8b5cf6',
    postCount: 445,
    moderators: [],
  },
  {
    id: 'reviews',
    name: 'Reviews',
    description: 'Product reviews and comparisons',
    icon: '⭐',
    color: '#ef4444',
    postCount: 278,
    moderators: [],
  },
];

export const MARKETPLACE_CATEGORIES = [
  {
    id: 'switches',
    name: 'Switches',
    description: 'Mechanical switches of all types',
    icon: '🔘',
  },
  {
    id: 'keycaps',
    name: 'Keycaps',
    description: 'Keycap sets and artisans',
    icon: '⌨️',
  },
  {
    id: 'pcbs',
    name: 'PCBs',
    description: 'Printed circuit boards',
    icon: '🔌',
  },
  {
    id: 'cases',
    name: 'Cases',
    description: 'Keyboard cases and plates',
    icon: '📦',
  },
  {
    id: 'complete-builds',
    name: 'Complete Builds',
    description: 'Fully assembled keyboards',
    icon: '⌨️',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Tools, cables, and other accessories',
    icon: '🔧',
  },
];

// Badge system
export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'first-build',
    name: 'First Build',
    description: 'Completed your first keyboard build',
    icon: '🔧',
    rarity: 'common',
    unlockedAt: new Date(),
  },
  {
    id: 'helpful-member',
    name: 'Helpful Member',
    description: 'Received 100+ helpful votes',
    icon: '🤝',
    rarity: 'uncommon',
    unlockedAt: new Date(),
  },
  {
    id: 'master-builder',
    name: 'Master Builder',
    description: 'Completed builds of all difficulty levels',
    icon: '👑',
    rarity: 'rare',
    unlockedAt: new Date(),
  },
  {
    id: 'community-champion',
    name: 'Community Champion',
    description: 'Top contributor for 3 consecutive months',
    icon: '🏆',
    rarity: 'legendary',
    unlockedAt: new Date(),
  },
  {
    id: 'switch-collector',
    name: 'Switch Collector',
    description: 'Reviewed 50+ different switches',
    icon: '🔍',
    rarity: 'uncommon',
    unlockedAt: new Date(),
  },
  {
    id: 'marketplace-trusted',
    name: 'Trusted Seller',
    description: 'Maintained 4.8+ rating with 50+ sales',
    icon: '✅',
    rarity: 'rare',
    unlockedAt: new Date(),
  },
];

// Community functions
export function calculateUserReputation(user: User): number {
  const { stats } = user;
  let reputation = 0;

  // Base points for activities
  reputation += stats.buildsShared * 50;
  reputation += stats.helpfulVotes * 10;
  reputation += stats.forumPosts * 5;
  reputation += stats.marketplaceRating * 100;

  // Bonus for difficulty achievements
  const difficultyBonus = stats.buildDifficultiesCompleted.reduce((sum, level) => 
    sum + (level * 25), 0
  );
  reputation += difficultyBonus;

  // Badge bonuses
  const badgeBonus = user.badges.reduce((sum, badge) => {
    const multiplier = {
      common: 10,
      uncommon: 25,
      rare: 50,
      legendary: 100,
    };
    return sum + multiplier[badge.rarity];
  }, 0);
  reputation += badgeBonus;

  return Math.max(0, reputation);
}

export function checkBadgeEligibility(user: User): Badge[] {
  const eligibleBadges: Badge[] = [];
  const currentBadgeIds = user.badges.map(b => b.id);

  // First Build badge
  if (!currentBadgeIds.includes('first-build') && user.stats.buildsShared > 0) {
    eligibleBadges.push(AVAILABLE_BADGES.find(b => b.id === 'first-build')!);
  }

  // Helpful Member badge
  if (!currentBadgeIds.includes('helpful-member') && user.stats.helpfulVotes >= 100) {
    eligibleBadges.push(AVAILABLE_BADGES.find(b => b.id === 'helpful-member')!);
  }

  // Master Builder badge
  if (!currentBadgeIds.includes('master-builder') && 
      user.stats.buildDifficultiesCompleted.length >= 5) {
    eligibleBadges.push(AVAILABLE_BADGES.find(b => b.id === 'master-builder')!);
  }

  // Trusted Seller badge
  if (!currentBadgeIds.includes('marketplace-trusted') && 
      user.stats.marketplaceRating >= 4.8 && 
      user.stats.marketplaceSales >= 50) {
    eligibleBadges.push(AVAILABLE_BADGES.find(b => b.id === 'marketplace-trusted')!);
  }

  return eligibleBadges;
}

export function generateBuildFeed(
  user: User,
  following: string[] = [],
  filters: {
    difficulty?: number[];
    tags?: string[];
    featured?: boolean;
  } = {}
): CommunityBuild[] {
  // Mock implementation - in production would fetch from API
  return [];
}

export function searchMarketplace(
  query: string,
  filters: {
    category?: string;
    priceRange?: [number, number];
    condition?: string;
    location?: string;
    shipsTo?: string;
  } = {}
): MarketplaceItem[] {
  // Mock implementation - in production would search API
  return [];
}

export function calculateMarketplaceScore(item: MarketplaceItem): {
  score: number;
  factors: Record<string, number>;
} {
  const factors = {
    sellerRating: item.seller.stats.marketplaceRating * 20,
    sellerSales: Math.min(item.seller.stats.marketplaceSales, 100),
    itemViews: Math.min(item.views / 10, 50),
    itemWatchers: Math.min(item.watchers * 5, 25),
    verified: item.verified ? 50 : 0,
    recentActivity: item.questions.length > 0 ? 10 : 0,
  };

  const score = Object.values(factors).reduce((sum, value) => sum + value, 0);

  return { score: Math.min(score, 100), factors };
}

export function getRecommendedBuilds(
  user: User,
  preferences: {
    difficulty?: number;
    budget?: number;
    style?: string[];
    layout?: string;
  } = {}
): CommunityBuild[] {
  // Mock implementation - would use ML/recommendation engine
  return [];
}

export function createNotification(
  type: Notification['type'],
  user: User,
  data: any
): Notification {
  const templates = {
    build_liked: {
      title: 'Build Liked!',
      message: `${data.liker} liked your build "${data.buildTitle}"`,
      actionUrl: `/builds/${data.buildId}`,
    },
    comment_reply: {
      title: 'New Reply',
      message: `${data.replier} replied to your comment`,
      actionUrl: `/builds/${data.buildId}#comment-${data.commentId}`,
    },
    forum_reply: {
      title: 'Forum Reply',
      message: `${data.replier} replied to your post "${data.postTitle}"`,
      actionUrl: `/forum/${data.postId}`,
    },
    marketplace_question: {
      title: 'Marketplace Question',
      message: `${data.asker} asked about your item "${data.itemTitle}"`,
      actionUrl: `/marketplace/${data.itemId}`,
    },
    marketplace_sold: {
      title: 'Item Sold!',
      message: `Your item "${data.itemTitle}" has been sold`,
      actionUrl: `/marketplace/sales`,
    },
    challenge_started: {
      title: 'Challenge Started!',
      message: `New build challenge: "${data.challengeTitle}"`,
      actionUrl: `/challenges/${data.challengeId}`,
    },
    badge_earned: {
      title: 'Badge Earned!',
      message: `You earned the "${data.badgeName}" badge!`,
      actionUrl: `/profile/${user.id}`,
    },
    build_featured: {
      title: 'Build Featured!',
      message: `Your build "${data.buildTitle}" was featured!`,
      actionUrl: `/builds/${data.buildId}`,
    },
  };

  const template = templates[type];

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    title: template.title,
    message: template.message,
    user,
    read: false,
    actionUrl: template.actionUrl,
    createdAt: new Date(),
    data,
  };
}

export function moderateContent(content: string): {
  approved: boolean;
  flags: string[];
  suggestions: string[];
} {
  const flags: string[] = [];
  const suggestions: string[] = [];

  // Basic content moderation
  const spam_indicators = ['buy now', 'limited time', 'act fast', 'guaranteed'];
  const inappropriate_words = ['spam', 'scam', 'fake'];

  spam_indicators.forEach(indicator => {
    if (content.toLowerCase().includes(indicator)) {
      flags.push('potential_spam');
      suggestions.push('Remove promotional language');
    }
  });

  inappropriate_words.forEach(word => {
    if (content.toLowerCase().includes(word)) {
      flags.push('inappropriate_content');
      suggestions.push('Remove inappropriate language');
    }
  });

  // Check for excessive caps
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (capsRatio > 0.3) {
    flags.push('excessive_caps');
    suggestions.push('Reduce use of capital letters');
  }

  return {
    approved: flags.length === 0,
    flags,
    suggestions,
  };
}

export function calculateShippingCost(
  item: MarketplaceItem,
  destination: string
): {
  cost: number;
  estimatedDays: number;
  available: boolean;
} {
  const { shipping } = item;

  // Check if shipping is available to destination
  const available = shipping.shipsTo.includes(destination) || 
                   shipping.shipsTo.includes('Worldwide');

  if (!available) {
    return { cost: 0, estimatedDays: 0, available: false };
  }

  // Determine if domestic or international
  const isDomestic = destination === shipping.shipsFrom;
  const cost = isDomestic ? shipping.domestic : (shipping.international || shipping.domestic * 2);

  // Free shipping threshold
  const finalCost = shipping.freeShippingThreshold && 
                   item.price >= shipping.freeShippingThreshold ? 0 : cost;

  return {
    cost: finalCost,
    estimatedDays: shipping.estimatedDays + (isDomestic ? 0 : 5),
    available: true,
  };
}