// Datos de ejemplo: simulan lo que vendría del ERP (Siigo) y de la empresa de factoring.
// En la propuesta original esto llega por integración API; aquí se simula para el MVP.

export const sampleInvoices = [
  { id: "FAC-001", client: "Textiles del Caribe", amount: 4500000 },
  { id: "FAC-002", client: "Comercial Andina", amount: 2100000 },
  { id: "FAC-003", client: "Distribuidora Norte", amount: 980000 },
  { id: "FAC-004", client: "Agroindustrial Sabana", amount: 3750000 },
  { id: "FAC-005", client: "Logística Caribe SAS", amount: 1250000 },
];

export const samplePayments = [
  { id: "FAC-001", client: "Textiles del Caribe", amount: 4500000 },
  { id: "FAC-002", client: "Comercial Andina", amount: 2100000 },
  { id: "FAC-003", client: "Distribuidora Norte", amount: 820000 }, // monto distinto -> discrepancia
  { id: "FAC-004", client: "Agroindustrial Sabana", amount: 3750000 },
  // FAC-005 no aparece -> pago faltante
];