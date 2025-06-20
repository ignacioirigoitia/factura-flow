'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { InvoicesFilters } from './InvoicesFilters';
import { getPdfAws, deleteAdminInvoice } from '@/actions';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IoEye, IoTrash } from 'react-icons/io5';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<AdminInvoice | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter()
  const handleDeleteInvoice = async (invoiceId: string) => {
    setIsDeleting(true);
    const resp = await deleteAdminInvoice(invoiceId)
    if (resp.ok) {
      setIsModalDeleteOpen(null)
      toast.success(resp.message)
      router.refresh()
    } else {
      toast.error(resp.message)
    }
    setIsDeleting(false)
  }

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
                            setIsImageLoading(true)
                          }
                        }} className='ml-3'>
                          <IoEye size={25} />
                        </button>
                      <button 
                        onClick={() => setIsModalDeleteOpen(invoice)} 
                        className='ml-3 text-red-600 hover:text-red-800 transition-colors'
                      >
                        <IoTrash size={25} />
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
            {currentPdf && (
              currentPdf.toLowerCase().includes('.pdf') ? (
                <embed
                  src={currentPdf}
                  type="application/pdf"
                  width="400"
                  height="450"
                />
              ) : (
                <div className="relative">
                  <Image
                    src={currentPdf}
                    alt="Archivo adjunto"
                    className="max-w-full h-auto max-h-[450px] object-contain"
                    width={400}
                    height={450}
                    onLoad={() => setIsImageLoading(false)}
                    onLoadStart={() => setIsImageLoading(true)}
                  />
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-gray-600">Cargando imagen...</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isModalDeleteOpen !== null} onOpenChange={() => {
        setIsModalDeleteOpen(null)
        setIsDeleting(false)
      }} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar factura</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>¿Estás seguro de que deseas eliminar esta factura?</p>
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsModalDeleteOpen(null)
              setIsDeleting(false)
            }}>Cancelar</Button>
            <Button variant="destructive" onClick={() => handleDeleteInvoice(isModalDeleteOpen!.id)} disabled={isDeleting}>
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>

      </Dialog>
    </>
  )
}
