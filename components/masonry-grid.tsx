"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react"

interface DataItem {
  key: string
  value: string
  type: string
}

interface Section {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  bgGradient: string
  borderColor: string
  textColor: string
  iconBg: string
  iconColor: string
  data: DataItem[]
}

interface MasonryGridProps {
  sections: Section[]
  expandedSections: Set<string>
  onToggleSection: (sectionId: string) => void
  onCopyField: (text: string, field: string) => void
  copiedField: string | null
}

export function MasonryGrid({
  sections,
  expandedSections,
  onToggleSection,
  onCopyField,
  copiedField,
}: MasonryGridProps) {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 768) {
        setColumns(1)
      } else if (window.innerWidth < 1200) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Distribute sections across columns for masonry effect
  const distributeIntoColumns = (items: Section[], numColumns: number) => {
    const columns: Section[][] = Array.from({ length: numColumns }, () => [])
    const columnHeights = new Array(numColumns).fill(0)

    items.forEach((item) => {
      // Find column with minimum height
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights))
      columns[minHeightIndex].push(item)

      // Estimate height based on expanded state and data length
      const isExpanded = expandedSections.has(item.id)
      const estimatedHeight = isExpanded ? 200 + item.data.length * 25 : 150
      columnHeights[minHeightIndex] += estimatedHeight
    })

    return columns
  }

  const columnData = distributeIntoColumns(sections, columns)

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      timestamp: "🕐",
      status: "✅",
      score: "📊",
      percentage: "📈",
      risk: "⚠️",
      ip: "🌐",
      technical: "⚙️",
      compliance: "🛡️",
      model: "🧠",
      id: "🆔",
      volume: "💰",
      rate: "📊",
      hash: "🔗",
      default: "📋",
    }
    return icons[type] || icons.default
  }

  const formatValue = (value: string, type: string) => {
    if (type === "timestamp" && value.includes("IST")) {
      const [date, time] = value.split(" ")
      return (
        <div className="space-y-1">
          <div className="font-mono text-sm">{time}</div>
          <div className="text-xs opacity-75">{date}</div>
        </div>
      )
    }
    return <span className="font-mono text-sm">{value}</span>
  }

  return (
    <div className="w-full">
      <div className={`grid gap-6 ${columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {columnData.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {column.map((section) => {
              const IconComponent = section.icon
              const isExpanded = expandedSections.has(section.id)
              const displayData = isExpanded ? section.data : section.data.slice(0, 4)

              return (
                <Card
                  key={section.id}
                  className={`border-0 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${section.borderColor}`}
                  style={{
                    animationDelay: `${columnIndex * 100}ms`,
                  }}
                >
                  <CardHeader
                    className={`bg-gradient-to-r ${section.bgGradient} border-b ${section.borderColor} cursor-pointer`}
                    onClick={() => onToggleSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${section.iconBg} rounded-xl flex items-center justify-center shadow-sm`}
                        >
                          <IconComponent className={`w-5 h-5 ${section.iconColor}`} />
                        </div>
                        <CardTitle className={`text-lg ${section.textColor}`}>{section.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={`${section.iconBg} ${section.iconColor} border-0`}>
                          {section.data.length} items
                        </Badge>
                        <Button variant="ghost" size="sm" className={`hover:${section.iconBg} ${section.iconColor}`}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {displayData.map((item, index) => (
                        <div
                          key={index}
                          className={`group flex items-start justify-between p-4 bg-gradient-to-r ${section.bgGradient} rounded-xl border ${section.borderColor} hover:shadow-md transition-all duration-200`}
                        >
                          <div className="flex items-start space-x-3 flex-1 min-w-0">
                            <span className="text-lg flex-shrink-0 mt-0.5">{getTypeIcon(item.type)}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold ${section.textColor} mb-1 leading-relaxed`}>
                                {item.key}
                              </p>
                              <div className={`${section.textColor} opacity-80`}>
                                {formatValue(item.value, item.type)}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onCopyField(item.value, `${section.id}-${index}`)}
                            className={`opacity-0 group-hover:opacity-100 transition-opacity hover:${section.iconBg} flex-shrink-0 ml-2`}
                          >
                            {copiedField === `${section.id}-${index}` ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className={`w-4 h-4 ${section.iconColor}`} />
                            )}
                          </Button>
                        </div>
                      ))}

                      {!isExpanded && section.data.length > 4 && (
                        <Button
                          variant="ghost"
                          onClick={() => onToggleSection(section.id)}
                          className={`w-full ${section.textColor} hover:${section.iconBg} border-2 border-dashed ${section.borderColor} rounded-xl py-3`}
                        >
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Show {section.data.length - 4} more items
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
