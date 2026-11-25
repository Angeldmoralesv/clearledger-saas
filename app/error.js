"use client";

export default function ErrorBoundary({ error, reset }) {
  return (
    <div className="page" style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div className="container">
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Algo no cuadró
        </span>
        <h1 style={{ color: "var(--paper-50)" }}>La aplicación encontró un error inesperado</h1>
        <p className="hero-sub" style={{ margin: "20px auto 0" }}>
          {error?.message || "Intenta de nuevo en unos segundos."}
        </p>
        <button className="btn btn-primary" style={{ marginTop: 28 }} onClick={() => reset()}>
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
