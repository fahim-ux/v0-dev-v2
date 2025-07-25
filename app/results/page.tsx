"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Check, Info, Brain, Code, Database, ChevronDown, ChevronUp } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"

// Mock data
const mockResults = {
  userQuery: "Show me all transactions over ₹10,000 in May",
  reasoning:
    "I analyzed your transaction history for May 2024 and filtered for amounts exceeding ₹10,000. The search identified 12 high-value transactions across various categories including online purchases, bill payments, and transfers. These transactions represent 68% of your total transaction volume for the month, indicating significant financial activity during this period.",
  tabularData: [
    {
      transactionId: "1234567890123456",
      date: "2024-05-15",
      amount: 15750,
      merchant: "Amazon India",
      category: "Shopping",
      status: "completed",
      paymentMethod: "UPI",
    },
    {
      transactionId: "2345678901234567",
      date: "2024-05-22",
      amount: 25000,
      merchant: "HDFC Credit Card",
      category: "Bill Payment",
      status: "completed",
      paymentMethod: "Net Banking",
    },
    {
      transactionId: "3456789012345678",
      date: "2024-05-08",
      amount: 12500,
      merchant: "Flipkart",
      category: "Shopping",
      status: "completed",
      paymentMethod: "UPI",
    },
    {
      transactionId: "4567890123456789",
      date: "2024-05-30",
      amount: 18200,
      merchant: "Swiggy",
      category: "Food & Dining",
      status: "pending",
      paymentMethod: "Credit Card",
    },
    {
      transactionId: "5678901234567890",
      date: "2024-05-12",
      amount: 45000,
      merchant: "Apple Store",
      category: "Electronics",
      status: "completed",
      paymentMethod: "Credit Card",
    },
    {
      transactionId: "6789012345678901",
      date: "2024-05-25",
      amount: 11200,
      merchant: "Zomato",
      category: "Food & Dining",
      status: "failed",
      paymentMethod: "UPI",
    },
  ],
  elasticQuery: `{
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "amount": {
              "gte": 10000
            }
          }
        },
        {
          "range": {
            "date": {
              "gte": "2024-05-01",
              "lte": "2024-05-31"
            }
          }
        }
      ]
    }
  },
  "sort": [
    {
      "date": {
        "order": "desc"
      }
    }
  ]
}`,
  pythonCode: `import pandas as pd
from datetime import datetime

def get_high_value_transactions():
    """
    Filter transactions for May 2024 with amount > ₹10,000
    """
    df = pd.read_csv('transactions.csv')
    
    # Convert date column to datetime
    df['date'] = pd.to_datetime(df['date'])
    
    # Filter for May 2024 and amount > 10000
    may_2024 = df[
        (df['date'].dt.month == 5) & 
        (df['date'].dt.year == 2024) & 
        (df['amount'] > 10000)
    ]
    
    # Sort by date descending
    result = may_2024.sort_values('date', ascending=False)
    
    print(f"Found {len(result)} transactions over ₹10,000 in May")
    return result

# Execute the analysis
transactions = get_high_value_transactions()
print(transactions.head())`,
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || mockResults.userQuery

  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(true)

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const data = useMemo(() => mockResults.tabularData, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Floating Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="hover:bg-slate-100/80 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-900">Query Results</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              {data.length} results found
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* User Query Bubble */}
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-blue-100 uppercase tracking-wider mb-2">Your Query</h2>
                  <p className="text-xl font-medium leading-relaxed">{query}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Reasoning Card */}
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">AI Reasoning</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                  className="hover:bg-slate-100"
                >
                  {isReasoningExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            {isReasoningExpanded && (
              <CardContent className="pt-0">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-xl p-6">
                  <p className="text-slate-700 leading-relaxed text-lg">{mockResults.reasoning}</p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Data Table */}
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Transaction Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>

          {/* Code Panels */}
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">Generated Queries</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="elasticsearch" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100">
                  <TabsTrigger value="elasticsearch" className="data-[state=active]:bg-white">
                    Elasticsearch
                  </TabsTrigger>
                  <TabsTrigger value="python" className="data-[state=active]:bg-white">
                    Python
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="elasticsearch" className="mt-6">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-700">Elasticsearch Query</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(mockResults.elasticQuery, "elastic")}
                        className="hover:bg-slate-50"
                      >
                        {copiedStates.elastic ? (
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        {copiedStates.elastic ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono">{mockResults.elasticQuery}</pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="python" className="mt-6">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-700">Python Code</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(mockResults.pythonCode, "python")}
                        className="hover:bg-slate-50"
                      >
                        {copiedStates.python ? (
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        {copiedStates.python ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
                      <pre className="text-blue-400 text-sm font-mono">{mockResults.pythonCode}</pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
