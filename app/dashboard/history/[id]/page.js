import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getCurrentUser } from "@/lib/session";
import { getRun } from "@/lib/db";
import StatusTag from "@/components/StatusTag";
import ExportCsvButton from "@/components/ExportCsvButton";
import ExportPdfButton from "@/components/ExportPdfButton";

function formatCOP(value) {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" });
}

export default async function RunDetailPage({ params }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const run = getRun(user.companyId, id);

  if (!run) notFound();

  return (
    <>
      <div className="dash-head">
        <div>
          <Link href="/dashboard/history" className="back-link"><ArrowLeft size={14} /> Volver al historial</Link>
          <h1 style={{ marginTop: 10 }}>Lote #{run.id.slice(0, 8)}</h1>
          <p>{formatDate(run.createdAt)} · {run.source === "custom" ? "datos propios" : "lote de ejemplo"} · Ejecutó {run.userName || "—"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <ExportPdfButton className="btn-ghost" />
          <ExportCsvButton results={run.results} filename={`conciliacion-${run.id.slice(0, 8)}.csv`} className="btn-primary" />
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card"><span className="label">Total</span><div className="value">{run.summary.total}</div></div>
        <div className="stat-card accent"><span className="label">Conciliadas</span><div className="value">{run.summary.matched}</div></div>
        <div className="stat-card warn"><span className="label">Discrepancias</span><div className="value">{run.summary.mismatched}</div></div>
      </div>

      <div className="panel">
        <div className="panel-head"><h2>Detalle por factura</h2></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>Factura</th><th>Cliente</th><th>Esperado</th><th>Recibido</th><th>Estado</th><th>Detalle</th></tr></thead>
            <tbody>
              {run.results.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.id}</td>
                  <td>{r.client}</td>
                  <td className="amt">{formatCOP(r.expected)}</td>
                  <td className="amt">{formatCOP(r.received)}</td>
                  <td><StatusTag status={r.status} className="stamp-badge" /></td>
                  <td>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}