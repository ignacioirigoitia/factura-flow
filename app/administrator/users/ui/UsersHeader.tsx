'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { UsersForm } from "./UsersForm"
import { useAdminEmployeeStore } from "@/store/admin/employee-store"




export const UsersHeader = () => {

  const openDialog = useAdminEmployeeStore(state => state.openDialog);
  const setOpenDialog = useAdminEmployeeStore(state => state.setOpenDialog);
  const setSelectedEmployee = useAdminEmployeeStore(state => state.setSelectedEmployee);
  const selectedEmployee = useAdminEmployeeStore(state => state.selectedEmployee);

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Gestión de usuarios</h1>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setSelectedEmployee(null)}>
            <Plus className="mr-2 h-4 w-4" /> Agregar usuario
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEmployee ? "Editar" : "Agregar"}</DialogTitle>
          </DialogHeader>
          <UsersForm
            user={null}
            onSubmit={() => {}}
          />
        </DialogContent>
      </Dialog>
    </header>
  )
}
