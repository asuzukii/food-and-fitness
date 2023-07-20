import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "@/lib/actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign({
        ...token,
        iss: "grafbase",
        exp: Math.floor(Date.now() / 1000) + (3600) // how long you're logged in?
      }, secret);
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg"
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = await getUser(email) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          }
        };
        return newSession;
      } catch (e) {
        console.log("Error retrieving user data", e);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
      console.log("This runs");

        // check if user exists
        const userExists = await getUser(user?.email as string) as { user?: UserProfile };
      console.log("That runs");
        
        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  }
};

export const getCurrentUser = async () => {
  return await getServerSession(authOptions) as SessionInterface;
};