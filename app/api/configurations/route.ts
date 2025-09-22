import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // If userId is provided and it's not the current user, check if configurations are public
    const targetUserId = userId || session.user.id;

    const configurations = await prisma.configuration.findMany({
      where: {
        authorId: targetUserId,
        ...(targetUserId !== session.user.id ? { public: true } : {}),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(configurations);
  } catch (error) {
    console.error('Error fetching configurations:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const {
      name,
      layoutId,
      keyMappings,
      layers,
      public: isPublic,
    } = await request.json();

    if (!name || !layoutId) {
      return NextResponse.json(
        { message: 'Name and layout are required' },
        { status: 400 }
      );
    }

    const configuration = await prisma.configuration.create({
      data: {
        name,
        layoutId,
        keyMappings: JSON.stringify(keyMappings || []),
        layers: JSON.stringify(layers || []),
        public: isPublic || false,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Configuration created successfully',
      configuration,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating configuration:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}