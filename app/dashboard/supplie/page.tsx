
import { getPaginatedInvoices } from '@/actions';
import InvoiceHeader from '@/components/company/InvoiceHeader';
import InvoicesPaginatedGrid from '@/components/company/InvoicesPaginatedTable';
import { Pagination } from '@/components/pagination/Pagination';


export default async function SuppliersPage() {

  const { invoices, totalPages } = await getPaginatedInvoices({page: 1, take: 12});

  return (
    <div className="container mx-auto p-6">
      <InvoiceHeader />
      <InvoicesPaginatedGrid invoices={invoices} />
      {
        ( totalPages > 1 && <Pagination totalPages={totalPages} /> )
      }
    </div>
  )
}