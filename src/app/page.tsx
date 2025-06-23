import { AppLayout } from '@/components/layout/AppLayout'
import { KPICard } from '@/components/dashboard/KPICard'
import { RecentAlerts } from '@/components/dashboard/RecentAlerts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Truck, Radio, AlertTriangle, MapPin, Clock, Activity } from 'lucide-react'
import { mockDashboardKPIs, mockAlerts, mockAssets, mockDevices } from '@/lib/mockData'

export default function DashboardPage() {
  const onlineDevices = mockDevices.filter(device => device.status === 'online').length
  const activeAssets = mockAssets.filter(asset => asset.status === 'in_transit').length
  const unreadAlerts = mockAlerts.filter(alert => !alert.isResolved).length

  return (
    <AppLayout title="Dashboard" subtitle="Real-time overview of your cargo security system">
      <div className="space-y-6">
        {/* KPI Cards Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockDashboardKPIs.map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Alerts */}
          <div className="lg:col-span-2">
            <RecentAlerts alerts={mockAlerts} />
          </div>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">System Online</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  All systems operational
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Radio className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Online Devices</span>
                  </div>
                  <span className="text-sm font-medium">{onlineDevices}/{mockDevices.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Active Assets</span>
                  </div>
                  <span className="text-sm font-medium">{activeAssets}/{mockAssets.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Open Alerts</span>
                  </div>
                  <span className="text-sm font-medium">{unreadAlerts}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Geofences</span>
                  </div>
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full rounded-lg border border-dashed border-gray-300 p-3 text-left text-sm hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Add New Asset</span>
                </div>
              </button>

              <button className="w-full rounded-lg border border-dashed border-gray-300 p-3 text-left text-sm hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Radio className="h-4 w-4" />
                  <span>Register Device</span>
                </div>
              </button>

              <button className="w-full rounded-lg border border-dashed border-gray-300 p-3 text-left text-sm hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Create Geofence</span>
                </div>
              </button>

              <button className="w-full rounded-lg border border-dashed border-gray-300 p-3 text-left text-sm hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Generate Report</span>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="font-medium">Device GT-001 came online</p>
                    <p className="text-muted-foreground text-xs">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="font-medium">Asset CTR-001 entered NYC zone</p>
                    <p className="text-muted-foreground text-xs">15 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-orange-500 mt-2" />
                  <div>
                    <p className="font-medium">Speed violation resolved</p>
                    <p className="text-muted-foreground text-xs">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
