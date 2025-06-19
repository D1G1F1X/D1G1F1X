const fs = require("fs")
const path = require("path")

function verifyCardImages(directory) {
  console.log(`🔍 Verifying card images in: ${directory}`)

  try {
    if (!fs.existsSync(directory)) {
      console.error(`❌ Directory does not exist: ${directory}`)
      return
    }

    const files = fs.readdirSync(directory)
    const imageFiles = files.filter((file) => file.match(/\.(jpg|jpeg|png)$/i))

    console.log(`📁 Total image files found: ${imageFiles.length}`)

    // Categorize files by naming convention
    const standardFormat = [] // 01-suit-element.jpg
    const legacyFormat = [] // 1-suit-element.jpg
    const otherFormat = [] // Other formats

    imageFiles.forEach((file) => {
      if (file.match(/^\d{2}-[a-z]+-[a-z]+\.(jpg|jpeg|png)$/i)) {
        standardFormat.push(file)
      } else if (file.match(/^\d{1}-[a-z]+-[a-z]+\.(jpg|jpeg|png)$/i)) {
        legacyFormat.push(file)
      } else {
        otherFormat.push(file)
      }
    })

    console.log(`\n📊 File Format Analysis:`)
    console.log(`   ✅ Standard format (0X-suit-element): ${standardFormat.length} files`)
    console.log(`   🔄 Legacy format (X-suit-element): ${legacyFormat.length} files`)
    console.log(`   ❓ Other formats: ${otherFormat.length} files`)

    if (legacyFormat.length > 0) {
      console.log(`\n🔄 Legacy format files that need updating:`)
      legacyFormat.forEach((file) => console.log(`   - ${file}`))
    }

    if (otherFormat.length > 0) {
      console.log(`\n❓ Files with other naming conventions:`)
      otherFormat.forEach((file) => console.log(`   - ${file}`))
    }

    if (legacyFormat.length === 0) {
      console.log(`\n✅ All files follow the standard naming convention!`)
    } else {
      console.log(`\n💡 Run the standardization script to update ${legacyFormat.length} legacy files`)
    }

    return {
      total: imageFiles.length,
      standard: standardFormat.length,
      legacy: legacyFormat.length,
      other: otherFormat.length,
    }
  } catch (error) {
    console.error(`❌ Error verifying images:`, error.message)
  }
}

// Main execution
const directoryPath = path.join(process.cwd(), "public", "cards")
verifyCardImages(directoryPath)
