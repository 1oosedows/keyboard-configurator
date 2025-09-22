import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const difficulty = searchParams.get('difficulty');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
    const featured = searchParams.get('featured') === 'true';
    const authorId = searchParams.get('author');

    const skip = (page - 1) * limit;

    const where: any = {
      published: true,
    };

    if (difficulty) {
      where.difficulty = parseInt(difficulty);
    }

    if (featured) {
      where.featured = true;
    }

    if (authorId) {
      where.authorId = authorId;
    }

    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          tag: {
            name: {
              in: tags,
            },
          },
        },
      };
    }

    const [builds, total] = await Promise.all([
      prisma.build.findMany({
        where,
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
                take: 3,
              },
            },
          },
          images: {
            orderBy: { order: 'asc' },
            take: 1,
          },
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.build.count({ where }),
    ]);

    return NextResponse.json({
      builds,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching builds:', error);
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
      title,
      description,
      layoutId,
      difficulty,
      estimatedCost,
      buildTime,
      configuration,
      keyMappings,
      components,
      tags,
      images,
    } = await request.json();

    // Validation
    if (!title || !description || !layoutId) {
      return NextResponse.json(
        { message: 'Title, description, and layout are required' },
        { status: 400 }
      );
    }

    // Create the build
    const build = await prisma.build.create({
      data: {
        title,
        description,
        authorId: session.user.id,
        layoutId,
        difficulty: difficulty || 1,
        estimatedCost: estimatedCost || 0,
        buildTime: buildTime || 0,
        configuration: JSON.stringify(configuration || {}),
        keyMappings: JSON.stringify(keyMappings || []),
        components: JSON.stringify(components || {}),
      },
    });

    // Add tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Find or create tag
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });

        // Link tag to build
        await prisma.buildTag.create({
          data: {
            buildId: build.id,
            tagId: tag.id,
          },
        });
      }
    }

    // Add images if provided
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await prisma.buildImage.create({
          data: {
            buildId: build.id,
            url: images[i].url,
            caption: images[i].caption,
            type: images[i].type || 'glamour',
            order: i,
          },
        });
      }
    }

    // Award "First Build" badge if this is user's first build
    const userBuildCount = await prisma.build.count({
      where: { authorId: session.user.id },
    });

    if (userBuildCount === 1) {
      try {
        const firstBuildBadge = await prisma.badge.findUnique({
          where: { name: 'First Build' }
        });
        
        if (firstBuildBadge) {
          await prisma.userBadge.create({
            data: {
              userId: session.user.id,
              badgeId: firstBuildBadge.id,
            }
          });
        }
      } catch (error) {
        console.error('Error awarding first build badge:', error);
      }
    }

    // Update user reputation
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        reputation: {
          increment: 50, // Points for sharing a build
        },
      },
    });

    return NextResponse.json({
      message: 'Build created successfully',
      build: {
        id: build.id,
        title: build.title,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating build:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}