import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "@/auth.config"

import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg";
import { fetchUserById } from "./data/user";


declare module "next-auth" {
    interface Session {
        user: {
            role: string;
            branch: number;
        } & DefaultSession["user"]
    }
}


const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async signIn({ user }) {
            const existingUser = await fetchUserById(user.id);

            if (!existingUser.emailVerified) {
                return false;
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            if (token.branch && session.user) {
                session.user.branch = Number(token.branch as string);
            }

            return session;
        },
        async jwt({ token }) {

            try {
                const user = await fetchUserById(token.sub);

                token.role = user.role;
                token.branch = user.branch;

            } catch (error) {
                console.error(error);
            }

            return token;
        },
    },
    adapter: PostgresAdapter(pool),
    session: { strategy: "jwt" },
    ...authConfig,
});