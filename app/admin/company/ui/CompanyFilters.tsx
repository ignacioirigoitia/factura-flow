'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

type StatusType = "activo" | "inactivo" | "todos";

export const CompanyFilters = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener filtros actuales desde la URL
  const currentName = searchParams.get('name') ?? '';
  const currentStatus = searchParams.get('status') ?? 'todos';

  const [nameFilter, setNameFilter] = useState<string>(currentName);
  const [statusFilter, setStatusFilter] = useState<StatusType>(currentStatus as StatusType);

  // Actualiza la URL para cambiar los filtros
  const updateFilters = (name: string, status: StatusType) => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (status !== 'todos') params.set('status', status);

    router.push(`?${params.toString()}`); // Actualiza la URL con los nuevos parámetros
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNameFilter(name);
    updateFilters(name, statusFilter);
  };

  const handleChangeStatus = (status: StatusType) => {
    setStatusFilter(status);
    updateFilters(nameFilter, status);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex space-x-4">
          <Input
            placeholder="Filtrar por nombre"
            value={nameFilter}
            onChange={(e) => handleChangeName(e)}
            className="max-w-sm"
          />
          <Select 
            value={statusFilter} 
            onValueChange={(status: StatusType) => handleChangeStatus(status)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
