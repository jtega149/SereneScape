// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const pathname = req.nextUrl.pathname;

  const publicPaths = ['/signup', '/login', '/']; // paths that don’t require auth

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/signup', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'], // only protect /app routes
};
