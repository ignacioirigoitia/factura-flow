'use client'

import SelectR from 'react-select';
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
  company: string[]
  status: "activo" | "inactivo"
}

interface UserFormProps {
  onSubmit: (user: Omit<User, "id">) => Promise<void>;
  companies: Company[];
}

export const UsersForm = ({ onSubmit, companies }: UserFormProps) => {

  const selectedEmployee = useAdminEmployeeStore(state => state.selectedEmployee);
  const setSelectedEmployee = useAdminEmployeeStore(state => state.setSelectedEmployee);

  const setOpenDialog = useAdminEmployeeStore(state => state.setOpenDialog);

  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();

  const [name, setName] = useState(selectedEmployee?.nombreCompleto || "")
  const [email, setEmail] = useState(selectedEmployee?.correo || "")
  const [role, setRole] = useState(selectedEmployee?.rol || "")
  const [phone, setPhone] = useState(selectedEmployee?.telefono || "")
  const [company, setCompany] = useState<string[]>(selectedEmployee?.companies.map(x => x.id) || [])
  const [status, setStatus] = useState<"activo" | "inactivo">(
    selectedEmployee?.activo ? 'activo' : 'inactivo'
  )

  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if(selectedEmployee){
      const resp = await updateEmployee({
        nombreCompleto: name,
        correo: email,
        telefono: phone,
        companiesId: company,
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
      setIsLoading(false);
      setOpenDialog(false)
      return;
    }
    await onSubmit({ name, email, role, phone, company, status })
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nombre completo
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
                        {r === 'administrator' ? 'super user' : r}
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
        <SelectR
          closeMenuOnSelect={false}
          isMulti
          options={companies.map((x) => {
            return { value: x.id, label: x.nombre }
          })}
          defaultValue={companies.filter(c => company.includes(c.id)).map(c => ({ value: c.id, label: c.nombre }))}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(option => option.value);
            setCompany(selectedValues);
          }}
          placeholder="Selecciona uno o más consultorios"
          noOptionsMessage={() => "No hay consultorios disponibles"}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="status" checked={status === "activo"} onCheckedChange={(checked) => setStatus(checked ? "activo" : "inactivo")} />
        <label htmlFor="status" className="text-sm font-medium">
          Activo
        </label>
      </div>
      <Button disabled={isLoading} type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
        {
          isLoading ? 'Cargando...' : selectedEmployee ? 'Actualizar' : 'Agregar'
        }
      </Button>
    </form>
  )
}
