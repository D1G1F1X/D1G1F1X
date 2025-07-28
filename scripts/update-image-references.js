const fs = require("fs")
const path = require("path")

// File extensions to search in
const SEARCH_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json"]

// Directories to search
const SEARCH_DIRECTORIES = ["app", "components", "lib", "data", "scripts"]

function findImageReferences(directory, results = []) {
  try {
    const items = fs.readdirSync(directory)

    for (const item of items) {
      const fullPath = path.join(directory, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (!["node_modules", ".next", ".git"].includes(item)) {
          findImageReferences(fullPath, results)
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item)
        if (SEARCH_EXTENSIONS.includes(ext)) {
          searchFileForImageReferences(fullPath, results)
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error.message)
  }

  return results
}

function searchFileForImageReferences(filePath, results) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split("\n")

    lines.forEach((line, lineNumber) => {
      // Look for patterns that might be card image references
      const patterns = [
        // Direct image paths
        /\/cards\/(\d{1})-([a-z]+)-([a-z]+)\.jpg/gi,
        // Template literals
        /`\/cards\/\$\{.*\}-([a-z]+)-([a-z]+)\.jpg`/gi,
        // String concatenation patterns
        /"\/cards\/" \+ .* \+ "-([a-z]+)-([a-z]+)\.jpg"/gi,
      ]

      patterns.forEach((pattern, patternIndex) => {
        let match
        while ((match = pattern.exec(line)) !== null) {
          results.push({
            file: filePath,
            line: lineNumber + 1,
            content: line.trim(),
            match: match[0],
            patternType: patternIndex,
            needsUpdate: true,
          })
        }
      })
    })
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
  }
}

function updateImageReferences(results) {
  const fileUpdates = new Map()

  // Group updates by file
  results.forEach((result) => {
    if (!fileUpdates.has(result.file)) {
      fileUpdates.set(result.file, [])
    }
    fileUpdates.get(result.file).push(result)
  })

  let updatedFiles = 0
  let totalUpdates = 0

  fileUpdates.forEach((updates, filePath) => {
    try {
      let content = fs.readFileSync(filePath, "utf8")
      let hasChanges = false

      updates.forEach((update) => {
        // Convert single-digit to zero-padded format
        const oldPattern = /\/cards\/(\d{1})-([a-z]+)-([a-z]+)\.jpg/gi
        const newContent = content.replace(oldPattern, (match, number, suit, element) => {
          const paddedNumber = number.padStart(2, "0")
          hasChanges = true
          totalUpdates++
          console.log(`  ${match} → /cards/${paddedNumber}-${suit}-${element}.jpg`)
          return `/cards/${paddedNumber}-${suit}-${element}.jpg`
        })
        content = newContent
      })

      if (hasChanges) {
        fs.writeFileSync(filePath, content, "utf8")
        updatedFiles++
        console.log(`✅ Updated: ${filePath}`)
      }
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message)
    }
  })

  return { updatedFiles, totalUpdates }
}

// Main execution
console.log("🔍 Searching for card image references...")

const results = []
SEARCH_DIRECTORIES.forEach((dir) => {
  if (fs.existsSync(dir)) {
    findImageReferences(dir, results)
  }
})

console.log(`\n📊 Found ${results.length} potential image references`)

if (results.length > 0) {
  console.log("\n📋 References found:")
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.file}:${result.line}`)
    console.log(`   ${result.match}`)
  })

  // Check if --update flag is provided
  const shouldUpdate = process.argv.includes("--update")

  if (shouldUpdate) {
    console.log("\n🔄 Updating image references...")
    const { updatedFiles, totalUpdates } = updateImageReferences(results)
    console.log(`\n✅ Updated ${totalUpdates} references in ${updatedFiles} files`)
  } else {
    console.log("\n💡 Run with --update flag to apply changes")
    console.log("   node scripts/update-image-references.js --update")
  }
} else {
  console.log("✅ No legacy image references found!")
}
