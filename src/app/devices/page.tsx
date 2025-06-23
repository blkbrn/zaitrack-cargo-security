import { AppLayout } from '@/components/layout/AppLayout'
import { DeviceTable } from '@/components/devices/DeviceTable'
import { DeviceFilters } from '@/components/devices/DeviceFilters'
import { DeviceStatsCards } from '@/components/devices/DeviceStatsCards'
import { DeviceRegistrationForm } from '@/components/devices/DeviceRegistrationForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Settings, Radio, Wifi } from 'lucide-react'
import { mockDevices } from '@/lib/mockData'

export default function DevicesPage() {
  const totalDevices = mockDevices.length
  const onlineDevices = mockDevices.filter(device => device.status === 'online').length
  const offlineDevices = mockDevices.filter(device => device.status === 'offline').length
  const lowBatteryDevices = mockDevices.filter(device => device.status === 'low_battery').length
  const errorDevices = mockDevices.filter(device => device.status === 'error').length

  return (
    <AppLayout
      title="Device Management"
      subtitle="Monitor and manage all IoT devices and sensors"
    >
      <div className="space-y-6">
        {/* Device Statistics */}
        <DeviceStatsCards
          totalDevices={totalDevices}
          onlineDevices={onlineDevices}
          offlineDevices={offlineDevices}
          lowBatteryDevices={lowBatteryDevices}
          errorDevices={errorDevices}
        />

        {/* Main Device Management */}
        <Tabs defaultValue="devices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="devices">
              <Radio className="mr-2 h-4 w-4" />
              All Devices
            </TabsTrigger>
            <TabsTrigger value="register">
              <Plus className="mr-2 h-4 w-4" />
              Register Device
            </TabsTrigger>
            <TabsTrigger value="configuration">
              <Settings className="mr-2 h-4 w-4" />
              Configuration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Device Inventory</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Monitor all registered devices and their status
                    </p>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Device
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DeviceFilters />
                <DeviceTable devices={mockDevices} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register" className="space-y-6">
            <DeviceRegistrationForm />
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Configuration</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage device settings and firmware updates
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Device configuration panel coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
