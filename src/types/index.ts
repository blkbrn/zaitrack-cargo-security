// User Management Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export type UserRole = 'admin' | 'operator' | 'viewer' | 'auditor';

export interface UserPermissions {
  canViewAssets: boolean;
  canEditAssets: boolean;
  canDeleteAssets: boolean;
  canViewDevices: boolean;
  canEditDevices: boolean;
  canViewReports: boolean;
  canViewAlerts: boolean;
  canManageUsers: boolean;
  canViewDashboard: boolean;
}

// Asset Management Types
export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  location: Location;
  assignedDevices: string[];
  tags: string[];
  client: string;
  group?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AssetType = 'container' | 'pallet' | 'truck' | 'trailer' | 'package';
export type AssetStatus = 'in_transit' | 'idle' | 'alert' | 'delivered' | 'maintenance';

// Device Management Types
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  batteryLevel?: number;
  signalStrength?: number;
  firmwareVersion: string;
  assignedAssetId?: string;
  location?: Location;
  lastHeartbeat?: Date;
  configuration: DeviceConfiguration;
  createdAt: Date;
}

export type DeviceType = 'gps_tracker' | 'door_sensor' | 'temperature_sensor' | 'shock_sensor' | 'fuel_sensor';
export type DeviceStatus = 'online' | 'offline' | 'low_battery' | 'error';

export interface DeviceConfiguration {
  reportingInterval: number; // seconds
  temperatureThresholds?: { min: number; max: number };
  speedThreshold?: number;
  batteryLowThreshold?: number;
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: Date;
  accuracy?: number;
  speed?: number;
  heading?: number;
}

// Geofencing Types
export interface Geofence {
  id: string;
  name: string;
  type: GeofenceType;
  coordinates: GeofenceCoordinates;
  assignedAssets: string[];
  alertOnEntry: boolean;
  alertOnExit: boolean;
  alertOnLoitering: boolean;
  loiteringTime?: number; // minutes
  isActive: boolean;
  createdAt: Date;
}

export type GeofenceType = 'polygon' | 'circle';

export interface GeofenceCoordinates {
  points?: { lat: number; lng: number }[];
  center?: { lat: number; lng: number };
  radius?: number; // meters
}

// Alert Types
export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  assetId?: string;
  deviceId?: string;
  geofenceId?: string;
  location?: Location;
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export type AlertType =
  | 'speed_violation'
  | 'geofence_entry'
  | 'geofence_exit'
  | 'door_open'
  | 'temperature_alert'
  | 'device_offline'
  | 'low_battery'
  | 'unauthorized_stop'
  | 'tamper_alert';

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

// Trip Types
export interface Trip {
  id: string;
  assetId: string;
  startLocation: Location;
  endLocation?: Location;
  startTime: Date;
  endTime?: Date;
  status: TripStatus;
  plannedRoute?: Location[];
  actualRoute: Location[];
  violations: TripViolation[];
  distance?: number; // kilometers
  duration?: number; // minutes
}

export type TripStatus = 'active' | 'completed' | 'cancelled';

export interface TripViolation {
  type: AlertType;
  location: Location;
  timestamp: Date;
  severity: AlertSeverity;
}

// Event Types
export interface Event {
  id: string;
  type: EventType;
  title: string;
  description: string;
  assetId?: string;
  deviceId?: string;
  assignedTo?: string;
  status: EventStatus;
  priority: EventPriority;
  attachments?: string[];
  comments: EventComment[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export type EventType = 'incident' | 'maintenance' | 'inspection' | 'delivery' | 'pickup';
export type EventStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type EventPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface EventComment {
  id: string;
  userId: string;
  comment: string;
  createdAt: Date;
}

// Dashboard Types
export interface DashboardKPI {
  label: string;
  value: number;
  change?: number; // percentage change
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export type WidgetType = 'kpi' | 'chart' | 'map' | 'table' | 'alert_list';
export type WidgetSize = 'small' | 'medium' | 'large';

// Report Types
export interface Report {
  id: string;
  name: string;
  type: ReportType;
  parameters: ReportParameters;
  schedule?: ReportSchedule;
  lastGenerated?: Date;
  createdBy: string;
  createdAt: Date;
}

export type ReportType = 'trip_summary' | 'geofence_violations' | 'device_uptime' | 'alert_summary';

export interface ReportParameters {
  dateRange: { start: Date; end: Date };
  assetIds?: string[];
  deviceIds?: string[];
  alertTypes?: AlertType[];
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter and Search Types
export interface FilterOptions {
  search?: string;
  status?: string[];
  type?: string[];
  dateRange?: { start: Date; end: Date };
  location?: string;
  tags?: string[];
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}
