import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";

// Define types for the expected backend response
interface BackendUser {
  id: number;
  username: string;
  email: string;
  // Add optional fields like `role` if needed
  [key: string]: unknown;
}

interface BackendLoginResponse {
  jwt: string;
  user: BackendUser;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const response = await fetcher(
            `${process.env.PUBLIC_URL}/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (response?.user) {
            return {
              id: String(response.user.id),
              name: response.user.username,
              email: response.user.email,
              data: response, // attach entire response if needed
              randomKey: "Hey cool", // optional custom field
            } as User & {
              data: BackendLoginResponse;
              randomKey: string;
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          data: token.data,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: async ({ token, user, account, trigger, session }) => {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user && account?.provider === "credentials") {
        const u = user as User & {
          data: BackendLoginResponse;
          randomKey?: string;
        };

        return {
          ...token,
          id: u.id,
          data: u.data,
          randomKey: u.randomKey,
        };
      }

      return token;
    },
  },
};
