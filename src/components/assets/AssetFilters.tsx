'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, X, Calendar } from 'lucide-react'
import type { AssetStatus, AssetType } from '@/types'

interface AssetFiltersProps {
  onFiltersChange?: (filters: FilterState) => void
}

interface FilterState {
  search: string
  status: AssetStatus | 'all'
  type: AssetType | 'all'
  location: string
  dateRange: {
    from?: Date
    to?: Date
  }
}

export function AssetFilters({ onFiltersChange }: AssetFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    type: 'all',
    location: '',
    dateRange: {}
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)

    // Update active filters for display
    const active: string[] = []
    if (newFilters.search) active.push(`Search: ${newFilters.search}`)
    if (newFilters.status !== 'all') active.push(`Status: ${newFilters.status}`)
    if (newFilters.type !== 'all') active.push(`Type: ${newFilters.type}`)
    if (newFilters.location) active.push(`Location: ${newFilters.location}`)

    setActiveFilters(active)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      search: '',
      status: 'all' as const,
      type: 'all' as const,
      location: '',
      dateRange: {}
    }
    setFilters(resetFilters)
    setActiveFilters([])
    onFiltersChange?.(resetFilters)
  }

  const removeFilter = (filterText: string) => {
    const newFilters = { ...filters }

    if (filterText.startsWith('Search:')) {
      newFilters.search = ''
    } else if (filterText.startsWith('Status:')) {
      newFilters.status = 'all'
    } else if (filterText.startsWith('Type:')) {
      newFilters.type = 'all'
    } else if (filterText.startsWith('Location:')) {
      newFilters.location = ''
    }

    setFilters(newFilters)
    onFiltersChange?.(newFilters)
    setActiveFilters(activeFilters.filter(f => f !== filterText))
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets by name, ID, or client..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="alert">Alert</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="container">Container</SelectItem>
            <SelectItem value="truck">Truck</SelectItem>
            <SelectItem value="trailer">Trailer</SelectItem>
            <SelectItem value="pallet">Pallet</SelectItem>
            <SelectItem value="package">Package</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Input
          placeholder="Location"
          className="w-full sm:w-[140px]"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />

        {/* Clear Filters */}
        {activeFilters.length > 0 && (
          <Button variant="outline" onClick={clearAllFilters}>
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
