// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

// Route yang BUTUH authentication
const protectedRoutes = ["/dashboard", "/profile", "/settings", "/admin"];
const roles = [1, 2];

// Route khusus admin
const adminRoutes = ["/dashboard", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth_token")?.value;

  // 1. Cek apakah route butuh protection
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Kalau bukan protected route, langsung allow (public)
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // 2. Protected route tapi tidak ada token
  if (!authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Validate token
  try {
    const { payload } = await jwtVerify(authToken, secretKey);
    const roleID = payload.roleID as number;

    const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAdminRoute && !roles.includes(roleID)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/admin/:path*",
  ],
};
