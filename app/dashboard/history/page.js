import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { getCurrentUser } from "@/lib/session";
import { listRunsByCompany } from "@/lib/db";

function formatDate(iso) {
  return new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

export default async function HistoryPage() {
  const user = await getCurrentUser();
  const runs = listRunsByCompany(user.companyId);

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Historial</h1>
          <p>Cada conciliación que tu equipo ejecuta queda registrada. Haz clic en un lote para ver su detalle.</p>
        </div>
      </div>

      <div className="panel">
        {runs.length === 0 && (
          <div className="empty-state">
            <h3>Sin conciliaciones todavía</h3>
            <p>Cuando ejecutes un cruce desde "Conciliaciones", aparecerá aquí.</p>
          </div>
        )}

        {runs.length > 0 && (
          <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Lote</th><th>Fecha</th><th>Ejecutó</th><th>Origen</th><th>Total</th><th>Conciliadas</th><th>Discrepancias</th><th></th></tr>
            </thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.id} className="row-link">
                  <td className="mono"><Link href={`/dashboard/history/${r.id}`} className="row-link-anchor">{r.id.slice(0, 8)}</Link></td>
                  <td>{formatDate(r.createdAt)}</td>
                  <td>{r.userName || "—"}</td>
                  <td className="mono">{r.source === "custom" ? "propio" : "ejemplo"}</td>
                  <td>{r.summary.total}</td>
                  <td>{r.summary.matched}</td>
                  <td>{r.summary.mismatched}</td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/dashboard/history/${r.id}`} className="row-link-anchor" aria-label="Ver detalle"><CaretRight size={14} /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </>
  );
}