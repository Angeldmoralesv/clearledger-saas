import { updateCompany } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(request) {
  const session = await getCurrentUser();
  if (!session) {
    return Response.json({ message: "No autenticado" }, { status: 401 });
  }
  if (session.role !== "admin") {
    return Response.json({ message: "Solo un admin de la empresa puede cambiar esto" }, { status: 403 });
  }

  const { erpProvider, erpApiKey, alertThreshold } = await request.json();
  const patch = {};
  if (erpProvider !== undefined) patch.erpProvider = (erpProvider || "").trim();
  if (erpApiKey !== undefined) patch.erpApiKey = (erpApiKey || "").trim();
  if (alertThreshold !== undefined) patch.alertThreshold = Number(alertThreshold) || 0;

  const company = updateCompany(session.companyId, patch);
  if (!company) {
    return Response.json({ message: "No se encontró tu empresa" }, { status: 404 });
  }

  return Response.json({ ok: true, connected: Boolean(company.erpApiKey) });
}