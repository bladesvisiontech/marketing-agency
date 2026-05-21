import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip Next.js internals, static files, and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/inmotion-logo") ||
    pathname.startsWith("/favicon") ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the URL already has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Detect locale from cookie first, then Accept-Language header
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let locale = defaultLocale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const acceptLang = request.headers.get("accept-language") ?? "";
    const preferred = acceptLang.split(",")[0].trim().toLowerCase().slice(0, 2);
    if (isValidLocale(preferred)) locale = preferred;
  }

  // Redirect to locale-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|inmotion-logo.svg).*)"],
};
