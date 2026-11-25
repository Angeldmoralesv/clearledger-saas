import { addResolution } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "No autenticado" }, { status: 401 });
  }

  const { runId, invoiceId, note } = await request.json();
  if (!runId || !invoiceId || !note || !note.trim()) {
    return Response.json({ message: "Debes explicar cómo se resolvió la discrepancia" }, { status: 400 });
  }

  const resolution = addResolution(user.companyId, runId, invoiceId, note.trim(), user.name);
  if (!resolution) {
    return Response.json({ message: "Ese lote no existe o no es de tu empresa" }, { status: 404 });
  }

  return Response.json({ ok: true, resolution });
}