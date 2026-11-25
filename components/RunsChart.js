// Barras apiladas conciliadas/discrepancias por lote. Cada barra lleva sus
// valores como texto visible (nunca dependemos solo del color para leerla),
// siguiendo la recomendación de accesibilidad para gráficos de parte-a-todo.
function formatTime(iso) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
}

export default function RunsChart({ runs }) {
  const recent = [...runs].slice(0, 6).reverse();
  const max = Math.max(...recent.map((r) => r.summary.total), 1);

  return (
    <div className="panel chart-panel">
      <div className="panel-head">
        <h2>Conciliadas vs. discrepancias por lote</h2>
        <div className="chart-legend">
          <span>
            <i className="legend-dot ok" /> Conciliadas
          </span>
          <span>
            <i className="legend-dot flag" /> Discrepancias
          </span>
        </div>
      </div>

      <div className="chart-body">
        {recent.map((run) => {
          const matchedPct = (run.summary.matched / max) * 100;
          const mismatchedPct = (run.summary.mismatched / max) * 100;
          return (
            <div className="chart-row" key={run.id}>
              <span className="chart-row-label mono">{formatTime(run.createdAt)}</span>
              <div className="chart-bar" role="img" aria-label={`Lote del ${formatTime(run.createdAt)}: ${run.summary.matched} conciliadas, ${run.summary.mismatched} discrepancias`}>
                <div className="chart-seg ok" style={{ width: `${matchedPct}%` }} />
                <div className="chart-seg flag" style={{ width: `${mismatchedPct}%` }} />
              </div>
              <span className="chart-row-value mono">
                {run.summary.matched}/{run.summary.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
