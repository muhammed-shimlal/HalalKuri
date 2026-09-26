import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRecipients, getMembers, addRecipient, deleteRecipient, type Recipient } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trophy, Loader2, AlertCircle, Trash2 } from 'lucide-react'
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

const recipientSchema = z.object({
  member_id: z.string().min(1, "Member is required"),
  month: z.string().min(1, "Month is required"),
  year: z.number().int().min(2020, "Invalid year"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  reason: z.string().optional(),
  remarks: z.string().optional()
})



export default function Recipients() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: recipients, isLoading: isLoadingRecipients } = useQuery({
    queryKey: ['recipients'],
    queryFn: getRecipients
  })

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers
  })

  const form = useForm({
    resolver: zodResolver(recipientSchema) as any,
    defaultValues: {
      member_id: '',
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      amount: 100000,
      reason: '',
      remarks: ''
    }
  })

  const addMutation = useMutation({
    mutationFn: addRecipient,
    onMutate: async (newRecipient) => {
      await queryClient.cancelQueries({ queryKey: ['recipients'] })
      const previous = queryClient.getQueryData(['recipients'])
      
      const member = members?.find(m => m.id === newRecipient.member_id)
      const optimisticRecipient = { 
        ...newRecipient, 
        id: Math.random().toString(), 
        created_at: new Date().toISOString(),
        member 
      }
      
      queryClient.setQueryData(['recipients'], (old: Recipient[] = []) => [
        optimisticRecipient,
        ...old
      ])
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['recipients'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to record recipient." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients'] })
      setIsDialogOpen(false)
      form.reset()
      toast({ title: "Success", description: "Recipient recorded successfully." })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRecipient,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['recipients'] })
      const previous = queryClient.getQueryData(['recipients'])
      queryClient.setQueryData(['recipients'], (old: Recipient[] = []) => old.filter(r => r.id !== id))
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['recipients'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to delete recipient." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients'] })
      toast({ title: "Success", description: "Recipient deleted successfully." })
    }
  })

  const onSubmit = (data: any) => {
    addMutation.mutate({ ...data, reason: data.reason || null, remarks: data.remarks || null })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this recipient?")) {
      deleteMutation.mutate(id)
    }
  }

  const openAddDialog = () => {
    form.reset({
      member_id: '',
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      amount: 100000,
      reason: '',
      remarks: ''
    })
    setIsDialogOpen(true)
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Recipients History</h1>
        <Button onClick={openAddDialog} className="bg-gold-500 hover:bg-gold-600 text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          Record Recipient
        </Button>
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
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingRecipients ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold-500 mx-auto" />
                  </td>
                </tr>
              ) : recipients?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
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
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[200px]">{rec.reason || '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(rec.id)} 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        aria-label={rec.member?.full_name ? `Delete recipient ${rec.member.full_name}` : "Delete recipient"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
            <DialogTitle>Record Recipient</DialogTitle>
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
                    <FormLabel>Lump Sum Amount (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Medical emergency, Draw winner" {...field} />
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
                  Save Recipient
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
