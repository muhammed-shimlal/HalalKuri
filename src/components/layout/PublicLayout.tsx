import { Outlet, Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

export default function PublicLayout() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Rules', path: '/rules' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Premium Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold">
              HK
            </div>
            <span className="font-bold text-lg tracking-tight">Halal Kuri</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login">
              <Button className="bg-gold-500 text-white hover:bg-gold-600 rounded-full px-6">
                Login Portal
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left mb-6">Menu</SheetTitle>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/login" onClick={() => setIsOpen(false)} className="mt-4">
                  <Button className="w-full bg-gold-500 text-white hover:bg-gold-600">
                    Login Portal
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-gold-500/20">
              HK
            </div>
          </div>
          <h3 className="font-bold text-lg mb-2">Halal Kuri</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            A Premium, Shariah-Compliant Interest-Free Committee Management System.
          </p>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Halal Kuri. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
