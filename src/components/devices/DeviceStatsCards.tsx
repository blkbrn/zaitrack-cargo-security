import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Radio,
  Wifi,
  WifiOff,
  Battery,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface DeviceStatsCardsProps {
  totalDevices: number
  onlineDevices: number
  offlineDevices: number
  lowBatteryDevices: number
  errorDevices: number
}

export function DeviceStatsCards({
  totalDevices,
  onlineDevices,
  offlineDevices,
  lowBatteryDevices,
  errorDevices
}: DeviceStatsCardsProps) {
  const connectionRate = totalDevices > 0 ? Math.round((onlineDevices / totalDevices) * 100) : 0
  const batteryHealthScore = totalDevices > 0 ? Math.round(((totalDevices - lowBatteryDevices) / totalDevices) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          <Radio className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDevices}</div>
          <p className="text-xs text-muted-foreground">
            Registered devices
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Online</CardTitle>
          <Wifi className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{onlineDevices}</div>
          <p className="text-xs text-muted-foreground">
            Active connections
          </p>
          <div className="flex items-center text-xs text-green-600 mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>{connectionRate}% uptime</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offline</CardTitle>
          <WifiOff className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{offlineDevices}</div>
          <p className="text-xs text-muted-foreground">
            Disconnected devices
          </p>
          {offlineDevices > 0 && (
            <Badge variant="destructive" className="mt-2 text-xs">
              Attention Required
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Battery</CardTitle>
          <Battery className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{lowBatteryDevices}</div>
          <p className="text-xs text-muted-foreground">
            Need maintenance
          </p>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Activity className="h-3 w-3 mr-1" />
            <span>{batteryHealthScore}% healthy</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Errors</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{errorDevices}</div>
          <p className="text-xs text-muted-foreground">
            Device malfunctions
          </p>
          {errorDevices > 0 && (
            <Badge variant="destructive" className="mt-2 text-xs">
              Critical
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
