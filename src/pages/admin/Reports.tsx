import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getContributions, getMembers } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Loader2, FileDown, Printer, FileSpreadsheet } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }))
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const { toast } = useToast()

  const { data: members, isLoading: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers
  })

  const { data: contributions, isLoading: loadingContributions } = useQuery({
    queryKey: ['contributions', selectedMonth, selectedYear],
    queryFn: () => getContributions(selectedMonth, selectedYear)
  })

  const isLoading = loadingMembers || loadingContributions

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const years = [2024, 2025, 2026, 2027, 2028]

  const generatePDF = (type: 'monthly' | 'annual') => {
    if (!members) return

    const doc = new jsPDF()
    const title = type === 'monthly' ? `Monthly Collection Report - ${selectedMonth} ${selectedYear}` : `Annual Member Report - ${selectedYear}`
    
    doc.setFontSize(18)
    doc.text('Halal Kuri Management System', 14, 22)
    doc.setFontSize(14)
    doc.text(title, 14, 32)
    doc.setFontSize(10)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 40)

    let totalAmount = 0
    let paidCount = 0

    const tableData = members.map(member => {
      const cont = contributions?.find(c => c.member_id === member.id)
      const amount = cont?.status === 'PAID' ? cont.amount : 0
      const status = cont ? cont.status : 'UNRECORDED'
      
      if (status === 'PAID') {
        totalAmount += amount
        paidCount++
      }

      return [
        member.member_number,
        member.full_name,
        member.phone || '-',
        status,
        status === 'PAID' ? `Rs. ${amount}` : '-'
      ]
    })

    autoTable(doc, {
      startY: 45,
      head: [['Member #', 'Name', 'Phone', 'Status', 'Amount']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [212, 175, 55] }, // Gold color
    })

    const finalY = (doc as any).lastAutoTable.finalY || 45
    doc.text(`Total Collected: Rs. ${totalAmount}`, 14, finalY + 10)
    doc.text(`Paid Members: ${paidCount} / ${members.length}`, 14, finalY + 16)

    doc.save(`HK_Report_${type}_${selectedMonth}_${selectedYear}.pdf`)
    toast({ title: "Success", description: "PDF report generated successfully." })
  }

  const generateExcel = () => {
    if (!members) return

    const data = members.map(member => {
      const cont = contributions?.find(c => c.member_id === member.id)
      return {
        'Member Number': member.member_number,
        'Full Name': member.full_name,
        'Phone': member.phone || '',
        'Status': cont ? cont.status : 'UNRECORDED',
        'Amount': cont?.status === 'PAID' ? cont.amount : 0,
        'Month': selectedMonth,
        'Year': selectedYear
      }
    })

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Collections")
    
    XLSX.writeFile(wb, `HK_Report_${selectedMonth}_${selectedYear}.xlsx`)
    toast({ title: "Success", description: "Excel report generated successfully." })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Monthly Contribution Report</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Generate a comprehensive report of all member contributions for a specific month.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Month</label>
              <select 
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-gold-500"
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Year</label>
              <select 
                value={selectedYear}
                onChange={e => setSelectedYear(parseInt(e.target.value))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-gold-500"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button onClick={() => generatePDF('monthly')} disabled={isLoading} className="flex-1 bg-gold-500 hover:bg-gold-600 text-white">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
              Export PDF
            </Button>
            <Button onClick={generateExcel} disabled={isLoading} variant="outline" className="flex-1">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button onClick={handlePrint} disabled={isLoading} variant="outline" className="flex-none">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="glass-card p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Member Directory</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Export a complete list of all registered members with their contact information and current status.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4">
            <Button onClick={() => generatePDF('annual')} disabled={isLoading} variant="outline" className="flex-1">
              <FileDown className="w-4 h-4 mr-2" />
              Directory (PDF)
            </Button>
            <Button onClick={generateExcel} disabled={isLoading} variant="outline" className="flex-1">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Directory (Excel)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
