import Logo from "@/components/Logo";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <nav className="site-nav">
          <Link href="/" className="brand">
            <Logo />
            ClearLedger
          </Link>
        </nav>
      </div>

      <div className="hero" style={{ textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Error 404
          </span>
          <h1>Esta partida no cuadra con ninguna página</h1>
          <p className="hero-sub" style={{ margin: "24px auto 0" }}>
            La dirección que buscas no existe o se movió. Volvamos al libro principal.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: 32 }}>
            <Link href="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
