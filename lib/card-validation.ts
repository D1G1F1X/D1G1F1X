export function validateCardData(data: any) {
  const errors: string[] = []

  // Check if data is an array
  if (!Array.isArray(data)) {
    return { valid: false, errors: ["Card data must be an array"] }
  }

  // Check each card
  data.forEach((card, index) => {
    if (!card.id) {
      errors.push(`Card at index ${index} is missing an id`)
    }

    if (!card.name) {
      errors.push(`Card at index ${index} is missing a name`)
    }

    if (!card.element) {
      errors.push(`Card at index ${index} is missing an element`)
    }

    // Check first end
    if (!card.firstEnd) {
      errors.push(`Card at index ${index} is missing firstEnd data`)
    } else {
      if (!card.firstEnd.name) {
        errors.push(`Card at index ${index} firstEnd is missing a name`)
      }

      if (!card.firstEnd.description) {
        errors.push(`Card at index ${index} firstEnd is missing a description`)
      }

      if (!Array.isArray(card.firstEnd.keywords)) {
        errors.push(`Card at index ${index} firstEnd keywords must be an array`)
      }
    }

    // Check second end
    if (!card.secondEnd) {
      errors.push(`Card at index ${index} is missing secondEnd data`)
    } else {
      if (!card.secondEnd.name) {
        errors.push(`Card at index ${index} secondEnd is missing a name`)
      }

      if (!card.secondEnd.description) {
        errors.push(`Card at index ${index} secondEnd is missing a description`)
      }

      if (!Array.isArray(card.secondEnd.keywords)) {
        errors.push(`Card at index ${index} secondEnd keywords must be an array`)
      }
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}
