"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShowcase from "@/components/AuthShowcase";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "No se pudo crear la cuenta");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-split">
      <AuthShowcase />
      <div className="auth-main">
        <form onSubmit={handleSubmit} className="auth-card">
          <div className="auth-tabs" role="tablist" aria-label="Acceso">
            <Link href="/login" className="auth-tab" role="tab" aria-selected="false">
              Iniciar sesión
            </Link>
            <span className="auth-tab is-active" role="tab" aria-selected="true">
              Crear cuenta
            </span>
          </div>

          <h2>Crea tu cuenta</h2>
          <p className="auth-sub">Empieza a conciliar tu cartera en minutos.</p>

          <div className="field">
            <label htmlFor="name">Nombre completo</label>
            <input id="name" autoComplete="name" required value={form.name} onChange={update("name")} />
          </div>

          <div className="field">
            <label htmlFor="company">Empresa</label>
            <input
              id="company"
              autoComplete="organization"
              required
              placeholder="Factoring Andino S.A.S."
              value={form.company}
              onChange={update("company")}
            />
          </div>
          <p className="form-hint">
            Si ya hay una cuenta de tu empresa, escribe el mismo nombre para unirte a su espacio compartido.
          </p>

          <div className="field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={update("email")}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={form.password}
              onChange={update("password")}
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <p className="form-note">
            ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}