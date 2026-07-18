import { useQuery } from '@tanstack/react-query'
import { getMembers, getContributions, getRecipients, getAnnouncements } from '@/services/api'
import { Users, Wallet, Trophy, Bell, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MemberDashboard() {
  const { data: members, isLoading: loadingMembers } = useQuery({ queryKey: ['members'], queryFn: getMembers })
  const { data: contributions, isLoading: loadingContributions } = useQuery({ queryKey: ['contributions'], queryFn: () => getContributions() })
  const { data: recipients, isLoading: loadingRecipients } = useQuery({ queryKey: ['recipients'], queryFn: () => getRecipients() })
  const { data: announcements, isLoading: loadingAnnouncements } = useQuery({ queryKey: ['announcements'], queryFn: () => getAnnouncements(true) })

  const isLoading = loadingMembers || loadingContributions || loadingRecipients || loadingAnnouncements

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    )
  }

  const activeMembers = members?.filter(m => m.status === 'ACTIVE').length || 0
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()

  const currentMonthContributions = contributions?.filter(c => c.month === currentMonth && c.year === currentYear) || []
  const paidThisMonth = currentMonthContributions.filter(c => c.status === 'PAID')
  
  const currentRecipient = recipients?.find(r => r.month === currentMonth && r.year === currentYear)
  const latestAnnouncement = announcements?.[0]

  const stats = [
    { label: "Active Members", value: activeMembers, icon: Users, link: "/member/status" },
    { label: "Paid This Month", value: paidThisMonth.length, icon: Wallet, link: "/member/status" },
    { label: "Current Recipient", value: currentRecipient?.member?.full_name || 'Not Selected', icon: Trophy, link: "/member/recipients" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member Portal</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Here is the latest overview.</p>
        </div>
        <div className="text-sm text-muted-foreground bg-card px-4 py-2 rounded-full border border-border">
          Current Month: <span className="font-semibold text-foreground">{currentMonth} {currentYear}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Link to={stat.link} key={i}>
              <div className="glass-card p-6 flex flex-col justify-between hover:border-gold-500/50 transition-colors cursor-pointer h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gold-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground line-clamp-1" title={stat.value.toString()}>{stat.value}</h3>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {latestAnnouncement && (
        <div className="glass-card p-6 border-l-4 border-l-gold-500">
          <div className="flex items-center gap-2 mb-2 text-gold-500 font-medium">
            <Bell className="w-4 h-4" />
            Latest Announcement
          </div>
          <h3 className="text-lg font-bold mb-1">{latestAnnouncement.title}</h3>
          <p className="text-muted-foreground line-clamp-2">{latestAnnouncement.description}</p>
          <Link to="/member/announcements" className="text-sm text-gold-500 hover:underline mt-4 inline-block">
            Read more &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
