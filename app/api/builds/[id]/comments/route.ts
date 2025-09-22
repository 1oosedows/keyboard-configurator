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
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { buildId: id },
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
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.comment.count({
        where: { buildId: id },
      }),
    ]);

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
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

    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { message: 'Comment content is required' },
        { status: 400 }
      );
    }

    // Check if build exists
    const build = await prisma.build.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });

    if (!build) {
      return NextResponse.json(
        { message: 'Build not found' },
        { status: 404 }
      );
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: session.user.id,
        buildId: id,
      },
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
      },
    });

    // Award reputation to commenter
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        reputation: {
          increment: 5, // Points for commenting
        },
      },
    });

    // Award reputation to build author (but not if they're commenting on their own build)
    if (build.authorId !== session.user.id) {
      await prisma.user.update({
        where: { id: build.authorId },
        data: {
          reputation: {
            increment: 2, // Points for receiving a comment
          },
        },
      });
    }

    return NextResponse.json({
      message: 'Comment created successfully',
      comment,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}