import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="panel">
      <div className="empty-state">
        <h3>Ese lote no existe o no te pertenece</h3>
        <p>Revisa el historial para encontrar la conciliación que buscas.</p>
        <Link href="/dashboard/history" className="btn btn-primary btn-sm" style={{ marginTop: 18 }}>
          Ir al historial
        </Link>
      </div>
    </div>
  );
}
