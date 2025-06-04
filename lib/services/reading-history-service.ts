import type { SavedReading, ReadingHistoryItem } from "@/types/saved-readings"

export class ReadingHistoryService {
  private static STORAGE_KEY = "numo_saved_readings"

  /**
   * Save a reading to local storage
   */
  static saveReading(reading: SavedReading): string {
    try {
      // Get existing readings
      const existingReadings = this.getAllReadings()

      // If reading has no ID, generate one
      if (!reading.id) {
        reading.id = `reading_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      }

      // Add or update reading
      const updatedReadings = existingReadings.filter((r) => r.id !== reading.id)
      updatedReadings.push(reading)

      // Save to storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedReadings))

      return reading.id
    } catch (error) {
      console.error("Error saving reading:", error)
      throw new Error("Failed to save reading")
    }
  }

  /**
   * Get all saved readings
   */
  static getAllReadings(): SavedReading[] {
    try {
      const savedReadings = localStorage.getItem(this.STORAGE_KEY)
      return savedReadings ? JSON.parse(savedReadings) : []
    } catch (error) {
      console.error("Error getting readings:", error)
      return []
    }
  }

  /**
   * Get reading history (simplified list for display)
   */
  static getReadingHistory(): ReadingHistoryItem[] {
    const readings = this.getAllReadings()

    return readings.map((reading) => ({
      id: reading.id,
      date: reading.date,
      title: reading.title,
      spreadType: reading.spreadType,
      cardCount: reading.cards.length,
      previewImage: reading.cards[0]?.card.firstEndImage || reading.cards[0]?.card.secondEndImage,
    }))
  }

  /**
   * Get a specific reading by ID
   */
  static getReadingById(id: string): SavedReading | null {
    try {
      const readings = this.getAllReadings()
      return readings.find((r) => r.id === id) || null
    } catch (error) {
      console.error("Error getting reading:", error)
      return null
    }
  }

  /**
   * Delete a reading by ID
   */
  static deleteReading(id: string): boolean {
    try {
      const readings = this.getAllReadings()
      const updatedReadings = readings.filter((r) => r.id !== id)

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedReadings))
      return true
    } catch (error) {
      console.error("Error deleting reading:", error)
      return false
    }
  }
}
