import { AppLayout } from '@/components/layout/AppLayout'
import { AssetTable } from '@/components/assets/AssetTable'
import { AssetFilters } from '@/components/assets/AssetFilters'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Truck, AlertTriangle, MapPin, Activity } from 'lucide-react'
import { mockAssets } from '@/lib/mockData'

export default function AssetsPage() {
  const totalAssets = mockAssets.length
  const activeAssets = mockAssets.filter(asset => asset.status === 'in_transit').length
  const alertAssets = mockAssets.filter(asset => asset.status === 'alert').length
  const idleAssets = mockAssets.filter(asset => asset.status === 'idle').length

  return (
    <AppLayout
      title="Asset Management"
      subtitle="Manage and monitor all cargo assets and containers"
    >
      <div className="space-y-6">
        {/* Asset Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAssets}</div>
              <p className="text-xs text-muted-foreground">
                All registered assets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeAssets}</div>
              <p className="text-xs text-muted-foreground">
                Currently moving
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
              <CardTitle className="text-sm font-medium">Idle</CardTitle>
              <MapPin className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{idleAssets}</div>
              <p className="text-xs text-muted-foreground">
                Not moving
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Management Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Assets</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage and monitor all your cargo assets
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <AssetFilters />

            {/* Asset Table */}
            <AssetTable assets={mockAssets} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
