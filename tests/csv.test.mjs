import test from "node:test";
import assert from "node:assert/strict";
import { parseLedgerCsv, reconciliationToCsv } from "../lib/csv.js";

test("parseLedgerCsv interpreta montos COP con formato de moneda", () => {
  const csv = "id,client,amount\nFAC-01,Logística Caribe,$4.500.000";
  const rows = parseLedgerCsv(csv);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].amount, 4500000);
});

test("reconciliationToCsv genera CSV con encabezados esperados", () => {
  const out = reconciliationToCsv([
    { id: "FAC-01", client: "Logística Caribe", expected: 4500000, received: 4500000, status: "ok", reason: "Conciliado" },
  ]);
  assert.match(out, /^id,client,expected,received,status,reason/);
  assert.match(out, /"FAC-01"/);
});