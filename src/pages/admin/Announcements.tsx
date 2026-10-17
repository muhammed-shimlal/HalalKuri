import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement, type Announcement } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
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

const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  published: z.boolean().default(false)
})



export default function Announcements() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null)
  
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['announcements', 'all'],
    queryFn: () => getAnnouncements(false)
  })

  const form = useForm({
    resolver: zodResolver(announcementSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      published: false
    }
  })

  const addMutation = useMutation({
    mutationFn: addAnnouncement,
    onMutate: async (newAnn) => {
      await queryClient.cancelQueries({ queryKey: ['announcements', 'all'] })
      const previous = queryClient.getQueryData(['announcements', 'all'])
      
      const optimisticAnn = { 
        ...newAnn, 
        id: Math.random().toString(), 
        created_at: new Date().toISOString()
      }
      
      queryClient.setQueryData(['announcements', 'all'], (old: Announcement[] = []) => [
        optimisticAnn,
        ...old
      ])
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['announcements', 'all'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to create announcement." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      setIsDialogOpen(false)
      form.reset()
      toast({ title: "Success", description: "Announcement created successfully." })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<Announcement> }) => updateAnnouncement(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['announcements', 'all'] })
      const previous = queryClient.getQueryData(['announcements', 'all'])
      queryClient.setQueryData(['announcements', 'all'], (old: Announcement[] = []) => 
        old.map(a => a.id === id ? { ...a, ...updates } : a)
      )
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['announcements', 'all'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to update announcement." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      setIsDialogOpen(false)
      setEditingAnn(null)
      form.reset()
      toast({ title: "Success", description: "Announcement updated successfully." })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAnnouncement,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['announcements', 'all'] })
      const previous = queryClient.getQueryData(['announcements', 'all'])
      queryClient.setQueryData(['announcements', 'all'], (old: Announcement[] = []) => old.filter(a => a.id !== id))
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['announcements', 'all'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to delete announcement." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      toast({ title: "Success", description: "Announcement deleted successfully." })
    }
  })

  const onSubmit = (data: any) => {
    if (editingAnn) {
      updateMutation.mutate({ id: editingAnn.id, updates: data })
    } else {
      addMutation.mutate(data)
    }
  }

  const handleEdit = (ann: Announcement) => {
    setEditingAnn(ann)
    form.reset({
      title: ann.title,
      description: ann.description,
      published: ann.published
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      deleteMutation.mutate(id)
    }
  }

  const openAddDialog = () => {
    setEditingAnn(null)
    form.reset({
      title: '',
      description: '',
      published: false
    })
    setIsDialogOpen(true)
  }

  const togglePublish = (ann: Announcement) => {
    updateMutation.mutate({ id: ann.id, updates: { published: !ann.published } })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <Button onClick={openAddDialog} className="bg-gold-500 hover:bg-gold-600 text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          Create Announcement
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="glass-card p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : announcements?.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">
            No announcements found.
          </div>
        ) : (
          announcements?.map((ann) => (
            <div key={ann.id} className="glass-card p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{ann.title}</h3>
                  <button
                    onClick={() => togglePublish(ann)}
                    aria-label={ann.published ? `Unpublish announcement ${ann.title}` : `Publish announcement ${ann.title}`}
                    title={ann.published ? "Click to unpublish" : "Click to publish"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {ann.published ? (
                      <span className="flex items-center gap-1 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <Eye className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-orange-500 text-xs font-medium bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
                        <EyeOff className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">{ann.description}</p>
                <div className="text-xs text-muted-foreground mt-4">
                  Created: {new Date(ann.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto justify-end">
                <Button variant="outline" size="sm" onClick={() => handleEdit(ann)}>
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(ann.id)} className="text-destructive hover:bg-destructive/10 border-destructive/20">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAnn ? 'Edit Announcement' : 'Create Announcement'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control as any}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Announcement title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Content</FormLabel>
                    <FormControl>
                      <textarea 
                        {...field}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                        placeholder="Type the full announcement here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Publish Now</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Make this announcement visible to all members immediately.
                      </div>
                    </div>
                    <FormControl>
                      <input 
                        type="checkbox" 
                        checked={field.value} 
                        onChange={field.onChange}
                        className="w-5 h-5 accent-gold-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white" disabled={addMutation.isPending || updateMutation.isPending}>
                  {(addMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingAnn ? 'Update' : 'Post'} Announcement
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
