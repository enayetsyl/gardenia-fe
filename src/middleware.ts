import { NextRequest, NextResponse } from 'next/server';
const authRoutes = ['/login', '/register', '/forget-password'];
const protectedRoutes = ['/dashboard', '/my-profile'];

function decodeToken(token: string) {
  try {
    const base64Url = token.split('.')[1]; // Get the payload part of the token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const pathname = request.nextUrl.pathname;

  let user = null;
  if (token) {
    user = decodeToken(token);
    console.log('Decoded User:', user);
  }

  // If user is authenticated, redirect them away from auth routes
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect authenticated users to dashboard
  }

  // If user is not authenticated and trying to access a protected route, redirect them to login
  if (!user && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  // Allow access if no redirect conditions are met
  return NextResponse.next();

  // return NextResponse.redirect
}

export const config = {
  matcher: ['/dashboard', '/my-profile', '/register', '/login', '/forget-password'],
};
