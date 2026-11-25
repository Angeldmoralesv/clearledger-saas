import { cookies } from "next/headers";
import { readSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return readSessionToken(token);
}