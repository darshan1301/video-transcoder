import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@repo/db";

 
const nextAuth = NextAuth({
  providers: [Google],
  callbacks: {
    authorized: async ({ auth, request }) => {
      console.log("authorized--->", auth, request)
      const isLoggedIn = !!auth
      const isPublicPage = request?.nextUrl?.pathname === "/" || request?.nextUrl?.pathname === "/signin"
      return isPublicPage || isLoggedIn
    },
    async signIn({user}){
      console.log("USER--->", user)
      if(!user.email){
        return false;
      }
      console.log("Control 1 USER--->", user)
      
      const dbUser = await prisma.user.findFirst({
        where:{
          email:user.email
        }
      })
      console.log("DATABASE USER--->", dbUser)

      if(dbUser){
        return true;
      }

      await prisma.user.create({
        data:{
          email:user.email,
          name: user.name
        }
      })
      return true;
    },
    async jwt({ token }) {
      console.log("JWT--->", token)
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      console.log("SESSION--->", session, token)
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  }
})

export const handlers = nextAuth.handlers;
export const signIn = nextAuth.signIn;
export const signOut = nextAuth.signOut;
export const auth: any = nextAuth.auth;