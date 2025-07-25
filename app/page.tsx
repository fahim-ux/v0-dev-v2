"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Sparkles, TrendingUp, DollarSign, Calendar, Filter, Zap } from "lucide-react"

const exampleQueries = [
  {
    icon: DollarSign,
    text: "Show me all transactions over ₹10,000 in May",
    category: "High Value",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Calendar,
    text: "Find all failed payments in the last 30 days",
    category: "Status",
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: TrendingUp,
    text: "What's my average transaction amount this quarter?",
    category: "Analytics",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Filter,
    text: "Show UPI transactions from HDFC Bank",
    category: "Payment Method",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: Search,
    text: "Find transactions to merchant 'Amazon India'",
    category: "Merchant",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: Zap,
    text: "Show me weekend transactions above ₹5,000",
    category: "Time-based",
    gradient: "from-cyan-500 to-blue-600",
  },
]

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      router.push(`/results?q=${encodeURIComponent(query)}`)
    }, 1200)
  }

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Floating Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                BankingAI
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Dashboard
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Analytics
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Settings
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Ask anything about your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                financial data
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform natural language into powerful insights. Query your banking data with AI-powered analysis and
              get instant, detailed breakdowns.
            </p>
          </div>

          {/* Enhanced Search Form */}
          <form onSubmit={handleSubmit} className="mb-16">
            <div className="relative max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/50">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                  <Input
                    type="text"
                    placeholder="e.g., Show me all transactions over ₹10,000 in May..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-16 pr-40 py-6 text-lg border-0 focus:ring-0 rounded-2xl bg-transparent placeholder:text-slate-400"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <span className="font-semibold">Search</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Enhanced Example Queries */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Try these examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleQueries.map((example, index) => {
                const IconComponent = example.icon
                return (
                  <Card
                    key={index}
                    className="cursor-pointer group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white/70 backdrop-blur-sm overflow-hidden"
                    onClick={() => handleExampleClick(example.text)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${example.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            {example.category}
                          </div>
                          <p className="text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                            {example.text}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
