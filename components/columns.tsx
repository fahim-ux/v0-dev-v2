"use client"

import type React from "react"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink, Sparkles, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export type Transaction = {
  transactionId: string
  date: string
  amount: number
  merchant: string
  category: string
  status: "completed" | "pending" | "failed"
  paymentMethod: string
}

const TransactionIdCell = ({ transactionId }: { transactionId: string }) => {
  const router = useRouter()
  const [showSummary, setShowSummary] = useState(false)
  const [summaryPosition, setSummaryPosition] = useState({ x: 0, y: 0 })

  const handleClick = () => {
    router.push(`/transaction/${transactionId}`)
  }

  const handleSummaryClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setSummaryPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
    setShowSummary(true)
  }

  const closeSummary = () => {
    setShowSummary(false)
  }

  // Mock AI-generated summary - in real app, this would come from your LLM API
  const getAISummary = (id: string) => {
    const summaries: { [key: string]: string } = {
      "1234567890123456":
        "High-value Amazon purchase using UPI with excellent security score and normal spending pattern.",
      "2345678901234567":
        "Credit card bill payment processed successfully with standard verification and low risk indicators.",
      "3456789012345678":
        "Flipkart shopping transaction completed via UPI with typical user behavior and trusted merchant.",
      "4567890123456789":
        "Swiggy food order payment pending verification due to temporary network delay, expected to complete shortly.",
      "5678901234567890":
        "Premium Apple Store purchase using credit card with enhanced security checks and fraud prevention.",
      "6789012345678901":
        "Zomato payment failed due to insufficient funds, customer notified for retry with alternative payment method.",
    }
    return summaries[id] || "Transaction processed with standard security protocols and normal risk assessment."
  }

  return (
    <>
      <div className="flex items-center space-x-2 group">
        <Button
          variant="ghost"
          onClick={handleClick}
          className="h-auto p-0 font-mono text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
        >
          <span className="flex items-center space-x-1">
            <span>{transactionId}</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </Button>

        <button
          onClick={handleSummaryClick}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-md hover:bg-blue-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 magic-wand"
          title="AI Summary"
        >
          <Sparkles className="w-4 h-4 text-blue-500 hover:text-blue-600 sparkle-icon" />
        </button>
      </div>

      {/* AI Summary Floating Panel */}
      {showSummary && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={closeSummary} />

          {/* Floating Panel */}
          <div
            className="fixed z-50 w-80 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-6 transform -translate-x-1/2 -translate-y-full animate-in fade-in-0 zoom-in-95 duration-200 floating-panel"
            style={{
              left: summaryPosition.x,
              top: summaryPosition.y,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">AI Summary</h3>
              </div>
              <button
                onClick={closeSummary}
                className="p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="text-sm text-slate-600 font-mono bg-slate-50 rounded-lg px-3 py-2">
                ID: {transactionId}
              </div>
              <p className="text-slate-700 leading-relaxed">{getAISummary(transactionId)}</p>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Generated by AI</span>
                <span>Just now</span>
              </div>
            </div>

            {/* Arrow pointer */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-3 h-3 bg-white/95 border-r border-b border-slate-200 transform rotate-45 -mt-1.5"></div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    completed: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

const CategoryBadge = ({ category }: { category: string }) => {
  const colors = {
    Shopping: "bg-blue-100 text-blue-800 border-blue-200",
    "Bill Payment": "bg-purple-100 text-purple-800 border-purple-200",
    "Food & Dining": "bg-orange-100 text-orange-800 border-orange-200",
    Electronics: "bg-indigo-100 text-indigo-800 border-indigo-200",
  }

  return (
    <Badge
      variant="secondary"
      className={colors[category as keyof typeof colors] || "bg-slate-100 text-slate-800 border-slate-200"}
    >
      {category}
    </Badge>
  )
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => <TransactionIdCell transactionId={row.getValue("transactionId")} />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-slate-100 -ml-4"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium text-slate-700">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-slate-100 -ml-4"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="font-bold text-slate-900">{formatted}</div>
    },
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => <div className="font-medium text-slate-700">{row.getValue("merchant")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <CategoryBadge category={row.getValue("category")} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-300">
        {row.getValue("paymentMethod")}
      </Badge>
    ),
  },
]
