import { cookies } from "next/headers";
import crypto from "node:crypto";
import { findUserByEmail, createUser, findCompanyByName, createCompany } from "@/lib/db";
import { hashPassword, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request) {
  const { name, company, email, password } = await request.json();

  if (!name || !email || !password || !company) {
    return Response.json({ message: "Completa nombre, empresa, correo y contraseña" }, { status: 400 });
  }

  if (password.length < 6) {
    return Response.json({ message: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
  }

  if (findUserByEmail(email)) {
    return Response.json({ message: "Ya existe una cuenta con ese correo" }, { status: 409 });
  }

  let companyRecord = findCompanyByName(company);
  let role = "analyst";
  if (!companyRecord) {
    companyRecord = createCompany({
      id: crypto.randomUUID(),
      name: company.trim(),
      erpProvider: "Siigo",
      erpApiKey: "",
      alertThreshold: 500000,
      createdAt: new Date().toISOString(),
    });
    role = "admin";
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hashPassword(password),
    companyId: companyRecord.id,
    role,
    createdAt: new Date().toISOString(),
  };
  createUser(user);

  const token = createSessionToken({ ...user, companyName: companyRecord.name });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true });
}