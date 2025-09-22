import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    // Check if user is authenticated and setting up their own profile
    if (!session?.user?.id || session.user.id !== id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { username, bio, location, interests } = await request.json();

    // Validate username uniqueness
    if (username) {
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
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: username || undefined,
        bio: bio || undefined,
        location: location || undefined,
        lastActiveAt: new Date(),
      },
    });

    // Award "Profile Complete" badge if user filled out bio and location
    if (bio && location) {
      try {
        const profileBadge = await prisma.badge.findUnique({
          where: { name: 'Profile Complete' }
        });
        
        if (profileBadge) {
          await prisma.userBadge.upsert({
            where: {
              userId_badgeId: {
                userId: id,
                badgeId: profileBadge.id,
              }
            },
            update: {},
            create: {
              userId: id,
              badgeId: profileBadge.id,
            }
          });
        }
      } catch (error) {
        console.error('Error awarding profile badge:', error);
      }
    }

    // Store interests as user preferences (could be expanded later)
    // For now, we'll just log them
    console.log('User interests:', interests);

    return NextResponse.json({
      message: 'Profile setup completed successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        bio: updatedUser.bio,
        location: updatedUser.location,
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