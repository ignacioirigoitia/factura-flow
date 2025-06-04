'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { InvoicesFilters } from './InvoicesFilters';
import { getPdfAws } from '@/actions';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IoEye } from 'react-icons/io5';

export interface AdminInvoice {
  company: string;
  createdBy: {
    nombreCompleto: string;
  };
  Company: {
    nombre: string;
  };
  id: string;
  fecha: Date;
  concepto: string;
  notas: string | null;
  nombreArchivo: string;
  createdById: string;
  companyId: string;
}


interface Props {
  invoices: AdminInvoice[];
}

export const InvoicesPaginatedGrid = ({ invoices }: Props) => {

  const [currentPdf, setCurrentPdf] = useState<string | null>(null);
  const [isModalFileOpen, setIsModalFileOpen] = useState<AdminInvoice | null>(null)

  return (
    <>
      <InvoicesFilters />

      {
        invoices.length === 0 ? (
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
                    <TableHead>Concepto</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Notas</TableHead>
                    <TableHead>Nombre archivo</TableHead>
                    <TableHead>Consultorio</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.concepto}</TableCell>
                      <TableCell>{invoice.fecha.toLocaleDateString('es')}</TableCell>
                      <TableCell>{invoice.notas ? invoice.notas : '-'}</TableCell>
                      <TableCell>{invoice.nombreArchivo}</TableCell>
                      <TableCell>{invoice.Company.nombre}</TableCell>
                      <TableCell>
                        <button onClick={async () => {
                          const resp = await getPdfAws(invoice.nombreArchivo)
                          if (resp.ok && resp.url) {
                            setCurrentPdf(resp.url)
                            setIsModalFileOpen(invoice)
                          }
                        }} className='ml-3'>
                          <IoEye size={25} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      }
      <Dialog open={isModalFileOpen !== null} onOpenChange={() => setIsModalFileOpen(null)} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isModalFileOpen?.concepto}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <embed
              src={currentPdf!}
              type="application/pdf"
              width="400"
              height="450"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
