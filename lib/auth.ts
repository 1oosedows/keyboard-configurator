import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          return null;
        }

        // For OAuth users, password might not exist
        if (!user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          username: user.username,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.username = user.username || undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.username = token.username as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "github" || account?.provider === "discord") {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });

          if (!existingUser) {
            // Generate unique username from email or name
            let username = user.email?.split('@')[0] || user.name?.toLowerCase().replace(/\s+/g, '');
            
            // Ensure username is unique
            let counter = 1;
            let finalUsername = username;
            while (await prisma.user.findUnique({ where: { username: finalUsername } })) {
              finalUsername = `${username}${counter}`;
              counter++;
            }

            // Create user with additional fields
            await prisma.user.update({
              where: { email: user.email! },
              data: {
                username: finalUsername,
                lastActiveAt: new Date(),
              }
            });
          } else {
            // Update last active time
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { lastActiveAt: new Date() }
            });
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        // Award welcome badge to new users
        try {
          const welcomeBadge = await prisma.badge.findUnique({
            where: { name: "Welcome" }
          });
          
          if (welcomeBadge) {
            await prisma.userBadge.create({
              data: {
                userId: user.id,
                badgeId: welcomeBadge.id,
              }
            });
          }
        } catch (error) {
          console.error("Error awarding welcome badge:", error);
        }
      }
    },
  },
};