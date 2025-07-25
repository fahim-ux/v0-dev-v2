"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  FileText,
  Calendar,
  CreditCard,
  Download,
  Shield,
  Zap,
  Users,
  BarChart3,
  Lock,
  Wifi,
  Brain,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import { MasonryGrid } from "@/components/masonry-grid"

// Enhanced mock transaction details with multiple sections
const mockTransactionDetails = {
  transactionId: "1234567890123456",
  status: "completed",
  amount: "₹15,750",

  paymentSummary: `# Payment Summary

This transaction represents a **high-value purchase** from Amazon India on May 15, 2024. The payment was processed successfully through UPI using HDFC Bank as the source account.

## Key Details
- **Amount**: ₹15,750
- **Payment Method**: UPI (Unified Payments Interface)
- **Processing Time**: 2.3 seconds
- **Risk Score**: Low (0.2/10)

## Transaction Flow
1. Payment initiated from mobile app
2. Two-factor authentication completed
3. Bank authorization received
4. Merchant confirmation processed
5. Transaction completed successfully

*This transaction has been verified and is part of your regular spending pattern.*`,

  sections: [
    {
      id: "payment-events",
      title: "Payment Timeline",
      icon: Calendar,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-900",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      data: [
        { key: "Transaction Initiated", value: "2024-05-15 14:23:45 IST", type: "timestamp" },
        { key: "User Authentication", value: "2024-05-15 14:23:47 IST", type: "timestamp" },
        { key: "Bank Authorization", value: "2024-05-15 14:23:48 IST", type: "timestamp" },
        { key: "Merchant Confirmation", value: "2024-05-15 14:23:50 IST", type: "timestamp" },
        { key: "Payment Settlement", value: "2024-05-15 14:24:15 IST", type: "timestamp" },
        { key: "Final Status", value: "Completed Successfully", type: "status" },
        { key: "Processing Duration", value: "30 seconds", type: "duration" },
        { key: "Retry Attempts", value: "0", type: "count" },
        { key: "Authentication Method", value: "Biometric + PIN", type: "method" },
        { key: "Network Latency", value: "120ms", type: "technical" },
        { key: "Queue Position", value: "1st in queue", type: "position" },
        { key: "Server Response Time", value: "2.3 seconds", type: "technical" },
      ],
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment",
      icon: Shield,
      color: "red",
      gradient: "from-red-500 to-rose-600",
      bgGradient: "from-red-50 to-rose-50",
      borderColor: "border-red-200",
      textColor: "text-red-900",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      data: [
        { key: "Overall Risk Score", value: "Low (0.2/10)", type: "score" },
        { key: "Fraud Probability", value: "0.01%", type: "percentage" },
        { key: "Velocity Check", value: "Passed", type: "status" },
        { key: "Geolocation Risk", value: "Low", type: "risk" },
        { key: "Device Trust Score", value: "9.8/10", type: "score" },
        { key: "Behavioral Pattern", value: "Normal", type: "pattern" },
        { key: "Amount Risk Level", value: "Medium", type: "risk" },
        { key: "Time-based Risk", value: "Low", type: "risk" },
        { key: "Merchant Risk Score", value: "Low (1.2/10)", type: "score" },
        { key: "Historical Patterns", value: "Consistent", type: "pattern" },
        { key: "ML Model Confidence", value: "98.7%", type: "percentage" },
        { key: "Risk Factors Detected", value: "None", type: "count" },
      ],
    },
    {
      id: "network-info",
      title: "Network & Technical",
      icon: Wifi,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      data: [
        { key: "IP Address", value: "203.192.12.45", type: "ip" },
        { key: "User Agent", value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)", type: "agent" },
        { key: "Device Fingerprint", value: "fp_1a2b3c4d5e6f", type: "fingerprint" },
        { key: "Network Provider", value: "Jio 5G", type: "provider" },
        { key: "Connection Type", value: "Mobile Data", type: "connection" },
        { key: "SSL Certificate", value: "Valid (SHA-256)", type: "certificate" },
        { key: "API Version", value: "v2.1.3", type: "version" },
        { key: "Request Headers", value: "12 headers validated", type: "headers" },
        { key: "Response Time", value: "1.2s", type: "time" },
        { key: "Bandwidth Usage", value: "2.3 KB", type: "bandwidth" },
        { key: "CDN Edge Server", value: "Mumbai-01", type: "server" },
        { key: "Load Balancer", value: "LB-ASIA-03", type: "balancer" },
        { key: "Session ID", value: "sess_9x8y7z6w5v4u", type: "session" },
        { key: "Request ID", value: "req_a1b2c3d4e5f6", type: "request" },
        { key: "Trace ID", value: "trace_123456789", type: "trace" },
        { key: "Database Shard", value: "shard-mumbai-02", type: "database" },
        { key: "Cache Hit Ratio", value: "94.2%", type: "percentage" },
        { key: "Error Rate", value: "0.01%", type: "percentage" },
      ],
    },
    {
      id: "compliance",
      title: "Compliance & Regulatory",
      icon: Lock,
      color: "purple",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-900",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      data: [
        { key: "PCI DSS Compliance", value: "Level 1 Certified", type: "compliance" },
        { key: "RBI Guidelines", value: "Fully Compliant", type: "compliance" },
        { key: "KYC Status", value: "Verified", type: "status" },
        { key: "AML Check", value: "Cleared", type: "status" },
        { key: "FATCA Reporting", value: "Not Required", type: "reporting" },
        { key: "Data Residency", value: "India", type: "location" },
        { key: "Audit Trail", value: "Complete", type: "audit" },
        { key: "Regulatory Flags", value: "None", type: "flags" },
        { key: "Sanctions Screening", value: "Passed", type: "screening" },
        { key: "GDPR Compliance", value: "Applicable", type: "compliance" },
        { key: "Data Encryption", value: "AES-256", type: "encryption" },
        { key: "Key Management", value: "HSM Protected", type: "security" },
        { key: "Access Controls", value: "RBAC Enabled", type: "access" },
        { key: "Logging Level", value: "Full Audit", type: "logging" },
        { key: "Retention Policy", value: "7 years", type: "policy" },
      ],
    },
    {
      id: "fraud-detection",
      title: "Fraud Detection",
      icon: Brain,
      color: "orange",
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-900",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      data: [
        { key: "ML Model Version", value: "FraudNet v3.2.1", type: "model" },
        { key: "Anomaly Score", value: "0.12 (Very Low)", type: "score" },
        { key: "Pattern Recognition", value: "Normal Behavior", type: "pattern" },
        { key: "Velocity Limits", value: "Within Bounds", type: "limits" },
        { key: "Device Reputation", value: "Trusted", type: "reputation" },
        { key: "Location Consistency", value: "Verified", type: "location" },
        { key: "Time Pattern Analysis", value: "Typical", type: "analysis" },
        { key: "Amount Pattern", value: "Consistent", type: "pattern" },
        { key: "Merchant Relationship", value: "Established", type: "relationship" },
        { key: "Card Testing Indicators", value: "None", type: "indicators" },
        { key: "Synthetic Identity Risk", value: "Low", type: "risk" },
        { key: "Account Takeover Risk", value: "Minimal", type: "risk" },
        { key: "Social Engineering Risk", value: "Low", type: "risk" },
        { key: "Confidence Level", value: "99.1%", type: "confidence" },
      ],
    },
    {
      id: "customer-info",
      title: "Customer Profile",
      icon: Users,
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50",
      borderColor: "border-cyan-200",
      textColor: "text-cyan-900",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      data: [
        { key: "Customer ID", value: "CUST_789123456", type: "id" },
        { key: "Account Type", value: "Premium Savings", type: "type" },
        { key: "Customer Since", value: "March 2019", type: "date" },
        { key: "Relationship Manager", value: "Priya Sharma", type: "manager" },
        { key: "Credit Score", value: "785 (Excellent)", type: "score" },
        { key: "Monthly Transaction Volume", value: "₹2,45,000", type: "volume" },
        { key: "Average Transaction Size", value: "₹8,500", type: "average" },
        { key: "Preferred Channels", value: "Mobile, UPI", type: "channels" },
        { key: "Risk Profile", value: "Low Risk", type: "profile" },
        { key: "Loyalty Tier", value: "Gold", type: "tier" },
        { key: "Communication Preference", value: "SMS + Email", type: "communication" },
      ],
    },
    {
      id: "merchant-analytics",
      title: "Merchant Analytics",
      icon: BarChart3,
      color: "indigo",
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-900",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      data: [
        { key: "Merchant Category Code", value: "5399 - General Merchandise", type: "mcc" },
        { key: "Success Rate", value: "98.7%", type: "rate" },
        { key: "Average Processing Time", value: "2.1 seconds", type: "time" },
        { key: "Monthly Volume", value: "₹45.2 Cr", type: "volume" },
        { key: "Transaction Count", value: "1,23,456 this month", type: "count" },
        { key: "Chargeback Rate", value: "0.02%", type: "rate" },
        { key: "Refund Rate", value: "1.2%", type: "rate" },
        { key: "Peak Hours", value: "2 PM - 6 PM", type: "hours" },
        { key: "Geographic Spread", value: "Pan India", type: "geography" },
        { key: "Customer Retention", value: "89.3%", type: "retention" },
        { key: "Average Order Value", value: "₹12,450", type: "value" },
        { key: "Seasonal Trends", value: "Festival Peak", type: "trends" },
        { key: "Payment Methods", value: "UPI (67%), Cards (33%)", type: "methods" },
      ],
    },
    {
      id: "technical-metadata",
      title: "Technical Metadata",
      icon: Zap,
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-900",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      data: [
        { key: "Transaction Hash", value: "0x1a2b3c4d5e6f7g8h9i0j", type: "hash" },
        { key: "Block Height", value: "15,234,567", type: "block" },
        { key: "Gas Fee", value: "₹0.12", type: "fee" },
        { key: "Nonce", value: "42", type: "nonce" },
        { key: "Timestamp (UTC)", value: "2024-05-15T08:53:45Z", type: "timestamp" },
        { key: "Protocol Version", value: "HTTP/2", type: "protocol" },
        { key: "Encoding", value: "UTF-8", type: "encoding" },
        { key: "Compression", value: "gzip", type: "compression" },
        { key: "Checksum", value: "SHA256:a1b2c3d4", type: "checksum" },
        { key: "Digital Signature", value: "RSA-2048 Verified", type: "signature" },
        { key: "Certificate Chain", value: "3 levels validated", type: "certificate" },
        { key: "HMAC", value: "SHA256 validated", type: "hmac" },
        { key: "JWT Token", value: "Valid (exp: 1h)", type: "token" },
        { key: "API Rate Limit", value: "1000/hour (23 used)", type: "limit" },
        { key: "Circuit Breaker", value: "Closed", type: "breaker" },
        { key: "Health Check", value: "All systems operational", type: "health" },
        { key: "Monitoring Alerts", value: "None active", type: "alerts" },
        { key: "Performance Metrics", value: "Within SLA", type: "metrics" },
        { key: "Error Tracking", value: "No errors detected", type: "errors" },
        { key: "Log Correlation ID", value: "corr_xyz789", type: "correlation" },
      ],
    },
  ],
}

export default function TransactionDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const transactionId = params.id as string
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["payment-events"]))

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

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
                Back to Results
              </Button>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-900">Transaction Details</span>
                  <p className="text-sm text-slate-500 font-mono">{transactionId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                {mockTransactionDetails.status.charAt(0).toUpperCase() + mockTransactionDetails.status.slice(1)}
              </Badge>
              <span className="text-xl font-bold text-slate-900">{mockTransactionDetails.amount}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* AI Payment Summary */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">AI Payment Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-8 shadow-inner">
                <ReactMarkdown
                  className="prose prose-slate max-w-none"
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold text-slate-900 mb-6">{children}</h1>,
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-slate-800 mb-4 mt-8">{children}</h2>
                    ),
                    p: ({ children }) => <p className="mb-4 text-slate-700 leading-relaxed">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
                    em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>,
                  }}
                >
                  {mockTransactionDetails.paymentSummary}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Masonry Grid Layout */}
          <MasonryGrid
            sections={mockTransactionDetails.sections}
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
            onCopyField={copyToClipboard}
            copiedField={copiedField}
          />

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-8">
            <Button variant="outline" className="border-slate-300 hover:bg-slate-50 bg-white/80 backdrop-blur-sm">
              <Download className="w-4 h-4 mr-2" />
              Export Details
            </Button>
            <Button variant="outline" className="border-slate-300 hover:bg-slate-50 bg-white/80 backdrop-blur-sm">
              <FileText className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
