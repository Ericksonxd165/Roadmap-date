export function ProfileScreen({ locations }) {
  const getDanceLevel = () => {
    const vegaCompleted = locations.find((loc) => loc.id === 2)?.completed
    return vegaCompleted ? 20 : 10
  }

  const stats = [
    { name: "Belleza", value: "Infinita", icon: "✨" },
    { name: "Suerte", value: "Alta", icon: "🍀" },
    { name: "Chistes Malos", value: "100%", icon: "😂" },
    { name: "Habilidad de Baile", value: getDanceLevel(), icon: "💃" },
  ]

  const completedCount = locations.filter((loc) => loc.completed).length

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <img src="/Sarah.png" alt="Sarah" className="w-24 h-24 object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Sarah</h2>
        <p className="text-muted-foreground">Cazadora de Tesoros</p>
      </div>

      <div className="bg-card border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3">Progreso de Aventura</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / 5) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{completedCount}/5</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Estadísticas</h3>
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-medium">{stat.name}</span>
            </div>
            <span className="text-primary font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
