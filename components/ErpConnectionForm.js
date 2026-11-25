"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plug, CheckCircle, Lock } from "@phosphor-icons/react";

export default function ErpConnectionForm({ initialProvider, connected, initialThreshold, isAdmin }) {
  const router = useRouter();
  const [provider, setProvider] = useState(initialProvider || "Siigo");
  const [apiKey, setApiKey] = useState("");
  const [threshold, setThreshold] = useState(initialThreshold ?? 500000);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/erp-connection", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ erpProvider: provider, erpApiKey: apiKey, alertThreshold: threshold }),
      });
      if (res.ok) {
        setSaved(true);
        setApiKey("");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  if (!isAdmin) {
    return (
      <>
        <div className="erp-status">
          <Lock size={16} />
          <span>Solo un admin de {provider ? "tu empresa" : "la empresa"} puede cambiar esta conexión.</span>
        </div>
        <div className="erp-status" style={{ marginTop: 10 }}>
          <Plug size={16} />
          {connected ? (
            <span className="erp-status-on">
              <CheckCircle size={14} weight="bold" /> Conectado a {initialProvider}
            </span>
          ) : (
            <span>Sin conectar — la conciliación sigue funcionando por CSV mientras tanto</span>
          )}
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="erp-status">
        <Plug size={16} />
        {connected ? (
          <span className="erp-status-on">
            <CheckCircle size={14} weight="bold" /> Conectado a {initialProvider}
          </span>
        ) : (
          <span>Sin conectar — la conciliación sigue funcionando por CSV mientras tanto</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="erp-provider">ERP</label>
        <select id="erp-provider" value={provider} onChange={(e) => setProvider(e.target.value)}>
          <option value="Siigo">Siigo</option>
          <option value="World Office">World Office</option>
          <option value="SAP Business One">SAP Business One</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="erp-key">Llave de API</label>
        <input
          id="erp-key"
          type="password"
          placeholder={connected ? "•••••••••••••• (guardada)" : "Pega tu API key"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="erp-threshold">Umbral de alerta (COP)</label>
        <input
          id="erp-threshold"
          type="number"
          min={0}
          step={10000}
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-sm" disabled={saving} style={{ marginTop: 20 }}>
        {saving ? "Guardando..." : "Guardar"}
      </button>
      {saved && (
        <span className="save-confirm">
          <CheckCircle size={14} weight="bold" /> Guardado
        </span>
      )}
    </form>
  );
}
