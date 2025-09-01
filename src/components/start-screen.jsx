export function StartScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary pixel-glow">🗺️</h1>
          <h2 className="text-4xl font-bold text-primary pixel-glow">Búsqueda del Tesoro</h2>
          <p className="text-lg text-muted-foreground">
            Embárcate en una aventura épica para encontrar el corazón de Erick
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>🏞️ Visita 5 ubicaciones misteriosas</p>
          <p>👥 Conoce personajes únicos</p>
          <p>📸 Captura recuerdos especiales</p>
          <p>🎁 Colecciona objetos mágicos</p>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground py-4 px-8 rounded-lg text-xl font-bold hover:bg-primary/90 transition-colors pixel-glow"
        >
          ¡Comenzar Aventura!
        </button>
      </div>
    </div>
  )
}
