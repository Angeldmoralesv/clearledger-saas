import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { listRunsByCompany } from "@/lib/db";
import StatusTag from "@/components/StatusTag";
import RunsChart from "@/components/RunsChart";
import { Stack, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";

function formatDate(iso) {
  return new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

export default async function DashboardOverview() {
  const user = await getCurrentUser();
  const runs = listRunsByCompany(user.companyId);
  const lastRun = runs[0];

  const totalMatched = runs.reduce((acc, r) => acc + r.summary.matched, 0);
  const totalMismatched = runs.reduce((acc, r) => acc + r.summary.mismatched, 0);

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Hola, {user.name.split(" ")[0]}</h1>
          <p>Este es el estado de tus conciliaciones. Ejecuta un nuevo cruce cuando quieras.</p>
        </div>
        <Link href="/dashboard/reconciliations" className="btn btn-primary">
          Nueva conciliación
        </Link>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <span className="label"><Stack size={14} /> Lotes ejecutados</span>
          <div className="value">{runs.length}</div>
        </div>
        <div className="stat-card accent">
          <span className="label"><CheckCircle size={14} /> Partidas conciliadas</span>
          <div className="value">{totalMatched}</div>
        </div>
        <div className="stat-card warn">
          <span className="label"><WarningCircle size={14} /> Discrepancias detectadas</span>
          <div className="value">{totalMismatched}</div>
        </div>
      </div>

      {runs.length > 0 && <RunsChart runs={runs} />}

      <div className="panel">
        <div className="panel-head">
          <h2>Última conciliación</h2>
          {lastRun && <span className="mono">{formatDate(lastRun.createdAt)} · {lastRun.userName}</span>}
        </div>

        {!lastRun && (
          <div className="empty-state">
            <h3>Todavía no has ejecutado ninguna conciliación</h3>
            <p>Ve a "Conciliaciones" y corre tu primer cruce con el lote de ejemplo.</p>
          </div>
        )}

        {lastRun && (
          <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Factura</th><th>Cliente</th><th>Estado</th><th>Detalle</th></tr>
            </thead>
            <tbody>
              {lastRun.results.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.id}</td>
                  <td>{r.client}</td>
                  <td><StatusTag status={r.status} className="stamp-badge" /></td>
                  <td>{r.reason}</td>
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