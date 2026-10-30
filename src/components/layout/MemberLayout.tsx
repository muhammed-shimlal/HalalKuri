import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Wallet, Trophy, Bell, FileText, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

export default function MemberLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  const links = [
    { name: 'Dashboard', path: '/member', icon: LayoutDashboard },
    { name: 'Status', path: '/member/status', icon: Wallet },
    { name: 'Recipients', path: '/member/recipients', icon: Trophy },
    { name: 'Notices', path: '/member/announcements', icon: Bell },
    { name: 'Docs', path: '/member/documents', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex flex-col h-screen bg-card border-r border-border w-64 p-4 sticky top-0">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-md bg-gold-500 flex items-center justify-center text-white font-bold">
            HK
          </div>
          <span className="font-bold text-lg">Member Portal</span>
        </div>
        <nav className="flex-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
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
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Top Header Mobile */}
      <header className="md:hidden h-16 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gold-500 flex items-center justify-center text-white font-bold">
            HK
          </div>
          <span className="font-bold">Member Portal</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-card border-t border-border z-40 flex items-center justify-around h-16 px-2 safe-area-bottom">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.path
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-gold-500' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
