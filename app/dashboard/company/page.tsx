'use client'
import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { IoDownload, IoEye } from 'react-icons/io5'
import Image from 'next/image'

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
  { id: 4, date: '2023-06-05', supplier: 'Acme Inc', fileName: 'INV-004.pdf', note: 'Additional services', status: 'Pending' },
  { id: 5, date: '2023-06-10', supplier: 'TechCorp', fileName: 'INV-005.pdf', note: 'Software licenses', status: 'Paid' },
]

export default function CompanyPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalFileOpen, setIsModalFileOpen] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState<Order['status'] | ''>('')
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'All'>('All')
  const [supplierFilter, setSupplierFilter] = useState<string>('All')

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

  const uniqueSuppliers = useMemo(() => {
    return ['All', ...Array.from(new Set(orders.map(order => order.supplier)))]
  }, [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      (statusFilter === 'All' || order.status === statusFilter) &&
      (supplierFilter === 'All' || order.supplier === supplierFilter)
    )
  }, [orders, statusFilter, supplierFilter])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Company Orders</h1>

      <Card className="mb-6">
        <CardContent className="pt-4">
          <h4 className='mb-2 font-bold'>Filters</h4>
          <div className="flex space-x-4">
            <div>
              <Select onValueChange={(value) => setStatusFilter(value as Order['status'] | 'All')}>
                <SelectTrigger id="status-filter" className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select onValueChange={(value) => setSupplierFilter(value)}>
                <SelectTrigger id="supplier-filter" className="w-[180px]">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueSuppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">


          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
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
                  <TableCell>
                    <button onClick={() => setIsModalFileOpen(order)} className='ml-3'>
                      <IoEye size={25} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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

      <Dialog open={isModalFileOpen !== null} onOpenChange={() => setIsModalFileOpen(null)} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File number: {isModalFileOpen?.id}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <Image 
              src={"https://res.cloudinary.com/dcyx4jnch/image/upload/v1728699140/invoice-preview_page-0001_hxyc92.jpg"}
              alt='Invoice preview'
              width={300}
              height={150}
            />
          </div>
          <DialogFooter>
            <button>
              <IoDownload size={25} className='mr-4' />
            </button>
            <Button variant="outline" onClick={() => setIsModalFileOpen(null)}>Go back</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}