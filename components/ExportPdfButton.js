"use client";

import { Printer } from "@phosphor-icons/react";

export default function ExportPdfButton({ label = "Exportar PDF", className = "btn-ghost" }) {
  return (
    <button type="button" className={`btn btn-sm no-print ${className}`} onClick={() => window.print()}>
      <Printer size={15} />
      {label}
    </button>
  );
}