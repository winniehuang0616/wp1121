import NextAuth from "next-auth";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const username = token.name || session?.user?.username;  
      if (!username) return session;
      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
        })
        .from(usersTable)
        .where(eq(usersTable.username, username))
        .execute();

      return {
        ...session,
        user: {
          id: user.id,
          username: user.username,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
});
