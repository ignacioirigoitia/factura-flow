'use client'


import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { IoDownload, IoEye } from 'react-icons/io5'
import { getPdfAws, updateInvoiceStatus } from '@/actions'
import { Estado } from '@prisma/client'
import { formatDate } from '../../../../utils/format-date';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


type Invoice = {
  company: string;
  Employee: {
    nombreCompleto: string;
  },
  Company: {
    nombre: string;
  };
  id: string;
  fechaActual: Date;
  monto: number;
  CAE: string;
  fechaDeFactura: Date;
  numeroDeFactura: string;
  periodo: string;
  estado: Estado;
  notas: string | null;
  employeeId: string;
  companyId: string;
}

interface Props {
  invoices: Invoice[]
}

export const AdminCompanyContent = ({ invoices }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isModalFileOpen, setIsModalFileOpen] = useState<Invoice | null>(null)
  const [newStatus, setNewStatus] = useState<Invoice['estado'] | ''>('')
  const [statusFilter, setStatusFilter] = useState<Invoice['estado'] | 'Todos'>('Todos')
  const [supplierFilter, setSupplierFilter] = useState<string>('Todos')
  const [currentPdf, setCurrentPdf] = useState<string | null>(null);

  const route = useRouter();

  const handleStatusChange = (orderId: string, status: Invoice['estado']) => {
    setSelectedInvoice(invoices.find(order => order.id === orderId) || null)
    setNewStatus(status)
    setIsModalOpen(true)
  }

  const confirmStatusChange = async () => {
    if (selectedInvoice && newStatus) {
      const resp = await updateInvoiceStatus(selectedInvoice.id, newStatus);
      setIsModalOpen(false);
      toast.success(resp.message, {
        position: 'bottom-left',
        autoClose: 5000,
      });
      route.refresh()
    }
  }

  const uniqueCompanies = useMemo(() => {
    return ['Todos', ...Array.from(new Set(invoices.map(invoice => invoice.Company.nombre)))]
  }, [invoices])

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice =>
      (statusFilter === 'Todos' || invoice.estado === statusFilter) &&
      (supplierFilter === 'Todos' || invoice.Company.nombre === supplierFilter)
    )
  }, [invoices, statusFilter, supplierFilter])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Facturas de los empleados</h1>

      <Card className="mb-6">
        <CardContent className="pt-4">
          <h4 className='mb-2 font-bold'>Filtros</h4>
          <div className="flex space-x-4">
            <div>
              <Select onValueChange={(value) => setStatusFilter(value as Invoice['estado'] | 'Todos')}>
                <SelectTrigger id="status-filter" className="w-[180px]">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  {
                    Object.values(Estado).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select onValueChange={(value) => setSupplierFilter(value)}>
                <SelectTrigger id="supplier-filter" className="w-[180px]">
                  <SelectValue placeholder="Seleccionar compañia" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCompanies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Compañia</TableHead>
                <TableHead>Numero de factura</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No hay facturas que mostrar
                  </TableCell>
                </TableRow>
              ) : filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{formatDate(invoice.fechaDeFactura)}</TableCell>
                  <TableCell>{invoice.Company.nombre}</TableCell>
                  <TableCell>{invoice.numeroDeFactura}</TableCell>
                  <TableCell>{invoice.notas === null ? '-' : invoice.notas}</TableCell>
                  <TableCell>
                    <Select
                      value={invoice.estado}
                      onValueChange={(value) => handleStatusChange(invoice.id, value as Invoice['estado'])}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <span className={`px-2 py-1 rounded text-xs font-semibold
                        ${invoice.estado === Estado.PENDIENTE ? 'bg-yellow-200 text-yellow-800' :
                              invoice.estado === Estado.PAGADA ? 'bg-green-200 text-green-800' :
                                'bg-red-200 text-red-800'}`}>
                            {invoice.estado}
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Estado).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <button onClick={async () => {
                      const resp = await getPdfAws('AGOSTO.pdf')
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar el cambio de estado</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Estas seguro que deseas modificar el estado de la orden #{selectedInvoice?.numeroDeFactura} perteneciente a {selectedInvoice?.Employee.nombreCompleto} del consultorio {selectedInvoice?.Company.nombre} a:
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold
              ${newStatus === Estado.PENDIENTE ? 'bg-yellow-200 text-yellow-800' :
                newStatus === Estado.PAGADA ? 'bg-green-200 text-green-800' :
                  'bg-red-200 text-red-800'}`}>
              {newStatus}
            </span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={confirmStatusChange}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isModalFileOpen !== null} onOpenChange={() => setIsModalFileOpen(null)} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Numbero de factura: {isModalFileOpen?.numeroDeFactura}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <embed
              src={currentPdf!}
              type="application/pdf"
              width="400"
              height="450"
            />
          </div>
          <DialogFooter>
            <button>
              <IoDownload size={25} className='mr-4' />
            </button>
            <Button variant="outline" onClick={() => setIsModalFileOpen(null)}>Atras</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

}
