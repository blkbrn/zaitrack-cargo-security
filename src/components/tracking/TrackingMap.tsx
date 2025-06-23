'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { Asset } from '@/types'

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false })

interface TrackingMapProps {
  assets: Asset[]
}

// Custom marker icons for different asset types and statuses
const createCustomIcon = (type: string, status: string) => {
  if (typeof window === 'undefined') return null

  const L = require('leaflet')

  const getColor = () => {
    switch (status) {
      case 'in_transit': return '#22c55e' // green
      case 'alert': return '#ef4444' // red
      case 'idle': return '#6b7280' // gray
      case 'delivered': return '#3b82f6' // blue
      default: return '#6b7280'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'truck':
      case 'trailer':
        return '🚛'
      case 'container':
        return '📦'
      case 'package':
        return '📮'
      default:
        return '📍'
    }
  }

  return L.divIcon({
    html: `
      <div style="
        background-color: ${getColor()};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">
        ${getIcon()}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  })
}

export function TrackingMap({ assets }: TrackingMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  // Calculate center point based on assets
  const centerLat = assets.reduce((sum, asset) => sum + asset.location.latitude, 0) / assets.length || 40.7128
  const centerLng = assets.reduce((sum, asset) => sum + asset.location.longitude, 0) / assets.length || -74.0060

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return '#22c55e'
      case 'alert': return '#ef4444'
      case 'idle': return '#6b7280'
      case 'delivered': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_transit': return 'In Transit'
      case 'alert': return 'Alert'
      case 'idle': return 'Idle'
      case 'delivered': return 'Delivered'
      case 'maintenance': return 'Maintenance'
      default: return status
    }
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {assets.map((asset) => {
          const icon = createCustomIcon(asset.type, asset.status)

          return (
            <div key={asset.id}>
              {/* Asset Marker */}
              <Marker
                position={[asset.location.latitude, asset.location.longitude]}
                icon={icon}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{asset.name}</h3>
                      <span
                        className="px-2 py-1 rounded-full text-xs text-white"
                        style={{ backgroundColor: getStatusColor(asset.status) }}
                      >
                        {getStatusLabel(asset.status)}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p><strong>Type:</strong> {asset.type}</p>
                      <p><strong>Client:</strong> {asset.client}</p>
                      <p><strong>Location:</strong> {asset.location.address}</p>
                      {asset.location.speed && (
                        <p><strong>Speed:</strong> {asset.location.speed} km/h</p>
                      )}
                      <p><strong>Devices:</strong> {asset.assignedDevices.length}</p>
                      <p><strong>Last Update:</strong> {new Date(asset.updatedAt).toLocaleTimeString()}</p>
                    </div>

                    <div className="flex space-x-1 mt-2">
                      <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                        View Details
                      </button>
                      <button className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                        Track Route
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* Accuracy Circle for GPS precision */}
              {asset.location.accuracy && (
                <Circle
                  center={[asset.location.latitude, asset.location.longitude]}
                  radius={asset.location.accuracy}
                  pathOptions={{
                    color: getStatusColor(asset.status),
                    weight: 1,
                    opacity: 0.3,
                    fillOpacity: 0.1
                  }}
                />
              )}
            </div>
          )
        })}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Asset Status</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>In Transit</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Alert</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>Idle</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      {/* Live Update Indicator */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-[1000]">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-600 font-medium">LIVE</span>
        </div>
      </div>
    </div>
  )
}
