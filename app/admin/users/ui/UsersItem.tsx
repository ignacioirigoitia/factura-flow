'use client'

import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Employee } from "@/interfaces"
import { Edit, Trash2 } from "lucide-react"


interface Props {
  employee: Employee
}

export const UsersItem = ({employee}: Props) => {
  return (
    <TableRow>
      <TableCell>{employee.nombreCompleto}</TableCell>
      <TableCell>{employee.correo}</TableCell>
      <TableCell>{employee.rol}</TableCell>
      <TableCell>{employee.telefono}</TableCell>
      <TableCell>{employee.company ? employee.company.nombre : ''}</TableCell>
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
            // setEditingUser(user)
            // setIsDialogOpen(true)
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { }}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
