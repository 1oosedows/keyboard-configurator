import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    // Check if user is authenticated and accessing their own settings
    if (!session?.user?.id || session.user.id !== id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        username: true,
        bio: true,
        location: true,
        website: true,
        discordHandle: true,
        redditHandle: true,
        instagramHandle: true,
        youtubeHandle: true,
        theme: true,
        emailNotifications: true,
        pushNotifications: true,
        profileVisibility: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    // Check if user is authenticated and updating their own settings
    if (!session?.user?.id || session.user.id !== id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const {
      name,
      username,
      bio,
      location,
      website,
      discordHandle,
      redditHandle,
      instagramHandle,
      youtubeHandle,
      theme,
      emailNotifications,
      pushNotifications,
      profileVisibility,
    } = data;

    // Validate username uniqueness if it's being changed
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

    // Update user settings
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name || undefined,
        username: username || undefined,
        bio: bio || undefined,
        location: location || undefined,
        website: website || undefined,
        discordHandle: discordHandle || undefined,
        redditHandle: redditHandle || undefined,
        instagramHandle: instagramHandle || undefined,
        youtubeHandle: youtubeHandle || undefined,
        theme: theme || 'system',
        emailNotifications: emailNotifications ?? true,
        pushNotifications: pushNotifications ?? true,
        profileVisibility: profileVisibility || 'public',
        lastActiveAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        location: true,
        website: true,
      },
    });

    return NextResponse.json({
      message: 'Settings updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}