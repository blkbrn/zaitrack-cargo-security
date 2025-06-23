import { AppLayout } from '@/components/layout/AppLayout'
import { AlertTable } from '@/components/alerts/AlertTable'
import { AlertFilters } from '@/components/alerts/AlertFilters'
import { AlertStatsCards } from '@/components/alerts/AlertStatsCards'
import { AlertRuleManager } from '@/components/alerts/AlertRuleManager'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Settings, Bell, Clock } from 'lucide-react'
import { mockAlerts } from '@/lib/mockData'

export default function AlertsPage() {
  const unreadAlerts = mockAlerts.filter(alert => !alert.isResolved).length
  const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'critical').length
  const todayAlerts = mockAlerts.filter(alert => {
    const today = new Date()
    const alertDate = new Date(alert.createdAt)
    return alertDate.toDateString() === today.toDateString()
  }).length

  return (
    <AppLayout
      title="Alerts & Notifications"
      subtitle="Monitor and manage security alerts and system notifications"
    >
      <div className="space-y-6">
        {/* Alert Statistics */}
        <AlertStatsCards
          totalAlerts={mockAlerts.length}
          unreadAlerts={unreadAlerts}
          criticalAlerts={criticalAlerts}
          todayAlerts={todayAlerts}
        />

        {/* Main Alert Management */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">
              <Bell className="mr-2 h-4 w-4" />
              Active Alerts
            </TabsTrigger>
            <TabsTrigger value="rules">
              <Settings className="mr-2 h-4 w-4" />
              Alert Rules
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="mr-2 h-4 w-4" />
              Alert History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Alerts</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Monitor and respond to security alerts
                    </p>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Alert
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AlertFilters />
                <AlertTable alerts={mockAlerts.filter(alert => !alert.isResolved)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <AlertRuleManager />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <p className="text-sm text-muted-foreground">
                  View resolved and archived alerts
                </p>
              </CardHeader>
              <CardContent>
                <AlertFilters />
                <AlertTable alerts={mockAlerts} showResolved={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
