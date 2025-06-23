import {
  type User, type Asset, type Device, type Alert, type Trip, type Event, type Geofence,
  type DashboardKPI, type UserRole, AssetType, AssetStatus,
  DeviceType, DeviceStatus, AlertType, AlertSeverity
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@zaitrack.com',
    name: 'Sarah Admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    isActive: true,
    lastLogin: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '2',
    email: 'operator@zaitrack.com',
    name: 'Mike Operator',
    role: 'operator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isActive: true,
    lastLogin: new Date('2024-01-15T09:15:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '3',
    email: 'viewer@zaitrack.com',
    name: 'Lisa Viewer',
    role: 'viewer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    isActive: true,
    lastLogin: new Date('2024-01-15T08:45:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
  }
];

// Mock Assets
export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Container CTR-001',
    type: 'container',
    status: 'in_transit',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'New York, NY',
      timestamp: new Date(),
      speed: 65,
      heading: 90
    },
    assignedDevices: ['device-1', 'device-2'],
    tags: ['electronics', 'high-value'],
    client: 'TechCorp Inc.',
    group: 'East Coast',
    createdAt: new Date('2024-01-10T00:00:00Z'),
    updatedAt: new Date(),
  },
  {
    id: 'asset-2',
    name: 'Truck TRK-045',
    type: 'truck',
    status: 'idle',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: 'Los Angeles, CA',
      timestamp: new Date(),
      speed: 0,
      heading: 0
    },
    assignedDevices: ['device-3'],
    tags: ['heavy-duty', 'refrigerated'],
    client: 'FreshFood Co.',
    group: 'West Coast',
    createdAt: new Date('2024-01-08T00:00:00Z'),
    updatedAt: new Date(),
  },
  {
    id: 'asset-3',
    name: 'Trailer TRL-089',
    type: 'trailer',
    status: 'alert',
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      address: 'Chicago, IL',
      timestamp: new Date(),
      speed: 0,
      heading: 180
    },
    assignedDevices: ['device-4', 'device-5'],
    tags: ['pharmaceutical', 'temperature-controlled'],
    client: 'MedSupply Ltd.',
    group: 'Midwest',
    createdAt: new Date('2024-01-12T00:00:00Z'),
    updatedAt: new Date(),
  },
  {
    id: 'asset-4',
    name: 'Package PKG-234',
    type: 'package',
    status: 'delivered',
    location: {
      latitude: 25.7617,
      longitude: -80.1918,
      address: 'Miami, FL',
      timestamp: new Date(),
      speed: 0,
      heading: 0
    },
    assignedDevices: ['device-6'],
    tags: ['express', 'fragile'],
    client: 'QuickShip Express',
    group: 'Southeast',
    createdAt: new Date('2024-01-14T00:00:00Z'),
    updatedAt: new Date(),
  }
];

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'device-1',
    name: 'GPS Tracker GT-001',
    type: 'gps_tracker',
    status: 'online',
    batteryLevel: 85,
    signalStrength: 95,
    firmwareVersion: '2.1.4',
    assignedAssetId: 'asset-1',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'New York, NY',
      timestamp: new Date(),
    },
    lastHeartbeat: new Date(),
    configuration: {
      reportingInterval: 30,
      speedThreshold: 80,
      batteryLowThreshold: 20
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'device-2',
    name: 'Door Sensor DS-002',
    type: 'door_sensor',
    status: 'online',
    batteryLevel: 72,
    signalStrength: 88,
    firmwareVersion: '1.8.2',
    assignedAssetId: 'asset-1',
    lastHeartbeat: new Date(),
    configuration: {
      reportingInterval: 60,
      batteryLowThreshold: 15
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'device-3',
    name: 'Temp Sensor TS-003',
    type: 'temperature_sensor',
    status: 'online',
    batteryLevel: 91,
    signalStrength: 82,
    firmwareVersion: '1.5.1',
    assignedAssetId: 'asset-2',
    lastHeartbeat: new Date(),
    configuration: {
      reportingInterval: 120,
      temperatureThresholds: { min: -18, max: 5 },
      batteryLowThreshold: 25
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'device-4',
    name: 'GPS Tracker GT-004',
    type: 'gps_tracker',
    status: 'low_battery',
    batteryLevel: 18,
    signalStrength: 76,
    firmwareVersion: '2.1.4',
    assignedAssetId: 'asset-3',
    lastHeartbeat: new Date(),
    configuration: {
      reportingInterval: 45,
      speedThreshold: 70,
      batteryLowThreshold: 20
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'device-5',
    name: 'Shock Sensor SS-005',
    type: 'shock_sensor',
    status: 'offline',
    batteryLevel: 0,
    signalStrength: 0,
    firmwareVersion: '1.2.3',
    assignedAssetId: 'asset-3',
    lastHeartbeat: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    configuration: {
      reportingInterval: 300,
      batteryLowThreshold: 10
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'device-6',
    name: 'GPS Tracker GT-006',
    type: 'gps_tracker',
    status: 'online',
    batteryLevel: 94,
    signalStrength: 92,
    firmwareVersion: '2.1.4',
    assignedAssetId: 'asset-4',
    lastHeartbeat: new Date(),
    configuration: {
      reportingInterval: 15,
      speedThreshold: 60,
      batteryLowThreshold: 20
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'speed_violation',
    severity: 'medium',
    title: 'Speed Limit Exceeded',
    message: 'Container CTR-001 exceeded speed limit of 80 km/h',
    assetId: 'asset-1',
    deviceId: 'device-1',
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: 'Manhattan, NY',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    isResolved: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'alert-2',
    type: 'device_offline',
    severity: 'high',
    title: 'Device Offline',
    message: 'Shock sensor SS-005 has been offline for 2 hours',
    assetId: 'asset-3',
    deviceId: 'device-5',
    isResolved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'alert-3',
    type: 'low_battery',
    severity: 'medium',
    title: 'Low Battery Warning',
    message: 'GPS Tracker GT-004 battery level is below 20%',
    assetId: 'asset-3',
    deviceId: 'device-4',
    isResolved: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: 'alert-4',
    type: 'geofence_exit',
    severity: 'low',
    title: 'Geofence Exit',
    message: 'Package PKG-234 exited delivery zone',
    assetId: 'asset-4',
    deviceId: 'device-6',
    isResolved: true,
    resolvedBy: '2',
    resolvedAt: new Date(Date.now() - 10 * 60 * 1000),
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  }
];

// Mock Geofences
export const mockGeofences: Geofence[] = [
  {
    id: 'geofence-1',
    name: 'NYC Distribution Center',
    type: 'circle',
    coordinates: {
      center: { lat: 40.7128, lng: -74.0060 },
      radius: 5000 // 5km
    },
    assignedAssets: ['asset-1'],
    alertOnEntry: true,
    alertOnExit: true,
    alertOnLoitering: false,
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'geofence-2',
    name: 'West Coast Route',
    type: 'polygon',
    coordinates: {
      points: [
        { lat: 34.0522, lng: -118.2437 },
        { lat: 37.7749, lng: -122.4194 },
        { lat: 47.6062, lng: -122.3321 },
        { lat: 45.5152, lng: -122.6784 }
      ]
    },
    assignedAssets: ['asset-2'],
    alertOnEntry: false,
    alertOnExit: true,
    alertOnLoitering: true,
    loiteringTime: 60,
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  }
];

// Mock Dashboard KPIs
export const mockDashboardKPIs: DashboardKPI[] = [
  {
    label: 'Active Assets',
    value: 47,
    change: 8.2,
    changeType: 'positive',
    icon: 'truck'
  },
  {
    label: 'Alerts Today',
    value: 23,
    change: -12.5,
    changeType: 'positive',
    icon: 'alert-triangle'
  },
  {
    label: 'Online Devices',
    value: 142,
    change: 2.1,
    changeType: 'positive',
    icon: 'radio'
  },
  {
    label: 'Geofence Violations',
    value: 5,
    change: -40.0,
    changeType: 'positive',
    icon: 'map-pin'
  }
];

// Mock Trips
export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    assetId: 'asset-1',
    startLocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'New York, NY',
      timestamp: new Date('2024-01-15T08:00:00Z'),
    },
    endLocation: {
      latitude: 42.3601,
      longitude: -71.0589,
      address: 'Boston, MA',
      timestamp: new Date('2024-01-15T14:30:00Z'),
    },
    startTime: new Date('2024-01-15T08:00:00Z'),
    endTime: new Date('2024-01-15T14:30:00Z'),
    status: 'completed',
    actualRoute: [
      { latitude: 40.7128, longitude: -74.0060, timestamp: new Date('2024-01-15T08:00:00Z') },
      { latitude: 41.2033, longitude: -73.1234, timestamp: new Date('2024-01-15T10:15:00Z') },
      { latitude: 42.3601, longitude: -71.0589, timestamp: new Date('2024-01-15T14:30:00Z') }
    ],
    violations: [
      {
        type: 'speed_violation',
        location: { latitude: 41.2033, longitude: -73.1234, timestamp: new Date('2024-01-15T10:15:00Z') },
        timestamp: new Date('2024-01-15T10:15:00Z'),
        severity: 'medium'
      }
    ],
    distance: 346,
    duration: 390
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event-1',
    type: 'incident',
    title: 'Unauthorized Door Opening',
    description: 'Container door was opened without authorization during transit',
    assetId: 'asset-1',
    deviceId: 'device-2',
    assignedTo: '2',
    status: 'open',
    priority: 'high',
    attachments: [],
    comments: [
      {
        id: 'comment-1',
        userId: '2',
        comment: 'Investigating the incident. Checking security footage.',
        createdAt: new Date(Date.now() - 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: 'event-2',
    type: 'maintenance',
    title: 'Scheduled Device Maintenance',
    description: 'GPS tracker GT-004 requires battery replacement',
    deviceId: 'device-4',
    assignedTo: '1',
    status: 'in_progress',
    priority: 'medium',
    attachments: [],
    comments: [],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000)
  }
];

// Helper function to get current user (mock)
export const getCurrentUser = (): User => mockUsers[0]; // Default to admin

// Helper function to get user permissions based on role
export const getUserPermissions = (role: UserRole) => {
  const permissions = {
    admin: {
      canViewAssets: true,
      canEditAssets: true,
      canDeleteAssets: true,
      canViewDevices: true,
      canEditDevices: true,
      canViewReports: true,
      canViewAlerts: true,
      canManageUsers: true,
      canViewDashboard: true,
    },
    operator: {
      canViewAssets: true,
      canEditAssets: true,
      canDeleteAssets: false,
      canViewDevices: true,
      canEditDevices: true,
      canViewReports: true,
      canViewAlerts: true,
      canManageUsers: false,
      canViewDashboard: true,
    },
    viewer: {
      canViewAssets: true,
      canEditAssets: false,
      canDeleteAssets: false,
      canViewDevices: true,
      canEditDevices: false,
      canViewReports: true,
      canViewAlerts: true,
      canManageUsers: false,
      canViewDashboard: true,
    },
    auditor: {
      canViewAssets: true,
      canEditAssets: false,
      canDeleteAssets: false,
      canViewDevices: true,
      canEditDevices: false,
      canViewReports: true,
      canViewAlerts: true,
      canManageUsers: false,
      canViewDashboard: true,
    }
  };

  return permissions[role];
};
