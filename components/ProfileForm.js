"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react";

export default function ProfileForm({ initialName, email }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "No se pudo guardar");
        return;
      }

      setSaved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="profile-name">Nombre</label>
        <input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="profile-email">Correo</label>
        <input id="profile-email" value={email} disabled />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" className="btn btn-primary btn-sm" disabled={saving} style={{ marginTop: 20 }}>
        {saving ? "Guardando..." : saved ? "Cambios guardados" : "Guardar cambios"}
      </button>
      {saved && (
        <span className="save-confirm">
          <CheckCircle size={14} weight="bold" /> Actualizado
        </span>
      )}
    </form>
  );
}
