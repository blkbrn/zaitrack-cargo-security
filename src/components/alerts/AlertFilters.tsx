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
import type { AlertSeverity, AlertType } from '@/types'

interface AlertFiltersProps {
  onFiltersChange?: (filters: AlertFilterState) => void
}

interface AlertFilterState {
  search: string
  severity: AlertSeverity | 'all'
  type: AlertType | 'all'
  status: 'all' | 'resolved' | 'unresolved'
  dateRange: {
    from?: Date
    to?: Date
  }
}

export function AlertFilters({ onFiltersChange }: AlertFiltersProps) {
  const [filters, setFilters] = useState<AlertFilterState>({
    search: '',
    severity: 'all',
    type: 'all',
    status: 'all',
    dateRange: {}
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (key: keyof AlertFilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)

    // Update active filters for display
    const active: string[] = []
    if (newFilters.search) active.push(`Search: ${newFilters.search}`)
    if (newFilters.severity !== 'all') active.push(`Severity: ${newFilters.severity}`)
    if (newFilters.type !== 'all') active.push(`Type: ${newFilters.type}`)
    if (newFilters.status !== 'all') active.push(`Status: ${newFilters.status}`)

    setActiveFilters(active)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      search: '',
      severity: 'all' as const,
      type: 'all' as const,
      status: 'all' as const,
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
    } else if (filterText.startsWith('Severity:')) {
      newFilters.severity = 'all'
    } else if (filterText.startsWith('Type:')) {
      newFilters.type = 'all'
    } else if (filterText.startsWith('Status:')) {
      newFilters.status = 'all'
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
            placeholder="Search alerts by title, message, or asset..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Severity Filter */}
        <Select
          value={filters.severity}
          onValueChange={(value) => handleFilterChange('severity', value)}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="critical">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>Critical</span>
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span>High</span>
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Medium</span>
              </div>
            </SelectItem>
            <SelectItem value="low">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                <span>Low</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Alert Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="speed_violation">Speed Violation</SelectItem>
            <SelectItem value="geofence_entry">Geofence Entry</SelectItem>
            <SelectItem value="geofence_exit">Geofence Exit</SelectItem>
            <SelectItem value="door_open">Door Open</SelectItem>
            <SelectItem value="temperature_alert">Temperature</SelectItem>
            <SelectItem value="device_offline">Device Offline</SelectItem>
            <SelectItem value="low_battery">Low Battery</SelectItem>
            <SelectItem value="unauthorized_stop">Unauthorized Stop</SelectItem>
            <SelectItem value="tamper_alert">Tamper Alert</SelectItem>
          </SelectContent>
        </Select>

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
            <SelectItem value="unresolved">Unresolved</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

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
