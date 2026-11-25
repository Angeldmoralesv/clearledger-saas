import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword, createSessionToken, readSessionToken } from "../lib/auth.js";

test("hashPassword y verifyPassword validan contraseñas correctamente", () => {
  const hashed = hashPassword("ClaveSegura2026!");
  assert.equal(verifyPassword("ClaveSegura2026!", hashed), true);
  assert.equal(verifyPassword("ClaveIncorrecta", hashed), false);
});

test("createSessionToken y readSessionToken firman y verifican el payload", () => {
  const token = createSessionToken({
    id: "u-1",
    email: "analista@empresa.com",
    name: "Ana",
    companyId: "c-1",
    companyName: "Factoring Costa",
    role: "admin",
  });
  const decoded = readSessionToken(token);
  assert.equal(decoded.email, "analista@empresa.com");
  assert.equal(readSessionToken(`${token}tampered`), null);
});