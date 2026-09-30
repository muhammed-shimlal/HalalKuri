import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDocuments, uploadDocument, addDocument, deleteDocument, type Document } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, FileText, Download, Trash2, AlertCircle, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Documents() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments
  })

  const addMutation = useMutation({
    mutationFn: async ({ title, file }: { title: string, file: File }) => {
      const uploadRes = await uploadDocument(file)
      return addDocument({
        title,
        file_name: uploadRes.file_name,
        file_url: uploadRes.file_url,
        file_size: uploadRes.file_size
      })
    },
    onMutate: () => {
      // Opt UI is tricky for file uploads, we'll just show loading
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to upload document." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      setIsDialogOpen(false)
      setTitle('')
      setFile(null)
      toast({ title: "Success", description: "Document uploaded successfully." })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: ({ id, file_name }: { id: string, file_name: string }) => deleteDocument(id, file_name),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['documents'] })
      const previous = queryClient.getQueryData(['documents'])
      queryClient.setQueryData(['documents'], (old: Document[] = []) => old.filter(d => d.id !== id))
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['documents'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to delete document." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast({ title: "Success", description: "Document deleted successfully." })
    }
  })

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !file) {
      toast({ variant: "destructive", title: "Error", description: "Please provide a title and select a file." })
      return
    }
    // file size limit 25MB
    if (file.size > 25 * 1024 * 1024) {
      toast({ variant: "destructive", title: "Error", description: "File size must be less than 25MB." })
      return
    }
    addMutation.mutate({ title, file })
  }

  const handleDelete = (doc: Document) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteMutation.mutate({ id: doc.id, file_name: doc.file_name })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-gold-500 hover:bg-gold-600 text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full glass-card p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : documents?.length === 0 ? (
          <div className="col-span-full glass-card p-12 text-center text-muted-foreground flex flex-col items-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground/50 mb-3" />
            No documents uploaded yet.
          </div>
        ) : (
          documents?.map((doc) => (
            <div key={doc.id} className="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gold-500" />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label={`Delete ${doc.title}`}
                  onClick={() => handleDelete(doc)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 truncate" title={doc.title}>{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {(doc.file_size / 1024 / 1024).toFixed(2)} MB • {new Date(doc.created_at).toLocaleDateString()}
                </p>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full group">
                    <Download className="w-4 h-4 mr-2 group-hover:text-gold-500 transition-colors" />
                    Download
                  </Button>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label>Document Title</Label>
              <Input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="e.g. Terms and Conditions" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>File (PDF only, max 25MB)</Label>
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gold-500 transition-colors bg-background"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to select file</p>
                <p className="text-xs text-muted-foreground mt-1">{file ? file.name : 'No file selected'}</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="application/pdf"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white" disabled={addMutation.isPending || !file || !title}>
                {addMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Upload
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
