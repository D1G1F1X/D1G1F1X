const fs = require("fs")
const path = require("path")

// Audit results storage
const auditResults = {
  supabaseInstances: [],
  environmentVariables: [],
  configurationFiles: [],
  authImplementations: [],
  databaseOperations: [],
  issues: [],
  recommendations: [],
}

// File extensions to scan
const fileExtensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"]

// Patterns to search for
const searchPatterns = {
  supabaseImports: /import.*from.*['"]@supabase/,
  supabaseClient: /createClient|supabase|getClientSide|getServerClient/,
  envVariables: /SUPABASE_|NEXT_PUBLIC_SUPABASE_/,
  authMethods: /auth\.|signIn|signUp|signOut|getSession|getUser/,
  databaseOps: /\.from\(|\.select\(|\.insert\(|\.update\(|\.delete\(/,
  roseFlowerRefs: /rose-flower|rose_flower/i,
}

function scanDirectory(dirPath, relativePath = "") {
  const items = fs.readdirSync(dirPath)

  for (const item of items) {
    const fullPath = path.join(dirPath, item)
    const relativeFilePath = path.join(relativePath, item)

    // Skip node_modules and .next directories
    if (item === "node_modules" || item === ".next" || item === ".git") {
      continue
    }

    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      scanDirectory(fullPath, relativeFilePath)
    } else if (fileExtensions.some((ext) => item.endsWith(ext))) {
      scanFile(fullPath, relativeFilePath)
    }
  }
}

function scanFile(filePath, relativeFilePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split("\n")

    lines.forEach((line, lineNumber) => {
      // Check for Supabase imports
      if (searchPatterns.supabaseImports.test(line)) {
        auditResults.supabaseInstances.push({
          file: relativeFilePath,
          line: lineNumber + 1,
          content: line.trim(),
          type: "import",
        })
      }

      // Check for Supabase client usage
      if (searchPatterns.supabaseClient.test(line)) {
        auditResults.supabaseInstances.push({
          file: relativeFilePath,
          line: lineNumber + 1,
          content: line.trim(),
          type: "client",
        })
      }

      // Check for environment variables
      if (searchPatterns.envVariables.test(line)) {
        auditResults.environmentVariables.push({
          file: relativeFilePath,
          line: lineNumber + 1,
          content: line.trim(),
          type: "env",
        })
      }

      // Check for auth methods
      if (searchPatterns.authMethods.test(line)) {
        auditResults.authImplementations.push({
          file: relativeFilePath,
          line: lineNumber + 1,
          content: line.trim(),
          type: "auth",
        })
      }

      // Check for database operations
      if (searchPatterns.databaseOps.test(line)) {
        auditResults.databaseOperations.push({
          file: relativeFilePath,
          line: lineNumber + 1,
          content: line.trim(),
          type: "database",
        })
      }

      // Check for rose-flower references
      if (searchPatterns.roseFlowerRefs.test(line)) {
        auditResults.issues.push({
          file: relativeFilePath,
          line: lineNumber + 1,
          content: line.trim(),
          type: "rose-flower-reference",
          severity: "HIGH",
        })
      }
    })
  } catch (error) {
    auditResults.issues.push({
      file: relativeFilePath,
      error: error.message,
      type: "file-read-error",
      severity: "MEDIUM",
    })
  }
}

function analyzeResults() {
  console.log("🔍 SUPABASE INTEGRATION AUDIT REPORT")
  console.log("=====================================\n")

  // Environment Variables Analysis
  console.log("📋 ENVIRONMENT VARIABLES:")
  const envVars = [
    ...new Set(
      auditResults.environmentVariables.map((item) => {
        const match = item.content.match(/SUPABASE_[A-Z_]+|NEXT_PUBLIC_SUPABASE_[A-Z_]+/)
        return match ? match[0] : "Unknown"
      }),
    ),
  ]

  envVars.forEach((envVar) => {
    console.log(`  ✓ ${envVar}`)
  })
  console.log("")

  // Supabase Client Instances
  console.log("🔧 SUPABASE CLIENT INSTANCES:")
  const clientFiles = [...new Set(auditResults.supabaseInstances.map((item) => item.file))]
  console.log(`  Total files with Supabase usage: ${clientFiles.length}`)

  clientFiles.forEach((file) => {
    console.log(`  📁 ${file}`)
    const fileInstances = auditResults.supabaseInstances.filter((item) => item.file === file)
    fileInstances.forEach((instance) => {
      console.log(`    Line ${instance.line}: ${instance.content}`)
    })
  })
  console.log("")

  // Issues Found
  console.log("⚠️  ISSUES IDENTIFIED:")
  if (auditResults.issues.length === 0) {
    console.log("  ✅ No critical issues found")
  } else {
    auditResults.issues.forEach((issue) => {
      console.log(`  🚨 ${issue.severity}: ${issue.file}:${issue.line}`)
      console.log(`     ${issue.content}`)
      console.log(`     Issue: ${issue.type}\n`)
    })
  }

  // Recommendations
  console.log("💡 RECOMMENDATIONS:")

  // Check for multiple client patterns
  const hasMultiplePatterns = auditResults.supabaseInstances.some(
    (item) =>
      item.content.includes("createClient") &&
      auditResults.supabaseInstances.some(
        (other) => other.content.includes("getClientSide") || other.content.includes("getServerClient"),
      ),
  )

  if (hasMultiplePatterns) {
    auditResults.recommendations.push("Standardize Supabase client creation patterns")
  }

  // Check for direct supabase imports vs utility functions
  const hasDirectImports = auditResults.supabaseInstances.some((item) =>
    item.content.includes('from "@supabase/supabase-js"'),
  )

  if (hasDirectImports) {
    auditResults.recommendations.push("Use centralized Supabase utility functions instead of direct imports")
  }

  auditResults.recommendations.forEach((rec) => {
    console.log(`  📌 ${rec}`)
  })

  // Generate summary
  console.log("\n📊 AUDIT SUMMARY:")
  console.log(`  Files scanned: ${clientFiles.length}`)
  console.log(`  Supabase instances: ${auditResults.supabaseInstances.length}`)
  console.log(`  Auth implementations: ${auditResults.authImplementations.length}`)
  console.log(`  Database operations: ${auditResults.databaseOperations.length}`)
  console.log(`  Issues found: ${auditResults.issues.length}`)
  console.log(`  Recommendations: ${auditResults.recommendations.length}`)
}

// Run the audit
console.log("Starting Supabase integration audit...\n")
scanDirectory(process.cwd())
analyzeResults()

// Save detailed results to file
fs.writeFileSync("supabase-audit-results.json", JSON.stringify(auditResults, null, 2))

console.log("\n📄 Detailed results saved to: supabase-audit-results.json")
