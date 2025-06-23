'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Plus,
  CheckCircle,
  AlertCircle,
  Radio,
  Wifi,
  Truck,
  Package,
  Settings,
  QrCode,
  Import
} from 'lucide-react'
import type { DeviceType, AssetType } from '@/types'
import { mockAssets } from '@/lib/mockData'

interface DeviceFormData {
  name: string
  type: DeviceType
  serialNumber: string
  macAddress: string
  firmwareVersion: string
  manufacturer: string
  model: string
  description: string
  assignedAssetId?: string
  isActive: boolean
  configuration: {
    reportingInterval: number
    temperatureThresholds?: { min: number; max: number }
    speedThreshold?: number
    batteryLowThreshold: number
  }
}

export function DeviceRegistrationForm() {
  const [formData, setFormData] = useState<DeviceFormData>({
    name: '',
    type: 'gps_tracker',
    serialNumber: '',
    macAddress: '',
    firmwareVersion: '',
    manufacturer: '',
    model: '',
    description: '',
    assignedAssetId: '',
    isActive: true,
    configuration: {
      reportingInterval: 30,
      speedThreshold: 80,
      batteryLowThreshold: 20
    }
  })

  const [registrationStep, setRegistrationStep] = useState<'form' | 'configuration' | 'success'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getTypeIcon = (type: DeviceType) => {
    switch (type) {
      case 'gps_tracker': return '📍'
      case 'door_sensor': return '🚪'
      case 'temperature_sensor': return '🌡️'
      case 'shock_sensor': return '⚠️'
      case 'fuel_sensor': return '⛽'
      default: return '📱'
    }
  }

  const getTypeLabel = (type: DeviceType) => {
    switch (type) {
      case 'gps_tracker': return 'GPS Tracker'
      case 'door_sensor': return 'Door Sensor'
      case 'temperature_sensor': return 'Temperature Sensor'
      case 'shock_sensor': return 'Shock Sensor'
      case 'fuel_sensor': return 'Fuel Sensor'
      default: return type
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setRegistrationStep('success')
    setIsSubmitting(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'gps_tracker',
      serialNumber: '',
      macAddress: '',
      firmwareVersion: '',
      manufacturer: '',
      model: '',
      description: '',
      assignedAssetId: '',
      isActive: true,
      configuration: {
        reportingInterval: 30,
        speedThreshold: 80,
        batteryLowThreshold: 20
      }
    })
    setRegistrationStep('form')
  }

  if (registrationStep === 'success') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Device Registered Successfully!</h3>
              <p className="text-muted-foreground">
                {formData.name} has been added to your device inventory
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Register Another Device
              </Button>
              <Button variant="outline">
                View Device Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Registration Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                registrationStep === 'form' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                1
              </div>
              <span className={registrationStep === 'form' ? 'font-medium' : 'text-muted-foreground'}>
                Device Information
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                registrationStep === 'configuration' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                2
              </div>
              <span className={registrationStep === 'configuration' ? 'font-medium' : 'text-muted-foreground'}>
                Configuration
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                3
              </div>
              <span className="text-muted-foreground">Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Radio className="h-5 w-5" />
            <span>Register New Device</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Add a new IoT device to your cargo security system
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {registrationStep === 'form' && (
              <>
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Basic Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="device-name">Device Name *</Label>
                      <Input
                        id="device-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., GPS-001, Door-Sensor-A1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="device-type">Device Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value as DeviceType })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gps_tracker">
                            <div className="flex items-center space-x-2">
                              <span>📍</span>
                              <span>GPS Tracker</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="door_sensor">
                            <div className="flex items-center space-x-2">
                              <span>🚪</span>
                              <span>Door Sensor</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="temperature_sensor">
                            <div className="flex items-center space-x-2">
                              <span>🌡️</span>
                              <span>Temperature Sensor</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="shock_sensor">
                            <div className="flex items-center space-x-2">
                              <span>⚠️</span>
                              <span>Shock Sensor</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="fuel_sensor">
                            <div className="flex items-center space-x-2">
                              <span>⛽</span>
                              <span>Fuel Sensor</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="serial-number">Serial Number *</Label>
                      <Input
                        id="serial-number"
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        placeholder="Device serial number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="mac-address">MAC Address</Label>
                      <Input
                        id="mac-address"
                        value={formData.macAddress}
                        onChange={(e) => setFormData({ ...formData, macAddress: e.target.value })}
                        placeholder="00:00:00:00:00:00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="manufacturer">Manufacturer</Label>
                      <Input
                        id="manufacturer"
                        value={formData.manufacturer}
                        onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                        placeholder="e.g., Garmin, Teltonika"
                      />
                    </div>

                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        placeholder="Device model"
                      />
                    </div>

                    <div>
                      <Label htmlFor="firmware">Firmware Version</Label>
                      <Input
                        id="firmware"
                        value={formData.firmwareVersion}
                        onChange={(e) => setFormData({ ...formData, firmwareVersion: e.target.value })}
                        placeholder="v1.0.0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Optional description of the device"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Asset Assignment */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Asset Assignment</h3>

                  <div>
                    <Label htmlFor="assigned-asset">Assign to Asset (Optional)</Label>
                    <Select
                      value={formData.assignedAssetId}
                      onValueChange={(value) => setFormData({ ...formData, assignedAssetId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an asset..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Assignment</SelectItem>
                        {mockAssets.map((asset) => (
                          <SelectItem key={asset.id} value={asset.id}>
                            <div className="flex items-center space-x-2">
                              <span>
                                {asset.type === 'truck' || asset.type === 'trailer' ? '🚛' : '📦'}
                              </span>
                              <span>{asset.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {asset.type}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Quick Setup</h3>

                  <div className="flex space-x-4">
                    <Button type="button" variant="outline">
                      <QrCode className="mr-2 h-4 w-4" />
                      Scan QR Code
                    </Button>
                    <Button type="button" variant="outline">
                      <Import className="mr-2 h-4 w-4" />
                      Import from CSV
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setRegistrationStep('configuration')}
                    disabled={!formData.name || !formData.serialNumber}
                  >
                    Next: Configuration
                  </Button>
                </div>
              </>
            )}

            {registrationStep === 'configuration' && (
              <>
                {/* Device Configuration */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Device Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reporting-interval">Reporting Interval (seconds)</Label>
                      <Input
                        id="reporting-interval"
                        type="number"
                        value={formData.configuration.reportingInterval}
                        onChange={(e) => setFormData({
                          ...formData,
                          configuration: {
                            ...formData.configuration,
                            reportingInterval: Number.parseInt(e.target.value) || 30
                          }
                        })}
                        min="10"
                        max="3600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="battery-threshold">Low Battery Threshold (%)</Label>
                      <Input
                        id="battery-threshold"
                        type="number"
                        value={formData.configuration.batteryLowThreshold}
                        onChange={(e) => setFormData({
                          ...formData,
                          configuration: {
                            ...formData.configuration,
                            batteryLowThreshold: Number.parseInt(e.target.value) || 20
                          }
                        })}
                        min="5"
                        max="50"
                      />
                    </div>
                  </div>

                  {formData.type === 'gps_tracker' && (
                    <div>
                      <Label htmlFor="speed-threshold">Speed Threshold (km/h)</Label>
                      <Input
                        id="speed-threshold"
                        type="number"
                        value={formData.configuration.speedThreshold}
                        onChange={(e) => setFormData({
                          ...formData,
                          configuration: {
                            ...formData.configuration,
                            speedThreshold: Number.parseInt(e.target.value) || 80
                          }
                        })}
                        min="20"
                        max="200"
                      />
                    </div>
                  )}

                  {formData.type === 'temperature_sensor' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="temp-min">Min Temperature (°C)</Label>
                        <Input
                          id="temp-min"
                          type="number"
                          value={formData.configuration.temperatureThresholds?.min || -20}
                          onChange={(e) => setFormData({
                            ...formData,
                            configuration: {
                              ...formData.configuration,
                              temperatureThresholds: {
                                min: Number.parseInt(e.target.value) || -20,
                                max: formData.configuration.temperatureThresholds?.max || 25
                              }
                            }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="temp-max">Max Temperature (°C)</Label>
                        <Input
                          id="temp-max"
                          type="number"
                          value={formData.configuration.temperatureThresholds?.max || 25}
                          onChange={(e) => setFormData({
                            ...formData,
                            configuration: {
                              ...formData.configuration,
                              temperatureThresholds: {
                                min: formData.configuration.temperatureThresholds?.min || -20,
                                max: Number.parseInt(e.target.value) || 25
                              }
                            }
                          })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label>Device is active and ready for deployment</Label>
                  </div>
                </div>

                <Separator />

                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Registration Summary</h3>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getTypeIcon(formData.type)}</span>
                      <div>
                        <div className="font-medium">{formData.name}</div>
                        <div className="text-sm text-muted-foreground">{getTypeLabel(formData.type)}</div>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>Serial: {formData.serialNumber}</div>
                      {formData.assignedAssetId && (
                        <div>
                          Assigned to: {mockAssets.find(a => a.id === formData.assignedAssetId)?.name}
                        </div>
                      )}
                      <div>Reporting: Every {formData.configuration.reportingInterval}s</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setRegistrationStep('form')}
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Wifi className="mr-2 h-4 w-4 animate-spin" />
                        Registering Device...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Register Device
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
