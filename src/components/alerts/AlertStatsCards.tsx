import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  Bell,
  Shield,
  Activity
} from 'lucide-react'

interface AlertStatsCardsProps {
  totalAlerts: number
  unreadAlerts: number
  criticalAlerts: number
  todayAlerts: number
}

export function AlertStatsCards({
  totalAlerts,
  unreadAlerts,
  criticalAlerts,
  todayAlerts
}: AlertStatsCardsProps) {
  const resolvedAlerts = totalAlerts - unreadAlerts
  const resolutionRate = totalAlerts > 0 ? Math.round((resolvedAlerts / totalAlerts) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAlerts}</div>
          <p className="text-xs text-muted-foreground">
            All time alerts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{unreadAlerts}</div>
          <p className="text-xs text-muted-foreground">
            Require attention
          </p>
          {unreadAlerts > 0 && (
            <Badge variant="destructive" className="mt-2 text-xs">
              Action Required
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
          <Shield className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{criticalAlerts}</div>
          <p className="text-xs text-muted-foreground">
            High priority issues
          </p>
          {criticalAlerts > 0 && (
            <Badge variant="destructive" className="mt-2 text-xs">
              Critical
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Alerts</CardTitle>
          <Activity className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{todayAlerts}</div>
          <p className="text-xs text-muted-foreground">
            New alerts today
          </p>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>Resolution rate: {resolutionRate}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
