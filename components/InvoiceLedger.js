"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";
import StatusTag from "@/components/StatusTag";

function formatCOP(value) {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
}

const FILTERS = [
  { key: "all", label: "Todas" },
  { key: "ok", label: "Conciliadas" },
  { key: "mismatch", label: "Discrepancias" },
  { key: "resolved", label: "Resueltas" },
];

export default function InvoiceLedger({ invoices }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [resolvingKey, setResolvingKey] = useState(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const counts = useMemo(() => {
    const c = { all: invoices.length, ok: 0, mismatch: 0, resolved: 0 };
    for (const inv of invoices) c[inv.status] = (c[inv.status] || 0) + 1;
    return c;
  }, [invoices]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return invoices.filter((inv) => {
      if (filter !== "all" && inv.status !== filter) return false;
      if (!q) return true;
      return inv.id.toLowerCase().includes(q) || inv.client.toLowerCase().includes(q);
    });
  }, [invoices, filter, query]);

  async function submitResolution(runId, invoiceId) {
    if (!note.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, invoiceId, note }),
      });
      if (res.ok) {
        setResolvingKey(null);
        setNote("");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Facturas</h1>
          <p>Todas las facturas de tus conciliaciones, en un solo lugar. Busca y resuelve discrepancias.</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head invoice-ledger-head">
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`filter-tab ${filter === f.key ? "is-active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label} <span className="mono">{counts[f.key] || 0}</span>
              </button>
            ))}
          </div>
          <div className="search-field">
            <MagnifyingGlass size={16} />
            <input
              type="search"
              placeholder="Factura o cliente"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>No hay facturas que coincidan</h3>
            <p>Ajusta el filtro o el término de búsqueda.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Factura</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Esperado</th>
                  <th>Recibido</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => {
                  const key = `${inv.runId}:${inv.id}`;
                  const isResolving = resolvingKey === key;
                  return (
                    <tr key={key}>
                      <td className="mono">{inv.id}</td>
                      <td>{inv.client}</td>
                      <td className="mono">{formatDate(inv.runDate)}</td>
                      <td className="amt">{formatCOP(inv.expected)}</td>
                      <td className="amt">{formatCOP(inv.received)}</td>
                      <td>
                        <StatusTag status={inv.status} className="stamp-badge" />
                        {inv.resolution && (
                          <div className="resolution-note" title={inv.resolution.note}>
                            {inv.resolution.note}
                          </div>
                        )}
                      </td>
                      <td>
                        {inv.status === "mismatch" && !isResolving && (
                          <button
                            type="button"
                            className="btn btn-ghost-paper btn-sm"
                            onClick={() => {
                              setResolvingKey(key);
                              setNote("");
                            }}
                          >
                            Resolver
                          </button>
                        )}
                        {isResolving && (
                          <div className="resolve-form">
                            <input
                              type="text"
                              autoFocus
                              placeholder="¿Cómo se resolvió?"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") submitResolution(inv.runId, inv.id);
                                if (e.key === "Escape") setResolvingKey(null);
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              disabled={saving || !note.trim()}
                              onClick={() => submitResolution(inv.runId, inv.id)}
                            >
                              Guardar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
