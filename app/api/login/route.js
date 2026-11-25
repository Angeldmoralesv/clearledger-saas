import { cookies } from "next/headers";
import { findUserByEmail, findCompanyById } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();

  const user = email ? findUserByEmail(email) : null;
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return Response.json({ message: "Correo o contraseña incorrectos" }, { status: 401 });
  }

  const company = findCompanyById(user.companyId);
  const token = createSessionToken({ ...user, companyName: company?.name || "" });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true });
}