import Logo from "@/components/Logo";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import LogoutButton from "@/components/LogoutButton";
import NotificationsBell from "@/components/NotificationsBell";
import { getCurrentUser } from "@/lib/session";
import { findCompanyById, listAlerts } from "@/lib/db";
import { Crown } from "@phosphor-icons/react/dist/ssr";

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();
  const company = findCompanyById(user.companyId);
  const threshold = company?.alertThreshold ?? 500000;
  const alerts = listAlerts(user.companyId, threshold);

  return (
    <div className="dash-shell">
      <aside className="sidebar">
        <Link href="/" className="brand">
          <Logo />
          ClearLedger
        </Link>

        <DashboardNav />

        <div className="sidebar-user">
          <div className="sidebar-user-name">
            {user?.name}
            {user?.role === "admin" && (
              <span className="team-role-badge" style={{ marginLeft: 8 }}>
                <Crown size={11} weight="bold" /> Admin
              </span>
            )}
          </div>
          <div className="sidebar-user-email mono">{company?.name}</div>
          <LogoutButton />
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <NotificationsBell alerts={alerts} threshold={threshold} />
        </div>
        {children}
      </main>
    </div>
  );
}