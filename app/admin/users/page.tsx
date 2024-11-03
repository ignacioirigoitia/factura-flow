"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Trash2, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface User {
  id: number
  name: string
  email: string
  role: string
  phone: string
  company: string
  status: "activo" | "inactivo"
}

const roles = ["Admin", "Manager", "Employee", "Guest"]
const companies = ["Acme Inc", "Globex Corp", "Initech", "Umbrella Corp"]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", phone: "123-456-7890", company: "Acme Inc", status: "activo" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", phone: "098-765-4321", company: "Globex Corp", status: "activo" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Employee", phone: "555-555-5555", company: "Initech", status: "inactivo" },
  ])
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    company: "",
    status: "",
  })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      (filters.company === "" || user.company === filters.company) &&
      (filters.status === "" || user.status === filters.status)
    )
  })

  const handleAddUser = (user: Omit<User, "id">) => {
    const newUser = {
      ...user,
      id: users.length + 1,
    }
    setUsers([...users, newUser])
    setIsDialogOpen(false)
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="container mx-auto p-6 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de usuarios</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setEditingUser(null)}>
              <Plus className="mr-2 h-4 w-4" /> Agregar usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Editar" : "Agregar"}</DialogTitle>
            </DialogHeader>
            <UserForm
              user={editingUser}
              onSubmit={(user) => (editingUser ? handleEditUser({ ...user, id: editingUser.id }) : handleAddUser(user))}
            />
          </DialogContent>
        </Dialog>
      </header>



      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Filtrar por nombre"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="pl-8"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Filtrar por correo"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                className="pl-8"
              />
            </div>
            <Select value={filters.company} onValueChange={(value) => setFilters({ ...filters, company: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por consultorio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los consultorios</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="activo">activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Telefóno</TableHead>
                <TableHead>Consultorio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {user.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingUser(user)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

interface UserFormProps {
  user?: User | null
  onSubmit: (user: Omit<User, "id">) => void
}

function UserForm({ user, onSubmit }: UserFormProps) {
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