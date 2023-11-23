import { NextRequest, NextResponse } from "next/server";
import { RefreshToken } from "./lib/refreshToken";
import { getCookie } from "cookies-next";
import { decodeJwt } from "jose";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = getCookie("accessToken", { req: request });
  const refreshToken = getCookie("refreshToken", { req: request });

  // Login URL
  const baseURL = request.nextUrl.origin;
  const loginURL = `${baseURL}/auth/login?next=${pathname}`;

  // If no access token and refresh token, delete cookies and  redirect to login page
  if (!accessToken && !refreshToken) {
    console.log("No access token and refresh token");
    const response = NextResponse.redirect(loginURL);

    response.cookies.delete("sessionToken");
    return response;
  }

  // If no access token but refresh token, get new access token
  if (!accessToken && refreshToken) {
    console.log("No access token but refresh token");

    const data = await RefreshToken(refreshToken as string);

    if (data && data.accessToken) {
      const response = NextResponse.redirect(pathname);

      response.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        path: "/",
      });

      response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        path: "/",
      });

      return response;
    } else {
      console.log("No data");

      const response = NextResponse.redirect(loginURL);
      response.cookies.delete("sessionToken");
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  // If access token and refresh token, check if access token is valid
  if (accessToken && refreshToken) {
    console.log("Access token and refresh token");

    const decodedAccessToken = decodeJwt(accessToken as string);

    if (!decodedAccessToken) {
      const response = NextResponse.redirect(loginURL);
      response.cookies.delete("sessionToken");
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }

    // Check if access token is expired
    const accessTokenExp = decodedAccessToken.exp;
    const now = Math.floor(Date.now() / 1000);

    const isAccessTokenExpired = accessTokenExp! < now;

    // If access token is expired, get new access token
    if (!isAccessTokenExpired) {
      console.log("Access token is not expired");

      const response = NextResponse.next();
      return response;
    }

    console.log("Access token is expired");

    const data = await RefreshToken(refreshToken as string);

    if (data && data.accessToken) {
      try {
        const response = NextResponse.next();

        response.cookies.set("accessToken", data.accessToken, {
          httpOnly: true,
          path: "/",
        });

        response.cookies.set("refreshToken", data.refreshToken, {
          httpOnly: true,
          path: "/",
        });

        return response;
      } catch (error: any) {
        console.log("error", error);
      }
    } else {
      console.log("No data");

      const response = NextResponse.redirect(loginURL);
      response.cookies.delete("sessionToken");
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
