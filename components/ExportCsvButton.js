"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import { reconciliationToCsv } from "@/lib/csv";

export default function ExportCsvButton({ results, filename, className = "btn-ghost-paper" }) {
  function handleExport() {
    const csv = reconciliationToCsv(results);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" className={`btn btn-sm ${className}`} onClick={handleExport}>
      <DownloadSimple size={15} />
      Exportar CSV
    </button>
  );
}