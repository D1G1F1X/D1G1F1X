const fs = require("fs")
const path = require("path")

function standardizeCardImageNames(directory) {
  console.log(`🔍 Scanning directory: ${directory}`)

  try {
    // Check if directory exists
    if (!fs.existsSync(directory)) {
      console.error(`❌ Directory does not exist: ${directory}`)
      return
    }

    // Read all files in the directory
    const files = fs.readdirSync(directory)
    console.log(`📁 Found ${files.length} files in directory`)

    // Filter for image files that need renaming
    const imageFiles = files.filter((file) => {
      return file.match(/^\d{1}-[a-z]+-[a-z]+\.(jpg|jpeg|png)$/i)
    })

    console.log(`🎯 Found ${imageFiles.length} files that need renaming`)

    if (imageFiles.length === 0) {
      console.log("✅ No files need renaming - all files already follow the correct naming convention")
      return
    }

    let renamedCount = 0
    let errorCount = 0

    // Process each file that needs renaming
    imageFiles.forEach((oldFileName) => {
      try {
        // Extract the number part and pad it with zero
        const match = oldFileName.match(/^(\d{1})-(.+)$/)
        if (match) {
          const [, number, rest] = match
          const paddedNumber = number.padStart(2, "0")
          const newFileName = `${paddedNumber}-${rest}`

          const oldPath = path.join(directory, oldFileName)
          const newPath = path.join(directory, newFileName)

          // Check if target file already exists
          if (fs.existsSync(newPath)) {
            console.warn(`⚠️  Target file already exists, skipping: ${newFileName}`)
            return
          }

          // Perform the rename
          fs.renameSync(oldPath, newPath)
          console.log(`✅ Renamed: ${oldFileName} → ${newFileName}`)
          renamedCount++
        }
      } catch (error) {
        console.error(`❌ Error renaming ${oldFileName}:`, error.message)
        errorCount++
      }
    })

    console.log(`\n📊 Summary:`)
    console.log(`   ✅ Successfully renamed: ${renamedCount} files`)
    console.log(`   ❌ Errors encountered: ${errorCount} files`)
    console.log(`   📁 Total files processed: ${imageFiles.length}`)

    // Verify the results
    console.log(`\n🔍 Verification - checking for remaining single-digit files...`)
    const remainingFiles = fs.readdirSync(directory).filter((file) => {
      return file.match(/^\d{1}-[a-z]+-[a-z]+\.(jpg|jpeg|png)$/i)
    })

    if (remainingFiles.length === 0) {
      console.log(`✅ All files now follow the correct naming convention!`)
    } else {
      console.log(`⚠️  ${remainingFiles.length} files still need attention:`)
      remainingFiles.forEach((file) => console.log(`   - ${file}`))
    }
  } catch (error) {
    console.error(`❌ Error processing directory:`, error.message)
  }
}

// Additional function to preview what would be renamed (dry run)
function previewRenames(directory) {
  console.log(`🔍 Preview mode - showing what would be renamed in: ${directory}`)

  try {
    if (!fs.existsSync(directory)) {
      console.error(`❌ Directory does not exist: ${directory}`)
      return
    }

    const files = fs.readdirSync(directory)
    const imageFiles = files.filter((file) => {
      return file.match(/^\d{1}-[a-z]+-[a-z]+\.(jpg|jpeg|png)$/i)
    })

    if (imageFiles.length === 0) {
      console.log("✅ No files need renaming")
      return
    }

    console.log(`📋 Files that would be renamed:`)
    imageFiles.forEach((oldFileName) => {
      const match = oldFileName.match(/^(\d{1})-(.+)$/)
      if (match) {
        const [, number, rest] = match
        const paddedNumber = number.padStart(2, "0")
        const newFileName = `${paddedNumber}-${rest}`
        console.log(`   ${oldFileName} → ${newFileName}`)
      }
    })
  } catch (error) {
    console.error(`❌ Error in preview:`, error.message)
  }
}

// Main execution
const directoryPath = path.join(process.cwd(), "public", "cards")

// Check command line arguments
const args = process.argv.slice(2)
const isPreview = args.includes("--preview") || args.includes("-p")

if (isPreview) {
  previewRenames(directoryPath)
} else {
  console.log(`🚀 Starting card image name standardization...`)
  console.log(`📂 Target directory: ${directoryPath}`)
  console.log(`📝 Converting format: X-suit-element.jpg → 0X-suit-element.jpg`)
  console.log(``)

  standardizeCardImageNames(directoryPath)
}
