'use client'

import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Settings,
  Link,
  Unlink,
  ChevronLeft,
  ChevronRight,
  Radio,
  Battery,
  Signal,
  Wifi,
  WifiOff
} from 'lucide-react'
import type { Device, DeviceStatus, DeviceType } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { mockAssets } from '@/lib/mockData'

interface DeviceTableProps {
  devices: Device[]
}

const getStatusVariant = (status: DeviceStatus) => {
  switch (status) {
    case 'online':
      return 'default'
    case 'offline':
      return 'destructive'
    case 'low_battery':
      return 'secondary'
    case 'error':
      return 'destructive'
    default:
      return 'secondary'
  }
}

const getStatusIcon = (status: DeviceStatus) => {
  switch (status) {
    case 'online':
      return <Wifi className="h-4 w-4 text-green-500" />
    case 'offline':
      return <WifiOff className="h-4 w-4 text-red-500" />
    case 'low_battery':
      return <Battery className="h-4 w-4 text-orange-500" />
    case 'error':
      return <Radio className="h-4 w-4 text-red-500" />
    default:
      return <Radio className="h-4 w-4 text-gray-500" />
  }
}

const getTypeIcon = (type: DeviceType) => {
  switch (type) {
    case 'gps_tracker':
      return '📍'
    case 'door_sensor':
      return '🚪'
    case 'temperature_sensor':
      return '🌡️'
    case 'shock_sensor':
      return '⚠️'
    case 'fuel_sensor':
      return '⛽'
    default:
      return '📱'
  }
}

const getTypeLabel = (type: DeviceType) => {
  switch (type) {
    case 'gps_tracker':
      return 'GPS Tracker'
    case 'door_sensor':
      return 'Door Sensor'
    case 'temperature_sensor':
      return 'Temperature Sensor'
    case 'shock_sensor':
      return 'Shock Sensor'
    case 'fuel_sensor':
      return 'Fuel Sensor'
    default:
      return type
  }
}

const getBatteryColor = (level?: number) => {
  if (!level) return 'bg-gray-400'
  if (level > 50) return 'bg-green-500'
  if (level > 20) return 'bg-orange-500'
  return 'bg-red-500'
}

const getSignalBars = (strength?: number) => {
  if (!strength) return 0
  if (strength > 80) return 4
  if (strength > 60) return 3
  if (strength > 40) return 2
  return 1
}

export function DeviceTable({ devices }: DeviceTableProps) {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns: ColumnDef<Device>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Device
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const device = row.original
        return (
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getTypeIcon(device.type)}</div>
            <div>
              <div className="font-medium">{device.name}</div>
              <div className="text-sm text-muted-foreground">
                {getTypeLabel(device.type)}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const device = row.original
        return (
          <div className="flex items-center space-x-2">
            {getStatusIcon(device.status)}
            <Badge variant={getStatusVariant(device.status)}>
              {device.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'batteryLevel',
      header: 'Battery',
      cell: ({ row }) => {
        const device = row.original
        const batteryLevel = device.batteryLevel || 0
        return (
          <div className="flex items-center space-x-2 w-24">
            <Battery className={`h-4 w-4 ${
              batteryLevel > 50 ? 'text-green-500' :
              batteryLevel > 20 ? 'text-orange-500' : 'text-red-500'
            }`} />
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>{batteryLevel}%</span>
              </div>
              <Progress value={batteryLevel} className="h-2" />
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'signalStrength',
      header: 'Signal',
      cell: ({ row }) => {
        const device = row.original
        const strength = device.signalStrength || 0
        const bars = getSignalBars(strength)
        return (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-0.5">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1 h-3 rounded-sm ${
                    i < bars ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{strength}%</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'firmwareVersion',
      header: 'Firmware',
      cell: ({ row }) => {
        const device = row.original
        const isOutdated = device.firmwareVersion < '2.0.0' // Simple version check
        return (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono">v{device.firmwareVersion}</span>
            {isOutdated && (
              <Badge variant="outline" className="text-xs">
                Update Available
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'assignedAssetId',
      header: 'Assignment',
      cell: ({ row }) => {
        const device = row.original
        const assignedAsset = device.assignedAssetId
          ? mockAssets.find(asset => asset.id === device.assignedAssetId)
          : null

        return (
          <div className="flex items-center space-x-2">
            {assignedAsset ? (
              <>
                <Link className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-sm font-medium">{assignedAsset.name}</div>
                  <div className="text-xs text-muted-foreground">{assignedAsset.type}</div>
                </div>
              </>
            ) : (
              <>
                <Unlink className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-muted-foreground">Unassigned</span>
              </>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'lastHeartbeat',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Last Seen
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const device = row.original
        return (
          <div className="text-sm text-muted-foreground">
            {device.lastHeartbeat
              ? formatDistanceToNow(device.lastHeartbeat, { addSuffix: true })
              : 'Never'
            }
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const device = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Device
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {device.assignedAssetId ? (
                <DropdownMenuItem>
                  <Unlink className="mr-2 h-4 w-4" />
                  Unassign from Asset
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Link className="mr-2 h-4 w-4" />
                  Assign to Asset
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Device
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: devices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  })

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`hover:bg-muted/50 ${
                    row.original.status === 'offline' ? 'border-l-4 border-l-red-500' :
                    row.original.status === 'low_battery' ? 'border-l-4 border-l-orange-500' :
                    row.original.status === 'error' ? 'border-l-4 border-l-red-600' : ''
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No devices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} entries
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
              .slice(
                Math.max(0, table.getState().pagination.pageIndex - 2),
                Math.min(table.getPageCount(), table.getState().pagination.pageIndex + 3)
              )
              .map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={
                    pageNumber === table.getState().pagination.pageIndex + 1
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => table.setPageIndex(pageNumber - 1)}
                  className="w-8 h-8 p-0"
                >
                  {pageNumber}
                </Button>
              ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
