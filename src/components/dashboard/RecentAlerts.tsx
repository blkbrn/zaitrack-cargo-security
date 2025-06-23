import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, MapPin, Clock } from 'lucide-react'
import type { Alert } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface RecentAlertsProps {
  alerts: Alert[]
  maxItems?: number
}

export function RecentAlerts({ alerts, maxItems = 5 }: RecentAlertsProps) {
  const recentAlerts = alerts
    .filter(alert => !alert.isResolved)
    .slice(0, maxItems)

  const getSeverityVariant = (severity: string) => {
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'geofence_entry':
      case 'geofence_exit':
        return <MapPin className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {recentAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No active alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{alert.title}</p>
                    <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {alert.message}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                    {alert.location?.address && (
                      <>
                        <span className="mx-2">•</span>
                        <MapPin className="h-3 w-3 mr-1" />
                        {alert.location.address}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
