'use client'

import { createCompany, updateCompany } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Company } from "@/interfaces"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { toast } from "react-toastify"

interface CompanyFormProps {
  company?: Company | null
  closeDialog: () => void;
}

export const CompanyForm = ({ company, closeDialog }: CompanyFormProps) => {

  const route = useRouter();

  const [name, setName] = useState(company?.nombre ?? "");
  const [status, setStatus] = useState<boolean>(company?.activo ?? true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const resp = company 
      ? await updateCompany({ id: company.id, name, activo: status})
      : await createCompany({ name, activo: status });
      
    if (resp.ok) {
      closeDialog();
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nombre del consultorio
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus={true}
          placeholder="Ingresar el nombre"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="status"
          checked={status}
          onCheckedChange={(checked: boolean) => setStatus(checked)}
        />
        <label htmlFor="status" className="text-sm font-medium">
          Activa
        </label>
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
        {company ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  )
}
