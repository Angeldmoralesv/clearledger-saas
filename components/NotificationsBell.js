import Link from "next/link";
import { Bell, WarningCircle } from "@phosphor-icons/react/dist/ssr";

function formatCOP(value) {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

export default function NotificationsBell({ alerts, threshold }) {
  const count = alerts.length;

  return (
    <details className="notif-bell">
      <summary aria-label={`${count} alertas`}>
        <Bell size={18} />
        {count > 0 && <span className="notif-count">{count}</span>}
      </summary>

      <div className="notif-panel">
        <div className="notif-head">
          <span>Discrepancias que superan {formatCOP(threshold)}</span>
        </div>

        {count === 0 && <div className="notif-empty">Sin alertas por ahora.</div>}

        {alerts.slice(0, 6).map((a) => (
          <Link href="/dashboard/invoices" className="notif-row" key={`${a.runId}:${a.id}`}>
            <WarningCircle size={16} color="var(--rust-bright)" />
            <div className="notif-row-info">
              <span className="mono">{a.id}</span>
              <span>{a.client}</span>
            </div>
            <span className="notif-row-amt mono">{formatCOP(a.expected)}</span>
          </Link>
        ))}

        {count > 6 && (
          <Link href="/dashboard/invoices" className="notif-more">
            Ver las {count} en Facturas →
          </Link>
        )}
      </div>
    </details>
  );
}
