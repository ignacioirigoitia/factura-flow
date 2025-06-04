'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Upload } from 'lucide-react'

import { cn } from "@/lib/utils"
import PdfUploader from "../pdf-uploader/PdfUploader"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { uploadFile } from "@/actions"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Company } from "@/interfaces"
import { createAdminInvoice } from "@/actions/admin-invoices/create-admin-invoice"

export interface CreateAdminInvoice {
  notas: null | string;
  fecha: Date;
  nombreArchivo: string;
  concepto: string;
}

const defaultValues: CreateAdminInvoice = {
  notas: "",
  fecha: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000),
  nombreArchivo: '',
  concepto: '',
}

interface Props {
  companies: Company[];
}

export default function InvoiceAdminHeader({ companies }: Props) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newInvoice, setNewInvoice] = useState<CreateAdminInvoice>(defaultValues);
  const [company, setCompany] = useState<string>(companies[0].id)
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newInvoice.nombreArchivo) {
      const resp = await createAdminInvoice({...newInvoice, companyId: company});
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
    } else {
      toast.error('Por favor, carga un archivo de factura.', {
        position: 'bottom-left',
        autoClose: 5000,
      });
    }
  }

  const onFileChange = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    await uploadFile(formData);
    setNewInvoice({
      ...newInvoice,
      nombreArchivo: file.name,
    })
  }

  const closeDialog = (value: boolean) => {
    setIsModalOpen(value);
    setNewInvoice(defaultValues);
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
        Mis Facturas
      </h1>
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
            {
              companies.length > 1 && (
                <Select value={company} onValueChange={setCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un consultorio" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            }
            <div>
              <Label htmlFor="concepto">Concepto</Label>
              <input
                id="concepto"
                type="text"
                value={newInvoice.concepto}
                onChange={(e) => setNewInvoice({ ...newInvoice, concepto: e.target.value })}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2"
                )}
              />
            </div>
            <div>
              <Label htmlFor="fecha">Fecha de Factura</Label>
              <input
                id="fecha"
                type="date"
                value={newInvoice.fecha.toISOString().split('T')[0]}
                onChange={(e) => setNewInvoice({ ...newInvoice, fecha: new Date(e.target.value) })}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2"
                )}
              />
            </div>
            <div>
              <Label htmlFor="note">Nota (opcional)</Label>
              <textarea
                id="note"
                value={newInvoice.notas ?? ''}
                onChange={(e) => setNewInvoice({ ...newInvoice, notas: e.target.value })}
                rows={3}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                )}
              />
            </div>
            <Button className='bg-blue-600 hover:bg-blue-500 w-full' type="submit">Cargar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}