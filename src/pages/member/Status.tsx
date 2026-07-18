import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getContributions, getMembers } from '@/services/api'
import { Input } from '@/components/ui/input'
import { Search, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function MemberStatus() {
  const [search, setSearch] = useState('')
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers
  })

  const { data: contributions, isLoading: isLoadingContributions } = useQuery({
    queryKey: ['contributions', currentMonth, currentYear],
    queryFn: () => getContributions(currentMonth, currentYear)
  })

  const isLoading = isLoadingMembers || isLoadingContributions

  const activeMembers = members?.filter(m => m.status === 'ACTIVE') || []

  // Combine members with their contribution status for the current month
  const statusData = activeMembers.map(member => {
    const contribution = contributions?.find(c => c.member_id === member.id)
    return {
      member,
      status: contribution?.status || 'UNRECORDED'
    }
  })

  const filteredData = statusData.filter(d => 
    d.member.full_name.toLowerCase().includes(search.toLowerCase()) || 
    d.member.member_number.toLowerCase().includes(search.toLowerCase())
  )

  const paidCount = statusData.filter(d => d.status === 'PAID').length
  const totalCount = statusData.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contribution Status</h1>
          <p className="text-muted-foreground mt-1">Current Month: {currentMonth} {currentYear}</p>
        </div>
        <div className="glass-card px-4 py-2 flex items-center gap-2">
          <span className="text-sm font-medium">Collection Progress:</span>
          <span className="font-bold text-gold-500">{paidCount} / {totalCount}</span>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search members..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
              <tr>
                <th className="px-4 py-3 font-medium">Member #</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold-500 mx-auto" />
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">
                    <AlertCircle className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
                    No active members found.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.member.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{row.member.member_number}</td>
                    <td className="px-4 py-3 font-semibold">{row.member.full_name}</td>
                    <td className="px-4 py-3">
                      {row.status === 'PAID' ? (
                        <span className="flex w-fit items-center gap-1 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                          <CheckCircle className="w-3 h-3" /> Paid
                        </span>
                      ) : (
                        <span className="flex w-fit items-center gap-1 text-orange-500 text-xs font-medium bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
