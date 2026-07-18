import { useQuery } from '@tanstack/react-query'
import { getWebsiteContent } from '@/services/api'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  const { data: content, isLoading } = useQuery({
    queryKey: ['website_content', 'FAQ'],
    queryFn: () => getWebsiteContent('FAQ')
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">
              {pageData?.title || 'Frequently Asked Questions'}
            </h1>
            
            {pageData?.content ? (
              <div className="glass-card p-8 mb-8 text-muted-foreground whitespace-pre-line leading-relaxed text-lg">
                {pageData.content}
              </div>
            ) : null}

            <div className="glass-card p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="text-lg hover:text-gold-500">What is Halal Kuri?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Halal Kuri is a private, cooperative savings system where members pool a fixed amount of money every month, and one member receives the entire lump sum each month without any interest (Riba).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="text-lg hover:text-gold-500">Is this system Halal?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Yes, it operates strictly on the principles of Qard Hasan (interest-free loan). No extra money is paid or received beyond the principal amount contributed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-border">
                  <AccordionTrigger className="text-lg hover:text-gold-500">Can anyone join?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    No, this is a closed, private committee. Membership is strictly by invitation among a trusted circle of individuals to ensure reliability and security.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-border border-b-0">
                  <AccordionTrigger className="text-lg hover:text-gold-500">How do I track my payments?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    All members have access to a shared dashboard where they can track the status of all contributions, current month's recipient, and historical data.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
