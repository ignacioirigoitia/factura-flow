
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Company } from "@/interfaces"
import { CompanyFilters } from "./CompanyFilters"
import { CompanyItem } from "./CompanyItem"


interface Props {
  companies: Company[]
}

export const CompanyDataGrid = ({companies}: Props) => {
  return (
    <>
      <CompanyFilters />      

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <CompanyItem key={company.id} company={company} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
