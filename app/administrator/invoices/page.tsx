
import { getAllInvoicesPaginated } from "@/actions/invoices/get-all-invoices";
import { AdminCompanyContent } from "@/app/admin/company/ui/AdminCompanyContent";




export default async function InvoicesPage() {
  
  const { invoices } = await getAllInvoicesPaginated({page: 1, take: 12});

  return (
    <AdminCompanyContent invoices={invoices} />
  )
}