
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Company, Employee } from '@/interfaces'
import { UsersFilters } from './UsersFilters'
import { UsersItem } from './UsersItem'

interface Props {
  employees: Employee[];
  companies: Company[];
}

export const UsersDataGrid = ({ employees, companies }: Props) => {

  return (
    <>
      <UsersFilters companies={companies} />

      {
        employees.length === 0 ? (
          <Card className="mb-6">
            <CardContent className="pt-6 flex justify-center">
              <p className='text-xl'>No se encontraron resultados</p>
            </CardContent>
          </Card>
        ) : (
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
                    <UsersItem key={employee.id} employee={employee} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      }
    </>
  )
}
