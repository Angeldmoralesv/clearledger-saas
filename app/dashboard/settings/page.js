import { getCurrentUser } from "@/lib/session";
import { findUserByEmail, findCompanyById, listCompanyMembers } from "@/lib/db";
import { Crown, UserCircle } from "@phosphor-icons/react/dist/ssr";
import ProfileForm from "@/components/ProfileForm";
import ErpConnectionForm from "@/components/ErpConnectionForm";

export default async function SettingsPage() {
  const session = await getCurrentUser();
  const user = findUserByEmail(session.email);
  const company = findCompanyById(session.companyId);
  const members = listCompanyMembers(session.companyId);
  const isAdmin = session.role === "admin";

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Configuración</h1>
          <p>Tu cuenta y el espacio compartido de {company?.name || "tu empresa"}.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Perfil</h3>
          <ProfileForm initialName={user?.name || ""} email={user?.email || ""} />
        </div>

        <div className="settings-card">
          <h3>Conexión con tu ERP</h3>
          <ErpConnectionForm
            initialProvider={company?.erpProvider || "Siigo"}
            connected={Boolean(company?.erpApiKey)}
            initialThreshold={company?.alertThreshold}
            isAdmin={isAdmin}
          />
        </div>

        <div className="settings-card">
          <h3>Equipo · {company?.name}</h3>
          <div className="team-list">
            {members.map((m) => (
              <div className="team-row" key={m.id}>
                <UserCircle size={22} />
                <div className="team-row-info">
                  <span className="team-row-name">{m.name}</span>
                  <span className="team-row-email mono">{m.email}</span>
                </div>
                {m.role === "admin" && (
                  <span className="team-role-badge"><Crown size={12} weight="bold" /> Admin</span>
                )}
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-muted-on-dark)", fontSize: "0.8rem", marginTop: 14 }}>
            Cualquier persona que se registre con el nombre "{company?.name}" se une a este mismo espacio.
          </p>
        </div>

        <div className="settings-card">
          <h3>Cuenta creada</h3>
          <p style={{ color: "var(--text-muted-on-dark)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            {user?.createdAt ? new Date(user.createdAt).toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" }) : "—"}
          </p>
          <p style={{ color: "var(--text-muted-on-dark)", fontSize: "0.85rem", marginTop: 14 }}>
            El cambio de contraseña queda planeado para una próxima iteración del producto.
          </p>
        </div>
      </div>
    </>
  );
}