import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Check auth for protected routes
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedRoutes = ["/dashboard", "/user", "/readings"]
  const adminRoutes = ["/admin"]

  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  const isAdminRoute =
    adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) &&
    !request.nextUrl.pathname.startsWith("/admin/login")

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // Add CSP headers for specific pages
  if (
    request.nextUrl.pathname.includes("/blog/") ||
    request.nextUrl.pathname.includes("/guidebook/") ||
    request.nextUrl.pathname.includes("/about")
  ) {
    response.headers.set(
      "Content-Security-Policy",
      "img-src 'self' blob: data: https://blob.vercel-storage.com https://blob.v0.dev; frame-src 'self' https://www.youtube.com https://youtube.com https://tally.so https://formsubmit.co; frame-ancestors 'self';",
    )
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
