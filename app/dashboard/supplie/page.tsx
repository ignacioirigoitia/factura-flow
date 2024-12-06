
import { getPaginatedInvoices } from '@/actions';
import { getEmployeeCompanies } from '@/actions/employee/get-employee-companies';
import InvoiceHeader from '@/components/company/InvoiceHeader';
import InvoicesPaginatedGrid from '@/components/company/InvoicesPaginatedTable';
import { Pagination } from '@/components/pagination/Pagination';


export default async function SuppliersPage() {

  const { totalPages } = await getPaginatedInvoices({page: 1, take: 12});
  const companies = await getEmployeeCompanies();

  return (
    <div className="container mx-auto p-6">
      <InvoiceHeader companies={companies} />
      <InvoicesPaginatedGrid />
      {
        ( totalPages > 1 && <Pagination totalPages={totalPages} /> )
      }
    </div>
  )
}