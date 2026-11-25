// Serializa el resultado de una conciliación a CSV para descargar (reporte de cierre).
export function reconciliationToCsv(results) {
  const header = "id,client,expected,received,status,reason";
  const rows = results.map((r) =>
    [r.id, r.client, r.expected ?? "", r.received ?? "", r.status, r.reason]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  return [header, ...rows].join("\n");
}

// Parser de CSV mínimo: espera encabezado "id,client,amount".
export function parseLedgerCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idIdx = header.indexOf("id");
  const clientIdx = header.indexOf("client");
  const amountIdx = header.indexOf("amount");

  if (idIdx === -1 || amountIdx === -1) {
    throw new Error('El CSV debe tener columnas "id,client,amount"');
  }

  const errors = [];
  const rows = lines.slice(1).map((line, i) => {
    const rowNum = i + 2;
    const cols = line.split(",");
    const id = cols[idIdx]?.trim();
    const rawAmount = cols[amountIdx]?.trim() ?? "";
    const cleaned = rawAmount.replace(/[^\d-]/g, "");
    const amount = Number(cleaned);

    if (!id) errors.push(`Fila ${rowNum}: falta el id de la factura`);
    if (!cleaned || Number.isNaN(amount)) errors.push(`Fila ${rowNum}: monto inválido ("${rawAmount}")`);

    return {
      id,
      client: clientIdx !== -1 ? cols[clientIdx]?.trim() : "",
      amount,
    };
  });

  if (errors.length > 0) {
    const preview = errors.slice(0, 5).join(" · ");
    const extra = errors.length > 5 ? ` (y ${errors.length - 5} más)` : "";
    throw new Error(`${preview}${extra}`);
  }

  return rows;
}