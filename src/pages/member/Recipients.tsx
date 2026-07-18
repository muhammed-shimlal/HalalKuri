import { useQuery } from '@tanstack/react-query'
import { getRecipients } from '@/services/api'
import { Trophy, Loader2, AlertCircle } from 'lucide-react'

export default function MemberRecipients() {
  const { data: recipients, isLoading } = useQuery({
    queryKey: ['recipients'],
    queryFn: getRecipients
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Recipients History</h1>
      </div>

      <div className="glass-card p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
              <tr>
                <th className="px-4 py-3 font-medium">Month/Year</th>
                <th className="px-4 py-3 font-medium">Recipient</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold-500 mx-auto" />
                  </td>
                </tr>
              ) : recipients?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                    <AlertCircle className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
                    No recipients recorded yet.
                  </td>
                </tr>
              ) : (
                recipients?.map((rec) => (
                  <tr key={rec.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{rec.month} {rec.year}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-gold-500" />
                        <span className="font-semibold">{rec.member?.full_name}</span>
                        <span className="text-muted-foreground text-xs">({rec.member?.member_number})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gold-600 dark:text-gold-400">
                      ₹{rec.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[300px]">{rec.reason || '-'}</td>
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
