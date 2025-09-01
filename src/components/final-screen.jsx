export function FinalScreen({ onFinish }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500/20 to-pink-500/20 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="text-8xl mb-4">👑❤️</div>
          <h1 className="text-3xl font-bold text-primary pixel-glow">¡Aventura Completada!</h1>
          <p className="text-lg text-muted-foreground">Erick y Sarah están finalmente juntos</p>
        </div>

        <div className="bg-card/50 border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-4xl"><img src="/happy-erick.png" alt="Erick" className="w-20 h-20 object-contain"  /></div>
            <div className="text-4xl">❤️</div>
            <img src="/Sarah.png" alt="Sarah" className="w-20 h-20 object-contain" />
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Felicidades por ser la dueña de este corazon. Ahora Sarah y Erick pueden estar juntos
            para siempre."
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-primary font-semibold">🏆 Logros Desbloqueados:</p>
          <div className="space-y-1 text-muted-foreground">
            <p>✨ Exploradora Completa</p>
            <p>📸 Coleccionista de Recuerdos</p>
            <p>❤️ Cupido del Reino</p>
            <p>🗺️ Maestra del Tesoro</p>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full bg-primary text-primary-foreground py-4 px-8 rounded-lg text-xl font-bold hover:bg-primary/90 transition-colors pixel-glow"
        >
          🎉 ¡Celebrar Victoria!
        </button>
      </div>
    </div>
  )
}
