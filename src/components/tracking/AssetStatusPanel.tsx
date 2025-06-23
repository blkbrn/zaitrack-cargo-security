'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Truck,
  Package,
  Radio,
  MapPin,
  Clock,
  Battery,
  Signal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  ChevronRight
} from 'lucide-react'
import type { Asset, Device } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface AssetStatusPanelProps {
  assets: Asset[]
  devices: Device[]
}

export function AssetStatusPanel({ assets, devices }: AssetStatusPanelProps) {
  const [activeTab, setActiveTab] = useState<'assets' | 'devices'>('assets')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_transit':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'idle':
        return <Clock className="h-4 w-4 text-gray-500" />
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'offline':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'low_battery':
        return <Battery className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'in_transit':
      case 'online':
        return 'default'
      case 'alert':
      case 'offline':
        return 'destructive'
      case 'low_battery':
        return 'secondary'
      case 'idle':
      case 'delivered':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'truck':
      case 'trailer':
        return <Truck className="h-4 w-4" />
      case 'gps_tracker':
      case 'door_sensor':
      case 'temperature_sensor':
      case 'shock_sensor':
      case 'fuel_sensor':
        return <Radio className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-gray-400'
    if (level > 50) return 'text-green-500'
    if (level > 20) return 'text-orange-500'
    return 'text-red-500'
  }

  const getSignalBars = (strength?: number) => {
    if (!strength) return 0
    if (strength > 80) return 4
    if (strength > 60) return 3
    if (strength > 40) return 2
    return 1
  }

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Live Status</CardTitle>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'assets' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('assets')}
            className="flex-1 h-8"
          >
            <Truck className="h-3 w-3 mr-1" />
            Assets ({assets.length})
          </Button>
          <Button
            variant={activeTab === 'devices' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('devices')}
            className="flex-1 h-8"
          >
            <Radio className="h-3 w-3 mr-1" />
            Devices ({devices.length})
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          {activeTab === 'assets' ? (
            <div className="space-y-3">
              {assets.map((asset) => (
                <div key={asset.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(asset.type)}
                      <div>
                        <h4 className="font-medium text-sm">{asset.name}</h4>
                        <p className="text-xs text-muted-foreground">{asset.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(asset.status)}
                      <Badge variant={getStatusVariant(asset.status)} className="text-xs">
                        {asset.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{asset.location.address || 'Unknown location'}</span>
                    </div>

                    {asset.location.speed && asset.location.speed > 0 && (
                      <div className="flex items-center space-x-1">
                        <span>Speed: {asset.location.speed} km/h</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-1">
                      <Radio className="h-3 w-3" />
                      <span>{asset.assignedDevices.length} device{asset.assignedDevices.length !== 1 ? 's' : ''}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDistanceToNow(asset.updatedAt, { addSuffix: true })}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-1">
                      {asset.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {asset.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{asset.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {devices.map((device) => (
                <div key={device.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(device.type)}
                      <div>
                        <h4 className="font-medium text-sm">{device.name}</h4>
                        <p className="text-xs text-muted-foreground capitalize">
                          {device.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(device.status)}
                      <Badge variant={getStatusVariant(device.status)} className="text-xs">
                        {device.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* Battery Level */}
                    <div className="flex items-center space-x-1">
                      <Battery className={`h-3 w-3 ${getBatteryColor(device.batteryLevel)}`} />
                      <span>{device.batteryLevel || 0}%</span>
                    </div>

                    {/* Signal Strength */}
                    <div className="flex items-center space-x-1">
                      <Signal className="h-3 w-3" />
                      <div className="flex space-x-0.5">
                        {Array.from({ length: 4 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-2 rounded-sm ${
                              i < getSignalBars(device.signalStrength)
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground">
                        {device.signalStrength || 0}%
                      </span>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Firmware: v{device.firmwareVersion}</div>
                    {device.assignedAssetId && (
                      <div>
                        Asset: {assets.find(a => a.id === device.assignedAssetId)?.name || 'Unknown'}
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {device.lastHeartbeat
                          ? formatDistanceToNow(device.lastHeartbeat, { addSuffix: true })
                          : 'No signal'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-3">
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      Configure
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
