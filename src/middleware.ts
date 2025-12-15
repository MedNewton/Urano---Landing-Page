// src/middleware.ts
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

// Routes you want to rewrite to their mobile equivalents
const mobileRewrittenPaths = ["/", "/team", "/about"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only rewrite specific paths (keep middleware cheap)
  if (!mobileRewrittenPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const ua = userAgent(req);
  const deviceType = ua.device.type ?? "desktop";
  const isMobile = deviceType === "mobile" || deviceType === "tablet";

  if (!isMobile) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();

  // "/" -> "/mobile"
  if (pathname === "/") {
    url.pathname = "/mobile";
  } else {
    // "/about" -> "/about/mobile"   (so your file: /about/mobile/page.tsx)
    url.pathname = `${pathname}/mobile`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Run on app routes; skip Next internals + static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
