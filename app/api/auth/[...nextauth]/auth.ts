// import { fetcher } from "@/utils/fetcher";
// import axios from "axios";
// import NextAuth, { User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const { email, password } = credentials || {}

//         try {
//                   const response = await axios.post(
//                     `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
//                      {
//                         email: email,
//                         password: password,
//                       }, );
        
//                   console.log('response-response',response)
//          if (response) {
//                     return {
//                       id: String(response.data.user.id),
//                       name: response.data.user.username,
//                       email: response.data.user.email,
//                       data: response.data.data, // attach entire response if needed
//                       randomKey: "Hey cool", // optional custom field
//                     } as User & {
//                       data: {
//                         token: string;
//                         user: {
//                           id: number;
//                           username: string;
//                           email: string;
//                         };
//                       };
//                       randomKey: string;
//                     };
//                   }
//                   return null;
//                 } catch (error) {
//                   console.error("Authorize error:", error);
//                   return null;
//                 }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/", // Optional custom login page
//     error:"/"
//   },
//   session: {
//     strategy: "jwt" as const, // Explicitly set the type to match SessionStrategy
//   },
// secret: `${process.env.NEXTAUTH_SECRET}`,
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email ?? ""; // Ensure email is a string
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       console.log('session-session-session',session)
//       if (token) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//       }
//       return session;
//     },
//   },
// };

 // app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
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
  }

  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
      role: string;
      fullName: string;
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

          console.log('res-res--res',res)

          const { user, token } = res.data.data;

          if (user && token) {
            return {
              id: user.id,
              email: user.email,
              token,
              role: user.role,
              fullName: `${user.firstName} ${user.lastName}`,
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email ?? "";
      session.user.token = token.token as string;
      session.user.role = token.role as string;
      session.user.fullName = token.fullName as string;
      return session;
    },
  },
};

 

