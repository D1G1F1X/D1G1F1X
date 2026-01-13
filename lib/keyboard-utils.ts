import type React from "react"
export const KEYS = {
  ENTER: "Enter",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  SPACE: " ",
}

export const isEnterKey = (key: string): boolean => key === KEYS.ENTER
export const isEscapeKey = (key: string): boolean => key === KEYS.ESCAPE
export const isTabKey = (key: string): boolean => key === KEYS.TAB
export const isArrowKey = (key: string): boolean =>
  [KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT].includes(key)

export const handleEscapeKey = (callback: () => void) => (e: React.KeyboardEvent) => {
  if (isEscapeKey(e.key)) {
    callback()
  }
}
