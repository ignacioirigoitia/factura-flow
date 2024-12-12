
import { getAllCompanies, getPaginatedEmployee } from "@/actions"
import { Pagination } from "@/components/pagination/Pagination";
import { UsersDataGrid } from "@/app/admin/users/ui/UsersDataGrid";
import { UsersHeader } from "@/app/admin/users/ui/UsersHeader";

interface CompanyManagementProps {
  searchParams: {
    page?: string;
    company?: string;
    status?: string;
    name?: string;
    email?: string;
  };
}

export default async function UserManagement({ searchParams }: CompanyManagementProps) {

  const company = searchParams.company ?? undefined;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const name = searchParams.name ?? undefined;
  const correo = searchParams.email ?? undefined;
  const status = searchParams.status === "activo" 
    ? true 
    : searchParams.status === "inactivo" 
      ? false 
      : undefined;

  const { companies } = await getAllCompanies();
  const { employees, totalPages } = await getPaginatedEmployee({
    page: page,
    take: 12,
    companyId: company,
    activo: status,
    nombreCompleto: name,
    email: correo
  });

  return (
    <div className="container mx-auto p-6 space-y-4">      
      <UsersHeader companies={companies} />

      <UsersDataGrid companies={companies} employees={employees}  />

      {
        (totalPages > 1 && <Pagination totalPages={totalPages} />)
      }
    </div>
  )
}
