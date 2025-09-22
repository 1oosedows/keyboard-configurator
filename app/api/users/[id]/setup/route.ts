import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

    // Check if user is authenticated and setting up their own profile
    if (!session?.user?.id || session.user.id !== id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { username, bio, location, interests } = await request.json();

    // Validation
    if (!username || !username.trim()) {
      return NextResponse.json(
        { message: 'Username is required' },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
        NOT: { id },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username is already taken' },
        { status: 400 }
      );
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        bio: bio || null,
        location: location || null,
        lastActiveAt: new Date(),
      },
    });

    // Create tags for interests if they don't exist and associate with user
    if (interests && interests.length > 0) {
      for (const interest of interests) {
        // Create tag if it doesn't exist
        await prisma.tag.upsert({
          where: { name: interest },
          update: {},
          create: {
            name: interest,
            color: '#3b82f6', // Default blue color
          },
        });
      }
    }

    // Award "First Setup" badge if it exists
    try {
      const setupBadge = await prisma.badge.findUnique({
        where: { name: 'Welcome' }
      });
      
      if (setupBadge) {
        await prisma.userBadge.upsert({
          where: {
            userId_badgeId: {
              userId: id,
              badgeId: setupBadge.id,
            },
          },
          update: {},
          create: {
            userId: id,
            badgeId: setupBadge.id,
          },
        });
      }
    } catch (error) {
      console.error('Error awarding setup badge:', error);
    }

    return NextResponse.json({
      message: 'Profile setup completed successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        name: updatedUser.name,
      },
    });
  } catch (error) {
    console.error('Error setting up profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}