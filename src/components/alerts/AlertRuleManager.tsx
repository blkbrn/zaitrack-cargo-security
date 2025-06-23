'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus,
  Edit,
  Trash2,
  Settings,
  Bell,
  Mail,
  MessageSquare,
  Copy,
  AlertTriangle,
  MapPin,
  Thermometer,
  Battery,
  Radio,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react'
import type { AlertType, AlertSeverity } from '@/types'

interface AlertRule {
  id: string
  name: string
  description: string
  type: AlertType
  severity: AlertSeverity
  conditions: AlertCondition[]
  notifications: NotificationChannel[]
  isActive: boolean
  createdAt: Date
  lastTriggered?: Date
  triggerCount: number
}

interface AlertCondition {
  field: string
  operator: string
  value: string
  unit?: string
}

interface NotificationChannel {
  type: 'email' | 'sms' | 'push' | 'webhook'
  recipients: string[]
  template?: string
  delay?: number
}

const mockAlertRules: AlertRule[] = [
  {
    id: 'rule-1',
    name: 'Critical Speed Violation',
    description: 'Alert when vehicle exceeds 80 km/h',
    type: 'speed_violation',
    severity: 'high',
    conditions: [
      { field: 'speed', operator: '>', value: '80', unit: 'km/h' }
    ],
    notifications: [
      { type: 'email', recipients: ['alerts@company.com'] },
      { type: 'sms', recipients: ['+1234567890'] }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastTriggered: new Date('2024-01-15T10:30:00Z'),
    triggerCount: 15
  },
  {
    id: 'rule-2',
    name: 'Geofence Violation',
    description: 'Alert when asset exits authorized zone',
    type: 'geofence_exit',
    severity: 'medium',
    conditions: [
      { field: 'geofence_status', operator: 'equals', value: 'exited' }
    ],
    notifications: [
      { type: 'email', recipients: ['operations@company.com'] },
      { type: 'push', recipients: ['mobile_app'] }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastTriggered: new Date('2024-01-14T15:20:00Z'),
    triggerCount: 8
  },
  {
    id: 'rule-3',
    name: 'Low Battery Warning',
    description: 'Alert when device battery falls below 20%',
    type: 'low_battery',
    severity: 'medium',
    conditions: [
      { field: 'battery_level', operator: '<', value: '20', unit: '%' }
    ],
    notifications: [
      { type: 'email', recipients: ['maintenance@company.com'] }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastTriggered: new Date('2024-01-15T08:45:00Z'),
    triggerCount: 23
  }
]

export function AlertRuleManager() {
  const [alertRules, setAlertRules] = useState<AlertRule[]>(mockAlertRules)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null)

  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    name: '',
    description: '',
    type: 'speed_violation',
    severity: 'medium',
    conditions: [{ field: 'speed', operator: '>', value: '', unit: 'km/h' }],
    notifications: [{ type: 'email', recipients: [''] }],
    isActive: true
  })

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-red-400'
      case 'medium': return 'bg-orange-500'
      case 'low': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: AlertType) => {
    switch (type) {
      case 'speed_violation': return <AlertTriangle className="h-4 w-4" />
      case 'geofence_entry':
      case 'geofence_exit': return <MapPin className="h-4 w-4" />
      case 'temperature_alert': return <Thermometer className="h-4 w-4" />
      case 'low_battery': return <Battery className="h-4 w-4" />
      case 'device_offline': return <Radio className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'sms': return <MessageSquare className="h-4 w-4" />
      case 'push': return <Bell className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const handleCreateRule = () => {
    const rule: AlertRule = {
      id: `rule-${Date.now()}`,
      name: newRule.name || '',
      description: newRule.description || '',
      type: newRule.type || 'speed_violation',
      severity: newRule.severity || 'medium',
      conditions: newRule.conditions || [],
      notifications: newRule.notifications || [],
      isActive: newRule.isActive || true,
      createdAt: new Date(),
      triggerCount: 0
    }

    setAlertRules([...alertRules, rule])
    setIsCreateDialogOpen(false)
    setNewRule({
      name: '',
      description: '',
      type: 'speed_violation',
      severity: 'medium',
      conditions: [{ field: 'speed', operator: '>', value: '', unit: 'km/h' }],
      notifications: [{ type: 'email', recipients: [''] }],
      isActive: true
    })
  }

  const toggleRuleStatus = (ruleId: string) => {
    setAlertRules(rules =>
      rules.map(rule =>
        rule.id === ruleId
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    )
  }

  const deleteRule = (ruleId: string) => {
    setAlertRules(rules => rules.filter(rule => rule.id !== ruleId))
  }

  const duplicateRule = (rule: AlertRule) => {
    const newRule: AlertRule = {
      ...rule,
      id: `rule-${Date.now()}`,
      name: `${rule.name} (Copy)`,
      createdAt: new Date(),
      triggerCount: 0,
      lastTriggered: undefined
    }
    setAlertRules([...alertRules, newRule])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert Rules</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure automated alert rules and notification settings
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Alert Rule</DialogTitle>
                  <DialogDescription>
                    Configure a new alert rule with conditions and notification channels
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input
                        id="rule-name"
                        value={newRule.name}
                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                        placeholder="Enter rule name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rule-severity">Severity</Label>
                      <Select
                        value={newRule.severity}
                        onValueChange={(value) => setNewRule({ ...newRule, severity: value as AlertSeverity })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rule-description">Description</Label>
                    <Textarea
                      id="rule-description"
                      value={newRule.description}
                      onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                      placeholder="Describe when this rule should trigger"
                    />
                  </div>

                  {/* Alert Type */}
                  <div>
                    <Label htmlFor="rule-type">Alert Type</Label>
                    <Select
                      value={newRule.type}
                      onValueChange={(value) => setNewRule({ ...newRule, type: value as AlertType })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="speed_violation">Speed Violation</SelectItem>
                        <SelectItem value="geofence_entry">Geofence Entry</SelectItem>
                        <SelectItem value="geofence_exit">Geofence Exit</SelectItem>
                        <SelectItem value="door_open">Door Open</SelectItem>
                        <SelectItem value="temperature_alert">Temperature Alert</SelectItem>
                        <SelectItem value="device_offline">Device Offline</SelectItem>
                        <SelectItem value="low_battery">Low Battery</SelectItem>
                        <SelectItem value="unauthorized_stop">Unauthorized Stop</SelectItem>
                        <SelectItem value="tamper_alert">Tamper Alert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conditions */}
                  <div>
                    <Label>Conditions</Label>
                    <div className="space-y-2 mt-2">
                      {newRule.conditions?.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Select value={condition.field}>
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="speed">Speed</SelectItem>
                              <SelectItem value="battery_level">Battery Level</SelectItem>
                              <SelectItem value="temperature">Temperature</SelectItem>
                              <SelectItem value="geofence_status">Geofence Status</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={condition.operator}>
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value=">">&gt;</SelectItem>
                              <SelectItem value="<">&lt;</SelectItem>
                              <SelectItem value="=">=</SelectItem>
                              <SelectItem value="!=">!=</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={condition.value}
                            onChange={(e) => {
                              const newConditions = [...(newRule.conditions || [])]
                              newConditions[index] = { ...condition, value: e.target.value }
                              setNewRule({ ...newRule, conditions: newConditions })
                            }}
                            placeholder="Value"
                            className="w-24"
                          />
                          {condition.unit && (
                            <span className="text-sm text-muted-foreground">{condition.unit}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notifications */}
                  <div>
                    <Label>Notification Channels</Label>
                    <div className="space-y-2 mt-2">
                      {newRule.notifications?.map((notification, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Select value={notification.type}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="push">Push</SelectItem>
                              <SelectItem value="webhook">Webhook</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={notification.recipients[0] || ''}
                            onChange={(e) => {
                              const newNotifications = [...(newRule.notifications || [])]
                              newNotifications[index] = {
                                ...notification,
                                recipients: [e.target.value]
                              }
                              setNewRule({ ...newRule, notifications: newNotifications })
                            }}
                            placeholder="Recipient"
                            className="flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newRule.isActive}
                      onCheckedChange={(checked) => setNewRule({ ...newRule, isActive: checked })}
                    />
                    <Label>Rule is active</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRule}>
                    Create Rule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Notifications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Triggers</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {rule.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(rule.type)}
                      <span className="capitalize">
                        {rule.type.replace('_', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(rule.severity)}`} />
                      <Badge variant="outline">
                        {rule.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {rule.conditions.map((condition, index) => (
                        <div key={index} className="text-muted-foreground">
                          {condition.field} {condition.operator} {condition.value} {condition.unit}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {rule.notifications.map((notification, index) => (
                        <div key={index} className="flex items-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {rule.isActive ? (
                        <Eye className="h-4 w-4 text-green-500" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                      <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{rule.triggerCount} times</div>
                      {rule.lastTriggered && (
                        <div className="text-muted-foreground">
                          Last: {new Date(rule.lastTriggered).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRuleStatus(rule.id)}
                      >
                        {rule.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingRule(rule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateRule(rule)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRule(rule.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
