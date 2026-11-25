import Link from "next/link";
import Logo from "@/components/Logo";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

const invoices = [
  { id: "FAC-2026-004812", amount: "$ 48.250.000", status: "matched" },
  { id: "FAC-2026-004813", amount: "$ 12.900.000", status: "matched" },
  { id: "FAC-2026-004814", amount: "$ 7.430.500", status: "pending" },
];

export default function AuthShowcase() {
  return (
    <aside className="auth-aside greenbar-field">
      <Link href="/" className="brand" style={{ color: "#fff" }}>
        <Logo />
        ClearLedger
      </Link>

      <div className="auth-aside-body">
        <h1 className="auth-aside-title">Tu cartera, conciliada antes del café.</h1>
        <div className="auth-aside-list">
          {invoices.map((inv) => (
            <div className="auth-aside-row" key={inv.id}>
              <span className="mono">{inv.id}</span>
              <span className="mono">{inv.amount}</span>
              {inv.status === "matched" ? (
                <span className="auth-aside-tag ok">
                  <CheckCircle size={12} weight="bold" /> Matched
                </span>
              ) : (
                <span className="auth-aside-tag pending">Cruzando…</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <span className="auth-aside-foot">© 2026 ClearLedger</span>
    </aside>
  );
}