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
import { Search, Filter, X, Sliders } from 'lucide-react'
import type { DeviceStatus, DeviceType } from '@/types'

interface DeviceFiltersProps {
  onFiltersChange?: (filters: DeviceFilterState) => void
}

interface DeviceFilterState {
  search: string
  status: DeviceStatus | 'all'
  type: DeviceType | 'all'
  batteryLevel: 'all' | 'low' | 'medium' | 'high'
  firmwareStatus: 'all' | 'up_to_date' | 'outdated'
  assignmentStatus: 'all' | 'assigned' | 'unassigned'
}

export function DeviceFilters({ onFiltersChange }: DeviceFiltersProps) {
  const [filters, setFilters] = useState<DeviceFilterState>({
    search: '',
    status: 'all',
    type: 'all',
    batteryLevel: 'all',
    firmwareStatus: 'all',
    assignmentStatus: 'all'
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (key: keyof DeviceFilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)

    // Update active filters for display
    const active: string[] = []
    if (newFilters.search) active.push(`Search: ${newFilters.search}`)
    if (newFilters.status !== 'all') active.push(`Status: ${newFilters.status}`)
    if (newFilters.type !== 'all') active.push(`Type: ${newFilters.type}`)
    if (newFilters.batteryLevel !== 'all') active.push(`Battery: ${newFilters.batteryLevel}`)
    if (newFilters.firmwareStatus !== 'all') active.push(`Firmware: ${newFilters.firmwareStatus}`)
    if (newFilters.assignmentStatus !== 'all') active.push(`Assignment: ${newFilters.assignmentStatus}`)

    setActiveFilters(active)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      search: '',
      status: 'all' as const,
      type: 'all' as const,
      batteryLevel: 'all' as const,
      firmwareStatus: 'all' as const,
      assignmentStatus: 'all' as const
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
    } else if (filterText.startsWith('Battery:')) {
      newFilters.batteryLevel = 'all'
    } else if (filterText.startsWith('Firmware:')) {
      newFilters.firmwareStatus = 'all'
    } else if (filterText.startsWith('Assignment:')) {
      newFilters.assignmentStatus = 'all'
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
            placeholder="Search devices by name, ID, or asset..."
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
            <SelectItem value="online">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Online</span>
              </div>
            </SelectItem>
            <SelectItem value="offline">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>Offline</span>
              </div>
            </SelectItem>
            <SelectItem value="low_battery">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Low Battery</span>
              </div>
            </SelectItem>
            <SelectItem value="error">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-600" />
                <span>Error</span>
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
            <SelectValue placeholder="Device Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="gps_tracker">GPS Tracker</SelectItem>
            <SelectItem value="door_sensor">Door Sensor</SelectItem>
            <SelectItem value="temperature_sensor">Temperature</SelectItem>
            <SelectItem value="shock_sensor">Shock Sensor</SelectItem>
            <SelectItem value="fuel_sensor">Fuel Sensor</SelectItem>
          </SelectContent>
        </Select>

        {/* Battery Level Filter */}
        <Select
          value={filters.batteryLevel}
          onValueChange={(value) => handleFilterChange('batteryLevel', value)}
        >
          <SelectTrigger className="w-full sm:w-[130px]">
            <SelectValue placeholder="Battery" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="high">High (&gt;50%)</SelectItem>
            <SelectItem value="medium">Medium (20-50%)</SelectItem>
            <SelectItem value="low">Low (&lt;20%)</SelectItem>
          </SelectContent>
        </Select>

        {/* Assignment Status */}
        <Select
          value={filters.assignmentStatus}
          onValueChange={(value) => handleFilterChange('assignmentStatus', value)}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Assignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Devices</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
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

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm">
          <Sliders className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>

        {/* Filter Summary */}
        <div className="text-sm text-muted-foreground">
          {activeFilters.length === 0 ? 'No filters applied' : `${activeFilters.length} filter${activeFilters.length > 1 ? 's' : ''} active`}
        </div>
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
