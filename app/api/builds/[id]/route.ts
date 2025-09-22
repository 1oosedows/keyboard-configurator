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

    const build = await prisma.build.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            badges: {
              include: {
                badge: true,
              },
              take: 5,
            },
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
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
          orderBy: { createdAt: 'desc' },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!build) {
      return NextResponse.json(
        { message: 'Build not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.build.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(build);
  } catch (error) {
    console.error('Error fetching build:', error);
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

    // Check if user owns this build
    const existingBuild = await prisma.build.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existingBuild) {
      return NextResponse.json(
        { message: 'Build not found' },
        { status: 404 }
      );
    }

    if (existingBuild.authorId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      title,
      description,
      difficulty,
      estimatedCost,
      buildTime,
      configuration,
      keyMappings,
      components,
      tags,
      published,
    } = data;

    // Update the build
    const updatedBuild = await prisma.build.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        difficulty: difficulty || undefined,
        estimatedCost: estimatedCost || undefined,
        buildTime: buildTime || undefined,
        configuration: configuration ? JSON.stringify(configuration) : undefined,
        keyMappings: keyMappings ? JSON.stringify(keyMappings) : undefined,
        components: components ? JSON.stringify(components) : undefined,
        published: published ?? undefined,
        updatedAt: new Date(),
      },
    });

    // Update tags if provided
    if (tags) {
      // Remove existing tags
      await prisma.buildTag.deleteMany({
        where: { buildId: id },
      });

      // Add new tags
      for (const tagName of tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });

        await prisma.buildTag.create({
          data: {
            buildId: id,
            tagId: tag.id,
          },
        });
      }
    }

    return NextResponse.json({
      message: 'Build updated successfully',
      build: updatedBuild,
    });
  } catch (error) {
    console.error('Error updating build:', error);
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

    // Check if user owns this build
    const existingBuild = await prisma.build.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existingBuild) {
      return NextResponse.json(
        { message: 'Build not found' },
        { status: 404 }
      );
    }

    if (existingBuild.authorId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Delete the build (cascade will handle related records)
    await prisma.build.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Build deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting build:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}