
import { getAdminPaginatedInvoices } from "@/actions";
import { AdminCompanyContent } from "./ui/AdminCompanyContent";




export default async function CompanyPage() {
  
  const { invoices } = await getAdminPaginatedInvoices({page: 1, take: 12});

  return (
    <AdminCompanyContent invoices={invoices} />
  )
}