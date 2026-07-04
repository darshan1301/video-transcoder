import { auth } from "@/auth"
 
export const proxy = auth((req: any) => {
  const { nextUrl } = req
  const isPublicPage = nextUrl.pathname === "/" || nextUrl.pathname === "/signin"
  const isAssetOrApi = nextUrl.pathname.startsWith("/api") || 
                       nextUrl.pathname.startsWith("/_next") || 
                      nextUrl.pathname.includes(".")
                      
  if (!req.auth && !isPublicPage && !isAssetOrApi) {
    const newUrl = new URL("/signin", nextUrl.origin)
    return Response.redirect(newUrl)
  }
})