import { getPaginatedCompany } from "@/actions";
import { CompanyDataGrid } from "./ui/CompanyDataGrid";
import { CompanyHeader } from "./ui/CompanyHeader";
import { Pagination } from "@/components/pagination/Pagination";

interface CompanyManagementProps {
  searchParams: {
    page?: string;
    name?: string;
    status?: "activo" | "inactivo" | "todos";
  };
}

export default async function CompanyManagement({ searchParams }: CompanyManagementProps) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const status = searchParams.status === "activo" 
    ? true 
    : searchParams.status === "inactivo" 
      ? false 
      : undefined;
  const name = searchParams.name ?? undefined;

  const { companies, totalPages } = await getPaginatedCompany({
    page,
    take: 12,
    name,
    activo: status
  });

  return (
    <div className="container mx-auto p-6 space-y-4">

      <CompanyHeader />
      <CompanyDataGrid companies={companies} />

      {
        (totalPages > 1 && <Pagination totalPages={totalPages} />)
      }

    </div>
  )
}

