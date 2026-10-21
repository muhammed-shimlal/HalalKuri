import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMembers, addMember, updateMember, deleteMember, type Member } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react'
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

const memberSchema = z.object({
  member_number: z.string().min(1, "Member number is required"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE'])
})

type MemberFormValues = z.infer<typeof memberSchema>

export default function Members() {
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: members, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers
  })

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      member_number: '',
      full_name: '',
      phone: '',
      address: '',
      status: 'ACTIVE'
    }
  })

  const addMutation = useMutation({
    mutationFn: addMember,
    onMutate: async (newMember) => {
      await queryClient.cancelQueries({ queryKey: ['members'] })
      const previousMembers = queryClient.getQueryData(['members'])
      queryClient.setQueryData(['members'], (old: Member[] = []) => [
        ...old,
        { ...newMember, id: Math.random().toString(), created_at: new Date().toISOString() }
      ])
      return { previousMembers }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['members'], context?.previousMembers)
      toast({ variant: "destructive", title: "Error", description: "Failed to add member." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
      setIsDialogOpen(false)
      form.reset()
      toast({ title: "Success", description: "Member added successfully." })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<Member> }) => updateMember(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['members'] })
      const previousMembers = queryClient.getQueryData(['members'])
      queryClient.setQueryData(['members'], (old: Member[] = []) => 
        old.map(m => m.id === id ? { ...m, ...updates } : m)
      )
      return { previousMembers }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['members'], context?.previousMembers)
      toast({ variant: "destructive", title: "Error", description: "Failed to update member." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
      setIsDialogOpen(false)
      setEditingMember(null)
      form.reset()
      toast({ title: "Success", description: "Member updated successfully." })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['members'] })
      const previousMembers = queryClient.getQueryData(['members'])
      queryClient.setQueryData(['members'], (old: Member[] = []) => old.filter(m => m.id !== id))
      return { previousMembers }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['members'], context?.previousMembers)
      toast({ variant: "destructive", title: "Error", description: "Failed to delete member." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
      toast({ title: "Success", description: "Member deleted successfully." })
    }
  })

  const onSubmit = (data: any) => {
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, updates: { ...data, phone: data.phone || null, address: data.address || null } })
    } else {
      addMutation.mutate({ ...data, phone: data.phone || null, address: data.address || null })
    }
  }

  const handleEdit = (member: Member) => {
    setEditingMember(member)
    form.reset({
      member_number: member.member_number,
      full_name: member.full_name,
      phone: member.phone || '',
      address: member.address || '',
      status: member.status
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      deleteMutation.mutate(id)
    }
  }

  const openAddDialog = () => {
    setEditingMember(null)
    form.reset({
      member_number: '',
      full_name: '',
      phone: '',
      address: '',
      status: 'ACTIVE'
    })
    setIsDialogOpen(true)
  }

  const filteredMembers = members?.filter(m => 
    m.full_name.toLowerCase().includes(search.toLowerCase()) || 
    m.member_number.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Members Management</h1>
        <Button onClick={openAddDialog} className="bg-gold-500 hover:bg-gold-600 text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 max-w-sm">
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
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold-500 mx-auto" />
                  </td>
                </tr>
              ) : filteredMembers?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    <AlertCircle className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
                    No members found.
                  </td>
                </tr>
              ) : (
                filteredMembers?.map((member) => (
                  <tr key={member.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{member.member_number}</td>
                    <td className="px-4 py-3 font-semibold">{member.full_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{member.phone || '-'}</td>
                    <td className="px-4 py-3">
                      {member.status === 'ACTIVE' ? (
                        <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium border border-green-500/20">
                          {member.status}
                        </span>
                      ) : (
                        <span className="bg-orange-500/10 text-orange-500 px-2 py-1 rounded-full text-xs font-medium border border-orange-500/20">
                          {member.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" aria-label={`Edit ${member.full_name}`} onClick={() => handleEdit(member)} className="h-8 w-8 text-muted-foreground hover:text-gold-500">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Delete ${member.full_name}`} onClick={() => handleDelete(member.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
            <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="member_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., HK001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Street..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
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
                <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white" disabled={addMutation.isPending || updateMutation.isPending}>
                  {(addMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Member
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
