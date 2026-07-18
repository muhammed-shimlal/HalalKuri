import { FileText, AlertCircle } from 'lucide-react'

export default function Rules() {
  return (
    <div className="pt-24 pb-16 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Halal Kuri <span className="text-gold-500">Rules</span>
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          To ensure fairness and maintain the trust of our community, all members must adhere strictly to these rules.
        </p>

        <div className="glass-card p-8 md:p-12 space-y-8">
          
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-gold-500 w-6 h-6" /> 1. Membership
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Membership is strictly by invitation and vetting by the committee.</li>
              <li>Members must commit to the full duration of the Kuri cycle.</li>
              <li>A member cannot withdraw in the middle of a cycle without providing a reliable substitute.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-gold-500 w-6 h-6" /> 2. Contributions
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Monthly contributions must be paid by the 5th of every month.</li>
              <li>Payments should be made directly to the designated joint account.</li>
              <li>Members must notify the admin once payment is completed.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-gold-500 w-6 h-6" /> 3. Late Payments & Defaults
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>There are no monetary fines for late payments (to avoid Riba).</li>
              <li>However, repeated late payments will result in the member being moved to the end of the recipient queue.</li>
              <li>If a member defaults, their guarantor will be held responsible for the remaining contributions.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-gold-500 w-6 h-6" /> 4. Recipient Selection
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Recipients are decided through a transparent mutual agreement based on necessity, or via a draw.</li>
              <li>Once a member receives the lump sum, they are ineligible for subsequent draws in the same cycle.</li>
              <li>They must, however, continue their monthly contributions until the cycle ends.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
