import { Invoice } from "@prisma/client"
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface Props {
  invoices: Invoice[];
}

export default function InvoicesPaginatedGrid({invoices}: Props) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nro de Factura</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Periodo</TableHead>
              <TableHead>Consultorio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.numeroDeFactura}</TableCell>
                <TableCell>{invoice.fechaDeFactura.toLocaleDateString('es')}</TableCell>
                <TableCell>${invoice.monto.toFixed(2)}</TableCell>
                <TableCell>{invoice.periodo}</TableCell>
                <TableCell>Doppler Kinesio</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
