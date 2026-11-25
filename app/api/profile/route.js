import { cookies } from "next/headers";
import { updateUser, findCompanyById } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function PATCH(request) {
  const session = await getCurrentUser();
  if (!session) {
    return Response.json({ message: "No autenticado" }, { status: 401 });
  }

  const { name } = await request.json();
  if (!name || !name.trim()) {
    return Response.json({ message: "El nombre no puede quedar vacío" }, { status: 400 });
  }

  const user = updateUser(session.id, { name: name.trim() });
  const company = findCompanyById(user.companyId);

  const token = createSessionToken({ ...user, companyName: company?.name || "" });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true, user: { name: user.name } });
}