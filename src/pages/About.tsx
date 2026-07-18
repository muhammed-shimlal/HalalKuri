import { useQuery } from '@tanstack/react-query'
import { getWebsiteContent } from '@/services/api'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  const { data: content, isLoading } = useQuery({
    queryKey: ['website_content', 'About'],
    queryFn: () => getWebsiteContent('About')
  })

  const pageData = content?.[0]

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : (
          <motion.div 
            className="prose prose-invert prose-gold max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              {pageData?.title || 'About Us'}
            </h1>
            <div className="glass-card p-8 text-muted-foreground whitespace-pre-line leading-relaxed text-lg">
              {pageData?.content || 'This platform is exclusively for an already selected group of members participating in a Private Halal Kuri. Our primary purpose is to maintain transparency, manage contribution records, record monthly recipients, publish announcements, and provide members with easy access to information.'}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
