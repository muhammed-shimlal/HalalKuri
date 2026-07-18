import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWebsiteContent, updateWebsiteContent, type WebsiteContent } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Loader2, Save, FileText, Globe, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function WebsiteContentEditor() {
  const [selectedPage, setSelectedPage] = useState<string>('Home')
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: websiteContents, isLoading } = useQuery({
    queryKey: ['website_content'],
    queryFn: () => getWebsiteContent()
  })

  const currentData = websiteContents?.find(w => w.page === selectedPage)

  // Sync state when selection changes or data loads
  useState(() => {
    if (currentData) {
      setContent(currentData.content)
      setTitle(currentData.title)
    }
  })
  
  // A better way to sync state without useEffect loop
  const handlePageChange = (page: string) => {
    setSelectedPage(page)
    const data = websiteContents?.find(w => w.page === page)
    if (data) {
      setContent(data.content)
      setTitle(data.title)
    } else {
      setContent('')
      setTitle('')
    }
  }

  // If first load
  if (websiteContents && !title && !content && currentData) {
    setTitle(currentData.title)
    setContent(currentData.content)
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<WebsiteContent> }) => updateWebsiteContent(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['website_content'] })
      const previous = queryClient.getQueryData(['website_content'])
      queryClient.setQueryData(['website_content'], (old: WebsiteContent[] = []) => 
        old.map(w => w.id === id ? { ...w, ...updates } : w)
      )
      return { previous }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['website_content'], context?.previous)
      toast({ variant: "destructive", title: "Error", description: "Failed to update content." })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['website_content'] })
      toast({ title: "Success", description: "Website content updated successfully." })
    }
  })

  const handleSave = () => {
    if (currentData) {
      updateMutation.mutate({ id: currentData.id, updates: { title, content } })
    } else {
      // In a real app we might insert if it doesn't exist, but our schema implies pages exist.
      toast({ variant: "destructive", title: "Error", description: "Page record not found." })
    }
  }

  const pages = ['Home', 'About', 'How It Works', 'Shariah Compliance', 'Rules', 'FAQ', 'Contact']

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Website Content</h1>
        <Button 
          onClick={handleSave} 
          className="bg-gold-500 hover:bg-gold-600 text-white rounded-full"
          disabled={updateMutation.isPending || !currentData}
        >
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6 items-start">
        <div className="glass-card p-4 space-y-2 sticky top-24">
          <div className="font-semibold px-3 py-2 flex items-center gap-2 border-b border-border mb-2">
            <Globe className="w-4 h-4 text-gold-500" />
            Pages
          </div>
          <nav className="flex flex-col space-y-1">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedPage === p
                    ? 'bg-gold-500/10 text-gold-500 font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <FileText className="w-4 h-4" />
                {p}
              </button>
            ))}
          </nav>
        </div>

        <div className="glass-card p-6 min-h-[60vh] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
            </div>
          ) : !currentData ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <AlertCircle className="w-8 h-8 text-muted-foreground/50 mb-3" />
              <p>Content for "{selectedPage}" not found in database.</p>
              <p className="text-sm mt-2">Make sure you have seeded the website_content table.</p>
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-2">
                <label className="text-sm font-medium">Page Title / Headline</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors font-semibold"
                />
              </div>
              <div className="space-y-2 flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Content (Markdown Supported)</label>
                  <span className="text-xs text-muted-foreground">Use markdown for bold, lists, and links</span>
                </div>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full flex-1 min-h-[400px] bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors font-mono text-sm leading-relaxed"
                  placeholder="Enter page content here..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
