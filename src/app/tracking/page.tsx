import { AppLayout } from '@/components/layout/AppLayout'
import { TrackingMap } from '@/components/tracking/TrackingMap'
import { AssetStatusPanel } from '@/components/tracking/AssetStatusPanel'
import { TrackingFilters } from '@/components/tracking/TrackingFilters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Navigation,
  Activity,
  AlertTriangle,
  Wifi,
  WifiOff,
  RefreshCw,
  Maximize
} from 'lucide-react'
import { mockAssets, mockDevices } from '@/lib/mockData'

export default function TrackingPage() {
  const onlineDevices = mockDevices.filter(device => device.status === 'online').length
  const totalDevices = mockDevices.length
  const activeAssets = mockAssets.filter(asset => asset.status === 'in_transit').length
  const alertAssets = mockAssets.filter(asset => asset.status === 'alert').length

  return (
    <AppLayout
      title="Real-Time Tracking"
      subtitle="Monitor live asset locations and status"
    >
      <div className="space-y-6">
        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Assets</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeAssets}</div>
              <p className="text-xs text-muted-foreground">
                Currently tracking
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{alertAssets}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Device Status</CardTitle>
              <Wifi className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {onlineDevices}/{totalDevices}
              </div>
              <p className="text-xs text-muted-foreground">
                Online devices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <Badge variant="outline" className="text-xs">
                  LIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tracking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Navigation className="h-5 w-5" />
                      <span>Live Asset Tracking</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Real-time location monitoring with GPS precision
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Maximize className="h-4 w-4 mr-2" />
                      Fullscreen
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Tracking Filters */}
                <div className="p-6 border-b">
                  <TrackingFilters />
                </div>

                {/* Map Container */}
                <div className="h-[600px] w-full">
                  <TrackingMap assets={mockAssets} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Asset Status Panel */}
          <div className="lg:col-span-1">
            <AssetStatusPanel assets={mockAssets} devices={mockDevices} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
