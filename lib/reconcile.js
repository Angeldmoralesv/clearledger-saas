// Lógica de conciliación: cruza facturas (ERP) contra pagos (factoring) por id y monto.
export function reconcile(invoices, payments) {
  const paymentsById = new Map(payments.map((p) => [p.id, p]));
  const results = [];

  for (const invoice of invoices) {
    const payment = paymentsById.get(invoice.id);

    if (!payment) {
      results.push({
        id: invoice.id,
        client: invoice.client,
        expected: invoice.amount,
        received: null,
        status: "mismatch",
        reason: "Pago no encontrado",
      });
      continue;
    }

    if (payment.amount !== invoice.amount) {
      results.push({
        id: invoice.id,
        client: invoice.client,
        expected: invoice.amount,
        received: payment.amount,
        status: "mismatch",
        reason: "Monto no coincide",
      });
      continue;
    }

    results.push({
      id: invoice.id,
      client: invoice.client,
      expected: invoice.amount,
      received: payment.amount,
      status: "ok",
      reason: "Conciliado",
    });
  }

  const matched = results.filter((r) => r.status === "ok").length;
  const mismatched = results.filter((r) => r.status === "mismatch").length;

  return { results, summary: { total: results.length, matched, mismatched } };
}