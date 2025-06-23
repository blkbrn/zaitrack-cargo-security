'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Filter,
  MapPin,
  Activity,
  AlertTriangle,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react'

interface TrackingFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export function TrackingFilters({ onFiltersChange }: TrackingFiltersProps) {
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    showTrails: true,
    showGeofences: true,
    showLabels: true,
    autoRefresh: true
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const resetFilters = () => {
    const resetFilters = {
      status: 'all',
      type: 'all',
      showTrails: true,
      showGeofences: true,
      showLabels: true,
      autoRefresh: true
    }
    setFilters(resetFilters)
    onFiltersChange?.(resetFilters)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_transit">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>In Transit</span>
              </div>
            </SelectItem>
            <SelectItem value="alert">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>Alert</span>
              </div>
            </SelectItem>
            <SelectItem value="idle">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                <span>Idle</span>
              </div>
            </SelectItem>
            <SelectItem value="delivered">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Delivered</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter */}
      <Select
        value={filters.type}
        onValueChange={(value) => handleFilterChange('type', value)}
      >
        <SelectTrigger className="w-[130px] h-8">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="container">Container</SelectItem>
          <SelectItem value="truck">Truck</SelectItem>
          <SelectItem value="trailer">Trailer</SelectItem>
          <SelectItem value="package">Package</SelectItem>
        </SelectContent>
      </Select>

      {/* View Options */}
      <div className="flex items-center space-x-2 border-l pl-3">
        <span className="text-sm text-muted-foreground">View:</span>

        <Button
          variant={filters.showTrails ? "default" : "outline"}
          size="sm"
          className="h-8 px-3"
          onClick={() => handleFilterChange('showTrails', !filters.showTrails)}
        >
          <Activity className="h-3 w-3 mr-1" />
          Trails
        </Button>

        <Button
          variant={filters.showGeofences ? "default" : "outline"}
          size="sm"
          className="h-8 px-3"
          onClick={() => handleFilterChange('showGeofences', !filters.showGeofences)}
        >
          <MapPin className="h-3 w-3 mr-1" />
          Zones
        </Button>

        <Button
          variant={filters.showLabels ? "default" : "outline"}
          size="sm"
          className="h-8 px-3"
          onClick={() => handleFilterChange('showLabels', !filters.showLabels)}
        >
          {filters.showLabels ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        </Button>
      </div>

      {/* Auto Refresh */}
      <div className="flex items-center space-x-2 border-l pl-3">
        <Button
          variant={filters.autoRefresh ? "default" : "outline"}
          size="sm"
          className="h-8 px-3"
          onClick={() => handleFilterChange('autoRefresh', !filters.autoRefresh)}
        >
          <div className={`h-2 w-2 rounded-full mr-2 ${filters.autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          Auto Refresh
        </Button>

        {filters.autoRefresh && (
          <Badge variant="outline" className="text-xs">
            30s
          </Badge>
        )}
      </div>

      {/* Reset Filters */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-3"
        onClick={resetFilters}
      >
        <RotateCcw className="h-3 w-3 mr-1" />
        Reset
      </Button>
    </div>
  )
}
