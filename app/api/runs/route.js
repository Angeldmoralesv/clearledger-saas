import { listRunsByCompany } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "No autenticado" }, { status: 401 });
  }

  const runs = listRunsByCompany(user.companyId);
  return Response.json({ runs });
}