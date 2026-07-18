import { useQuery } from '@tanstack/react-query'
import { getMembers, getContributions, getRecipients, getAnnouncements, getDocuments } from '@/services/api'
import { Users, Wallet, Trophy, Bell, FileText, IndianRupee, Loader2 } from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

export default function AdminDashboard() {
  const { data: members, isLoading: loadingMembers } = useQuery({ queryKey: ['members'], queryFn: getMembers })
  const { data: contributions, isLoading: loadingContributions } = useQuery({ queryKey: ['contributions'], queryFn: () => getContributions() })
  const { data: recipients, isLoading: loadingRecipients } = useQuery({ queryKey: ['recipients'], queryFn: () => getRecipients() })
  const { data: announcements, isLoading: loadingAnnouncements } = useQuery({ queryKey: ['announcements'], queryFn: () => getAnnouncements() })
  const { data: documents, isLoading: loadingDocs } = useQuery({ queryKey: ['documents'], queryFn: () => getDocuments() })

  const isLoading = loadingMembers || loadingContributions || loadingRecipients || loadingAnnouncements || loadingDocs

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    )
  }

  // Calculate Stats
  const totalMembers = members?.length || 0
  const activeMembers = members?.filter(m => m.status === 'ACTIVE').length || 0
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()

  const currentMonthContributions = contributions?.filter(c => c.month === currentMonth && c.year === currentYear) || []
  const paidThisMonth = currentMonthContributions.filter(c => c.status === 'PAID')
  const pendingThisMonth = currentMonthContributions.filter(c => c.status === 'PENDING')
  
  const totalCollectedThisMonth = paidThisMonth.reduce((sum, c) => sum + c.amount, 0)
  const totalPendingThisMonth = pendingThisMonth.reduce((sum, c) => sum + c.amount, 0)
  const totalCollectedAllTime = contributions?.filter(c => c.status === 'PAID').reduce((sum, c) => sum + c.amount, 0) || 0

  const currentRecipient = recipients?.find(r => r.month === currentMonth && r.year === currentYear)

  const stats = [
    { label: "Total Members", value: totalMembers, icon: Users, trend: `${activeMembers} Active` },
    { label: "Pending (This Month)", value: `₹${totalPendingThisMonth.toLocaleString()}`, icon: Wallet, trend: `${pendingThisMonth.length} members` },
    { label: "Paid (This Month)", value: `₹${totalCollectedThisMonth.toLocaleString()}`, icon: Wallet, trend: `${paidThisMonth.length} members` },
    { label: "Total Collected", value: `₹${totalCollectedAllTime.toLocaleString()}`, icon: IndianRupee, trend: "Cycle to date" },
    { label: "Current Recipient", value: currentRecipient?.member?.full_name || 'Not Selected', icon: Trophy, trend: "This month" },
    { label: "Announcements", value: announcements?.length || 0, icon: Bell, trend: `${announcements?.filter(a => a.published).length || 0} active` },
    { label: "Documents", value: documents?.length || 0, icon: FileText, trend: "Files uploaded" },
  ]

  // Chart Data preparation
  const paymentStatusData = [
    { name: 'Paid', value: paidThisMonth.length, color: '#22c55e' }, // green-500
    { name: 'Pending', value: pendingThisMonth.length, color: '#f97316' }, // orange-500
    { name: 'Unrecorded', value: Math.max(0, totalMembers - currentMonthContributions.length), color: '#64748b' } // slate-500
  ]

  // Group contributions by month for the bar chart
  const monthlyDataMap = new Map<string, number>()
  contributions?.filter(c => c.status === 'PAID').forEach(c => {
    const key = `${c.month} ${c.year}`
    monthlyDataMap.set(key, (monthlyDataMap.get(key) || 0) + c.amount)
  })
  
  const collectionTrendData = Array.from(monthlyDataMap.entries())
    .map(([name, amount]) => ({ name, amount }))
    .reverse() // Assuming we want chronological if they were ordered desc

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground bg-card px-4 py-2 rounded-full border border-border">
          Current Month: <span className="font-semibold text-foreground">{currentMonth} {currentYear}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="glass-card p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold-500" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card p-6 min-h-[300px] flex flex-col">
          <h3 className="font-semibold mb-6 text-lg">Collection Status ({currentMonth})</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatusData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: any) => [`${value} Members`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-6 min-h-[300px] flex flex-col">
          <h3 className="font-semibold mb-6 text-lg">Monthly Collections Trend</h3>
          <div className="flex-1 min-h-[250px]">
            {collectionTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collectionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                  <RechartsTooltip 
                    cursor={{fill: 'hsl(var(--muted)/0.5)'}}
                    contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px'}}
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Collected']}
                  />
                  <Bar dataKey="amount" fill="#d4af37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No collection data available yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
