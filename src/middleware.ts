import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/signup'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('accessToken')?.value;
  console.log("Access Token In Middleware ..",token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // try {
  //   console.log("JWT SECRET is: ",process.env.JWT_SECRET!);
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  //   console.log("Decoded TOken: ",decoded);
  // } catch (err) {
  //   console.error('Invalid JWT:', err);
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
