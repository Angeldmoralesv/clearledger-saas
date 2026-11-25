import fs from "node:fs";
import path from "node:path";

// Almacén simple en archivo JSON. Sirve para desplegar rápido en una sola
// instancia EC2 sin levantar RDS todavía. El plan de arquitectura original
// contempla PostgreSQL (RDS); migrar aquí es cuestión de cambiar estas
// funciones por consultas SQL, el resto de la app no cambia.
const DB_PATH = path.join(process.cwd(), "data", "db.json");

function seed() {
  return {
    users: [],
    companies: [],
    runs: [],
    resolutions: [],
  };
}

function ensureFile() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(seed(), null, 2));
  }
}

export function readDb() {
  ensureFile();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  try {
    const db = JSON.parse(raw);
    db.companies = db.companies || [];
    db.resolutions = db.resolutions || [];
    return db;
  } catch {
    return seed();
  }
}

export function writeDb(data) {
  ensureFile();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function findUserByEmail(email) {
  const db = readDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function findUserById(id) {
  const db = readDb();
  return db.users.find((u) => u.id === id) || null;
}

export function createUser(user) {
  const db = readDb();
  db.users.push(user);
  writeDb(db);
  return user;
}

export function updateUser(id, patch) {
  const db = readDb();
  const user = db.users.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, patch);
  writeDb(db);
  return user;
}

// ---- Empresas (espacio de equipo compartido) ----
export function findCompanyByName(name) {
  const db = readDb();
  const key = (name || "").trim().toLowerCase();
  if (!key) return null;
  return db.companies.find((c) => c.name.toLowerCase() === key) || null;
}

export function findCompanyById(id) {
  const db = readDb();
  return db.companies.find((c) => c.id === id) || null;
}

export function createCompany(company) {
  const db = readDb();
  db.companies.push(company);
  writeDb(db);
  return company;
}

export function updateCompany(id, patch) {
  const db = readDb();
  const company = db.companies.find((c) => c.id === id);
  if (!company) return null;
  Object.assign(company, patch);
  writeDb(db);
  return company;
}

export function listCompanyMembers(companyId) {
  const db = readDb();
  return db.users.filter((u) => u.companyId === companyId);
}

// ---- Conciliaciones ----
export function addRun(run) {
  const db = readDb();
  db.runs.unshift(run);
  db.runs = db.runs.slice(0, 200);
  writeDb(db);
  return run;
}

export function listRunsByCompany(companyId) {
  const db = readDb();
  return db.runs.filter((r) => r.companyId === companyId);
}

export function getRun(companyId, runId) {
  const db = readDb();
  return db.runs.find((r) => r.companyId === companyId && r.id === runId) || null;
}

export function listInvoicesByCompany(companyId) {
  const db = readDb();
  const resByKey = new Map(
    (db.resolutions || []).filter((r) => r.companyId === companyId).map((r) => [`${r.runId}:${r.invoiceId}`, r])
  );

  const invoices = [];
  for (const run of db.runs) {
    if (run.companyId !== companyId) continue;
    for (const item of run.results) {
      const resolution = resByKey.get(`${run.id}:${item.id}`);
      invoices.push({
        ...item,
        runId: run.id,
        runDate: run.createdAt,
        status: resolution ? "resolved" : item.status,
        resolution: resolution || null,
      });
    }
  }
  return invoices.sort((a, b) => new Date(b.runDate) - new Date(a.runDate));
}

export function listAlerts(companyId, threshold) {
  return listInvoicesByCompany(companyId).filter((inv) => {
    if (inv.status !== "mismatch") return false;
    if (inv.received === null || inv.received === undefined) return true;
    return Math.abs((inv.expected || 0) - inv.received) >= threshold;
  });
}

export function addResolution(companyId, runId, invoiceId, note, resolvedBy) {
  const db = readDb();
  const run = db.runs.find((r) => r.id === runId && r.companyId === companyId);
  if (!run) return null;

  db.resolutions = db.resolutions || [];
  db.resolutions = db.resolutions.filter(
    (r) => !(r.companyId === companyId && r.runId === runId && r.invoiceId === invoiceId)
  );
  const resolution = { companyId, runId, invoiceId, note, resolvedBy, resolvedAt: new Date().toISOString() };
  db.resolutions.push(resolution);
  writeDb(db);
  return resolution;
}