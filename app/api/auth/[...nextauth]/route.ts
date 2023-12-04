import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prismaClient";
import { AuthOpts } from "@/app/shared/auth/AuthOptions";

const handler = NextAuth(AuthOpts);

export { handler as GET, handler as POST };
