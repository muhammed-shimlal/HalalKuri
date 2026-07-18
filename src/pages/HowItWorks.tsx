import { Wallet, Users, Trophy, RefreshCcw } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      title: "The Pool Formation",
      icon: Users,
      description: "A fixed number of trusted members join the Halal Kuri. For example, 20 members agreeing to a 20-month cycle."
    },
    {
      title: "Monthly Contribution",
      icon: Wallet,
      description: "Every month, each member contributes a fixed amount (e.g., ₹5,000) into the common pool, creating a total monthly collection of ₹100,000."
    },
    {
      title: "Recipient Selection",
      icon: Trophy,
      description: "One member is selected each month to receive the entire pool amount. Selection is done via transparent draw or pre-agreed necessity, without any auction/discount."
    },
    {
      title: "Cycle Completion",
      icon: RefreshCcw,
      description: "The process repeats every month until all 20 members have received the lump sum exactly once. Everyone receives exactly what they put in over the cycle."
    }
  ]

  return (
    <div className="pt-24 pb-16 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          How It <span className="text-gold-500">Works</span>
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          A simple, transparent process based on mutual cooperation and Islamic financial principles.
        </p>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-8 h-8 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                    <span className="text-gold-500 text-lg font-mono bg-gold-500/10 px-3 py-1 rounded-full">Step {index + 1}</span>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
