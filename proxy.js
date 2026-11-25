import { NextResponse } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/auth";

// Protege /dashboard a nivel de servidor: sin sesión válida, redirige a /login.
// Next.js 16 renombró "middleware" a "proxy"; corre en runtime Node.js por
// defecto, por eso puede usar node:crypto en lib/auth.js directamente.
export function proxy(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = readSessionToken(token);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};