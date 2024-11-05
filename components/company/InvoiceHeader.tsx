'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Upload } from 'lucide-react'

import { cn } from "@/lib/utils"
import PdfUploader from "../pdf-uploader/PdfUploader"

import { obtenerCae, obtenerFechaEmision, obtenerMonto, obtenerPeriodoFacturado, obtenerPuntoDeVentaYCompNro } from "@/utils"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { InvoiceInformation } from "./InvoiceInformation"
import { createInvoice, createPdf } from "@/actions"
import { uploadFile } from "@/actions/pdf/upload-pdf-aws"
import { Label } from "../ui/label"

export interface CreateInvoice {
  notas: null | string;
  monto: null | number;
  CAE: null | string;
  fechaDeFactura: null | Date;
  numeroDeFactura: null | string;
  periodo: null | string;
}

const defaultValues : CreateInvoice = {
  notas: null, 
  monto: null,
  CAE: null,
  fechaDeFactura: null,
  numeroDeFactura: null,
  periodo: null
}

export default function InvoiceHeader() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newInvoice, setNewInvoice] = useState<CreateInvoice>(defaultValues);
  const route = useRouter();

  const haveInvoice = newInvoice.monto !== null || 
                      newInvoice.CAE !== null || 
                      newInvoice.fechaDeFactura !== null || 
                      newInvoice.numeroDeFactura !== null || 
                      newInvoice.periodo !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if(haveInvoice){
      const resp = await createInvoice({
        ...newInvoice,
        monto: newInvoice.monto!,
        CAE: newInvoice.CAE!,
        fechaDeFactura: newInvoice.fechaDeFactura!,
        numeroDeFactura: newInvoice.numeroDeFactura!,
        periodo: newInvoice.periodo!,
        notas: newInvoice.notas ?? '',
        estado: "PENDIENTE"
      });
      if (resp.ok) {
        closeDialog(false);
        toast.success(resp.message, {
          position: 'bottom-left',
          autoClose: 5000,
        });
        route.refresh()
      } else {
        toast.error(resp.message, {
          position: 'bottom-left',
          autoClose: 5000,
        });
      }
    }
  }

  const onFileChange = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    // const result = await uploadFile(formData);
    // console.log(result)
    // console.log(pdf)
    const resp = await createPdf(file);
    if(resp){
      const monto = obtenerMonto(resp);
      const CAE = obtenerCae(resp);
      const fechaDeFactura = obtenerFechaEmision(resp);
      const numeroDeFactura = obtenerPuntoDeVentaYCompNro(resp);
      const periodo = obtenerPeriodoFacturado(resp);
      setNewInvoice({
        notas: newInvoice.notas,
        monto,
        CAE,
        fechaDeFactura,
        numeroDeFactura,
        periodo
      });
    }
  }

  const nombreEmpleado = '{nombreEmpleado}';

  const closeDialog = (value: boolean) => {
    setIsModalOpen(value);
    setNewInvoice(defaultValues); 
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Empleado {nombreEmpleado}</h1>
      <Dialog open={isModalOpen} onOpenChange={closeDialog}>
        <DialogTrigger asChild>
          <Button className='bg-blue-600 hover:bg-blue-500'>
            <Upload className="mr-2 h-4 w-4" /> Cargar Factura
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cargar nueva factura</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file">Factura</Label>
              <PdfUploader onFileChange={onFileChange} />
            </div>
            <div>
              <Label htmlFor="note">Nota (opcional)</Label>
              <textarea
                id="note"
                value={newInvoice.notas ?? ''}
                onChange={(e) => setNewInvoice({ ...newInvoice, notas: e.target.value })}
                rows={3}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                )}
              />
              {
                haveInvoice && (
                  <InvoiceInformation newInvoice={newInvoice} />
                )
              }
            </div>
            <Button className='bg-blue-600 hover:bg-blue-500 w-full' type="submit">Cargar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}