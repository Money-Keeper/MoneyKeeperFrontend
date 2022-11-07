import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest, res: NextResponse) {
  const { token } = JSON.parse(req.cookies.get("mk_auth_token") || "{}")

  const isAuthUrl =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup")

  if (!token && !isAuthUrl) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (token && isAuthUrl) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
}
