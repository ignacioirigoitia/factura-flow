'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X, Upload } from 'lucide-react'

type Invoice = {
  id: number
  fileName: string
  date: string
  note: string
  status: 'Pending' | 'Paid' | 'Cancelled'
}

const initialInvoices: Invoice[] = [
  { id: 1, fileName: 'INV-001.pdf', date: '2023-05-01', note: 'Monthly service', status: 'Pending' },
  { id: 2, fileName: 'INV-002.pdf', date: '2023-05-15', note: 'Equipment purchase', status: 'Paid' },
  { id: 3, fileName: 'INV-003.pdf', date: '2023-05-30', note: 'Consulting fees', status: 'Cancelled' },
]

export default function SuppliersPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...invoices.map(inv => inv.id)) + 1
    setInvoices([...invoices, { ...newInvoice, id: newId, status: 'Pending' } as Invoice])
    setIsModalOpen(false)
    setNewInvoice({})
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className='bg-blue-600 hover:bg-blue-500'>
              <Upload className="mr-2 h-4 w-4" /> Upload Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Invoice</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setNewInvoice({ ...newInvoice, fileName: e.target.files?.[0]?.name })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newInvoice.date || ''}
                  onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="note">Note</Label>
                <Input
                  id="note"
                  value={newInvoice.note || ''}
                  onChange={(e) => setNewInvoice({ ...newInvoice, note: e.target.value })}
                  required
                />
              </div>
              <Button className='bg-blue-600 hover:bg-blue-500 w-full' type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.fileName}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.note}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${invoice.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    invoice.status === 'Paid' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'}`}>
                  {invoice.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}