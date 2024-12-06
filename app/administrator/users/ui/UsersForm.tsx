'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  phone: string
  company: string
  status: "activo" | "inactivo"
}

interface UserFormProps {
  user?: User | null
  onSubmit: (user: Omit<User, "id">) => void
}

const roles = ["Admin", "Manager", "Employee", "Guest"];
const companies = ["Acme Inc", "Globex Corp", "Initech", "Umbrella Corp"]


export const UsersForm = ({ user, onSubmit }: UserFormProps) => {
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [role, setRole] = useState(user?.role || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [company, setCompany] = useState(user?.company || "")
  const [status, setStatus] = useState<"activo" | "inactivo">(user?.status || "activo")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium">
          Rol
        </label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
              <SelectItem key={c} value={c}>
                {c}
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
        {user ? "Actualizar" : "Crear"}
      </Button>
    </form>
  )
}
