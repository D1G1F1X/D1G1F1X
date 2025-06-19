const fs = require("fs")
const path = require("path")

// Expected naming convention pattern
const STANDARD_PATTERN = /^(\d{2})-([a-z]+)-([a-z]+)\.jpg$/i

function validateCardDirectory() {
  const cardsDir = path.join(process.cwd(), "public", "cards")

  if (!fs.existsSync(cardsDir)) {
    console.error("❌ Cards directory not found:", cardsDir)
    return false
  }

  console.log("🔍 Validating card directory:", cardsDir)

  const files = fs.readdirSync(cardsDir)
  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file))

  console.log(`📁 Found ${imageFiles.length} image files`)

  const standardFiles = []
  const legacyFiles = []
  const invalidFiles = []

  imageFiles.forEach((file) => {
    if (STANDARD_PATTERN.test(file)) {
      standardFiles.push(file)
    } else if (/^\d{1}-[a-z]+-[a-z]+\.jpg$/i.test(file)) {
      legacyFiles.push(file)
    } else {
      invalidFiles.push(file)
    }
  })

  console.log(`\n📊 File Analysis:`)
  console.log(`   ✅ Standard format (0X-suit-element.jpg): ${standardFiles.length}`)
  console.log(`   🔄 Legacy format (X-suit-element.jpg): ${legacyFiles.length}`)
  console.log(`   ❓ Other formats: ${invalidFiles.length}`)

  if (legacyFiles.length > 0) {
    console.log(`\n🔄 Legacy files that need updating:`)
    legacyFiles.forEach((file) => console.log(`   - ${file}`))
  }

  if (invalidFiles.length > 0) {
    console.log(`\n❓ Files with non-standard naming:`)
    invalidFiles.forEach((file) => console.log(`   - ${file}`))
  }

  return legacyFiles.length === 0 && invalidFiles.length === 0
}

function validateCodeReferences() {
  console.log("\n🔍 Validating code references...")

  // This would run the reference finder script
  const { execSync } = require("child_process")

  try {
    const output = execSync("node scripts/update-image-references.js", {
      encoding: "utf8",
      cwd: process.cwd(),
    })

    console.log(output)
    return !output.includes("potential image references")
  } catch (error) {
    console.error("Error validating code references:", error.message)
    return false
  }
}

// Main validation
console.log("🚀 Starting comprehensive validation...\n")

const directoryValid = validateCardDirectory()
const codeValid = validateCodeReferences()

console.log(`\n📋 Validation Summary:`)
console.log(`   📁 Directory structure: ${directoryValid ? "✅ Valid" : "❌ Issues found"}`)
console.log(`   💻 Code references: ${codeValid ? "✅ Valid" : "❌ Issues found"}`)

if (directoryValid && codeValid) {
  console.log(`\n🎉 All validations passed! Your card directory is fully standardized.`)
} else {
  console.log(`\n⚠️  Some issues were found. Please run the appropriate scripts to fix them.`)
}
