import test from "node:test";
import assert from "node:assert/strict";
import { reconcile } from "../lib/reconcile.js";

test("reconcile detecta conciliados, faltantes y diferencias de monto", () => {
  const invoices = [
    { id: "FAC-1", client: "Cliente A", amount: 1000000 },
    { id: "FAC-2", client: "Cliente B", amount: 2500000 },
    { id: "FAC-3", client: "Cliente C", amount: 500000 },
  ];
  const payments = [
    { id: "FAC-1", client: "Cliente A", amount: 1000000 },
    { id: "FAC-2", client: "Cliente B", amount: 2400000 },
  ];

  const { results, summary } = reconcile(invoices, payments);
  assert.equal(summary.total, 3);
  assert.equal(summary.matched, 1);
  assert.equal(summary.mismatched, 2);
  assert.equal(results[0].status, "ok");
  assert.equal(results[1].reason, "Monto no coincide");
  assert.equal(results[2].reason, "Pago no encontrado");
});