import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

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
        id: true,
        name: true,
        username: true,
        email: true,
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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

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

    // Validation
    if (!name || !username) {
      return NextResponse.json(
        { message: 'Name and username are required' },
        { status: 400 }
      );
    }

    // Check if username is already taken by another user
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

    // Validate website URL if provided
    if (website && website.trim()) {
      try {
        new URL(website);
      } catch {
        return NextResponse.json(
          { message: 'Invalid website URL' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        username,
        bio: bio || null,
        location: location || null,
        website: website || null,
        discordHandle: discordHandle || null,
        redditHandle: redditHandle || null,
        instagramHandle: instagramHandle || null,
        youtubeHandle: youtubeHandle || null,
        theme,
        emailNotifications,
        pushNotifications,
        profileVisibility,
        lastActiveAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
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

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}