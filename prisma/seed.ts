import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial badges
  const badges = [
    {
      name: 'Welcome',
      description: 'Welcome to the community!',
      icon: '👋',
      rarity: 'common',
      category: 'achievement',
    },
    {
      name: 'First Build',
      description: 'Shared your first keyboard build',
      icon: '🔧',
      rarity: 'common',
      category: 'achievement',
    },
    {
      name: 'Helpful Member',
      description: 'Received 50+ helpful votes',
      icon: '🤝',
      rarity: 'uncommon',
      category: 'contribution',
    },
    {
      name: 'Switch Expert',
      description: 'Reviewed 25+ different switches',
      icon: '🔍',
      rarity: 'uncommon',
      category: 'contribution',
    },
    {
      name: 'Master Builder',
      description: 'Completed builds of all difficulty levels',
      icon: '👑',
      rarity: 'rare',
      category: 'achievement',
    },
    {
      name: 'Community Champion',
      description: 'Top contributor for 3 consecutive months',
      icon: '🏆',
      rarity: 'legendary',
      category: 'special',
    },
    {
      name: 'Trusted Seller',
      description: 'Maintained 4.8+ rating with 50+ sales',
      icon: '✅',
      rarity: 'rare',
      category: 'achievement',
    },
    {
      name: 'Early Adopter',
      description: 'One of the first 100 users',
      icon: '🚀',
      rarity: 'legendary',
      category: 'special',
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  // Create initial tags
  const tags = [
    { name: '60%', color: '#3b82f6' },
    { name: '65%', color: '#10b981' },
    { name: '75%', color: '#f59e0b' },
    { name: 'TKL', color: '#ef4444' },
    { name: 'Full Size', color: '#8b5cf6' },
    { name: 'Linear', color: '#06b6d4' },
    { name: 'Tactile', color: '#84cc16' },
    { name: 'Clicky', color: '#f97316' },
    { name: 'Gaming', color: '#ec4899' },
    { name: 'Office', color: '#6366f1' },
    { name: 'Budget', color: '#22c55e' },
    { name: 'Premium', color: '#a855f7' },
    { name: 'RGB', color: '#f43f5e' },
    { name: 'Wireless', color: '#14b8a6' },
    { name: 'Hot-swap', color: '#eab308' },
    { name: 'Soldered', color: '#64748b' },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });