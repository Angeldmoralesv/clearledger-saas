"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ChartBar, FileText, ClockCounterClockwise, ChartLine, Gear } from "@phosphor-icons/react";

const links = [
  { href: "/dashboard", label: "Resumen", Icon: House },
  { href: "/dashboard/reconciliations", label: "Conciliaciones", Icon: ChartBar },
  { href: "/dashboard/invoices", label: "Facturas", Icon: FileText },
  { href: "/dashboard/history", label: "Historial", Icon: ClockCounterClockwise },
  { href: "/dashboard/reports", label: "Reportes", Icon: ChartLine },
  { href: "/dashboard/settings", label: "Configuración", Icon: Gear },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="sidebar-nav">
      {links.map(({ href, label, Icon }) => {
        const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={`sidebar-link ${active ? "active" : ""}`}>
            <Icon size={18} weight={active ? "fill" : "regular"} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
