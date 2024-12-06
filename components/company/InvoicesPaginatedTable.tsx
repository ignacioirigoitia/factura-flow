
import { getPaginatedInvoices } from "@/actions";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default async function InvoicesPaginatedGrid() {

  const { invoices } = await getPaginatedInvoices({page: 1, take: 12});

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

            {invoices.length > 0 ? invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.numeroDeFactura}</TableCell>
                <TableCell>{invoice.fechaDeFactura.toLocaleDateString('es')}</TableCell>
                <TableCell>${invoice.monto.toFixed(2)}</TableCell>
                <TableCell>{invoice.periodo}</TableCell>
                <TableCell>{invoice.company}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No tenes facturas cargadas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
