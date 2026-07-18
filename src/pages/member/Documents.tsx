import { useQuery } from '@tanstack/react-query'
import { getDocuments } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Loader2, FileText, Download, AlertCircle } from 'lucide-react'

export default function MemberDocuments() {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
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
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 truncate" title={doc.title}>{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {(doc.file_size / 1024 / 1024).toFixed(2)} MB • {new Date(doc.created_at).toLocaleDateString()}
                </p>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full group hover:border-gold-500">
                    <Download className="w-4 h-4 mr-2 group-hover:text-gold-500 transition-colors" />
                    Download
                  </Button>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
