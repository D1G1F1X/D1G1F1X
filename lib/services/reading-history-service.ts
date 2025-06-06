import type { SavedReading } from "@/types/saved-readings"

export class ReadingHistoryService {
  private static isClient = typeof window !== "undefined"

  static getAllReadings(): SavedReading[] {
    if (!this.isClient) {
      // Return empty array on server side
      return []
    }

    try {
      const readings = localStorage.getItem("numo_saved_readings")
      return readings ? JSON.parse(readings) : []
    } catch (error) {
      console.error("Error loading readings from localStorage:", error)
      return []
    }
  }

  static saveReading(reading: SavedReading): void {
    if (!this.isClient) {
      console.warn("Cannot save reading on server side")
      return
    }

    try {
      const existingReadings = this.getAllReadings()
      const updatedReadings = [reading, ...existingReadings.filter((r) => r.id !== reading.id)]
      localStorage.setItem("numo_saved_readings", JSON.stringify(updatedReadings))
    } catch (error) {
      console.error("Error saving reading to localStorage:", error)
    }
  }

  static deleteReading(id: string): void {
    if (!this.isClient) {
      console.warn("Cannot delete reading on server side")
      return
    }

    try {
      const existingReadings = this.getAllReadings()
      const updatedReadings = existingReadings.filter((r) => r.id !== id)
      localStorage.setItem("numo_saved_readings", JSON.stringify(updatedReadings))
    } catch (error) {
      console.error("Error deleting reading from localStorage:", error)
    }
  }

  static getReading(id: string): SavedReading | null {
    if (!this.isClient) {
      return null
    }

    try {
      const readings = this.getAllReadings()
      return readings.find((r) => r.id === id) || null
    } catch (error) {
      console.error("Error getting reading from localStorage:", error)
      return null
    }
  }

  static updateReading(id: string, updates: Partial<SavedReading>): void {
    if (!this.isClient) {
      console.warn("Cannot update reading on server side")
      return
    }

    try {
      const existingReadings = this.getAllReadings()
      const updatedReadings = existingReadings.map((r) => (r.id === id ? { ...r, ...updates } : r))
      localStorage.setItem("numo_saved_readings", JSON.stringify(updatedReadings))
    } catch (error) {
      console.error("Error updating reading in localStorage:", error)
    }
  }
}
