'use client'


import { User } from "./UsersForm"
import { Company } from "@/interfaces"
import { createEmployee } from "@/actions/employee/create-employee"
import { UsersDialog } from "./UsersDialog"
import { toast } from "react-toastify"
import { useAdminEmployeeStore } from "@/store/admin/employee-store"
import { useRouter } from "next/navigation"


interface Props {
  companies: Company[]
}

export const UsersHeader = ({companies}:Props) => {

  const setOpenDialog = useAdminEmployeeStore(state => state.setOpenDialog);

  const route = useRouter();

  const handleCreateEmployee = async (user: Omit<User, "id">) => {
    const resp = await createEmployee({
      nombreCompleto: user.name,
      correo: user.email,
      telefono: user.phone,
      companyId: user.company,
      companyName: companies.find(c => c.id === user.company)?.nombre || '',
    })
    if(resp.ok){
      toast.success(resp.message, {
        position: 'bottom-left',
        autoClose: 5000,
      });
      setOpenDialog(false);
      route.refresh();
    } else {
      toast.error(resp.message, {
        position: 'bottom-left',
        autoClose: 5000,
      });
    }
  }

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Gestión de usuarios</h1>
      <UsersDialog 
        companies={companies}
        onSubmit={handleCreateEmployee}
      />
    </header>
  )
}
