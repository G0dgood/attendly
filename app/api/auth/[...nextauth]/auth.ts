import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { AuthOptions } from "next-auth";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    token: string;
    role: string;
    fullName: string;
    officeId: string;
    phone: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
      role: string;
      fullName: string;
      officeId: string;
      phone: string;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          ); 

          const { user, token } = res.data.data;

          if (user && token) {
            return {
              id: user.id,
              email: user.email,
              token,
              role: user.role,
              phone: user.phone,
              fullName: `${user.name}`,
              officeId: user.officeId
            };
          }

          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
        token.role = user.role;
        token.fullName = user.fullName;
        token.officeId = user.officeId;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email ?? "";
      session.user.token = token.token as string;
      session.user.role = token.role as string;
      session.user.fullName = token.fullName as string;
      session.user.officeId = token.officeId as string;
      session.user.phone = token.phone as string;
      return session;
    },
  },
};

 

