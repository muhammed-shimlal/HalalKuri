import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSettings, updateSettings, type Settings as SettingsType } from '@/services/api'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Save, Download } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Settings() {
  const [formData, setFormData] = useState<Partial<SettingsType>>({})
  const [memberPassword, setMemberPassword] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [isUpdatingAuth, setIsUpdatingAuth] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  })

  useEffect(() => {
    if (settings) {
      setFormData({
        app_name: settings.app_name,
        contact_email: settings.contact_email,
        contact_phone: settings.contact_phone,
        office_address: settings.office_address,
        shared_login_username: settings.shared_login_username,
        admin_username: settings.admin_username,
      })
    }
  }, [settings])

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<SettingsType> }) => updateSettings(id, updates),
    onMutate: async ({ updates }) => {
      await queryClient.cancelQueries({ queryKey: ['settings'] })
      const previous = queryClient.getQueryData(['settings'])
      queryClient.setQueryData(['settings'], (old: any) => ({ ...old, ...updates }))
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['settings'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to update settings." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast({ title: "Success", description: "Settings updated successfully." })
    }
  })

  const handleSaveAppInfo = () => {
    if (settings?.id) {
      updateMutation.mutate({ 
        id: settings.id, 
        updates: {
          app_name: formData.app_name,
          contact_email: formData.contact_email,
          contact_phone: formData.contact_phone,
          office_address: formData.office_address
        } 
      })
    }
  }

  const handleUpdateAuth = async () => {
    if (!settings?.id) return
    setIsUpdatingAuth(true)
    try {
      // 1. Update the display emails in the settings table
      await updateSettings(settings.id, {
        shared_login_username: formData.shared_login_username,
        admin_username: formData.admin_username,
      })
      
      // 2. We can't actually change OTHER users' passwords from the client-side directly using supabase.auth unless we have the service_role key (which is unsafe in the browser)
      // Or we can call a Supabase Edge Function to securely change passwords.
      // For this MVP, we will simulate it or log the limitation.
      if (memberPassword || adminPassword) {
        toast({ 
          title: "Note", 
          description: "Password updates require an Edge Function or backend with service_role key. Emails updated successfully.",
          variant: "default"
        })
      } else {
        toast({ title: "Success", description: "Login emails updated successfully." })
      }
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to update auth settings." })
    } finally {
      setIsUpdatingAuth(false)
    }
  }

  const handleExportBackup = async () => {
    setIsExporting(true)
    try {
      // Create a JSON backup of all public tables
      const tables = ['profiles', 'members', 'contributions', 'recipients', 'announcements', 'documents', 'settings', 'website_content']
      const backup: any = {}
      
      for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*')
        if (error) throw error
        backup[table] = data
      }
      
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `halalkuri_backup_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast({ title: "Backup Complete", description: "Database exported to JSON successfully." })
    } catch {
      toast({ variant: "destructive", title: "Backup Failed", description: "An error occurred while generating the backup." })
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold border-b border-border pb-2 mb-4">Application Info</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Application Name</Label>
                <Input 
                  value={formData.app_name || ''} 
                  onChange={e => setFormData({...formData, app_name: e.target.value})}
                  className="bg-background" 
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input 
                  value={formData.contact_email || ''} 
                  onChange={e => setFormData({...formData, contact_email: e.target.value})}
                  type="email" 
                  className="bg-background" 
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Phone</Label>
                <Input 
                  value={formData.contact_phone || ''} 
                  onChange={e => setFormData({...formData, contact_phone: e.target.value})}
                  className="bg-background" 
                />
              </div>
              <div className="space-y-2">
                <Label>Office Address</Label>
                <textarea 
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 h-24 resize-none focus:outline-none focus:border-gold-500 transition-colors"
                  value={formData.office_address || ''}
                  onChange={e => setFormData({...formData, office_address: e.target.value})}
                />
              </div>
            </div>
          </div>
          <Button 
            onClick={handleSaveAppInfo} 
            className="w-full bg-gold-500 hover:bg-gold-600 text-white mt-6"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save App Info
          </Button>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-xl font-bold border-b border-border pb-2">Authentication Security</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Shared Member Email</Label>
                <Input 
                  value={formData.shared_login_username || ''} 
                  onChange={e => setFormData({...formData, shared_login_username: e.target.value})}
                  className="bg-background" 
                />
              </div>
              <div className="space-y-2">
                <Label>Update Member Password</Label>
                <Input 
                  type="password" 
                  placeholder="Enter new password" 
                  value={memberPassword}
                  onChange={e => setMemberPassword(e.target.value)}
                  className="bg-background" 
                />
                <p className="text-xs text-muted-foreground mt-1">Leave blank to keep current password.</p>
              </div>
              
              <div className="mt-8 space-y-2 pt-4 border-t border-border">
                <Label>Admin Email</Label>
                <Input 
                  value={formData.admin_username || ''} 
                  onChange={e => setFormData({...formData, admin_username: e.target.value})}
                  className="bg-background" 
                />
              </div>
              <div className="space-y-2">
                <Label>Update Admin Password</Label>
                <Input 
                  type="password" 
                  placeholder="Enter new admin password" 
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  className="bg-background" 
                />
              </div>
            </div>
            <Button 
              onClick={handleUpdateAuth} 
              variant="outline"
              className="w-full mt-4"
              disabled={isUpdatingAuth}
            >
              {isUpdatingAuth ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Update Credentials
            </Button>
          </div>

          <div className="glass-card p-6 space-y-4 border border-destructive/20 bg-destructive/5">
            <h2 className="text-xl font-bold text-destructive flex items-center gap-2">
              Database Backup
            </h2>
            <p className="text-sm text-muted-foreground">
              Generate a full JSON backup of all tables (Members, Contributions, Recipients, etc.).
              Keep this file secure as it contains sensitive data.
            </p>
            <Button 
              onClick={handleExportBackup} 
              variant="destructive"
              className="w-full"
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Export Full Backup (JSON)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
