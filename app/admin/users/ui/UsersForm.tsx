'use client'

import { updateEmployee } from "@/actions/employee/update-employee"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Company } from "@/interfaces"
import { useAdminEmployeeStore } from "@/store/admin/employee-store"
import { Role } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export interface User {
  id: number
  name: string
  email: string
  role: string
  phone: string
  company: string
  status: "activo" | "inactivo"
}

interface UserFormProps {
  onSubmit: (user: Omit<User, "id">) => void;
  companies: Company[];
}

export const UsersForm = ({ onSubmit, companies }: UserFormProps) => {

  const selectedEmployee = useAdminEmployeeStore(state => state.selectedEmployee);
  const setSelectedEmployee = useAdminEmployeeStore(state => state.setSelectedEmployee);

  const setOpenDialog = useAdminEmployeeStore(state => state.setOpenDialog);

  const route = useRouter();

  const [name, setName] = useState(selectedEmployee?.nombreCompleto || "")
  const [email, setEmail] = useState(selectedEmployee?.correo || "")
  const [role, setRole] = useState(selectedEmployee?.rol || "")
  const [phone, setPhone] = useState(selectedEmployee?.telefono || "")
  const [company, setCompany] = useState(selectedEmployee?.companyId || "")
  const [status, setStatus] = useState<"activo" | "inactivo">(
    selectedEmployee?.activo ? 'activo' : 'inactivo'
  )

  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(selectedEmployee){
      const resp = await updateEmployee({
        nombreCompleto: name,
        correo: email,
        telefono: phone,
        companyId: company,
        activo: status === "activo",
        id: selectedEmployee.id
      })
      setSelectedEmployee(null);
      if(resp.ok){
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
      setOpenDialog(false)
      return;
    }
    onSubmit({ name, email, role, phone, company, status })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nombre
        </label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Correo
        </label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Telefóno
        </label>
        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      {
        session.data?.user.rol === 'administrator' && (
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Rol
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {
                  session.data?.user.rol === 'administrator' ? (
                    Object.values(Role).map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))
                  ) : ( 
                    Object.values(Role).filter(x => x !== 'administrator').map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))
                  )
                }
              </SelectContent>
            </Select>
          </div>
        )
      }
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium">
          Consultorio
        </label>
        <Select value={company} onValueChange={setCompany}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un consultorio" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="status" checked={status === "activo"} onCheckedChange={(checked) => setStatus(checked ? "activo" : "inactivo")} />
        <label htmlFor="status" className="text-sm font-medium">
          Activo
        </label>
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
        {selectedEmployee ? "Actualizar" : "Crear"}
      </Button>
    </form>
  )
}
