'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  SidebarFooter
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Truck,
  Radio,
  MapPin,
  AlertTriangle,
  BarChart3,
  Calendar,
  Settings,
  Users,
  Shield,
  FileText,
  Navigation,
  Activity,
  Map as MapIcon,
  Zap,
  ChevronRight
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getCurrentUser } from '@/lib/mockData'

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard
  },
  {
    title: 'Real-Time Tracking',
    href: '/tracking',
    icon: Navigation,
    badge: 'LIVE'
  },
  {
    title: 'Asset Management',
    icon: Truck,
    children: [
      { title: 'All Assets', href: '/assets', icon: Truck },
      { title: 'Asset Groups', href: '/assets/groups', icon: Truck },
      { title: 'Asset History', href: '/assets/history', icon: Activity }
    ]
  },
  {
    title: 'Device Management',
    icon: Radio,
    children: [
      { title: 'All Devices', href: '/devices', icon: Radio },
      { title: 'Device Configuration', href: '/devices/config', icon: Settings },
      { title: 'Firmware Updates', href: '/devices/firmware', icon: Zap }
    ]
  },
  {
    title: 'Geofencing',
    href: '/geofences',
    icon: MapPin
  },
  {
    title: 'Alerts & Notifications',
    href: '/alerts',
    icon: AlertTriangle,
    badge: 8
  },
  {
    title: 'Reports & Analytics',
    icon: BarChart3,
    children: [
      { title: 'Trip Reports', href: '/reports/trips', icon: MapIcon },
      { title: 'Alert Reports', href: '/reports/alerts', icon: AlertTriangle },
      { title: 'Device Reports', href: '/reports/devices', icon: Radio },
      { title: 'Custom Reports', href: '/reports/custom', icon: FileText }
    ]
  },
  {
    title: 'Event Management',
    href: '/events',
    icon: Calendar,
    badge: 3
  },
  {
    title: 'User Management',
    href: '/users',
    icon: Users
  },
  {
    title: 'Security & Compliance',
    href: '/security',
    icon: Shield
  },
  {
    title: 'System Settings',
    href: '/settings',
    icon: Settings
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const currentUser = getCurrentUser()

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = item.href === pathname
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton className="text-sm font-medium">
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </SidebarMenuButton>
          <SidebarMenuSub>
            {item.children?.map((child) => (
              <SidebarMenuSubItem key={child.title}>
                <SidebarMenuSubButton asChild isActive={child.href === pathname}>
                  <Link href={child.href || '#'}>
                    <child.icon className="h-4 w-4" />
                    <span>{child.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </SidebarMenuItem>
      )
    }

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href={item.href || '#'} className="flex items-center justify-between">
            <div className="flex items-center">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
            {item.badge && (
              <Badge
                variant={item.badge === 'LIVE' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">ZaiTrack</h1>
            <p className="text-xs text-muted-foreground">Cargo Security</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => renderNavItem(item))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
          <span className="text-muted-foreground">System Online</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          User: {currentUser.name} ({currentUser.role})
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
