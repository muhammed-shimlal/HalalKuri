import { Scale, Ban, HandHeart } from 'lucide-react'

export default function ShariahCompliance() {
  return (
    <div className="pt-24 pb-16 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Shariah <span className="text-gold-500">Compliance</span>
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Our system is strictly governed by Islamic financial principles to ensure every transaction is halal and blessed.
        </p>

        <div className="grid gap-8">
          <div className="glass-card p-8 flex gap-6">
            <HandHeart className="w-12 h-12 text-gold-500 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Qard Hasan (Good Loan)</h3>
              <p className="text-muted-foreground leading-relaxed">
                The entire Halal Kuri operates on the principle of Qard Hasan. Members are essentially providing a cooperative interest-free loan to one another. There is no commercial profit involved.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 flex gap-6">
            <Ban className="w-12 h-12 text-gold-500 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Zero Riba (Interest)</h3>
              <p className="text-muted-foreground leading-relaxed">
                We strictly prohibit Riba. Members receive the exact total amount they contribute over the cycle. There are no interest charges for late payments, nor is there any extra payout for receiving the lump sum late in the cycle.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 flex gap-6">
            <Scale className="w-12 h-12 text-gold-500 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3">No Auction / Discounting (Gharar & Maysir)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Unlike conventional chit funds, we do not allow bidding or discounting. Bidding to take a lower amount (which acts as implicit interest for others) is considered forbidden (Haram). Our payouts are fixed and transparent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
