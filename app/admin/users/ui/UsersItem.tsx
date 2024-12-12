'use client'

import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Edit } from "lucide-react"
import { Company } from "@/interfaces"
import { useAdminEmployeeStore } from "@/store/admin/employee-store"
import { Employee } from "./UsersDataGrid"


interface Props {
  employee: Employee;
  companies: Company[]
}

export const UsersItem = ({employee, companies}: Props) => {

  const setOpenDialog = useAdminEmployeeStore(state => state.setOpenDialog);
  const setSelectedEmployee = useAdminEmployeeStore(state => state.setSelectedEmployee);

  return (
    <TableRow>
      <TableCell>{employee.nombreCompleto}</TableCell>
      <TableCell>{employee.correo}</TableCell>
      <TableCell>{employee.rol}</TableCell>
      <TableCell>{employee.telefono}</TableCell>
      <TableCell>{employee.companies.map((x) => x.nombre).join(' - ')}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${employee.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {employee.activo ? "ACTIVO" : "INACTIVO"}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedEmployee({...employee, companyId: employee.companies[0].id})
            setOpenDialog(true)
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
