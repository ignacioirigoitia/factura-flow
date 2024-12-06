'use client'

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CompanyForm } from "./CompanyForm"
import { useAdminCompanyStore } from "@/store"


export const CompanyHeader = () => {

  const openDialog = useAdminCompanyStore(state => state.openDialog);
  const setOpenDialog = useAdminCompanyStore(state => state.setOpenDialog);
  const setSelectedCompany = useAdminCompanyStore(state => state.setSelectedCompany);
  const selectedCompany = useAdminCompanyStore(state => state.selectedCompany);

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Gestión de consultorios</h1>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className='bg-blue-600 hover:bg-blue-500' onClick={() => setSelectedCompany(null)}>
            <Plus className="mr-2 h-4 w-4" /> Agregar consultorio
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCompany ? "Editar consultorio" : "Agregar nuevo consultorio"}
            </DialogTitle>
          </DialogHeader>
          <CompanyForm
            company={selectedCompany}
            closeDialog={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </header>
  )
}
