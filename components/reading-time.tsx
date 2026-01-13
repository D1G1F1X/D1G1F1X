import { Clock } from "lucide-react"
import { calculateReadingTime, formatReadingTime } from "@/lib/utils/reading-time"

interface ReadingTimeProps {
  content: string
  className?: string
}

export default function ReadingTime({ content, className = "" }: ReadingTimeProps) {
  const minutes = calculateReadingTime(content)

  return (
    <div className={`flex items-center text-gray-400 ${className}`}>
      <Clock className="h-4 w-4 mr-1.5" />
      <span>{formatReadingTime(minutes)}</span>
    </div>
  )
}
