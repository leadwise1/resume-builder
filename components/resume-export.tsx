interface ExportOptions {
  format: "pdf" | "docx" | "html"
  template: string
  resumeData: any
}

export async function exportResume({ format, template, resumeData }: ExportOptions) {
  try {
    const response = await fetch("/api/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeData,
        template,
        format,
      }),
    })

    if (!response.ok) {
      throw new Error("Export failed")
    }

    if (format === "html") {
      const htmlContent = await response.text()
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${resumeData.personalInfo.fullName || "resume"}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      // For PDF, open print dialog
      const htmlContent = await response.text()
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        printWindow.onload = () => {
          setTimeout(() => printWindow.print(), 500)
        }
      }
    }
  } catch (error) {
    console.error("Export error:", error)
    throw error
  }
}

export function generateResumeFileName(resumeData: any, format: string): string {
  const name = resumeData.personalInfo.fullName || "resume"
  const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()
  return `${sanitizedName}_resume.${format}`
}
