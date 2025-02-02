import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

export const authOptions = {
  debug: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
};

export const handler = NextAuth(authOptions);
