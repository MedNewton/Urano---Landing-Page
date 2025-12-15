import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

const mobileRewrittenPaths = ["/", "/team", "/about"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  if (pathname === "/") {
    url.pathname = "/mobile";
  } else {
    url.pathname = `${pathname}/mobile`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
