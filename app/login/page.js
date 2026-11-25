"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShowcase from "@/components/AuthShowcase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Credenciales inválidas");
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
            <span className="auth-tab is-active" role="tab" aria-selected="true">
              Iniciar sesión
            </span>
            <Link href="/register" className="auth-tab" role="tab" aria-selected="false">
              Crear cuenta
            </Link>
          </div>

          <h2>Bienvenido de nuevo</h2>
          <p className="auth-sub">Entra a tu panel de conciliación.</p>

          <div className="field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Verificando..." : "Entrar"}
          </button>

          <p className="form-note">
            ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
          </p>

          <div className="demo-hint">demo@clearledger.com · clearledger123</div>
        </form>
      </div>
    </div>
  );
}