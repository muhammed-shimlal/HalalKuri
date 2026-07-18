import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShieldAlert, Home } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="glass-card text-center p-12 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-destructive" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          You do not have permission to view this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full h-12">
              <Home className="w-4 h-4 mr-2" />
              Public Home
            </Button>
          </Link>
          <Link to="/login" className="flex-1">
            <Button className="w-full h-12 bg-gold-500 hover:bg-gold-600 text-white">
              Back to Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
