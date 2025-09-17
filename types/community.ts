// Community and marketplace types

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  joinDate: Date;
  reputation: number;
  badges: Badge[];
  location?: string;
  bio?: string;
  socialLinks?: {
    discord?: string;
    reddit?: string;
    instagram?: string;
    youtube?: string;
  };
  stats: UserStats;
}

export interface UserStats {
  buildsShared: number;
  helpfulVotes: number;
  forumPosts: number;
  marketplaceRating: number;
  marketplaceSales: number;
  buildDifficultiesCompleted: number[]; // Array of difficulty levels (1-5)
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  unlockedAt: Date;
}

export interface CommunityBuild {
  id: string;
  title: string;
  description: string;
  author: User;
  configuration: import('./keyboard').KeyboardConfiguration;
  images: BuildImage[];
  tags: string[];
  difficulty: BuildDifficulty;
  estimatedCost: number;
  buildTime: number; // in hours
  likes: number;
  views: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  verified: boolean; // verified by moderators
  buildGuide?: BuildGuide;
}

export interface BuildImage {
  id: string;
  url: string;
  caption?: string;
  type: 'glamour' | 'assembly' | 'detail' | 'typing';
  order: number;
}

export interface BuildDifficulty {
  level: 1 | 2 | 3 | 4 | 5;
  name: 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  requirements: string[];
  estimatedTime: number; // in hours
  toolsNeeded: Tool[];
  skillsRequired: Skill[];
}

export interface Tool {
  name: string;
  required: boolean;
  description: string;
  estimatedCost?: number;
  alternatives?: string[];
}

export interface Skill {
  name: string;
  level: 'basic' | 'intermediate' | 'advanced';
  description: string;
}

export interface BuildGuide {
  id: string;
  steps: BuildStep[];
  totalTime: number;
  difficulty: BuildDifficulty;
  materials: Material[];
  tips: string[];
  commonMistakes: CommonMistake[];
}

export interface BuildStep {
  id: string;
  title: string;
  description: string;
  images: string[];
  videoUrl?: string;
  estimatedTime: number; // in minutes
  tools: string[];
  tips: string[];
  warnings: string[];
  order: number;
}

export interface Material {
  name: string;
  quantity: number;
  unit: string;
  optional: boolean;
  alternatives?: string[];
  estimatedCost?: number;
}

export interface CommonMistake {
  title: string;
  description: string;
  prevention: string;
  fix: string;
  severity: 'minor' | 'moderate' | 'major';
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: Date;
  edited: boolean;
  helpful: boolean; // marked as helpful by build author
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: User;
  category: ForumCategory;
  tags: string[];
  pinned: boolean;
  locked: boolean;
  views: number;
  replies: ForumReply[];
  createdAt: Date;
  updatedAt: Date;
  solved: boolean; // for help posts
  bestAnswer?: string; // reply ID
}

export interface ForumReply {
  id: string;
  content: string;
  author: User;
  likes: number;
  createdAt: Date;
  edited: boolean;
  isBestAnswer: boolean;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
  moderators: User[];
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  seller: User;
  category: MarketplaceCategory;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  price: number;
  currency: string;
  images: string[];
  specifications: Record<string, string>;
  shipping: ShippingInfo;
  status: 'active' | 'sold' | 'reserved' | 'expired';
  views: number;
  watchers: number;
  questions: MarketplaceQuestion[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  verified: boolean;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  parentCategory?: string;
}

export interface ShippingInfo {
  domestic: number;
  international?: number;
  freeShippingThreshold?: number;
  shipsFrom: string;
  shipsTo: string[];
  estimatedDays: number;
}

export interface MarketplaceQuestion {
  id: string;
  question: string;
  answer?: string;
  asker: User;
  createdAt: Date;
  answeredAt?: Date;
}

export interface MarketplaceReview {
  id: string;
  reviewer: User;
  seller: User;
  item: MarketplaceItem;
  rating: number; // 1-5
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
  createdAt: Date;
  helpful: number; // helpful votes
}

export interface BuildChallenge {
  id: string;
  title: string;
  description: string;
  rules: string[];
  startDate: Date;
  endDate: Date;
  prizes: Prize[];
  participants: ChallengeParticipant[];
  judges: User[];
  status: 'upcoming' | 'active' | 'judging' | 'completed';
  categories: string[];
}

export interface Prize {
  place: number;
  description: string;
  value?: number;
  sponsor?: string;
}

export interface ChallengeParticipant {
  user: User;
  build: CommunityBuild;
  submittedAt: Date;
  votes: number;
  placement?: number;
}

export type NotificationType = 
  | 'build_liked' 
  | 'comment_reply' 
  | 'forum_reply' 
  | 'marketplace_question' 
  | 'marketplace_sold'
  | 'challenge_started'
  | 'badge_earned'
  | 'build_featured';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  user: User;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  data?: Record<string, any>; // Additional context data
}