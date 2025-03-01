import NextAuth from "next-auth";
import { prisma } from "./db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [],
    adapter: PrismaAdapter(prisma),
});
