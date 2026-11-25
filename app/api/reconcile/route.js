import crypto from "node:crypto";
import { reconcile } from "@/lib/reconcile";
import { sampleInvoices, samplePayments } from "@/lib/sampleData";
import { addRun } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

async function readBody(request) {
  const text = await request.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "No autenticado" }, { status: 401 });
  }

  const body = await readBody(request);
  const hasCustomData =
    Array.isArray(body?.invoices) && Array.isArray(body?.payments) && body.invoices.length > 0;

  const invoices = hasCustomData ? body.invoices : sampleInvoices;
  const payments = hasCustomData ? body.payments : samplePayments;

  const { results, summary } = reconcile(invoices, payments);

  const run = {
    id: crypto.randomUUID(),
    companyId: user.companyId,
    userId: user.id,
    userName: user.name,
    createdAt: new Date().toISOString(),
    source: hasCustomData ? "custom" : "sample",
    summary,
    results,
  };
  addRun(run);

  return Response.json(run);
}