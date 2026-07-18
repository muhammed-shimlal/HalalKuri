import { useQuery } from '@tanstack/react-query'
import { getWebsiteContent } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Heart, Clock, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const { data: content, isLoading } = useQuery({
    queryKey: ['website_content', 'Home'],
    queryFn: () => getWebsiteContent('Home')
  })

  const pageData = content?.[0]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-background to-background" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isLoading ? (
                <div className="flex justify-center mb-6">
                  <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
                </div>
              ) : (
                <span className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-sm font-medium text-gold-500 mb-6">
                  {pageData?.title || '100% Shariah Compliant'}
                </span>
              )}
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Premium Private <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                Halal Kuri Management
              </span>
            </motion.h1>

            <motion.p 
              className="max-w-[600px] text-lg text-muted-foreground md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {pageData?.content || 'A modern, transparent, and interest-free cooperative system designed exclusively for our private community members.'}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full bg-gold-500 hover:bg-gold-600 text-white h-12 px-8">
                  Member Portal <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-12 px-8 border-gold-500/30 hover:bg-gold-500/10">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="glass-card p-8 flex flex-col items-center text-center hover:border-gold-500/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Riba</h3>
              <p className="text-muted-foreground">
                Strictly adhering to Qard Hasan principles. No interest is charged or earned, ensuring 100% Shariah compliance.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 flex flex-col items-center text-center hover:border-gold-500/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Trust</h3>
              <p className="text-muted-foreground">
                A private, invite-only platform built for members who share mutual trust and community values.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 flex flex-col items-center text-center hover:border-gold-500/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Total Transparency</h3>
              <p className="text-muted-foreground">
                Real-time dashboard access for all members to track contributions and recipient histories effortlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
