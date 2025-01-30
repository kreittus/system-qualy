import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Middleware function to protect specific routes by checking user authentication.
 * 
 * Why Doesn't the Middleware Replace the Interceptor?
 * Middleware:
 *  - Acts before the page loads.
 *  - Does not intercept the application's HTTP requests to APIs.
 * Interceptor:
 * - Acts during the application's execution in the browser.
 * - Ensures the token is included with HTTP requests to the backend.
 * 
 * @param {NextRequest} request - The incoming request object from Next.js
 * @returns {NextResponse} - Proceeds with the request or redirects to the login page if unauthorized
 */
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken');
  const protectedRoutes = ['/system'];

  // Check if the requested route starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    const url = new URL('/auth/login', request.url);

    // Add a query parameter to indicate the redirection reason
    url.searchParams.set('unauthorized', 'true');

    return NextResponse.redirect(url);
  }

  // Continue the request if authenticated or route is public
  const response = NextResponse.next();

  // If token exists, attach it to the Authorization header
  if (token) {
    response.headers.set('Authorization', `${token.value}`);
  }

  return response;
}

/**
 * Configuration object for the middleware to specify which routes it should apply to.
 */
export const config = {
  // Apply middleware to all routes under '/system' and its subpaths
  matcher: ['/system/:path*'],
};
