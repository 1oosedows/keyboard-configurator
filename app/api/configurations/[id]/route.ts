import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const configuration = await prisma.configuration.findUnique({
      where: { id },
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

    if (!configuration) {
      return NextResponse.json(
        { message: 'Configuration not found' },
        { status: 404 }
      );
    }

    // Check if configuration is public or user owns it
    const session = await getServerSession(authOptions);
    if (!configuration.public && configuration.authorId !== session?.user?.id) {
      return NextResponse.json(
        { message: 'Configuration is private' },
        { status: 403 }
      );
    }

    return NextResponse.json(configuration);
  } catch (error) {
    console.error('Error fetching configuration:', error);
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

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user owns this configuration
    const existingConfig = await prisma.configuration.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existingConfig) {
      return NextResponse.json(
        { message: 'Configuration not found' },
        { status: 404 }
      );
    }

    if (existingConfig.authorId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const {
      name,
      layoutId,
      keyMappings,
      layers,
      public: isPublic,
    } = await request.json();

    const updatedConfiguration = await prisma.configuration.update({
      where: { id },
      data: {
        name: name || undefined,
        layoutId: layoutId || undefined,
        keyMappings: keyMappings ? JSON.stringify(keyMappings) : undefined,
        layers: layers ? JSON.stringify(layers) : undefined,
        public: isPublic ?? undefined,
        updatedAt: new Date(),
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
      message: 'Configuration updated successfully',
      configuration: updatedConfiguration,
    });
  } catch (error) {
    console.error('Error updating configuration:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user owns this configuration
    const existingConfig = await prisma.configuration.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existingConfig) {
      return NextResponse.json(
        { message: 'Configuration not found' },
        { status: 404 }
      );
    }

    if (existingConfig.authorId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    await prisma.configuration.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Configuration deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting configuration:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}