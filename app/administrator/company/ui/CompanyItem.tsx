'use client'

import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Company } from "@/interfaces"
import { useAdminCompanyStore } from "@/store"
import { Edit } from "lucide-react"

interface Props {
  company: Company
}

export const CompanyItem = ({company}: Props) => {

  const setOpenDialog = useAdminCompanyStore(state => state.setOpenDialog);
  const setSelectedCompany = useAdminCompanyStore(state => state.setSelectedCompany);


  const handleEditingCompany = (company: Company) => {
    setSelectedCompany(company)
    setOpenDialog(true);
  }

  return (
    <TableRow>
      <TableCell>{company.nombre}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${company.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {company.activo ? 'ACTIVO' : 'INACTIVO'}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEditingCompany(company)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
