import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getContributions, getMembers, addContribution, updateContribution, type Contribution } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const contributionSchema = z.object({
  member_id: z.string().min(1, "Member is required"),
  month: z.string().min(1, "Month is required"),
  year: z.number().int().min(2020, "Invalid year"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  status: z.enum(['PAID', 'PENDING']),
  remarks: z.string().optional()
})



export default function Contributions() {
  const [search, setSearch] = useState('')
  const [monthFilter, setMonthFilter] = useState('')
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: contributions, isLoading: isLoadingContributions } = useQuery({
    queryKey: ['contributions', monthFilter, yearFilter],
    queryFn: () => getContributions(monthFilter || undefined, yearFilter ? parseInt(yearFilter) : undefined)
  })

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers
  })

  const form = useForm({
    resolver: zodResolver(contributionSchema) as any,
    defaultValues: {
      member_id: '',
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      amount: 5000,
      status: 'PAID',
      remarks: ''
    }
  })

  const addMutation = useMutation({
    mutationFn: addContribution,
    onMutate: async (newContribution) => {
      await queryClient.cancelQueries({ queryKey: ['contributions', monthFilter, yearFilter] })
      const previous = queryClient.getQueryData(['contributions', monthFilter, yearFilter])
      
      const member = members?.find(m => m.id === newContribution.member_id)
      const optimisticContribution = { 
        ...newContribution, 
        id: Math.random().toString(), 
        created_at: new Date().toISOString(),
        member 
      }
      
      queryClient.setQueryData(['contributions', monthFilter, yearFilter], (old: Contribution[] = []) => [
        optimisticContribution,
        ...old
      ])
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['contributions', monthFilter, yearFilter], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to record payment." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contributions'] })
      setIsDialogOpen(false)
      form.reset()
      toast({ title: "Success", description: "Payment recorded successfully." })
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'PAID' | 'PENDING' }) => updateContribution(id, { status }),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['contributions', monthFilter, yearFilter] })
      const previous = queryClient.getQueryData(['contributions', monthFilter, yearFilter])
      queryClient.setQueryData(['contributions', monthFilter, yearFilter], (old: Contribution[] = []) => 
        old.map(c => c.id === id ? { ...c, status } : c)
      )
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['contributions', monthFilter, yearFilter], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to update status." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contributions'] })
      toast({ title: "Success", description: "Status updated successfully." })
    }
  })

  const onSubmit = (data: any) => {
    addMutation.mutate({ ...data, remarks: data.remarks || null })
  }

  const openAddDialog = () => {
    form.reset({
      member_id: '',
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      amount: 5000,
      status: 'PAID',
      remarks: ''
    })
    setIsDialogOpen(true)
  }

  const filteredContributions = contributions?.filter(c => 
    c.member?.full_name.toLowerCase().includes(search.toLowerCase()) || 
    c.member?.member_number.toLowerCase().includes(search.toLowerCase())
  )

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const years = [2024, 2025, 2026, 2027, 2028]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Contributions</h1>
        <Button onClick={openAddDialog} className="bg-gold-500 hover:bg-gold-600 text-white rounded-full">
          Record Payment
        </Button>
      </div>

      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by member..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              className="flex-1 sm:flex-none bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-gold-500"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value="">All Months</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select 
              className="flex-1 sm:flex-none bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-gold-500"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All Years</option>
              {years.map(y => <option key={y} value={y.toString()}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
              <tr>
                <th className="px-4 py-3 font-medium">Member</th>
                <th className="px-4 py-3 font-medium">Month/Year</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingContributions ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold-500 mx-auto" />
                  </td>
                </tr>
              ) : filteredContributions?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    <AlertCircle className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
                    No contributions found.
                  </td>
                </tr>
              ) : (
                filteredContributions?.map((cont) => (
                  <tr key={cont.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      {cont.member?.full_name} <span className="text-muted-foreground text-xs">({cont.member?.member_number})</span>
                    </td>
                    <td className="px-4 py-3">{cont.month} {cont.year}</td>
                    <td className="px-4 py-3 font-semibold">₹{cont.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {cont.status === 'PAID' ? (
                        <span className="flex w-fit items-center gap-1 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                          <CheckCircle className="w-3 h-3" /> Paid
                        </span>
                      ) : (
                        <span className="flex w-fit items-center gap-1 text-orange-500 text-xs font-medium bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {cont.status === 'PENDING' ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white"
                          onClick={() => updateStatusMutation.mutate({ id: cont.id, status: 'PAID' })}
                          disabled={updateStatusMutation.isPending}
                        >
                          Mark Paid
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-muted-foreground hover:text-orange-500"
                          onClick={() => updateStatusMutation.mutate({ id: cont.id, status: 'PENDING' })}
                          disabled={updateStatusMutation.isPending}
                        >
                          Mark Pending
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control as any}
                name="member_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        disabled={isLoadingMembers}
                      >
                        <option value="">Select a member</option>
                        {members?.filter(m => m.status === 'ACTIVE').map(m => (
                          <option key={m.id} value={m.id}>{m.member_number} - {m.full_name}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control as any}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control as any}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="PAID">PAID</option>
                        <option value="PENDING">PENDING</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white" disabled={addMutation.isPending}>
                  {addMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Payment
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
