import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import PublicLayout from '@/components/layout/PublicLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import MemberLayout from '@/components/layout/MemberLayout'

import Home from '@/pages/Home'
import About from '@/pages/About'
import HowItWorks from '@/pages/HowItWorks'
import ShariahCompliance from '@/pages/ShariahCompliance'
import Rules from '@/pages/Rules'
import FAQ from '@/pages/FAQ'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import Unauthorized from '@/pages/Unauthorized'
import Login from '@/pages/Login'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/layout/ProtectedRoute'

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard'
import Members from '@/pages/admin/Members'
import Contributions from '@/pages/admin/Contributions'
import Recipients from '@/pages/admin/Recipients'
import Announcements from '@/pages/admin/Announcements'
import Documents from '@/pages/admin/Documents'
import Reports from '@/pages/admin/Reports'
import Settings from '@/pages/admin/Settings'
import WebsiteContent from '@/pages/admin/WebsiteContent'

// Member Pages
import MemberDashboard from '@/pages/member/Dashboard'
import MemberStatus from '@/pages/member/Status'
import MemberRecipients from '@/pages/member/Recipients'
import MemberAnnouncements from '@/pages/member/Announcements'
import MemberDocuments from '@/pages/member/Documents'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/shariah-compliance" element={<ShariahCompliance />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="members" element={<Members />} />
                <Route path="contributions" element={<Contributions />} />
                <Route path="recipients" element={<Recipients />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="documents" element={<Documents />} />
                <Route path="reports" element={<Reports />} />
                <Route path="website" element={<WebsiteContent />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Member Routes */}
            <Route element={<ProtectedRoute allowedRoles={['member']} />}>
              <Route path="/member" element={<MemberLayout />}>
                <Route index element={<MemberDashboard />} />
                <Route path="status" element={<MemberStatus />} />
                <Route path="recipients" element={<MemberRecipients />} />
                <Route path="announcements" element={<MemberAnnouncements />} />
                <Route path="documents" element={<MemberDocuments />} />
              </Route>
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
