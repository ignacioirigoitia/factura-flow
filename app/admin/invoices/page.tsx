import { getEmployeeCompanies } from "@/actions/employee/get-employee-companies";
import { Pagination } from "@/components/pagination/Pagination";
import { InvoicesPaginatedGrid } from "./ui/InvoicesPaginatedGrid";
import InvoiceAdminHeader from "@/components/admin/InvoiceAdminHeader";
import { getAllAdminInvoicesPaginated } from "@/actions/admin-invoices/get-all-admin-invoices";




export default async function InvoicesManagement({ searchParams }: { searchParams: { [key: string]: string } }) {

  const concept = searchParams.concept ?? undefined;
  const date = searchParams.date ?? undefined;

  const { totalPages, invoices } = await getAllAdminInvoicesPaginated({ page: 1, take: 12, concept, date });
  const { companies } = await getEmployeeCompanies();

  return (
    <div className="container mx-auto p-6 space-y-4">
      <InvoiceAdminHeader companies={companies} />
      <InvoicesPaginatedGrid invoices={invoices} />
      {
        (totalPages > 1 && <Pagination totalPages={totalPages} />)
      }
    </div>
  );
}
