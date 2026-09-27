import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Wallet, Trophy, Megaphone, FileText, Settings, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Members', path: '/admin/members', icon: Users },
  { name: 'Contributions', path: '/admin/contributions', icon: Wallet },
  { name: 'Recipients', path: '/admin/recipients', icon: Trophy },
  { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { name: 'Documents', path: '/admin/documents', icon: FileText },
  { name: 'Reports', path: '/admin/reports', icon: FileText },
  { name: 'Website Content', path: '/admin/website', icon: FileText },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
]

interface SidebarContentProps {
  currentPath: string
  onCloseMobileNav?: () => void
  onLogout: () => Promise<void>
}

function SidebarContent({ currentPath, onCloseMobileNav, onLogout }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border w-64 p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded-md bg-gold-500 flex items-center justify-center text-white font-bold">
          HK
        </div>
        <span className="font-bold text-lg">Admin Portal</span>
      </div>
      <nav className="flex-1 space-y-1">
        {adminLinks.map((link) => {
          const Icon = link.icon
          const isActive = currentPath === link.path
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={onCloseMobileNav}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gold-500/10 text-gold-500'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="pt-4 border-t border-border mt-auto">
        <Button 
          variant="ghost" 
          onClick={onLogout}
          className="w-full justify-start text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent currentPath={location.pathname} onLogout={handleLogout} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gold-500 flex items-center justify-center text-white font-bold">
              HK
            </div>
            <span className="font-bold">Admin</span>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle navigation menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
              <SidebarContent
                currentPath={location.pathname}
                onCloseMobileNav={() => setIsOpen(false)}
                onLogout={handleLogout}
              />
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
