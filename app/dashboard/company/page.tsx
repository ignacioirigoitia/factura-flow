'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Order = {
  id: number
  date: string
  supplier: string
  fileName: string
  note: string
  status: 'Pending' | 'Paid' | 'Cancelled'
}

const initialOrders: Order[] = [
  { id: 1, date: '2023-05-01', supplier: 'Acme Inc', fileName: 'INV-001.pdf', note: 'Monthly service', status: 'Pending' },
  { id: 2, date: '2023-05-15', supplier: 'TechCorp', fileName: 'INV-002.pdf', note: 'Equipment purchase', status: 'Paid' },
  { id: 3, date: '2023-05-30', supplier: 'ConsultCo', fileName: 'INV-003.pdf', note: 'Consulting fees', status: 'Cancelled' },
]

export default function CompanyPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState<Order['status'] | ''>('')

  const handleStatusChange = (orderId: number, status: Order['status']) => {
    setSelectedOrder(orders.find(order => order.id === orderId) || null)
    setNewStatus(status)
    setIsModalOpen(true)
  }

  const confirmStatusChange = () => {
    if (selectedOrder && newStatus) {
      setOrders(orders.map(order => 
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      ))
      setIsModalOpen(false)
      setSelectedOrder(null)
      setNewStatus('')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Company Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.supplier}</TableCell>
              <TableCell>{order.fileName}</TableCell>
              <TableCell>{order.note}</TableCell>
              <TableCell>
                <Select 
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                          order.status === 'Paid' ? 'bg-green-200 text-green-800' :
                          'bg-red-200 text-red-800'}`}>
                        {order.status}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to change the status of order #{selectedOrder?.id} to:
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold
              ${newStatus === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                newStatus === 'Paid' ? 'bg-green-200 text-green-800' :
                'bg-red-200 text-red-800'}`}>
              {newStatus}
            </span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmStatusChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}