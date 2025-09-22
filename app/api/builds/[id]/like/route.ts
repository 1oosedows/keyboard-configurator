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

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
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

    // Check if user already liked this build
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_buildId: {
          userId: session.user.id,
          buildId: id,
        },
      },
    });

    if (existingLike) {
      // Unlike the build
      await prisma.like.delete({
        where: {
          userId_buildId: {
            userId: session.user.id,
            buildId: id,
          },
        },
      });

      return NextResponse.json({
        message: 'Build unliked successfully',
        liked: false,
      });
    } else {
      // Like the build
      await prisma.like.create({
        data: {
          userId: session.user.id,
          buildId: id,
        },
      });

      // Award reputation to build author (but not if they're liking their own build)
      if (build.authorId !== session.user.id) {
        await prisma.user.update({
          where: { id: build.authorId },
          data: {
            reputation: {
              increment: 10, // Points for receiving a like
            },
          },
        });
      }

      return NextResponse.json({
        message: 'Build liked successfully',
        liked: true,
      });
    }
  } catch (error) {
    console.error('Error toggling build like:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}