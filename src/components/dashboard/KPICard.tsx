import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { DashboardKPI } from '@/types'

interface KPICardProps {
  kpi: DashboardKPI
}

export function KPICard({ kpi }: KPICardProps) {
  const getTrendIcon = () => {
    if (!kpi.change) return null

    if (kpi.changeType === 'positive') {
      return <TrendingUp className="h-3 w-3 text-green-500" />
    }
    if (kpi.changeType === 'negative') {
      return <TrendingDown className="h-3 w-3 text-red-500" />
    }
    return <Minus className="h-3 w-3 text-gray-500" />
  }

  const getTrendColor = () => {
    if (!kpi.change) return 'text-muted-foreground'

    if (kpi.changeType === 'positive') {
      return 'text-green-600'
    }
    if (kpi.changeType === 'negative') {
      return 'text-red-600'
    }
    return 'text-muted-foreground'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
        {kpi.icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {/* Icon would be rendered here based on kpi.icon string */}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpi.value.toLocaleString()}</div>
        {kpi.change !== undefined && (
          <div className={`flex items-center text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="ml-1">
              {Math.abs(kpi.change)}% from last period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
