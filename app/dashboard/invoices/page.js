import { getCurrentUser } from "@/lib/session";
import { listInvoicesByCompany } from "@/lib/db";
import InvoiceLedger from "@/components/InvoiceLedger";

export default async function InvoicesPage() {
  const user = await getCurrentUser();
  const invoices = listInvoicesByCompany(user.companyId);

  return <InvoiceLedger invoices={invoices} />;
}