import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt-ts-edge";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db/prisma";
import { ROUTES } from "./lib/constants/routes";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user) return null;

                const passwordsMatch = await compare(
                    credentials.password as string,
                    user.password as string,
                );

                if (!passwordsMatch) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: ROUTES.SIGN_IN(),
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async session({ trigger, session, token }) {
            if (token.sub) {
                session.user.id = token.sub;
            }

            if (trigger === "update") {
                session.user.name = token.name;
            }

            return session;
        },
    },
});
