'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const InvoicesFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener los valores de los parámetros de búsqueda en la URL
  const initialFilters = {
    concept: searchParams.get('concept') || '',
    date: searchParams.get('date') || '',
  };

  const [filters, setFilters] = useState(initialFilters);

  // Actualizar los parámetros en la URL cada vez que cambian los filtros
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.concept) params.set('concept', filters.concept);
    if (filters.date) params.set('date', filters.date);

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Filtrar por concepto"
              value={filters.concept}
              onChange={(e) => setFilters({ ...filters, concept: e.target.value })}
              className="pl-8"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Filtrar por fecha"
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="pl-8 w-[160px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
