const fs = require("fs")
const path = require("path")

function renameFiles(directory) {
  // Rename 74spear-*.jpg to 07spear-*.jpg
  const spearRenames = [
    "74spear-fire.jpg",
    "74spear-air.jpg",
    "74spear-earth.jpg",
    "74spear-water.jpg",
    "74spear-spirit.jpg",
  ]

  for (const oldName of spearRenames) {
    const newName = oldName.replace(/^74/, "07")
    const oldPath = path.join(directory, oldName)
    const newPath = path.join(directory, newName)
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath)
      console.log(`Renamed ${oldName} to ${newName}`)
    } else {
      console.log(`File not found, skipping: ${oldPath}`)
    }
  }
}

// The path needs to be relative to the root of the project for Next.js
// In Next.js, the 'public' directory is directly accessible at the root.
// So, 'public/cards' becomes '/cards' in the runtime.
// For a script running in the sandbox, process.cwd() is the root.
const directoryPath = path.join(process.cwd(), "public", "cards")

renameFiles(directoryPath)
