'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Company, Employee } from '@/interfaces'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'
import { UsersFilters } from './UsersFilters'

interface Props {
  employees: Employee[];
  companies: Company[];
}

export const UsersDataGrid = ({ employees, companies }: Props) => {

  return (
    <>
      <UsersFilters companies={companies} />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Telefóno</TableHead>
                <TableHead>Consultorio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
