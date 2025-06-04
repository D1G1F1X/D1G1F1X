import { Badge } from "@/components/ui/badge"

interface ElementalInfluenceProps {
  element: string
  influence: string
  guidance: string
  isBaseElement?: boolean
}

export function ElementalInfluenceDisplay({
  element,
  influence,
  guidance,
  isBaseElement = false,
}: ElementalInfluenceProps) {
  const getElementColor = (element: string) => {
    switch (element.toLowerCase()) {
      case "fire":
        return "from-red-900/30 to-red-700/10 text-red-400 border-red-500/30"
      case "water":
        return "from-blue-900/30 to-blue-700/10 text-blue-400 border-blue-500/30"
      case "air":
        return "from-yellow-900/30 to-yellow-700/10 text-yellow-400 border-yellow-500/30"
      case "earth":
        return "from-green-900/30 to-green-700/10 text-green-400 border-green-500/30"
      case "spirit":
        return "from-purple-900/30 to-purple-700/10 text-purple-400 border-purple-500/30"
      default:
        return "from-gray-900/30 to-gray-700/10 text-gray-400 border-gray-500/30"
    }
  }

  const getElementIcon = (element: string) => {
    switch (element.toLowerCase()) {
      case "fire":
        return "🔥"
      case "water":
        return "💧"
      case "air":
        return "💨"
      case "earth":
        return "🌱"
      case "spirit":
        return "✨"
      default:
        return "⚡"
    }
  }

  return (
    <div className={`p-4 rounded-lg border bg-gradient-to-br ${getElementColor(element)}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{getElementIcon(element)}</span>
        <h3 className="text-lg font-semibold">{element}</h3>
        {isBaseElement && (
          <Badge variant="destructive" className="ml-auto">
            Base Element
          </Badge>
        )}
      </div>

      <div className="mb-3">
        <h4 className="font-medium text-sm uppercase tracking-wider opacity-80 mb-1">Influence</h4>
        <p className="text-gray-300">{influence}</p>
      </div>

      <div>
        <h4 className="font-medium text-sm uppercase tracking-wider opacity-80 mb-1">Guidance</h4>
        <p className="text-gray-300">{guidance}</p>
      </div>
    </div>
  )
}
