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
  Check,
  X,
  MapPin,
  AlertTriangle,
  Clock,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react'
import type { Alert, AlertSeverity, AlertType } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface AlertTableProps {
  alerts: Alert[]
  showResolved?: boolean
}

const getSeverityVariant = (severity: AlertSeverity) => {
  switch (severity) {
    case 'critical':
      return 'destructive'
    case 'high':
      return 'destructive'
    case 'medium':
      return 'default'
    case 'low':
      return 'secondary'
    default:
      return 'secondary'
  }
}

const getSeverityColor = (severity: AlertSeverity) => {
  switch (severity) {
    case 'critical':
      return 'text-red-600'
    case 'high':
      return 'text-red-500'
    case 'medium':
      return 'text-orange-500'
    case 'low':
      return 'text-gray-500'
    default:
      return 'text-gray-500'
  }
}

const getAlertTypeIcon = (type: AlertType) => {
  switch (type) {
    case 'speed_violation':
      return '🚗'
    case 'geofence_entry':
    case 'geofence_exit':
      return '📍'
    case 'door_open':
      return '🚪'
    case 'temperature_alert':
      return '🌡️'
    case 'device_offline':
      return '📡'
    case 'low_battery':
      return '🔋'
    case 'unauthorized_stop':
      return '⏹️'
    case 'tamper_alert':
      return '⚠️'
    default:
      return '🔔'
  }
}

const getAlertTypeLabel = (type: AlertType) => {
  switch (type) {
    case 'speed_violation':
      return 'Speed Violation'
    case 'geofence_entry':
      return 'Geofence Entry'
    case 'geofence_exit':
      return 'Geofence Exit'
    case 'door_open':
      return 'Door Open'
    case 'temperature_alert':
      return 'Temperature Alert'
    case 'device_offline':
      return 'Device Offline'
    case 'low_battery':
      return 'Low Battery'
    case 'unauthorized_stop':
      return 'Unauthorized Stop'
    case 'tamper_alert':
      return 'Tamper Alert'
    default:
      return type
  }
}

export function AlertTable({ alerts, showResolved = false }: AlertTableProps) {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns: ColumnDef<Alert>[] = [
    {
      accessorKey: 'severity',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Severity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const severity = row.getValue('severity') as AlertSeverity
        return (
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              severity === 'critical' ? 'bg-red-500' :
              severity === 'high' ? 'bg-red-400' :
              severity === 'medium' ? 'bg-orange-500' : 'bg-gray-500'
            }`} />
            <Badge variant={getSeverityVariant(severity)} className="text-xs">
              {severity.toUpperCase()}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('type') as AlertType
        return (
          <div className="flex items-center space-x-2">
            <span className="text-sm">{getAlertTypeIcon(type)}</span>
            <span className="font-medium">{getAlertTypeLabel(type)}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Alert
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const alert = row.original
        return (
          <div>
            <div className="font-medium">{alert.title}</div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {alert.message}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => {
        const alert = row.original
        return (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {alert.location?.address || 'Unknown location'}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt') as Date
        return (
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'isResolved',
      header: 'Status',
      cell: ({ row }) => {
        const alert = row.original
        return (
          <div className="flex items-center space-x-2">
            {alert.isResolved ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <Badge variant="outline" className="text-green-600">
                  Resolved
                </Badge>
                {alert.resolvedBy && (
                  <div className="text-xs text-muted-foreground">
                    by {alert.resolvedBy}
                  </div>
                )}
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <Badge variant="secondary">
                  Active
                </Badge>
              </>
            )}
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const alert = row.original

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
              {!alert.isResolved && (
                <>
                  <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Assign to User
                  </DropdownMenuItem>
                </>
              )}
              {alert.location && (
                <DropdownMenuItem>
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <X className="mr-2 h-4 w-4" />
                Dismiss Alert
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: alerts,
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
                    !row.original.isResolved && row.original.severity === 'critical'
                      ? 'border-l-4 border-l-red-500'
                      : !row.original.isResolved && row.original.severity === 'high'
                      ? 'border-l-4 border-l-orange-500'
                      : ''
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
                  No alerts found.
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
