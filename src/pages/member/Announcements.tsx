import { useQuery } from '@tanstack/react-query'
import { getAnnouncements } from '@/services/api'
import { Loader2, Bell } from 'lucide-react'

export default function MemberAnnouncements() {
  const { data: announcements, isLoading } = useQuery({
    queryKey: ['announcements', 'published'],
    queryFn: () => getAnnouncements(true)
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="glass-card p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : announcements?.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">
            <Bell className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
            No announcements at this time.
          </div>
        ) : (
          announcements?.map((ann) => (
            <div key={ann.id} className="glass-card p-6 border-l-4 border-l-gold-500 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{ann.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{ann.description}</p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  Posted: {new Date(ann.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
