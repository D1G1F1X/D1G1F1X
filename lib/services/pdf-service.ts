import { jsPDF } from "jspdf"
import type { SavedReading } from "@/types/saved-readings"

export class PdfService {
  /**
   * Generate a PDF from a reading
   */
  static async generateReadingPdf(reading: SavedReading): Promise<Blob> {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Add title
    doc.setFontSize(24)
    doc.setTextColor(88, 28, 135) // Purple color
    doc.text("NUMO Oracle Reading", 105, 20, { align: "center" })

    // Add reading info
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Date: ${reading.date}`, 20, 35)
    doc.text(`Reading Type: ${reading.spreadType}`, 20, 42)

    if (reading.question) {
      doc.text("Question:", 20, 52)
      doc.setFontSize(14)
      doc.setTextColor(88, 28, 135)

      // Handle long questions with text wrapping
      const splitQuestion = doc.splitTextToSize(reading.question, 170)
      doc.text(splitQuestion, 20, 60)
    }

    // Add cards section
    doc.setFontSize(16)
    doc.setTextColor(88, 28, 135)
    doc.text("Cards Drawn", 105, 80, { align: "center" })

    // Add card information
    let yPosition = 90

    // For each card, add its information
    for (let i = 0; i < reading.cards.length; i++) {
      const { card, endUp, position } = reading.cards[i]
      const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd

      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setTextColor(88, 28, 135)
      doc.text(`${position}: ${card.name} (${endUp === "first" ? "First End" : "Second End"})`, 20, yPosition)

      yPosition += 8
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)

      // Card details
      doc.text(`Element: ${card.element}`, 25, yPosition)
      yPosition += 6
      doc.text(`Number: ${cardEnd.number}`, 25, yPosition)
      yPosition += 6

      // Card meaning with text wrapping
      doc.text("Meaning:", 25, yPosition)
      yPosition += 6
      const splitMeaning = doc.splitTextToSize(cardEnd.meaning, 160)
      doc.text(splitMeaning, 30, yPosition)
      yPosition += splitMeaning.length * 6

      // Keywords
      doc.text("Keywords:", 25, yPosition)
      yPosition += 6
      doc.text(cardEnd.keywords.join(", "), 30, yPosition)
      yPosition += 10
    }

    // Add reading interpretation
    doc.addPage()
    doc.setFontSize(16)
    doc.setTextColor(88, 28, 135)
    doc.text("Reading Interpretation", 105, 20, { align: "center" })

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)

    // Add the reading text with proper formatting
    const readingText = reading.advancedReading || reading.basicReading
    const splitReading = doc.splitTextToSize(readingText, 170)

    // Check if the reading is too long and needs multiple pages
    const linesPerPage = 45
    const totalPages = Math.ceil(splitReading.length / linesPerPage)

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        doc.addPage()
      }

      const startLine = page * linesPerPage
      const endLine = Math.min((page + 1) * linesPerPage, splitReading.length)
      const pageLines = splitReading.slice(startLine, endLine)

      doc.text(pageLines, 20, page === 0 ? 30 : 20)
    }

    // Add footer with NUMO Oracle branding
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(10)
      doc.setTextColor(128, 128, 128)
      doc.text(`NUMO Oracle Reading - Page ${i} of ${pageCount}`, 105, 290, { align: "center" })
    }

    // Return the PDF as a blob
    return doc.output("blob")
  }
}
