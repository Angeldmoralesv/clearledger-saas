"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadSimple, FileCsv, Stack, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { parseLedgerCsv } from "@/lib/csv";
import StatusTag from "@/components/StatusTag";
import ExportCsvButton from "@/components/ExportCsvButton";

function formatCOP(value) {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

export default function ReconciliationsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invoicesFile, setInvoicesFile] = useState(null);
  const [paymentsFile, setPaymentsFile] = useState(null);
  const invoicesInput = useRef(null);
  const paymentsInput = useRef(null);

  async function runReconciliation() {
    setLoading(true);
    setError("");
    setData(null);

    try {
      let payload = {};
      if (invoicesFile && paymentsFile) {
        const [invoicesText, paymentsText] = await Promise.all([
          invoicesFile.text(),
          paymentsFile.text(),
        ]);
        payload = {
          invoices: parseLedgerCsv(invoicesText),
          payments: parseLedgerCsv(paymentsText),
        };
      }

      const res = await fetch("/api/reconcile", {
        method: "POST",
        headers: Object.keys(payload).length ? { "Content-Type": "application/json" } : undefined,
        body: Object.keys(payload).length ? JSON.stringify(payload) : undefined,
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "No se pudo ejecutar la conciliación");
        return;
      }

      setData(await res.json());
    } catch (e) {
      setError(e.message || "El archivo CSV no tiene el formato esperado");
    } finally {
      setLoading(false);
    }
  }

  function clearFiles() {
    setInvoicesFile(null);
    setPaymentsFile(null);
    if (invoicesInput.current) invoicesInput.current.value = "";
    if (paymentsInput.current) paymentsInput.current.value = "";
  }

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Conciliaciones</h1>
          <p>
            Cruza el lote de ejemplo, o carga tus propios archivos CSV (columnas{" "}
            <span className="mono">id,client,amount</span>) con las facturas del ERP y los pagos de factoring.
          </p>
        </div>
        <button className="btn btn-primary" onClick={runReconciliation} disabled={loading}>
          {loading ? "Procesando..." : "Ejecutar conciliación"}
        </button>
      </div>

      <div className="panel upload-panel">
        <div className="upload-grid">
          <label className="upload-slot">
            <input ref={invoicesInput} type="file" accept=".csv,text/csv" hidden onChange={(e) => setInvoicesFile(e.target.files?.[0] || null)} />
            <UploadSimple size={20} />
            <div>
              <strong>Facturas del ERP</strong>
              <span>{invoicesFile ? invoicesFile.name : "Elegir archivo .csv (opcional)"}</span>
            </div>
          </label>
          <label className="upload-slot">
            <input ref={paymentsInput} type="file" accept=".csv,text/csv" hidden onChange={(e) => setPaymentsFile(e.target.files?.[0] || null)} />
            <UploadSimple size={20} />
            <div>
              <strong>Pagos de factoring</strong>
              <span>{paymentsFile ? paymentsFile.name : "Elegir archivo .csv (opcional)"}</span>
            </div>
          </label>
        </div>

        {(invoicesFile || paymentsFile) && (
          <div className="upload-note">
            <FileCsv size={14} />
            {invoicesFile && paymentsFile
              ? "Se usarán tus dos archivos al ejecutar la conciliación."
              : "Carga ambos archivos para usar tus datos — si falta uno, se usará el lote de ejemplo."}
            <button type="button" className="upload-clear" onClick={clearFiles}>Quitar</button>
          </div>
        )}
      </div>

      {error && <div className="form-error">{error}</div>}

      <AnimatePresence>
        {data && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="stat-row">
              <div className="stat-card"><span className="label"><Stack size={14} /> Facturas cruzadas</span><div className="value">{data.summary.total}</div></div>
              <div className="stat-card accent"><span className="label"><CheckCircle size={14} /> Conciliadas</span><div className="value">{data.summary.matched}</div></div>
              <div className="stat-card warn"><span className="label"><WarningCircle size={14} /> Discrepancias</span><div className="value">{data.summary.mismatched}</div></div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h2>Resultado del cruce</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span className="mono">lote #{data.id.slice(0, 8)} · {data.source === "custom" ? "datos propios" : "ejemplo"}</span>
                  <ExportCsvButton results={data.results} filename={`conciliacion-${data.id.slice(0, 8)}.csv`} />
                </div>
              </div>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>Factura</th><th>Cliente</th><th>Esperado</th><th>Recibido</th><th>Estado</th><th>Detalle</th></tr></thead>
                  <tbody>
                    {data.results.map((r) => (
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
          </motion.div>
        )}
      </AnimatePresence>

      {!data && !loading && (
        <div className="panel">
          <div className="empty-state">
            <h3>Listo para cruzar tu primer lote</h3>
            <p>Dale clic a "Ejecutar conciliación" para ver el resultado en tiempo real.</p>
          </div>
        </div>
      )}
    </>
  );
}