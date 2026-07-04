import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
const nextAuth = NextAuth({
  providers: [Google],
  callbacks: {
    authorized: async ({ auth, request }) => {
      console.log("auth.ts", auth, request)
      const isLoggedIn = !!auth
      const isPublicPage = request?.nextUrl?.pathname === "/" || request?.nextUrl?.pathname === "/signin"
      return isPublicPage || isLoggedIn
    },
  },
})

export const handlers = nextAuth.handlers;
export const signIn = nextAuth.signIn;
export const signOut = nextAuth.signOut;
export const auth: any = nextAuth.auth;