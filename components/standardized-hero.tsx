interface StandardizedHeroProps {
  title: string
  subtitle?: string
  description: string
  backgroundImage: string
  badge?: {
    text: string
    icon?: string
  }
  features?: Array<{
    icon: string
    text: string
    color: string
  }>
  gradient?: string
}

export default function StandardizedHero({
  title,
  subtitle,
  description,
  backgroundImage,
  badge,
  features,
  gradient = "from-purple-900/20 via-blue-900/20 to-black",
}: StandardizedHeroProps) {
  return (
    <div className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {badge && (
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
              {badge.icon && <span className="mr-2">{badge.icon}</span>}
              {badge.text}
            </span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          {title}
          {subtitle && <span className="block text-2xl md:text-4xl text-purple-300 mt-2">{subtitle}</span>}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">{description}</p>
        {features && (
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`px-4 py-2 bg-${feature.color}-900/30 text-${feature.color}-300 rounded-full border border-${feature.color}-700/50`}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
