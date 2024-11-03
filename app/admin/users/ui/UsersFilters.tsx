'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Company } from '@/interfaces'

interface Props {
  companies: Company[]
}

export const UsersFilters = ({companies}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener los valores de los parámetros de búsqueda en la URL
  const initialFilters = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    company: searchParams.get('company') || 'all',
    status: searchParams.get('status') || 'all'
  };

  const [filters, setFilters] = useState(initialFilters);

  // Actualizar los parámetros en la URL cada vez que cambian los filtros
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.name) params.set('name', filters.name);
    if (filters.email) params.set('email', filters.email);
    if (filters.company !== 'all') params.set('company', filters.company);
    if (filters.status !== 'all') params.set('status', filters.status);

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  return (
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
          <Select
            value={filters.company}
            onValueChange={(value) => setFilters({ ...filters, company: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por consultorio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los consultorios</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
