
import { getAllCompanies, getPaginatedEmployee } from "@/actions"
import { UsersDataGrid } from "./ui/UsersDataGrid"
import { UsersHeader } from "./ui/UsersHeader"
import { Pagination } from "@/components/pagination/Pagination";


export default async function UserManagement() {

  const { companies } = await getAllCompanies();
  const { employees, totalPages } = await getPaginatedEmployee({
    page: 1,
    take: 12
  });

  return (
    <div className="container mx-auto p-6 space-y-4">      
      <UsersHeader />

      <UsersDataGrid companies={companies} employees={employees}  />

      {
        (totalPages > 1 && <Pagination totalPages={totalPages} />)
      }
    </div>
  )
}
