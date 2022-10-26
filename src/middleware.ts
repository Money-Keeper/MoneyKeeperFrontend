import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  console.log(request.nextUrl)
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|static|favicon.ico).*)"],
}
