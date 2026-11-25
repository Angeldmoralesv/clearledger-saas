import { getCurrentUser } from "@/lib/session";
import { listInvoicesByCompany } from "@/lib/db";
import ExportPdfButton from "@/components/ExportPdfButton";

function dayKey(iso) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
}

function buildTrend(invoices) {
  const byDay = new Map();
  for (const inv of invoices) {
    const key = dayKey(inv.runDate);
    if (!byDay.has(key)) byDay.set(key, { day: key, ok: 0, bad: 0 });
    const bucket = byDay.get(key);
    if (inv.status === "ok") bucket.ok += 1;
    else bucket.bad += 1;
  }
  return [...byDay.values()];
}

function buildReasons(invoices) {
  const counts = new Map();
  for (const inv of invoices) {
    if (inv.status !== "mismatch" && inv.status !== "resolved") continue;
    counts.set(inv.reason, (counts.get(inv.reason) || 0) + 1);
  }
  return [...counts.entries()].map(([reason, count]) => ({ reason, count })).sort((a, b) => b.count - a.count);
}

function buildAging(invoices) {
  const now = Date.now();
  const buckets = [
    { label: "0-7 días", min: 0, max: 7, count: 0 },
    { label: "8-14 días", min: 8, max: 14, count: 0 },
    { label: "15-30 días", min: 15, max: 30, count: 0 },
    { label: "31+ días", min: 31, max: Infinity, count: 0 },
  ];
  for (const inv of invoices) {
    if (inv.status !== "mismatch") continue;
    const days = Math.floor((now - new Date(inv.runDate).getTime()) / (1000 * 60 * 60 * 24));
    const bucket = buckets.find((b) => days >= b.min && days <= b.max);
    if (bucket) bucket.count += 1;
  }
  return buckets;
}

export default async function ReportsPage() {
  const user = await getCurrentUser();
  const invoices = listInvoicesByCompany(user.companyId);

  const trend = buildTrend(invoices);
  const reasons = buildReasons(invoices);
  const aging = buildAging(invoices);
  const maxTrend = Math.max(...trend.map((t) => t.ok + t.bad), 1);
  const maxReason = Math.max(...reasons.map((r) => r.count), 1);
  const maxAging = Math.max(...aging.map((a) => a.count), 1);

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Reportes</h1>
          <p>Tendencia de conciliación, causas más comunes y antigüedad de lo que falta resolver.</p>
        </div>
        <ExportPdfButton label="Exportar PDF" />
      </div>

      <div id="report-print-area">
        <div className="panel chart-panel">
          <div className="panel-head"><h2>Conciliadas vs. discrepancias por día</h2></div>
          <div className="chart-body">
            {trend.length === 0 && <div className="empty-state">Aún no hay datos para graficar.</div>}
            {trend.map((t) => (
              <div className="chart-row" key={t.day}>
                <span className="chart-row-label mono">{t.day}</span>
                <div className="chart-bar" role="img" aria-label={`${t.day}: ${t.ok} conciliadas, ${t.bad} discrepancias`}>
                  <div className="chart-seg ok" style={{ width: `${(t.ok / maxTrend) * 100}%` }} />
                  <div className="chart-seg flag" style={{ width: `${(t.bad / maxTrend) * 100}%` }} />
                </div>
                <span className="chart-row-value mono">{t.ok + t.bad}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div className="panel" style={{ flex: "1 1 320px" }}>
            <div className="panel-head"><h2>Causas más comunes de discrepancia</h2></div>
            <div className="chart-body">
              {reasons.length === 0 && <div className="empty-state">Sin discrepancias registradas.</div>}
              {reasons.map((r) => (
                <div className="chart-row" key={r.reason} style={{ gridTemplateColumns: "140px 1fr 36px" }}>
                  <span className="chart-row-label">{r.reason}</span>
                  <div className="chart-bar"><div className="chart-seg flag" style={{ width: `${(r.count / maxReason) * 100}%` }} /></div>
                  <span className="chart-row-value mono">{r.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ flex: "1 1 320px" }}>
            <div className="panel-head"><h2>Antigüedad sin resolver</h2></div>
            <div className="chart-body">
              {aging.map((a) => (
                <div className="chart-row" key={a.label} style={{ gridTemplateColumns: "90px 1fr 36px" }}>
                  <span className="chart-row-label">{a.label}</span>
                  <div className="chart-bar"><div className="chart-seg flag" style={{ width: `${(a.count / maxAging) * 100}%` }} /></div>
                  <span className="chart-row-value mono">{a.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}