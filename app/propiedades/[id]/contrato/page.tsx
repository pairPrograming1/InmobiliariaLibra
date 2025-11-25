"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"

export default function ContratoPage() {
  const params = useParams()
  const [html, setHtml] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}/pdf`)
        const htmlContent = await response.text()
        setHtml(htmlContent)
      } catch (error) {
        console.error("[v0] Error fetching contract:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContract()
  }, [params.id])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 no-print">
        <Button onClick={handlePrint} className="gap-2 shadow-lg">
          <Download className="h-4 w-4" />
          Descargar PDF
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
