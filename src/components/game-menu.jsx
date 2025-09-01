export function GameMenu({ currentScreen, onScreenChange, completedCount }) {
  const menuItems = [
    { id: "roadmap", label: "Mapa", icon: "🗺️" },
    { id: "items", label: "Items", icon: "🎒" },
    { id: "profile", label: "Perfil", icon: "👤" },
    { id: "collage", label: "Fotos", icon: "📸" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-primary">Búsqueda del Tesoro</h1>
          <div className="text-sm text-muted-foreground">{completedCount}/5 ✨</div>
        </div>

        <div className="flex justify-around">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                currentScreen === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
