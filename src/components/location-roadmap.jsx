import { Button } from "@/components/ui/button"

export function LocationRoadmap({ locations, onLocationClick }) {
  const getLocationPosition = (index) => {
    switch (index) {
      case 0: // Plaza los pomelos - izquierda
        return { justify: "justify-start", margin: "ml-2 sm:ml-4", top: "top-2 sm:top-4" }
      case 1: // El cima - abajo derecha
        return { justify: "justify-end", margin: "mr-2 sm:mr-4", top: "top-20 sm:top-32" }
      case 2: // Los columpios - abajo izquierda (más separado)
        return { justify: "justify-start", margin: "ml-4 sm:ml-8", top: "top-40 sm:top-64" }
      case 3: // Centro comercial - al lado derecho pero más abajo para evitar solapamiento
        return { justify: "justify-end", margin: "mr-4 sm:mr-8", top: "top-60 sm:top-80" }
      case 4: // El emperador - debajo al centro (bajado más)
        return { justify: "justify-center", margin: "", top: "top-96 sm:top-[28rem]" }
      default:
        return { justify: "justify-center", margin: "", top: "top-0" }
    }
  }

  return (
    <div className="relative min-h-[600px] sm:min-h-[800px] w-full overflow-hidden px-2">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Sombra del camino para efecto 3D */}
        <path
          d="M 80 60 Q 200 100 320 140 Q 180 180 100 220 Q 250 260 320 240 Q 280 300 200 420"
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth="8"
          fill="none"
          transform="translate(1, 1)"
        />

        {/* Camino principal */}
        <path
          d="M 80 60 Q 200 100 320 140 Q 180 180 100 220 Q 250 260 320 240 Q 280 300 200 420"
          stroke="#8B7355"
          strokeWidth="6"
          fill="none"
        />

        {/* Línea central del camino */}
        <path
          d="M 80 60 Q 200 100 320 140 Q 180 180 100 220 Q 250 260 320 240 Q 280 300 200 420"
          stroke="#A0916B"
          strokeWidth="1"
          fill="none"
          strokeDasharray="10,5"
          className="animate-pulse"
        />

        {/* Puntos decorativos del camino */}
        <circle cx="80" cy="60" r="2" fill="#6B5B47" />
        <circle cx="200" cy="100" r="1.5" fill="#6B5B47" />
        <circle cx="320" cy="140" r="2" fill="#6B5B47" />
        <circle cx="100" cy="220" r="1.5" fill="#6B5B47" />
        <circle cx="320" cy="240" r="2" fill="#6B5B47" />
        <circle cx="200" cy="420" r="2.5" fill="#6B5B47" />
      </svg>

      <div className="relative z-10 h-full">
        {locations.map((location, index) => {
          const position = getLocationPosition(index)
          return (
            <div
              key={location.id}
              className={`absolute w-full flex ${position.justify} ${position.margin} ${position.top} items-center`}
            >
              {/* Location Node */}
              <div className="flex flex-col items-center">
                <Button
                  onClick={() => onLocationClick(location)}
                  disabled={!location.unlocked || location.completed}
                  className={`
                    relative w-12 h-12 sm:w-16 sm:h-16 rounded-full text-lg sm:text-2xl pixel-art transition-all duration-300 mb-2
                    ${
                      location.completed
                        ? "bg-primary hover:bg-primary text-primary-foreground shadow-lg pixel-glow cursor-default"
                        : location.unlocked
                          ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md pixel-bounce"
                          : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    }
                  `}
                >
                  {location.completed ? "✅" : location.unlocked ? <img src={location.image} alt={location.displayName} className="w-10 h-10 object-contain" /> : "❓"}
                </Button>

                <div
                  className={`
                    w-32 sm:w-40 p-2 sm:p-3 rounded-lg border-2 transition-all duration-300 text-center
                    ${
                      location.completed
                        ? "bg-card border-primary shadow-md"
                        : location.unlocked
                          ? "bg-card border-secondary shadow-sm"
                          : "bg-muted border-border opacity-50"
                    }
                  `}
                >
                  <h3
                    className={`font-bold text-xs sm:text-sm mb-1 ${location.completed ? "text-primary" : "text-card-foreground"}`}
                  >
                    {location.unlocked || location.completed ? location.displayName : "???"}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    {location.unlocked || location.completed ? location.character : "Ubicación misteriosa"}
                  </p>
                  <p className="text-xs text-card-foreground opacity-75">
                    {location.completed
                      ? "¡Completado!"
                      : location.unlocked
                        ? "Toca para visitar"
                        : "Completa la ubicación anterior"}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="inline-flex items-center gap-2 bg-card px-3 py-1 sm:px-4 sm:py-2 rounded-full border shadow-md">
          <span className="text-xs sm:text-sm font-medium">Progreso:</span>
          <span className="text-primary font-bold text-xs sm:text-sm">
            {locations.filter((l) => l.completed).length}/{locations.length}
          </span>
        </div>
      </div>
    </div>
  )
}
